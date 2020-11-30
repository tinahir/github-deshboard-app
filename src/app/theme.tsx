import { colors } from "./colors";

export const tokens = {
  colors,
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64],
  sizes: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
  fontSizes: [0, 8, 12, 16, 18, 24, 28, 32, 40, 48, 56, 64],
  breakpoints: ["576px", "768px", "992px"],
  radii: {
    small: 2,
    medium: 4,
    large: 16,
    round: "50%",
  },
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    compact: "1.2",
    default: "1.5",
    cosy: "2",
  },

  shadows: {
    0: "none",
    1: "0 2px 5px 0 rgba(0, 0, 0, 0.3);",
    2: "0px 4px 4px rgba(0, 0, 0, 0.12), 0px 16px 32px rgba(0, 0, 0, 0.24)",
  },
};
