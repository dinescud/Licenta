// src/pages/Statistics/Statistics.tsx

import React, { useEffect, useState } from "react";
import { Bar, Pie, Radar } from "react-chartjs-2";
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
  RadialLinearScale,
} from "chart.js";
import "./Statistics.scss";
import Navbar from "../../../components/navbar/NavBar";
import {
  getDomainAge,
  getMostScanned,
  getStatusStatistics,
  getTopCountries,
  getTotalScanned,
} from "../../../services/StatisticsService";
import { barOptions, horizontalBarOptions, pieOptions, radarOptions } from "./statsConfig";
import { DomainAgeStatistics, ScanStatusStatistics } from "../../../types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export const Statistics: React.FC = () => {
  //
  // ────────────────────────────────────────────────────────────────────
  //   1) PER-CHART state: timeframe, data, loading, error
  // ────────────────────────────────────────────────────────────────────
  //
  // CARD #1 “Top Countries”
  const [topCountriesTimeFrame, setTopCountriesTimeFrame] = useState<string>("7days");
  const [topCountries, setTopCountries] = useState<Record<string, number> | null>(null);
  const [topCountriesLoading, setTopCountriesLoading] = useState<boolean>(true);
  const [topCountriesError, setTopCountriesError] = useState<string | null>(null);

  // CARD #2 “Domain Age Distribution”
  const [domainAgeTimeFrame, setDomainAgeTimeFrame] = useState<string>("7days");
  const [domainAge, setDomainAge] = useState<DomainAgeStatistics | null>(null);
  const [domainAgeLoading, setDomainAgeLoading] = useState<boolean>(true);
  const [domainAgeError, setDomainAgeError] = useState<string | null>(null);

  // CARD #3 “Scan Status Distribution”
  const [scanStatusTimeFrame, setScanStatusTimeFrame] = useState<string>("7days");
  const [scanStatus, setScanStatus] = useState<ScanStatusStatistics | null>(null);
  const [scanStatusLoading, setScanStatusLoading] = useState<boolean>(true);
  const [scanStatusError, setScanStatusError] = useState<string | null>(null);

  // CARD #4 “Most Scanned Domains”
  const [mostScannedTimeFrame, setMostScannedTimeFrame] = useState<string>("7days");
  const [mostScanned, setMostScanned] = useState<Record<string, number> | null>(null);
  const [mostScannedLoading, setMostScannedLoading] = useState<boolean>(true);
  const [mostScannedError, setMostScannedError] = useState<string | null>(null);

  // CARD #5 “Total Scans”
  //  (no UI selector, but we fetch once on mount using a default timeframe)
  const [totalScannedTimeFrame, setTotalScannedTimeFrame] = useState<string>("7days");
  const [totalScanned, setTotalScanned] = useState<number | null>(null);
  const [totalScannedLoading, setTotalScannedLoading] = useState<boolean>(true);
  const [totalScannedError, setTotalScannedError] = useState<string | null>(null);

  //
  // ────────────────────────────────────────────────────────────────────
  //   2) useEffect for “Top Countries”
  // ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setTopCountriesLoading(true);
    setTopCountriesError(null);

    getTopCountries(topCountriesTimeFrame)
      .then((data) => {
        setTopCountries(data);
      })
      .catch((err) => {
        setTopCountriesError(err.message || "Failed to load top countries.");
      })
      .finally(() => {
        setTopCountriesLoading(false);
      });
  }, [topCountriesTimeFrame]);

  //
  // ────────────────────────────────────────────────────────────────────
  //   3) useEffect for “Domain Age Distribution”
  // ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setDomainAgeLoading(true);
    setDomainAgeError(null);

    getDomainAge(domainAgeTimeFrame)
      .then((data) => {
        setDomainAge(data);
      })
      .catch((err) => {
        setDomainAgeError(err.message || "Failed to load domain age.");
      })
      .finally(() => {
        setDomainAgeLoading(false);
      });
  }, [domainAgeTimeFrame]);

  //
  // ────────────────────────────────────────────────────────────────────
  //   4) useEffect for “Scan Status Distribution”
  // ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setScanStatusLoading(true);
    setScanStatusError(null);

    getStatusStatistics(scanStatusTimeFrame)
      .then((data) => {
        setScanStatus(data);
      })
      .catch((err) => {
        setScanStatusError(err.message || "Failed to load scan status.");
      })
      .finally(() => {
        setScanStatusLoading(false);
      });
  }, [scanStatusTimeFrame]);

  //
  // ────────────────────────────────────────────────────────────────────
  //   5) useEffect for “Most Scanned Domains”
  // ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setMostScannedLoading(true);
    setMostScannedError(null);

    getMostScanned(mostScannedTimeFrame)
      .then((data) => {
        setMostScanned(data);
      })
      .catch((err) => {
        setMostScannedError(err.message || "Failed to load most scanned.");
      })
      .finally(() => {
        setMostScannedLoading(false);
      });
  }, [mostScannedTimeFrame]);

  //
  // ────────────────────────────────────────────────────────────────────
  //   6) useEffect for “Total Scans”
  // ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setTotalScannedLoading(true);
    setTotalScannedError(null);

    getTotalScanned(totalScannedTimeFrame)
      .then((count) => {
        setTotalScanned(count);
      })
      .catch((err) => {
        setTotalScannedError(err.message || "Failed to load total scans.");
      })
      .finally(() => {
        setTotalScannedLoading(false);
      });
  }, [totalScannedTimeFrame]);

  //
  // ────────────────────────────────────────────────────────────────────
  //   7) BUILD Chart.js “data” OBJECTS
  // ────────────────────────────────────────────────────────────────────

  // 7.1) Top Countries (Bar chart)
  const topCountriesLabels: string[] = topCountries ? Object.keys(topCountries) : [];
  const topCountriesValues: number[] = topCountries ? Object.values(topCountries) : [];
  const topCountriesData =
    topCountries !== null
      ? {
          labels: topCountriesLabels,
          datasets: [
            {
              label: "Scans by Country",
              data: topCountriesValues,
              backgroundColor: ["rgba(75,192,192,0.6)"],
              borderColor: ["rgba(75,192,192,1)"],
              borderWidth: 1,
            },
          ],
        }
      : null;

  // 7.2) Domain Age Distribution (Radar chart)
  const domainAgeData =
    domainAge !== null
      ? {
          labels: ["< 1 Year", "1–5 Years", "5–10 Years", "> 10 Years"],
          datasets: [
            {
              label: "Domain Age (years)",
              data: [
                domainAge.lessThanOneYear,
                domainAge.oneToFiveYears,
                domainAge.fiveToTenYears,
                domainAge.moreThanTenYears,
              ],
              fill: true,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
              pointBorderColor: "#fff",
            },
          ],
        }
      : null;

  // 7.3) Scan Status (Doughnut chart)
  const scanStatusData =
    scanStatus !== null
      ? {
          labels: ["Safe", "Dangerous"],
          datasets: [
            {
              label: "Scan Status",
              data: [scanStatus.safe, scanStatus.dangerous],
              backgroundColor: ["#4caf50", "#f44336"],
            },
          ],
        }
      : null;

  // 7.4) Most Scanned Domains (Horizontal bar chart)
  const mostScannedLabels: string[] = mostScanned ? Object.keys(mostScanned) : [];
  const mostScannedValues: number[] = mostScanned ? Object.values(mostScanned) : [];
  const mostScannedData =
    mostScanned !== null
      ? {
          labels: mostScannedLabels,
          datasets: [
            {
              label: "Times Scanned",
              data: mostScannedValues,
              backgroundColor: ["rgba(153, 102, 255, 0.6)"],
              borderColor: ["rgba(153, 102, 255, 1)"],
              borderWidth: 1,
            },
          ],
        }
      : null;

  // 7.5) Total Scans (Simple large number)
  const totalScannedData = totalScanned !== null ? totalScanned : 0;

  return (
    <>
      <Navbar activeTab="statistics" />
      <div className="statistics-page">
        <div className="statistics-header">
          <h1>Statistics</h1>
        </div>
        <div className="statistics-content">
          <div className="statistics__cards">
            {/* ─────────────────────────────────────────────────────
               CARD #1: “Top Countries” (Bar Chart)
            ───────────────────────────────────────────────────── */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Top 5 Server Locations</h2>
              </div>

              <div className="timeFrame-selector">
                <button
                  className={`timeFrame-button ${
                    topCountriesTimeFrame === "7days" ? "active" : ""
                  }`}
                  onClick={() => setTopCountriesTimeFrame("7days")}
                >
                  7 days
                </button>
                <button
                  className={`timeFrame-button ${
                    topCountriesTimeFrame === "14days" ? "active" : ""
                  }`}
                  onClick={() => setTopCountriesTimeFrame("14days")}
                >
                  14 days
                </button>
                <button
                  className={`timeFrame-button ${
                    topCountriesTimeFrame === "30days" ? "active" : ""
                  }`}
                  onClick={() => setTopCountriesTimeFrame("30days")}
                >
                  30 days
                </button>
                <button
                  className={`timeFrame-button ${
                    topCountriesTimeFrame === "12months" ? "active" : ""
                  }`}
                  onClick={() => setTopCountriesTimeFrame("12months")}
                >
                  12 months
                </button>
              </div>

              <div className="chart-container">
                {topCountriesLoading ? (
                  <p>Loading…</p>
                ) : topCountriesError ? (
                  <p className="error">Error: {topCountriesError}</p>
                ) : topCountriesData ? (
                  <Bar data={topCountriesData} options={barOptions} />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────
               CARD #2: “Domain Age Distribution” (Radar Chart)
            ───────────────────────────────────────────────────── */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Domain Age Distribution</h2>
              </div>

              <div className="timeFrame-selector">
                <button
                  className={`timeFrame-button ${
                    domainAgeTimeFrame === "7days" ? "active" : ""
                  }`}
                  onClick={() => setDomainAgeTimeFrame("7days")}
                >
                  7 days
                </button>
                <button
                  className={`timeFrame-button ${
                    domainAgeTimeFrame === "14days" ? "active" : ""
                  }`}
                  onClick={() => setDomainAgeTimeFrame("14days")}
                >
                  14 days
                </button>
                <button
                  className={`timeFrame-button ${
                    domainAgeTimeFrame === "30days" ? "active" : ""
                  }`}
                  onClick={() => setDomainAgeTimeFrame("30days")}
                >
                  30 days
                </button>
                <button
                  className={`timeFrame-button ${
                    domainAgeTimeFrame === "12months" ? "active" : ""
                  }`}
                  onClick={() => setDomainAgeTimeFrame("12months")}
                >
                  12 months
                </button>
              </div>

              <div className="chart-container">
                {domainAgeLoading ? (
                  <p>Loading…</p>
                ) : domainAgeError ? (
                  <p className="error">Error: {domainAgeError}</p>
                ) : domainAgeData ? (
                  <Radar
                    data={domainAgeData}
                    options={radarOptions}
                  />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────
               CARD #3: “Scan Status Distribution” (Doughnut Chart)
            ───────────────────────────────────────────────────── */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Scan Status Distribution</h2>
              </div>

              <div className="timeFrame-selector">
               <button
                  className={`timeFrame-button ${
                    scanStatusTimeFrame === "7days" ? "active" : ""
                  }`}
                  onClick={() => setScanStatusTimeFrame("7days")}
                >
                  7 days
                </button>
                <button
                  className={`timeFrame-button ${
                    scanStatusTimeFrame === "14days" ? "active" : ""
                  }`}
                  onClick={() => setScanStatusTimeFrame("14days")}
                >
                  14 days
                </button>
                <button
                  className={`timeFrame-button ${
                    scanStatusTimeFrame === "30days" ? "active" : ""
                  }`}
                  onClick={() => setScanStatusTimeFrame("30days")}
                >
                  30 days
                </button>
                <button
                  className={`timeFrame-button ${
                    scanStatusTimeFrame === "12months" ? "active" : ""
                  }`}
                  onClick={() => setScanStatusTimeFrame("12months")}
                >
                  12 months
                </button>
              </div>

              <div className="chart-container">
                {scanStatusLoading ? (
                  <p>Loading…</p>
                ) : scanStatusError ? (
                  <p className="error">Error: {scanStatusError}</p>
                ) : scanStatusData ? (
                  <Pie data={scanStatusData} options={pieOptions} />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────
               CARD #4: “Most Scanned Domains” (Horizontal Bar Chart)
            ───────────────────────────────────────────────────── */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Most Scanned Domains</h2>
              </div>

              <div className="timeFrame-selector">
                <button
                  className={`timeFrame-button ${
                    mostScannedTimeFrame === "7days" ? "active" : ""
                  }`}
                  onClick={() => setMostScannedTimeFrame("7days")}
                >
                  7 days
                </button>
                <button
                  className={`timeFrame-button ${
                    mostScannedTimeFrame === "14days" ? "active" : ""
                  }`}
                  onClick={() => setMostScannedTimeFrame("14days")}
                >
                  14 days
                </button>
                <button
                  className={`timeFrame-button ${
                    mostScannedTimeFrame === "30days" ? "active" : ""
                  }`}
                  onClick={() => setMostScannedTimeFrame("30days")}
                >
                  30 days
                </button>
                <button
                  className={`timeFrame-button ${
                    mostScannedTimeFrame === "12months" ? "active" : ""
                  }`}
                  onClick={() => setMostScannedTimeFrame("12months")}
                >
                  12 months
                </button>
              </div>

              <div className="chart-container">
                {mostScannedLoading ? (
                  <p>Loading…</p>
                ) : mostScannedError ? (
                  <p className="error">Error: {mostScannedError}</p>
                ) : mostScannedData ? (
                  <Bar data={mostScannedData} options={horizontalBarOptions} />
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────
               CARD #5: “Total Scans” (Simple Large Number)
            ───────────────────────────────────────────────────── */}
            <div className="statistics__card">
              <div className="card-header">
                <h2>Total Scans</h2>
              </div>

              <div className="timeFrame-selector">
                <button
                  className={`timeFrame-button ${
                    totalScannedTimeFrame === "7days" ? "active" : ""
                  }`}
                  onClick={() => setTotalScannedTimeFrame("7days")}
                >
                  7 days
                </button>
                <button
                  className={`timeFrame-button ${
                    totalScannedTimeFrame === "14days" ? "active" : ""
                  }`}
                  onClick={() => setTotalScannedTimeFrame("14days")}
                >
                  14 days
                </button>
                <button
                  className={`timeFrame-button ${
                    totalScannedTimeFrame === "30days" ? "active" : ""
                  }`}
                  onClick={() => setTotalScannedTimeFrame("30days")}
                >
                  30 days
                </button>
                <button
                  className={`timeFrame-button ${
                    totalScannedTimeFrame === "12months" ? "active" : ""
                  }`}
                  onClick={() => setTotalScannedTimeFrame("12months")}
                >
                  12 months
                </button>
              </div>

              <div className="chart-container total-scans-container">
                {totalScannedLoading ? (
                  <p>Loading…</p>
                ) : totalScannedError ? (
                  <p className="error">Error: {totalScannedError}</p>
                ) : totalScanned !== null ? (
                  <h3 className="total-scans-number">
                    {totalScannedData.toLocaleString()}
                  </h3>
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
