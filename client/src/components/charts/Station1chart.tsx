import React from 'react';
import ReactApexChart from 'react-apexcharts';

import Card from '@mui/material/Card';

import './charts.css';

interface Station1chartProps {
  percent95: number;
  percent98: number;
  percentDiesel: number;
  percentTurboDiesel: number;
}

const Station1chart: React.FC<Station1chartProps> = ({
  percent95,
  percent98,
  percentDiesel,
  percentTurboDiesel,
}) => {
  const state = {
    series: [
      {
        name: 'Fuels',
        data: [percent95, percent98, percentDiesel, percentTurboDiesel],
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
          colors: {
            ranges: [
              {
                from: 0,
                to: 20,
                color: '#FF3434',
              },
              {
                from: 20,
                to: 60,
                color: '#ECEC42',
              },
              {
                from: 60,
                to: 100,
                color: '#008000',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['PB95', 'PB98', 'DIESEL', 'TURBO D'],
      },
      yaxis: {
        labels: {
          formatter(value: number) {
            return `${value}%`;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + '%';
          },
        },
      },
    },
  };

  return (
    <Card className="card">
      <div className="card-title">
        <p className="title">Stacja nr 1</p>
      </div>
      <div className="charts-box">
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={200}
          />
        </div>
        <div id="custom-legend">
          <div className="element">
            <div
              className="legend"
              style={{ backgroundColor: '#FF3434' }}
            ></div>
            <span>niski</span>
          </div>
          <div className="element">
            <div
              className="legend"
              style={{ backgroundColor: '#ECEC42' }}
            ></div>
            <span>średni</span>
          </div>
          <div className="element">
            <div
              className="legend"
              style={{ backgroundColor: '#008000' }}
            ></div>
            <span>wysoki</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Station1chart;
