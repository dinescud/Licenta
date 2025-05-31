  // Chart colors
  export const colors = {
    safe: "#3672e9",
    warning: "#e9a836",
    dangerous: "#e93636",
    safeLight: "rgba(54, 114, 233, 0.6)",
    dangerousLight: "rgba(233, 54, 54, 0.6)",
    background: "#2a2a2a",
  };

  // Time periods (for x-axis)
  export const months = [
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
  export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          display: false,
          // color: "rgba(197, 19, 19, 0.6)",
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
        display: true,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
  };

  // Pie Chart Options
  export const pieOptions = {
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

  // Horizontal Bar Chart Options
  export const horizontalBarOptions = {
    ...barOptions,
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };