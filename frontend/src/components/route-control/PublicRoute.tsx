// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { config } from '../../config/config';

// const PublicRoute: React.FC = () => {
//   const { auth, loading } = useAuth();

//   if(loading === true) {
//     return <div>Loading...</div>
//   }
  
//   return !auth.user ? <Outlet /> : <Navigate to={config.routes.baseRoute} />;
// }

// export default PublicRoute;