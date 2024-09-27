/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 5s linear infinite",
      },

      colors: {
        // Add custom colors here
        "light-green": "#549877", // Custom green color
        "gray-black": "#757575", // Custom gray color
        "light-black": "#212121", // Custom light black color
        "section-black": "#1E1E1E", // Custom light black color
        "section-gray": "#666", // Custom gray black for section color
        "gray-green": "#3C6C54", // Custom gray black for section color
      },
      fontFamily: {
        Inter: ["Inter"],
        Manrope: ["Manrope"],
      },
    },
  },
  plugins: [],
};
