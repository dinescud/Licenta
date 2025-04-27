
import React, { useEffect, useState } from 'react'
import { scanDomain } from '../../../services/ScanningService';
// import { useAuth } from '../../../contexts/AuthContext';
import { getCurrentTabUrl } from '../../../services/utils';
import './Scan.scss';
import "@theme-toggles/react/css/Classic.css"
import { ThemeToggle } from '../../../components/ThemeToggle/ThemeToggleButton';
// import { config } from '../../../config/config';
import { get_history_tab, get_statistics_tab } from '../../../services/navigation';


const ScanResults: React.FC = () => {
  const [domainInfo, setDomainInfo] = useState<any>(undefined);
  const isDangerous = parseInt(domainInfo?.detectionCounts.split('/')[0], 10) > 0;
  // const auth = useAuth();

  const scan = () => {
    getCurrentTabUrl()
      .then((url) => {
        scanDomain(url).then((domainInfo) => {
          console.log(domainInfo);
          setDomainInfo(domainInfo);
        });
      })
      .catch((err) => console.error('Failed to scan the domain:', err));
  };

  // const openPage = (_path: string) => {
  //   const url = "chrome-extension://" + chrome.runtime.id + "/index.html#" + _path;
  //   chrome.tabs.create({ url: url });
  //   // return navigate(_path)
  // };

  useEffect(() => {
    // console.log(auth)
    scan();
  }, [])

  return (
    <div className={`scan-result-card ${isDangerous ? '__danger' : '__safe'}`}>
      <div className="scan-header">
        <ThemeToggle />
        <button className="close-btn" onClick={() => chrome.windows.getCurrent().then(() => close())}>✕</button>
      </div>

      <div className="scan-title">Scan Results Overview</div>

      <div className="scan-details">
        <div className='scan-details-label'>Website Address:</div>
        <div className='scan-details-value'>{domainInfo?.websiteAddress}</div>

        <div className='scan-details-label'>Detection Counts:</div>
        <div className='scan-details-value'>
          <div className={`detection-count ${isDangerous ? '__danger' : '__safe'}`}>
          {domainInfo?.detectionCounts}
          </div>
        </div>

        <div className='scan-details-label'>Last Analysis Date:</div>
        <div className='scan-details-value'>{domainInfo?.lastAnalysis}</div>

        <div className='scan-details-label'>Domain Registration:</div> 
        <div className='scan-details-value'>{domainInfo?.domainRegistration}</div>

        <div className='scan-details-label'>Server Location:</div> 
        <div className='scan-details-value'>{domainInfo?.serverLocation}</div>

        <div className='scan-details-label'>City:</div> 
        <div className='scan-details-value'>{domainInfo?.city}</div>
      </div>

      <div className="scan-buttons">
        <button className={`scan-button ${isDangerous ? '' : '__safe'}`}>Scan History</button>
        <button className={`scan-button ${isDangerous ? '' : '__safe'}`}>Statistics</button>
      </div>

      <div className="actions">
        <button onClick={() => get_history_tab()}>Scan History</button>
        <button onClick={() => get_statistics_tab()}>Statistics</button>
      </div>     

    </div>
  );
};

export default ScanResults