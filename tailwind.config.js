/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 5s linear infinite",
      },

      boxShadow: {
        "custom-sh": "0 4px 20px rgba(0, 0, 0, 0.05)",
        "custom-sh2": "0px 0px 4.333px 0px rgba(34, 139, 34, 0.25",
      },

      colors: {
        // Add custom colors here
        "light-green": "#549877", // Custom green color
        "gray-black": "#757575", // Custom gray color
        "light-black": "#212121", // Custom light black color
        "section-black": "#1E1E1E", // Custom light black color
        "section-gray": "#666", // Custom gray black for section color
        "gray-green": "#3C6C54", // Custom gray black for section color
        "gray-green2": "rgba(84, 152, 119, 0.30)", // Custom gray green  for dashbord color

        "testimony-gray": "#424242",
      },
      fontFamily: {
        Inter: ["Inter"],
        Manrope: ["Manrope"],
      },
    },
  },
  plugins: [],
};
