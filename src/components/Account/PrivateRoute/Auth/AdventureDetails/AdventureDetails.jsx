import React, { useContext, useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext ";

const AdventureDetails = () => {
  const { adventureId } = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setRedirectUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      setRedirectUrl(`/AdventureDetails/${adventureId}`);
      navigate("/login");
      return;
    }

    const fetchAdventureDetails = async () => {
      try {
        const response = await fetch(`/adventure-data.json`);
        const data = await response.json();
        console.log("Fetched adventure data:", data);

        const selectedAdventure = data.find(
          (item) => item.id === parseInt(adventureId, 10)
        );

        if (selectedAdventure) {
          console.log("Selected adventure:", selectedAdventure);
          setAdventure(selectedAdventure);
        } else {
          console.error("Adventure not found");
        }
      } catch (error) {
        console.error("Error fetching adventure data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventureDetails();
  }, [adventureId, isAuthenticated, navigate, setRedirectUrl]);

  const handleTalkWithExpert = () => {
    navigate("/TalkWithExpert");
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center mt-14 font-barlowSemi">
        <p className="text-center font-barlowSemi font-bold text-2xl">
          Loading adventure details...
        </p>
      </div>
    );
  }

  // If adventure is not found
  if (!adventure) {
    return (
      <div className="max-w-6xl mx-auto text-center mt-14 font-barlowSemi">
        <p className="text-center font-barlowSemi font-bold text-2xl">
          Adventure not found. Please check the URL or try again later.
        </p>
        <Link
          to="/"
          className="text-center font-barlowSemi text-primaryYellowBtn mt-6 text-2xl"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 font-barlowSemi">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-1">
            <div className="h-[300px] md:h-[400px] lg:h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={adventure.image}
                alt={adventure.adventureTitle}
              />
            </div>
            <button className="w-full bg-gray-900 text-white py-2 px-4 mt-4 rounded-xl font-bold  bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite">
              Book Now
            </button>
            <div className="flex items-center justify-center">
              <button
                onClick={handleTalkWithExpert}
                className="btn w-full bg-gray-900 text-white py-2 px-4 mt-4 rounded-xl font-bold bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite"
              >
                <span className="w-8 h-8 flex items-center">
                  <BiSupport />
                </span>
                Talk With Expert
              </button>
            </div>
          </div>

          <div className="lg:flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {adventure.adventureTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              {adventure.shortDescription}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Location:</strong> {adventure.location}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Cost:</strong> ${adventure.adventureCost}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Duration:</strong> {adventure.duration}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Level:</strong> {adventure.adventureLevel}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Max Group:</strong> {adventure.maxGroupSize}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Booking Availability:</strong>{" "}
              <span
                className={
                  adventure.bookingAvailability
                    ? "text-btnHoverColor"
                    : "text-[red]"
                }
              >
                {adventure.bookingAvailability ? "Available" : "Not Available"}
              </span>
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              <strong>Friendly Features:</strong>{" "}
              <ul className="list-disc list-inside space-y-1 mt-2">
                {adventure.ecoFriendlyFeatures.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-600 text-sm md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </p>
            <div className="mt-4">
              <strong>Included:</strong>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {adventure.includedItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-600 text-sm md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureDetails;
