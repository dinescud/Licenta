import React, { useEffect, useState } from "react";
import HistoryCard from "../../../components/history-card/HistoryCard";
import { HistoryType } from "../../../types";
import "./ScanHistory.scss";
import Navbar from "../../../components/navbar/NavBar";
import { fetchHistory } from "../../../services/HistoryService";

export const ScanHistory: React.FC = () => {
  const [userHistory, setHistory] = useState<HistoryType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchHistory()
      .then((history: HistoryType) => {
        setHistory(history);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch scan history.");
        console.error("Failed to scan the domain:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       const userId = await getProfile();
  //       const response = await POST_REQUEST("/history/getHistory", { userId });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setHistory(data);
  //       } else {
  //         setError("Failed to fetch scan history.");
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching scan history.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHistory();
  // }, []);

  const filteredHistory = userHistory?.history.filter((item) =>
    item.info.websiteAddress.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar activeTab="history" />
      <div className="history-page">
        <div className="history-header">
          <h1>Scan History</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="scan-history__list">
          {filteredHistory?.map((item, index) => (
            <HistoryCard
              key={index}
              domain={item.info.websiteAddress}
              score={item.info.detectionCounts}
              date={new Date(item.scannedAt)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ScanHistory;
