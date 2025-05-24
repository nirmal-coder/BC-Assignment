/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spin360: "spin360 6s linear infinite",
        spin360Once: "spin360Once 6s linear",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
      },
      keyframes: {
        spin360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin360Once: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(360deg)" },
          "26%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(360deg)" },
          "51%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
