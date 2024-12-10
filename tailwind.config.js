/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customTextGreen: "#5B8C00",
        customButtonGreen: "#5B8C00",
        customGreenLigth: "#E4F5D0", // Verde más claro
        customNavBar: "#7CB305",
        customBlue: "#E6F7FF",
        customTextBlue: "#1890FF",
        customGray: "#F0F2F5",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [animations],
};
