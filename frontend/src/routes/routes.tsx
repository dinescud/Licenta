import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import ProtectedRoute from '../components/route-control/ProtectedRoute';
// import Login from '../pages/auth/Login';
// import Signup from '../pages/auth/Signup';
// import PublicRoute from '../components/route-control/PublicRoute';
import { config } from '../config/config';
import ScanResults from '../pages/general/popup/Scan';
import ScanHistory from '../pages/general/history/ScanHistory';
import { Statistics } from '../pages/general/statistics/Statistics';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Popup route (default route) */}
      <Route path="/" element={<ScanResults />} />

      {/* Main extension pages */}
      <Route path="chrome-extension://higcidipappbkkmhehmaelnbnmcefoia/index.html#/scanHistory" element={<ScanHistory />} />
      <Route path="/statistics" element={<Statistics />} />

      {/* Auth routes */}
      <Route path={config.routes.authBaseRoute} >
        {/* <Route path={config.routes.loginRoute} element={<Login />} /> */}
        {/* <Route path={config.routes.registerRoute} element={<Signup />} /> */}
      </Route>

      {/* Fallback - redirect to popup */}
      {/* <Route path="*" element={<ScanResults />} /> */}
    </Routes>
  )
}

export default AppRoutes;