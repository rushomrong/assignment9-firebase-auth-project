/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: ["active"],
      backgroundImage: ["before"],
    },
    fontFamily: {
      barlowSemi: '"Barlow Semi Condensed", sans-serif',
    },
    colors: {
      primaryYellowBtn: "#fbb03b",
      btnHoverColor: "#85CF04",
      textHeadingColor: "#395902",
      subTextColor: "#F7F5F3",
      textWhite: "#FFF",
      black: "#000",
      footerBg: "#284001",
    },
    backgroundImage: {
      navBanner: "url('/src/assets/background.jpg')",
      mainContainerBg: "url('/src/assets/bg_pattern.png')",
      jungleBanner: "url('/src/assets/jungle.jpg')",
      bottomBanner: "url('/src/assets/1jungle.jpg')",
      topBefore: 'url("/src/assets/before_1-1.png")',
    },
  },
  plugins: [require("daisyui")],
};
