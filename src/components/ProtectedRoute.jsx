import React from 'react'
import { useNavigate, Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({user={}, redirectTo='/boas-vindas', children}) {
    if (false) {
        return <Navigate to={redirectTo} replace />
      }
    
      return children ? children : <Outlet />;

}

export default ProtectedRoute