import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        jost: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      colors: {
        charcoal: "#0A0A0A",
        "warm-black": "#111111",
        cream: "#F5F0E8",
        body: "#C4BDB3",
        gold: "#B8976A",
        "gold-muted": "#9A7A52",
        forest: "#1A3A2A",
      },
      letterSpacing: {
        luxury: "0.15em",
        wide: "0.2em",
        wider: "0.3em",
        widest: "0.4em",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
