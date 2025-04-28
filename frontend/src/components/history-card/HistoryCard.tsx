import React from "react";
import { POST_REQUEST } from "../../services/requests";
import "./HistoryCard.scss";
import { getProfile } from "../../pages/auth/Auth";

interface HistoryCardProps {
  domain: string;
  score: string;
  date: Date;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ domain, score, date }) => {
  const rescan = async () => {
    try {
      const userId = await getProfile();
      const response = await POST_REQUEST('/domain/scan', { url: domain, externalId: userId});
      if (response.ok) {
        const result = await response.json();
        console.log("Rescan successful:", result);
        // Optionally update the UI with the new scan result
      } else {
        console.error("Rescan failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during rescan:", error);
    }
  };

  // const viewDetails = () => {
    // Implement view details logic here
  // };

  const isDangerous = parseInt(score.split('/')[0], 10) > 0;
  // Format the date as DD/MM/YYYY HH:mm
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  }).format(date);

  return (
    <div className="history-card">
      <div className="history-card-header">{domain}</div>
      <div className="history-card__url">URL: {domain}</div>
      <div className="history-card__score">
        Detection Counts: <span className={isDangerous ? 'dangerous' : 'safe'}>{score}</span> | Scan Date: {formattedDate}
      </div>
      <button onClick={rescan} className={`history-card__rescan-button ${isDangerous ? 'dangerous' : 'safe'}`}>
        Re-scan
      </button>
    </div>
  );
};

export default HistoryCard;