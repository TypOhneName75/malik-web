/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0f",
          panel: "#111118",
          card: "#15151f",
        },
        neon: {
          blue: "#00e5ff",
          purple: "#b829ff",
          green: "#39ff88",
          pink: "#ff2fbf",
        },
      },
      boxShadow: {
        "neon-blue": "0 0 5px #00e5ff, 0 0 20px rgba(0,229,255,0.35)",
        "neon-purple": "0 0 5px #b829ff, 0 0 20px rgba(184,41,255,0.35)",
        "neon-green": "0 0 5px #39ff88, 0 0 20px rgba(57,255,136,0.35)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(0,229,255,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(184,41,255,0.08), transparent 40%)",
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
