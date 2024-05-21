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
                            color: 'rgb(185, 5, 5)'
                        }, {
                            from: 20,
                            to: 50,
                            color: 'rgb(232, 232, 0)'
                        }, {
                            from: 50,
                            to: 100,
                            color: 'rgb(0, 147, 7)'
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
        <Card sx={{ width: '400px', padding: '10px'}}>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={200} />
            </div>
            <div id="custom-legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <div className='legend' style={{ backgroundColor: 'rgb(185, 5, 5)' }}></div>
                    <span>niski</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <div className='legend' style={{ backgroundColor: 'rgb(232, 232, 0)' }}></div>
                    <span>średni</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <div className='legend' style={{ backgroundColor: 'rgb(0, 147, 7)' }}></div>
                    <span>wysoki</span>
                </div>
            </div>
        </Card>
    );
}
