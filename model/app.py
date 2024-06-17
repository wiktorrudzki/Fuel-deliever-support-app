import pandas as pd
import pymssql
from flask import Flask, jsonify, request
from flask_restx import Api, Resource
from statsmodels.tsa.statespace.sarimax import SARIMAX

app = Flask(__name__)
api = Api(app, version='1.0', title='Forecast API',
          description='API for forecasting fuel prices using SARIMA model')
ns = api.namespace('forecast', description='Forecast operations')

server = 'localhost'  
user = 'sa' 
password = 'Password123@!'
database = 'master'  


def fetch_and_preprocess_data(station_id):
    with pymssql.connect(server, user, password, database) as conn:
        with conn.cursor(as_dict=True) as cursor:
            cursor.execute("""
                SELECT *
                FROM (
                    SELECT TOP 40 DepartureTime AS Date, Pb95 AS ULG95, Diesel AS DK, Pb98 AS ULTSU, TurboDiesel AS ULTDK 
                    FROM Deliveries 
                    WHERE StationId = %s
                    ORDER BY DepartureTime DESC
                ) AS subquery
                ORDER BY Date ASC
            """, (station_id,))
            data = cursor.fetchall()

    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d %H:%M:%S')
    df.set_index('Date', inplace=True)
    return df


def calculate_last_quarterly_averages(df):
    
    quarterly_means = df.resample('Q').mean()
    
    # Last available quarterly means 
    last_quarterly_averages = {}
    for fuel in df.columns:
        if fuel != 'Date':  
            last_mean = quarterly_means[fuel].dropna().iloc[-1]
            last_quarterly_averages[fuel] = last_mean
    
    return last_quarterly_averages



def train_sarima_model(fuel, df, order=(1, 1, 1), seasonal_order=(1, 2, 1, 24)):
    
    train_size = int(len(df) * 0.8)
    train, test = df.iloc[:train_size], df.iloc[train_size:]

    # SARIMA 
    model = SARIMAX(train[fuel], order=order, seasonal_order=seasonal_order)
    model_fit = model.fit(disp=False)
    return model_fit


@ns.route('/')
class Forecast(Resource):
    @ns.doc(params={'steps': 'Number of steps to forecast'})
    def get(self):
        steps = request.args.get('steps', default=10, type=int)
        
        if steps < 1:
            return jsonify({"error": "The number of steps must be greater than 0"}), 400
   
        try:
            station_id_1 = 1  
            station_id_2 = 2 

            
            df_1 = fetch_and_preprocess_data(station_id_1)  
            fuels = ['ULG95', 'DK', 'ULTSU', 'ULTDK']
            models_1 = {fuel: train_sarima_model(fuel, df_1) for fuel in fuels}  
            last_quarterly_averages_1 = calculate_last_quarterly_averages(df_1)
            
           
            df_2 = fetch_and_preprocess_data(station_id_2)  
            models_2 = {fuel: train_sarima_model(fuel, df_2) for fuel in fuels}  
            last_quarterly_averages_2 = calculate_last_quarterly_averages(df_2)

           
            forecasts_1 = {}
            last_date_1 = df_1.index[-1]
            future_dates_1 = pd.date_range(start=last_date_1 + pd.Timedelta(days=1), periods=steps)
            
            for fuel in fuels:
                model_fit_1 = models_1[fuel]
                forecast_1 = model_fit_1.forecast(steps=steps)
                forecasts_1[fuel] = forecast_1.tolist()

            
            forecasts_2 = {}
            last_date_2 = df_2.index[-1]
            future_dates_2 = pd.date_range(start=last_date_2 + pd.Timedelta(days=1), periods=steps)
            
            for fuel in fuels:
                model_fit_2 = models_2[fuel]
                forecast_2 = model_fit_2.forecast(steps=steps)
                forecasts_2[fuel] = forecast_2.tolist()

            
            response = [
                {
                    'StationId': station_id_1,
                    'LastQuarterlyAverages': last_quarterly_averages_1,
                    'Forecasts': [
                        {'Date': future_dates_1[i].strftime('%Y-%m-%d'), 'Forecast': {fuel: forecasts_1[fuel][i] for fuel in fuels}}
                        for i in range(steps)
                    ]
                },
                {
                    'StationId': station_id_2,
                    'LastQuarterlyAverages': last_quarterly_averages_2,
                    'Forecasts': [
                        {'Date': future_dates_2[i].strftime('%Y-%m-%d'), 'Forecast': {fuel: forecasts_2[fuel][i] for fuel in fuels}}
                        for i in range(steps)
                    ]
                }
            ]

            return jsonify(response)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)