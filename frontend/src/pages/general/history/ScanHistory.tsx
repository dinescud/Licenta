import React, { useEffect, useState } from "react";
import HistoryCard from "../../../components/history-card/HistoryCard";
import { POST_REQUEST } from "../../../services/requests";
import { HistoryType } from "../../../types";
import { getProfile } from "../../auth/Auth";
import "./ScanHistory.scss";

export const ScanHistory: React.FC = () => {
  const [userHistory, setHistory] = useState<HistoryType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = await getProfile(); // Replace with the actual user ID (e.g., from context or props)
        console.log('userrrrrrr', )
        const response = await POST_REQUEST("/history/getHistory", {userId}); // Send user ID in the request body
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          setError("Failed to fetch scan history.");
        }
      } catch (err) {
        setError("An error occurred while fetching scan history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="scan-history">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Scan History</h1>
      </div>
      <div className="scan-history__list">
        {userHistory?.history.map((item, index) => (
          <HistoryCard
            key={index}
            domain={item.info.websiteAddress}
            score={item.info.detectionCounts}
            date={new Date(item.scannedAt)} // Convert string to Date object
          />
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;