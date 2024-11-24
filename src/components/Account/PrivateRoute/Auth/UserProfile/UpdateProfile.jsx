import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthContext ";

const UpdateProfile = () => {
  const { isAuthenticated, setRedirectUrl, currentUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    profile_url: currentUser?.photoURL || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectUrl("/UpdateProfile");
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate, setRedirectUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (
        formData.name !== user.displayName ||
        formData.profile_url !== user.photoURL
      ) {
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.profile_url,
        });
      }

      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      if (formData.password) {
        await updatePassword(user, formData.password);
      }

      toast.success("Profile updated successfully!");

      setTimeout(() => navigate("/Dashboard"), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);

      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-10 my-auto dark:bg-gray-900 font-barlowSemi">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Update Profile
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="name" className="mb-2 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="email" className="dark:text-gray-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <label htmlFor="profile_url" className="dark:text-gray-300">
                  Profile URL
                </label>
                <input
                  name="profile_url"
                  type="url"
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Profile URL"
                  value={formData.profile_url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="password" className="dark:text-gray-300">
                  New Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-center text-white bg-blue-700 rounded-md"
                  disabled={loading}
                >
                  <span className="btn bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite">
                    {loading ? "Updating..." : "Update Profile"}
                  </span>
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
