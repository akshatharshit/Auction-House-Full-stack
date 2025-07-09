import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#D6482B",
        hoverBackgroundColor: "#ff7154",
        borderRadius: 6,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          stepSize: 1000,
          callback: (value) => value.toLocaleString(),
          color: "#6B7280",
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151",
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#2D2E3E",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#3D3BF3",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
      },
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#1F2937",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
