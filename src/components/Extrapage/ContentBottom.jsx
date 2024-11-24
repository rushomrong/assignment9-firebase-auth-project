import React from "react";

const ContentBottom = () => {
  return (
    <div className="bg-black ">
      <div className="bg-bottomBanner bg-cover bg-no-repeat bg-center">
        <div className="max-w-6xl mx-auto font-barlowSemi ">
          <div className="hero  h-[550px]">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold text-[#fff]">
                  Where Wildlife Stories Unfold.
                </h1>
                <p className="py-6 text-xl font-barlowSemi text-textWhite">
                  Ultrices quam mattis posuere porttitor tellus rhoncus
                  tristique. Primis aliquam dignissim interdum vel suscipit
                  sodales.
                </p>
                <button className="btn w-full bg-gray-900 text-white py-2 px-4 mt-4 rounded-xl font-bold bg-primaryYellowBtn text-textWhite hover:bg-btnHoverColor hover:text-textWhite">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBottom;
