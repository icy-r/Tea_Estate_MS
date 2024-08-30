/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            color_focus: "#0D294D",
            color_button: "#15F5BA",
            color_extra: "#1AACAC",
            white: "#FFFFFF",
            white_modified: "#EBE7E7",
            action: "#FA7070"
        },
    },
  },
  plugins: [],
}