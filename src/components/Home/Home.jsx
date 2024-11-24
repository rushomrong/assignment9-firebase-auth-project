import "animate.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentBottom from "../Extrapage/ContentBottom";
import Extra1 from "../Extrapage/Extra1";

const Home = () => {
  const [adventure, setAdventures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/adventure-data.json")
      .then((res) => res.json())
      .then((data) => setAdventures(data));
  });

  return (
    <>
      <div className=" bg-[#f2efeb] ">
        <div className="relative bg-topBefore bg-no-repeat bg-cover bg-center">
          <Extra1 />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 ">
          {adventure.map((adventure) => (
            <div
              key={adventure.id}
              className="p-4 bg-white rounded-lg shadow-md md:text-left text-center flex flex-col"
            >
              <div className="bg-gray-300 h-auto w-full rounded-md mb-4">
                <img
                  src={adventure.image}
                  alt={adventure.adventureTitle}
                  className="h-auto w-auto object-cover rounded-md"
                />
              </div>

              <div className="flex-grow">
                <h2 className="text-lg font-semibold">
                  {adventure.adventureTitle}
                </h2>
                <p className="text-gray-600 mt-3">
                  <strong>Friendly Features:&nbsp;</strong>
                  {adventure.ecoFriendlyFeatures}
                </p>
              </div>

              <button
                className="px-4 py-2 mt-4 font-semibold text-mainColor bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite rounded-full transition-colors duration-300"
                onClick={() => navigate(`/AdventureDetails/${adventure.id}`)}
              >
                Explore Now
              </button>
            </div>
          ))}
        </div>
        <ContentBottom />
      </div>
    </>
  );
};

export default Home;
