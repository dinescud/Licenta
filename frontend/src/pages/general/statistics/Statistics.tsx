import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Statistics.scss";
import Navbar from "../../../components/navbar/NavBar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export const Statistics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("12month"); // Default timeframe

  // Chart colors
  const colors = {
    safe: "#3672e9",
    warning: "#e9a836",
    dangerous: "#e93636",
    safeLight: "rgba(54, 114, 233, 0.6)",
    warningLight: "rgba(233, 168, 54, 0.6)",
    dangerousLight: "rgba(233, 54, 54, 0.6)",
    background: "#2a2a2a",
  };

  // Time periods (for x-axis)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Bar Chart Options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
  };

  // Pie Chart Options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
  };

  // Bar Chart Data - Website Reputation Over Time
  const reputationData = {
    labels: months,
    datasets: [
      {
        label: "Safe",
        data: [65, 85, 40, 50, 75, 45, 60, 30, 70, 50, 80, 60],
        backgroundColor: colors.safe,
      },
      {
        label: "Warning",
        data: [25, 15, 50, 30, 10, 20, 15, 40, 25, 35, 10, 25],
        backgroundColor: colors.warning,
      },
      {
        label: "Dangerous",
        data: [10, 0, 10, 20, 15, 35, 25, 30, 5, 15, 10, 15],
        backgroundColor: colors.dangerous,
      },
    ],
  };

  // Pie Chart Data - Monthly Sentiment Analysis
  const sentimentData = {
    labels: ["Safe", "Warning", "Dangerous"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: [
          colors.safeLight,
          colors.warningLight,
          colors.dangerousLight,
        ],
        borderColor: [colors.safe, colors.warning, colors.dangerous],
        borderWidth: 1,
      },
    ],
  };

  // Handle timeframe selection
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // In a real app, you would fetch new data based on the timeframe
  };

  return (
    <>
      <Navbar activeTab="statistics" />
      <div className="statistics-page">
        <div className="statistics-header">
          <h1>Statistics</h1>
        </div>
        <div className="statistics-content">
          <div className="statistics__cards">
            {/* Website Reputation Over Time Card */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Website Reputation Over Time</h2>
                <button className="filter-button">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter
                </button>
              </div>

              <div className="timeframe-selector">
                <button
                  className={`timeframe-button ${
                    timeframe === "12month" ? "active" : ""
                  }`}
                  onClick={() => handleTimeframeChange("12month")}
                >
                  12 month
                </button>
                <button
                  className={`timeframe-button ${
                    timeframe === "30days" ? "active" : ""
                  }`}
                  onClick={() => handleTimeframeChange("30days")}
                >
                  30 days
                </button>
              </div>

              <div className="chart-container">
                <Bar data={reputationData} options={barOptions} />
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="color-indicator safe"></div>
                  Safe
                </div>
                <div className="legend-item">
                  <div className="color-indicator warning"></div>
                  Warning
                </div>
                <div className="legend-item">
                  <div className="color-indicator dangerous"></div>
                  Dangerous
                </div>
              </div>
            </div>

            {/* Monthly Sentiment Analysis Card */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Monthly Sentiment Analysis</h2>
                <button className="filter-button">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter
                </button>
              </div>

              <div className="timeframe-selector">
                <button
                  className={`timeframe-button ${
                    timeframe === "12month" ? "active" : ""
                  }`}
                  onClick={() => handleTimeframeChange("12month")}
                >
                  12 month
                </button>
                <button
                  className={`timeframe-button ${
                    timeframe === "30days" ? "active" : ""
                  }`}
                  onClick={() => handleTimeframeChange("30days")}
                >
                  30 days
                </button>
              </div>

              <div className="chart-container">
                <Pie data={sentimentData} options={pieOptions} />
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="color-indicator safe"></div>
                  Safe
                </div>
                <div className="legend-item">
                  <div className="color-indicator dangerous"></div>
                  Dangerous
                </div>
                <div className="legend-item">
                  <div className="color-indicator warning"></div>
                  Warning
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
