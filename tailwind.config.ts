import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#DC0A2D",
        accent: {
          "100": "#FFFFFF",
          "200": "#EFEFEF",
          "300": "#E0E0E0",
          "400": "#666666",
          "500": "#212121",
        },
        bug: {
          100: "#E6EDC1",
          200: "#CDDAA2",
          300: "#B3C782",
          400: "#9AB463",
          500: "#809143",
          600: "#667924",
          700: "#4D5D1E",
          800: "#333F19",
          900: "#1A2010",
        },
        dark: {
          100: "#B5A09A",
          200: "#8E7A72",
          300: "#68544B",
          400: "#413E34",
          500: "#1B1B1C",
          600: "#17171A",
          700: "#111114",
          800: "#0C0C0F",
          900: "#08080A",
        },
        dragon: {
          100: "#9D8BFC",
          200: "#7868F9",
          300: "#5345F6",
          400: "#3022F3",
          500: "#160CFA",
          600: "#12099A",
          700: "#0D076B",
          800: "#08043D",
          900: "#04021E",
        },
        electric: {
          100: "#FCF0C4",
          200: "#F8E086",
          300: "#F4CF47",
          400: "#F0BB08",
          500: "#E5A609",
          600: "#B08A07",
          700: "#796406",
          800: "#474305",
          900: "#1E2302",
        },
        fairy: {
          100: "#F5E2E5",
          200: "#E7C4CA",
          300: "#D8A5B0",
          400: "#CB8795",
          500: "#BD697B",
          600: "#A35463",
          700: "#7C403F",
          800: "#57302F",
          900: "#321E1E",
        },
        fighting: {
          100: "#FFDEB3",
          200: "#FFC280",
          300: "#FF9E4D",
          400: "#FF7C1A",
          500: "#E66600",
          600: "#B34D00",
          700: "#803300",
          800: "#4D1A00",
          900: "#1A0000",
        },
        fire: {
          100: "#FFD1B3",
          200: "#FFA680",
          300: "#FF7E4D",
          400: "#FF551A",
          500: "#E63B00",
          600: "#B32600",
          700: "#801A00",
          800: "#4D0E00",
          900: "#1A0000",
        },
        flying: {
          100: "#D1D1FF",
          200: "#A6A6FF",
          300: "#7A7AFF",
          400: "#4D4DFF",
          500: "#2121FF",
          600: "#1919B2",
          700: "#11116B",
          800: "#080840",
          900: "#000016",
        },
        ghost: {
          100: "#D9C9E8",
          200: "#B398D1",
          300: "#8A67B9",
          400: "#6235A2",
          500: "#3A048B",
          600: "#2C0370",
          700: "#1E0255",
          800: "#10013A",
          900: "#06001E",
        },
        normal: {
          100: "#D5D5CE",
          200: "#ABACA1",
          300: "#80827A",
          400: "#565954",
          500: "#2B2C2E",
          600: "#232325",
          700: "#19191A",
          800: "#101011",
          900: "#080809",
        },

        ground: {
          100: "#EBE4CA",
          200: "#D5C999",
          300: "#BFA868",
          400: "#A98D36",
          500: "#938205",
          600: "#756604",
          700: "#574903",
          800: "#3A2B02",
          900: "#1C1501",
        },
        ice: {
          100: "#C7E9FF",
          200: "#9ED4FF",
          300: "#75BFFF",
          400: "#4CAAFF",
          500: "#2395FF",
          600: "#1C73CC",
          700: "#144E99",
          800: "#0D2A66",
          900: "#060733",
        },
        poison: {
          100: "#D5B5D1",
          200: "#AB6A9E",
          300: "#80206C",
          400: "#56003A",
          500: "#2B0010",
          600: "#22000E",
          700: "#19000B",
          800: "#100008",
          900: "#080004",
        },
        psychic: {
          100: "#FFC3E6",
          200: "#FF98CD",
          300: "#FF6EB4",
          400: "#FF449B",
          500: "#FF1A82",
          600: "#CC1468",
          700: "#990E4E",
          800: "#660733",
          900: "#330319",
        },
        rock: {
          100: "#F2E0CC",
          200: "#E0C099",
          300: "#CEA666",
          400: "#BC8333",
          500: "#AA6000",
          600: "#874C00",
          700: "#643900",
          800: "#412600",
          900: "#200D00",
        },
        steel: {
          100: "#DADAE1",
          200: "#B5B5C2",
          300: "#9091A3",
          400: "#6B6C85",
          500: "#464768",
          600: "#383851",
          700: "#2A2A3A",
          800: "#1C1C23",
          900: "#0E0E0D",
        },
        grass: {
          100: "#C8EDC2",
          200: "#9CDB97",
          300: "#70C86C",
          400: "#45B540",
          500: "#1AA215",
          600: "#15810E",
          700: "#0F5708",
          800: "#0A2C04",
          900: "#051001",
        },
        water: {
          100: "#C9E4FF",
          200: "#9EC9FF",
          300: "#73AEFF",
          400: "#4993FF",
          500: "#1E78FF",
          600: "#195EC0",
          700: "#124380",
          800: "#0D2A40",
          900: "#081000",
        },
      },
    },
  },
} satisfies Config;
