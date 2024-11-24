import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../../Firebase/firebase.init";
import { AuthContext } from "../AuthContext ";

const UserProfile = () => {
  const { isAuthenticated, setRedirectUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl(`/UserProfile`);
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate, setRedirectUrl]);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.displayName || "User Name",
        email: user.email,
        profilePic: user.photoURL || "https://via.placeholder.com/150",
      });
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto font-barlowSemi">
      <div className="bg-white border border-subTextColor rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-12">
        <div className="flex flex-col items-center p-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userData.profilePic}
            alt={`${userData.name} profile`}
          />
          <h2 className="text-xl font-medium">Welcome!</h2>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <Link
              to="/UpdateProfile"
              state={userData}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite"
            >
              Update Profile
            </Link>

            {/* <a
              href="#"
              onClick={() => auth.signOut()}
              className="inline-flex items-center px-4 py-2 ml-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
