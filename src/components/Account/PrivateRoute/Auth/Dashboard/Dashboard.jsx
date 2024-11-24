import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext ";
import UserProfile from "../UserProfile/UserProfile";

const Dashboard = () => {
  const { isAuthenticated, setRedirectUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bdTime, setBdTime] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl(`/Dashboard`);
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate, setRedirectUrl]);

  useEffect(() => {
    const updateBdTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setBdTime(formatter.format(now));
    };

    updateBdTime();
    const interval = setInterval(updateBdTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto font-barlowSemi">
      <h4 className="font-semibold text-2xl mt-5">Welcome to Dashboard</h4>
      <span className="font-semibold">{bdTime}</span>
      <UserProfile />
    </div>
  );
};

export default Dashboard;
