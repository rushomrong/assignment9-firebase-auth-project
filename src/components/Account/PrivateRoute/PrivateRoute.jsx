import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../../Firebase/firebase.init";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  console.log(user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
