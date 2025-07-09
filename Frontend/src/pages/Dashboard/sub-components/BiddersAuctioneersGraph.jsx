import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B",
        backgroundColor: "rgba(214, 72, 43, 0.1)",
        pointBorderColor: "#D6482B",
        pointBackgroundColor: "#D6482B",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#FBBF24",
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        pointBorderColor: "#FBBF24",
        pointBackgroundColor: "#FBBF24",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
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
        left: 15,
        right: 15,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 10,
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#2D2E3E",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        borderColor: "#3D3BF3",
        borderWidth: 1,
      },
      title: {
        display: true,
        text: "Bidders vs Auctioneers Registration (Monthly)",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#1f2937",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
