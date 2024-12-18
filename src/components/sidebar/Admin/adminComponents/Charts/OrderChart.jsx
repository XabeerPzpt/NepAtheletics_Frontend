import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chart.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderChart = ({ orderData , currentYear}) => {
  const chartData = {
    labels: orderData.map(item => item.month),
    datasets: [
      {
        label: `Orders for year ${currentYear}`,
        data: orderData.map(item => item.total_Orders), 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
            lineHeight: 1.2
          },
          color: '#333'
        }
      },
      title: {
        display: true,
        text: 'Yearly Orders',
        font: {
          size: 20,
          family: 'Arial, sans-serif',
          weight: 'bold',
          lineHeight: 1.2
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          family: 'Arial, sans-serif',
          weight: 'bold'
        },
        bodyFont: {
          size: 14,
          family: 'Arial, sans-serif'
        },
        bodySpacing: 5,
        padding: 10,
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        callbacks: {
          label: function(tooltipItem) {
            return `Orders: ${tooltipItem.raw}`;
          }
        }
      }
    },
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: 'easeInOutQuad' // Easing function
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className='chartLayout'>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default OrderChart;
