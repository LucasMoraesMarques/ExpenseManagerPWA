import React from 'react'
import { useNavigate, Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({user={}, redirectTo='/boas-vindas', children}) {
    if (Object.keys(user).length == 0) {
        return <Navigate to={redirectTo} replace />
      }
    
      return children ? children : <Outlet context={{user}}/>;
}
export default ProtectedRoute