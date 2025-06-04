import React, { useEffect, useState } from 'react'
import { scanDomain } from '../../../services/ScanningService';
import { getCurrentTabUrl } from '../../../services/utils';
import './Scan.scss';
import "@theme-toggles/react/css/Classic.css"
import { get_history_tab } from '../../../services/navigation';


const ScanResults: React.FC = () => {
  const [domainInfo, setDomainInfo] = useState<any>(undefined);
  const isDangerous = parseInt(domainInfo?.detectionCounts.split('/')[0], 10) > 0;

  // const scan = () => {
  //   getCurrentTabUrl()
  //     .then((url) => {
  //       scanDomain(url).then((domainInfo) => {
  //         console.log(domainInfo);
  //         setDomainInfo(domainInfo);
  //       });
  //     })
  //     .catch((err) => console.error('Failed to scan the domain:', err));
  // };

  useEffect(() => {
    getCurrentTabUrl()
      .then((url) => {
        scanDomain(url).then((domainInfo) => {
          console.log(domainInfo);
          setDomainInfo(domainInfo);
        });
      })
      .catch((err) => console.error('Failed to scan the domain:', err));
  }, [])

  return (
    <div className={`scan-result-card`}>
      {/* <div className="scan-header">
        <ThemeToggle />
        <button className="close-btn" onClick={() => chrome.windows.getCurrent().then(() => close())}>✕</button>
      </div> */}
      {/* <div className="scan-title">Scan Results Overview</div> */}

      <div className="scan-header">
        <div className="scan-title">Result Overview</div>
        {/* <ThemeToggle className='small-theme-toggle'/> */}
        <button className="close-btn" onClick={() => chrome.windows.getCurrent().then(() => close())}>✕</button>
      </div>

      <div className={`scan-status ${isDangerous ? '__danger' : '__safe'}`}>
        {isDangerous ? '✗ Dangerous' : '✓ Safe'}
      </div>


      <div className="scan-details">
        <div className="scan-details-label">Website Address:</div>
        <div className="scan-details-value">{domainInfo?.websiteAddress}</div>

        <div className="scan-details-label">Detection Counts:</div>
        <div className="scan-details-value">
          <div className={`detection-count ${isDangerous ? '__danger' : '__safe'}`}>
            {domainInfo?.detectionCounts}
          </div>
        </div>

        <div className="scan-details-label">Last Analysis Date:</div>
        <div className="scan-details-value">{domainInfo?.lastAnalysis}</div>

        <div className="scan-details-label">Domain Registration:</div>
        <div className="scan-details-value">{domainInfo?.domainRegistration}</div>

        <div className="scan-details-label">Server Location:</div>
        <div className="scan-details-value">{domainInfo?.serverLocation}</div>

        <div className="scan-details-label">City:</div>
        <div className="scan-details-value">{domainInfo?.city}</div>
      </div>

      {/* <div className="scan-button"> */}
        <button onClick={() => get_history_tab(false)} className={`scan-button`}>
          View more details
        </button>
      {/* </div> */}
    </div>
  );
};

export default ScanResults