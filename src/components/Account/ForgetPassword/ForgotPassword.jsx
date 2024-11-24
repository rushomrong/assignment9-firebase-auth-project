import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../Firebase/firebase.init";
import spinnerIcon from "/src/assets/spinner.gif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);

      toast.success(
        "Your data has been matched, and a reset link has been sent to your email."
      );
    } catch (error) {
      setLoading(false);

      if (error.code === "auth/user-not-found") {
        toast.error("No data found for this email address.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto font-barlowSemi">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <FaQuestion className="w-9 h-9 mx-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    loading
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor focus-visible:outline-indigo-600"
                  }`}
                >
                  {loading ? (
                    <img
                      src={spinnerIcon}
                      alt="Loading..."
                      className="h-6 w-6"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/Register"
                className="font-semibold text-indigo-600 hover:text-primaryYellowBtn"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default ForgotPassword;
