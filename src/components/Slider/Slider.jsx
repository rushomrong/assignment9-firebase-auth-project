import React from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Slider images
import slider_1 from "/src/assets/Slider1.jpg";
import slider_2 from "/src/assets/Slider2.jpg";
import slider_3 from "/src/assets/Slider3.jpg";
import slider_4 from "/src/assets/Slider4.jpg";

const Slider = () => {
  const slides = [
    {
      title: "Coral Reef Diving Adventure",
      description:
        "Dive into vibrant coral reefs and explore marine biodiversity.",
      image: slider_1,
    },
    {
      title: "Kayaking Through Fjords",
      description:
        "Paddle through serene fjords and enjoy breathtaking scenery.",
      image: slider_2,
    },
    {
      title: "Glacier Hiking Expedition",
      description: "Traverse stunning glaciers with professional mountaineers.",
      image: slider_3,
    },
    {
      title: "Arctic Wildlife Safari",
      description:
        "Witness polar bears and arctic foxes in their natural habitat.",
      image: slider_4,
    },
  ];

  return (
    <section className="bg-navBanner py-10 relative bg-black">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative w-full">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          effect="coverflow"
          loop={true}
          centeredSlides={true}
          slidesPerView={1.5}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="relative overflow-hidden shadow-lg rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[400px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>

                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>

                <div className="absolute bottom-0 left-0 right-0 text-white p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-lg font-bold text-textWhite">
                    {slide.title}
                  </h3>
                  <p className="text-sm line-clamp-2 text-subTextColor">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
