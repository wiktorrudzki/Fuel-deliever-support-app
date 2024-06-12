import ReactApexChart from 'react-apexcharts';

import { ApexOptions } from 'apexcharts';

export default function FuelLevelChart() {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
        colors: {
          ranges: [
            {
              from: 0,
              to: 20,
              color: '#FF3434',
            },
            {
              from: 20,
              to: 50,
              color: '#ECEC42',
            },
            {
              from: 50,
              to: 100,
              color: '#008000',
            },
          ],
        },
      },
    },
    xaxis: {
      categories: ['Fuel Level'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      max: 100,
      min: 0,
    },
    grid: {
      show: false,
    },
    fill: {
      colors: ['#4CAF50'],
    },
    dataLabels: {
      enabled: false,
      formatter: (val: number) => `${val}%`,
      style: {
        colors: ['#000'],
      },
    },
    stroke: {
      show: false,
      // colors: ['black'],
      // width: 4,
    },
    tooltip: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Fuel Level',
      data: [100],
    },
  ];

  return (
    <div
      style={{
        width: '70px',
        margin: '0',
        padding: '0',
        height: '130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={165}
      />
    </div>
  );
}
