import React from "react";
import { POST_REQUEST } from "../../services/requests";

interface HistoryCardProps {
  domain: string;
  score: string;
  date: Date;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ domain, score, date }) => {
  const rescan = async () => {
    try {
      const response = await POST_REQUEST('/scan', { url: domain });
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

  // const isDangerous = parseInt(score.split('/')[0], 10) > 0;

  return (
    <div className="history-card">
      <div className="history-card__domain">{domain}</div>
      <div className="history-card__score">{score}</div>
      <div className="history-card__date">{date.toLocaleDateString()}</div>
      <button onClick={rescan} className="history-card__rescan-button">
        Rescan
      </button>
    </div>
  );
};

export default HistoryCard;