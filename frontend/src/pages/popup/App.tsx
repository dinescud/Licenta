import React, { useEffect } from "react";
import './App.css';
// import LoadingScreen from "../../components/LoadingScreen";
// import { Auth } from "../auth/Auth";

// interface ScrapedData {
//   websiteAddress: string;
//   lastAnalysis: string;
//   detectionCounts: string;
//   domainRegistration: string;
//   ipAddress: string;
//   serverLocation: string;
//   city: string;
// }

const App: React.FC = () => {
  // const [data, setData] = useState<ScrapedData | null>(null); 
  // const [isDangerous, setIsDangerous] = useState<boolean>(false);
  // const [userInfo, setUserInfo] = useState<string | null>(null);              

  useEffect(() => {
    // Auth()
    //   .then((info) => {
    //     setUserInfo(info);
    //     console.log("Fetched User Info:", info);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to fetch user info:", error);
    //   });

    // fetch('http://localhost:3000', {
    //   mode: 'cors',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*"
    //   },
    // })
    //   .then((response) => 
    //     response.json()) 
    //   .then((json) => {
    //     // setData(json);
    //     setData
    //     const detectionCount = json.detectionCounts.split("/")[0];
    //     setIsDangerous(parseInt(detectionCount) > 5);
    //   }) 
    //   .catch((error) => 
    //     console.error("Error fetching data:", error));
  }, []);

  return (
    // <div className={`popup-container ${isDangerous ? "popup-container-danger" : "popup-container-safe"}`}>

    <div className="popup-container">
      {/* <h1 className="popup-title">USER {userInfo}</h1> */}
      <h1 className="popup-title">Scan Results</h1>

      {/* {data ? ( */}
      <div className="data-container">
        <div className="data-item">
          <div className="label">Website Address:</div>
          <div className="value"> Wizzair.com </div>
        </div>
        <div className="data-item">
          <div className="label">Last Analysis:</div>
          <div className="value">11 days ago</div>
        </div>
        <div className="data-item">
          <div className="label">Detection Counts:</div>
          {/* <div className={`detection-count ${isDangerous ? "danger" : "safe"}`}>0/39</div> */}
          <div className={`detection-count __safe`}>0/39</div>

        </div>
        <div className="data-item">
          <div className="label">Domain Registration:</div>
          <div className="value">2003-08-05</div>
        </div>
        <div className="data-item">
          <div className="label">IP Address:</div>
          <div className="value">23.52.85.149</div>
        </div>
        <div className="data-item">
          <div className="label">Server Location:</div>
          <div className="value">SE/Sweden</div>
        </div>
        <div className="data-item">
          <div className="label">City:</div>
          <div className="value">Stockholm</div>
        </div>
      </div>
      {/* ) : (  */}
      {/* <div className="loading">
          <LoadingScreen></LoadingScreen>
        </div> */}
      {/* )} */}
    </div>
  );

};

export default App;


