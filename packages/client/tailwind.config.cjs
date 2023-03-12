// TODO: To be replaced by design tokens

// white grey and black
const grey50 = "#FFFFFF";
const grey100 = "#E0E0E0";
const grey200 = "#C2C2C2";
const grey300 = "#8F8F8F";
const grey400 = "#7A7A7A";
const grey500 = "#686868";
const grey600 = "#525252";
const grey700 = "#3D3D3D";
const grey800 = "#292929";
const grey900 = "#121212";

const blue50 = "#EDF1FC";
const blue100 = "#DCE3F9";
const blue200 = "#b9c8f4";
const blue300 = "#90a8ed"; // secondary
const blue400 = "#7390eb";
const blue500 = "#5074e2";
const blue600 = "#2c59dd";
const blue700 = "#1f48c1";
const blue800 = "#1a3b9e";
const blue900 = "#142e7b";

const yellow50 = "#fffbeb"; // for bg
const yellow100 = "#fff6d6";
const yellow200 = "#ffedad";
const yellow300 = "#ffe485";
const yellow400 = "#ffdc5c";
const yellow500 = "#ffd333";
const yellow600 = "#ffc900"; // primary
const yellow700 = "#e0b000";
const yellow800 = "#b89000";
const yellow900 = "#8f7000";

const primaryColor = {
  light: yellow500,
  main: yellow600,
  dark: yellow700,
};

const secondaryColor = {
  light: blue200,
  main: blue300,
  dark: blue400,
};
const accentOpacity4 = "rgba(67, 97, 225, 0.04)";
const accentOpacity8 = "rgba(67, 97, 225, 0.08)";
const accentOpacity12 = "rgba(67, 97, 225, 0.12)";
const accentOpacity16 = "rgba(67, 97, 225, 0.16)";
const accentOpacity24 = "rgba(67, 97, 225, 0.24)";
const accentOpacity48 = "rgba(67, 97, 225, 0.48)";
const accentOpacity64 = "rgba(67, 97, 225, 0.64)";
const accentOpacity84 = "rgba(67, 97, 225, 0.84)";

const opacityWhite16 = "rgba(255, 255, 255, 0.16)";
const opacityWhite24 = "rgba(255, 255, 255, 0.24)";
const opacityWhite44 = "rgba(255, 255, 255, 0.44)";
const opacityWhite56 = "rgba(255, 255, 255, 0.56)";
const opacityWhite68 = "rgba(255, 255, 255, 0.68)";
const opacityWhite76 = "rgba(255, 255, 255, 0.76)";
const opacityWhite84 = "rgba(255, 255, 255, 0.84)";
const opacityWhite92 = "rgba(255, 255, 255, 0.92)";
const opacityWhite98 = "rgba(255, 255, 255, 0.98)";

const opacityBlack4 = "rgba(0, 0, 0, 0.04)";
const opacityBlack8 = "rgba(0, 0, 0, 0.08)";
const opacityBlack16 = "rgba(0, 0, 0, 0.16)";
const opacityBlack24 = "rgba(0, 0, 0, 0.24)";
const opacityBlack44 = "rgba(0, 0, 0, 0.44)";
const opacityBlack56 = "rgba(0, 0, 0, 0.56)";
const opacityBlack68 = "rgba(0, 0, 0, 0.68)";
const opacityBlack76 = "rgba(0, 0, 0, 0.76)";
const opacityBlack92 = "rgba(0, 0, 0, 0.92)";

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./*.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      xsm: "425px",
      sm: "601px",
      md: "1025px",
      lg: "1441px",
      xl: "1921px",
    },

    fontFamily: {
      sans: ["Roboto", "sans-serif"], // Android
      // serif: ['SF Pro Text'], // iOS
    },
    fontWeight: {
      h0: 800,
      h1: 700,
      h2: 700,
      h3: 600,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
    },
    fontSize: {
      h1: {
        xs: "1.75rem",
        xsm: "1.75rem",
        sm: "2.625rem",
        md: "2.625rem",
        lg: "2.625rem",
        xl: "2.625rem",
        "2xl": "2.625rem",
      },
      h2: {
        xs: "1.0625rem",
        xsm: "1.2rem",
        sm: "1.625rem",
        md: "1.625rem",
        lg: "1.625rem",
        xl: "1.625rem",
        "2xl": "2rem",
      },
      h3: "1rem",
      subtitle2: "0.75rem",
    },
    colors: {
      black: "#000000",
      white: "#ffffff",

      coral: {
        800: "#2A0704",
        700: "#4C0905",
        600: "#6B0F0B",
        500: "#C53630",
        400: "#EC514A",
        300: "#F0736E",
        200: "#F9C8C6",
        100: "#FEE8E7",
        DEFAULT: "#F0736E",
      },
      success: {
        light: "#1BD0A3",
        dark: "#31AA86",
        DEFAULT: "#1BD0A3",
      },
      warning: {
        light: "#FFC850",
        dark: "#F5BE57",
        DEFAULT: "#FFC850",
      },
      error: {
        light: "#DD3434",
        dark: "#FF6860",
        DEFAULT: "#DD3434",
      },
      primary: {
        main: primaryColor.main,
        dark: primaryColor.dark,
        light: primaryColor.light,
        hover: yellow400,
        50: yellow50,
        100: yellow100,
        200: yellow200,
        300: yellow300,
        400: yellow400,
        500: yellow500,
        600: yellow600,
        700: yellow700,
        800: yellow800,
        900: yellow900,
        DEFAULT: primaryColor.main,
      },
      secondary: {
        main: secondaryColor.main,
        dark: secondaryColor.dark,
        light: secondaryColor.light,
        hover: secondaryColor.light,
        DEFAULT: secondaryColor.main,
      },
      tertiary: {
        DEFAULT: "#68559B",
      },
      fill: {
        light: "#ECEAF3",
        DEFAULT: "#D9D4E6",
      },
      interactive: {
        light: "#4361E1",
        DEFAULT: "#4361E1",
      },
      base: {
        blue: "#00A7FF",
      },
      yellow: {
        50: yellow50,
        100: yellow100,
        200: yellow200,
        300: yellow300,
        400: yellow400,
        500: yellow500,
        600: yellow600,
        700: yellow700,
        800: yellow800,
        900: yellow900,
        DEFAULT: yellow600,
      },
      grey: {
        50: grey50,
        100: grey100,
        200: grey200,
        300: grey300,
        400: grey400,
        500: grey500,
        600: grey600,
        700: grey700,
        800: grey800,
        900: grey900,
        DEFAULT: "#9086AB",
      },
      blue: {
        50: blue50,
        100: blue100,
        200: blue200,
        300: blue300,
        400: blue400,
        500: blue500,
        600: blue600,
        700: blue700,
        800: blue800,
        900: blue900,
        DEFAULT: blue500,
        // TODO: clean up old tokens
        light: "#00A7FF",
        dark: "#199EDF",
      },
      "opacity-black": {
        4: opacityBlack4,
        8: opacityBlack8,
        16: opacityBlack16,
        24: opacityBlack24,
        44: opacityBlack44,
        56: opacityBlack56,
        68: opacityBlack68,
        76: opacityBlack76,
        92: opacityBlack92,
      },
      "opacity-white": {
        16: opacityWhite16,
        24: opacityWhite24,
        44: opacityWhite44,
        56: opacityWhite56,
        68: opacityWhite68,
        76: opacityWhite76,
        84: opacityWhite84,
        92: opacityWhite92,
        98: opacityWhite98,
      },
      "accent-opacity": {
        4: accentOpacity4,
        8: accentOpacity8,
        12: accentOpacity12,
        16: accentOpacity16,
        24: accentOpacity24,
        48: accentOpacity48,
        64: accentOpacity64,
        84: accentOpacity84,
      },
      // For Icon Informative
      lightgrey: {
        DEFAULT: "rgba(0, 0, 0, 0.02)",
        light: "rgba(0, 0, 0, 0.02)",
      },
      lightblue: {
        DEFAULT: "rgba(67, 97, 225, 0.04)",
        light: "rgba(67, 97, 225, 0.04)",
      },
    },

    extend: {
      fontWeight: {
        h1: 900,
        h2: "bold",
      },
      spacing: {
        "4px": "4px",
        "8px": "8px",
        "16px": "16px",
        "24px": "24px",
        "32px": "32px",
        "40px": "40px",
        "48px": "48px",
        "56px": "56px",
        "64px": "64px",
        "72px": "72px",
        "80px": "80px",
      },
      borderRadius: {
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        9999: "9999px",
        none: "0",
        buttons: "9999px",
        avatars: "9999px",
        icons: "9999px",
        DEFAULT: "8px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "30px",
        heading3: "24px",
        heading2: "30px",
        heading1: "36px",
        "display-s": "42px",
        "display-m": "56px",
        "display-l": "72px",
        "display-xl": "96px",
      },
      lineHeight: {
        xs: "16px",
        sm: "20px",
        md: "24px",
        lg: "28px",
        xl: "32px",
        xxl: "36px",
      },
      animation: {
        "fade-in-bottom": "fade-in-bottom ease-in 0.5s",
      },
      keyframes: {
        "fade-in-bottom": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      // shadow for neubrutalism
      boxShadow: {
        sm: "2px 2px rgba(0,0,0,1)",
        md: "4px 4px rgba(0,0,0,1)",
        lg: "6px 6px rgba(0,0,0,1)",
        xl: "8px 8px rgba(0,0,0,1)",
        "controls-selected-hover": "0 0 0 4px rgba(67, 97, 225, 0.08)",
        "controls-selected-focus": "0 0 0 4px rgba(67, 97, 225, 0.16)",
        "controls-unselected-hover": "0 0 0 4px rgba(0, 0, 0, 0.04)",
        "controls-unselected-focus": "0 0 0 4px rgba(0, 0, 0, 0.08)",
        menu: "0px 4px 8px -2px rgba(43, 44, 48, 0.12), 0px 2px 4px -2px rgba(43, 44, 48, 0.06)",
        "3xl": "0px 4px 12px rgba(66, 42, 130, 0.25)",
      },
      opacity: {
        4: ".04",
        8: ".08",
        12: ".12",
        16: ".16",
        24: ".24",
      },
    },
  },
};

// // edit here and in theme.ts

// // for showing color status
// const green = "#57B65F";
// const blue = "#4E97F3";
// const yellow = "#FDAE5B";
// const red = "#D2042D";
// const yellow = "#FFA500";
// const black = "#000000";

// // white grey and black
// const grey0 = "#FFFFFF";
// const grey50 = "#F5F0F0";
// const grey100 = "#E0E0E0";
// const grey200 = "#C2C2C2";
// const grey300 = "#8F8F8F";
// const grey400 = "#7A7A7A";
// const grey500 = "#666666";
// const grey600 = "#525252";
// const grey700 = "#3D3D3D";
// const grey800 = "#292929";
// const grey850 = "#1F1F1F";
// const grey900 = "#121212";

// const primaryColor = "#FEC600";
// const primaryHoveredColor = "#FFD333";

// // main
// const primaryColor50 = "#EBEEFF";
// const primaryColor100 = "#C2CBFF";
// const primaryColor200 = "#99A8FF";
// const primaryColor300 = "#8597FF";
// const primaryColor400 = "#7086FF";
// const primaryColor500 = "4763FF";
// const primaryColor600 = "#1F40FF";
// const primaryColor700 = primaryColor;
// const primaryColor800 = "#00158F";
// const primaryColor850 = "#000F66";
// const primaryColor900 = "#00093D";

// const bgColor = grey0;
// const primaryTextColor = grey900;
// const inactiveGrey = grey200;

// // font family
// const sansFamily = ["Arial", "sans-serif"];
// const serifFamily = ["Arial", "sans-serif"];
// const monoFamily = ["Montserrat", "Arial", "sans-serif"];

// const screens = {
//   xs: "475px",
//   sm: "640px",
//   md: "768px",
//   lg: "1024px",
//   xl: "1280px",
//   "2xl": "1536px",
// };

// // font size

// const fontSizeXS = "12px";
// const fontSizeSM = "14px";
// const fontSizeMD = "16px";
// const fontSizeLG = "18px";
// const fontSizeXL = "20px";
// const fontSize2XL = "24px";
// const fontSize3XL = "30px";

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   purge: ["./*.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     screens,
//     boxShadow: {
//       sm: "2px 2px rgba(0,0,0,1)",
//       md: "4px 4px rgba(0,0,0,1)",
//       lg: "6px 6px rgba(0,0,0,1)",
//       xl: "8px 8px rgba(0,0,0,1)",
//     },
//     extend: {
//       fontFamily: {
//         sans: sansFamily,
//         serif: serifFamily,
//         mono: monoFamily,
//       },
//       fontSize: {
//         xs: fontSizeXS,
//         sm: fontSizeSM,
//         md: fontSizeMD,
//         lg: fontSizeLG,
//         xl: fontSizeXL,
//         "2xl": fontSize2XL,
//         "3xl": fontSize3XL,
//       },
//       minWidth: {
//         12: "48px",
//         16: "64px",
//         20: "80px",
//         24: "96px",
//       },
//       colors: {
//         grey: {
//           "text-primary": primaryTextColor, // text-text-primary
//           "bg-color": bgColor, // text-bg-color
//           inactive: inactiveGrey,
//           0: grey0, // text-grey-0
//           50: grey50,
//           100: grey100,
//           200: grey200,
//           300: grey300,
//           400: grey400,
//           500: grey500,
//           600: grey600,
//           700: grey700,
//           800: grey800,
//           850: grey850,
//           900: grey900,
//           DEFAULT: grey900,
//         },
//         primary: {
//           50: primaryColor50,
//           100: primaryColor100,
//           200: primaryColor200,
//           300: primaryColor300,
//           400: primaryColor400,
//           500: primaryColor500,
//           600: primaryColor600,
//           700: primaryColor700,
//           800: primaryColor800,
//           850: primaryColor850,
//           900: primaryColor900,
//           primary: primaryColor,
//           hovered: primaryHoveredColor,
//           DEFAULT: primaryColor,
//         },
//         red: {
//           50: "#FFF5F5",
//           100: "#FFE3E2",
//           200: "#FFC9C9",
//           300: "#FEA8A8",
//           400: "#FF8787",
//           500: "#FF6B6B",
//           600: "#FA5352",
//           700: "#F03E3F",
//           800: "#E03130",
//           900: "#C92B2B",
//         },
//         green: {
//           50: "#f0fdf4",
//           100: "#dcfce7",
//           200: "#bbf7d0",
//           300: "#86efac",
//           400: "#4ade80",
//           500: "#22c55e",
//           600: "#16a34a",
//           700: "#15803d",
//           800: "#166534",
//           900: "#14532d",
//           DEFAULT: "#22c55e",
//         },
//         yellow: yellow,
//         "yellow-bg": "#FEF9C3", // for endo table status
//         action: green,
//         "red-bg": "#FEE2E2", // for endo table status
//         "green-bg": "#F7FEE7", // for endo table status
//         blue: blue,
//         "blue-bg": "#E0F2FE", // for endo table status
//         yellow: yellow,
//         black: black,
//         ice: "#F8FBFC",
//       },
//       animation: {
//         "spin-slow": "spin 12s linear infinite",
//         "pulse-0.5": "pulse 0.5s cubic-bezier(0.6, 0, 0.8, 1) infinite",
//         "pulse-1": "pulse 1s cubic-bezier(0.6, 0, 0.8, 1) infinite",
//         "pulse-2": "pulse 2s cubic-bezier(0.6, 0, 0.8, 1) infinite",
//       },
//     },
//   },
//   plugins: [],
// };
