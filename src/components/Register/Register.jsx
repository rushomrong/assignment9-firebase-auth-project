import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../../Firebase/firebase.init";
import "/src/App.css";
import googleIcon from "/src/assets/Google.png";
import spinnerIcn from "/src/assets/spinner.gif";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const name = event.target.name.value;
    const profile_url = event.target.profile_url.value;
    const password = event.target.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    // Validate email
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profile_url,
      });

      toast.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(`Error during registration: ${error.message}`);
    } finally {
      setLoading(false);
      r;
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success("Google user registered successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(`Error during Google registration: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto font-barlowSemi">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <VscAccount className="w-9 h-9 mx-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {loading && (
            <div className="spinner-overlay">
              <img src={spinnerIcn} alt="Loading..." className="spinner" />
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile_url"
                className="block text-sm font-medium text-gray-900"
              >
                Profile Link
              </label>
              <div className="mt-2">
                <input
                  id="profile_url"
                  name="profile_url"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <span
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primaryYellowBtn px-3 py-1.5 text-sm font-semibold text-textWhite shadow-sm hover:bg-btnHoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                Register
              </button>
              <div className="divider">or</div>
              <button
                type="button"
                onClick={handleGoogleRegister}
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold hover:text-primaryYellowBtn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                <img
                  className="w-6 h-6 gap-3"
                  src={googleIcon}
                  alt="google login"
                />
                Create with google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/Login"
              className="font-semibold text-indigo-600 hover:text-primaryYellowBtn"
            >
              Login
            </Link>
          </p>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </section>
  );
};

export default Register;
