import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function FuelLevelChart (){
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
        borderRadius: 4,
        dataLabels: {
          position: 'top', 
        },
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
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        colors: ['#000'],
      },
    },
    stroke: {
      show: true,
      colors: ['#000'], 
      width: 4,
    },
    tooltip: {
        enabled: false
    }
    
  };

  const series = [
    {
      name: 'Fuel Level',
      data: [40],
    },
  ];

  return (
    <div style={{ width: '100px' }}>
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
};

