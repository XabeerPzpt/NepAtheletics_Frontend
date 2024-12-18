import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css';
 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserChart = ({ userdata }) => {
  const currentYear = new Date().getFullYear().toString();
  const chartData = {
    labels: userdata.map(item => item.month),
    datasets: [
      {
        label: `Total Users for ${currentYear}`,
        data: userdata.map(item => item.users),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curves
        pointRadius: 5, // Size of points
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of points
        pointHoverRadius: 8, // Size of points on hover
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
        text: 'Number of Users per month',
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
            return `Users: ${tooltipItem.raw}`;
          }
        }
      }
    },
    animation: {
      duration: 1000, // Duration of animation in ms
      easing: 'easeInOutQuad' // Easing function
    }
  };

  return (
    <div className='chartLayout'>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default UserChart;
