import Card from '@mui/material/Card';
import ReactApexChart from 'react-apexcharts';
// import { useState } from 'react';
import './charts.css';

export default function Station1chart() {

    const state = {
        series: [{
            name: 'Fuels',
            data: [10, 30, 57, 20]
        }],
        options: {
            chart: {
                type: 'bar' as const,
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borederRadius: 10,
                    columnWidth: '50%',
                    endingShape: 'rounded',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 20,
                            color: '#FF3434'
                        }, {
                            from: 20,
                            to: 50,
                            color: '#ECEC42'
                        }, {
                            from: 50,
                            to: 100,
                            color: '#008000'
                        }]
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Pb95', 'Pb98', 'DIESEL', 'LPG'],
            },
            yaxis: {
                labels: {
                    formatter(value: number) {
                        return `${value}%`;
                    },
                },
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val + "%";
                    }
                }
            }
        }
    };

    return (
        <Card className='card'>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={200} />
            </div>
            <div id="custom-legend">
                <div className='element'>                   
                    <div className='legend' style={{ backgroundColor: '#FF3434' }}></div>
                    <span>niski</span>
                </div>
                <div className='element'>
                    <div className='legend' style={{ backgroundColor: '#ECEC42' }}></div>
                    <span>średni</span>
                </div>
                <div className='element'>
                    <div className='legend' style={{ backgroundColor: '#008000' }}></div>
                    <span>wysoki</span>
                </div>
            </div>
        </Card>
    );
}
