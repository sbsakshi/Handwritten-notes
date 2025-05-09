// themes.ts

export type ThemeElementColors = {
  pageHeading: string;
  pageHeadingUnderline: string;
  subHeading: string;
  subHeadingUnderline: string;
  paragraph: string;
  bullet: string;
  formulaBoxBg: string;
  formulaBoxBorder: string;
  formulaText: string;
  diagramBoxBg: string;
  diagramBoxBorder: string;
  textBoxBg: string;
  textBoxBorder: string;
  stickyNoteBg: string;
  stickyNoteTape: string;
  washiTape: string;
  highlighter: string;
  background: string;
};

export type Theme = {
  name: string;
  palette: ThemeElementColors;
  fonts: {
    heading: string;
    body: string;
    formula: string;
  };
};

export const THEMES: Theme[] = [
  {
    name: "Pastel Blue",
    palette: {
      pageHeading: "#112f63", // pastel blue
      pageHeadingUnderline: "#bfe7f6", // lighter blue highlighter
      subHeading: "#112f63",
      subHeadingUnderline: "#bfe7f6",
      paragraph: "#263238",
      bullet: "#6ea8fe",
      formulaBoxBg: "#b1c3e0",
      formulaBoxBorder: "#bfe7f6",
      formulaText: "#263238",
      diagramBoxBg: "#e3f2fd",
      diagramBoxBorder: "#bfe7f6",
      textBoxBg: "#e3f2fd",
      textBoxBorder: "#bfe7f6",
      stickyNoteBg: "#d7e3fc",
      stickyNoteTape: "#bfe7f6",
      washiTape: "#bfe7f6",
      highlighter: "rgba(191, 231, 246, 0.6)",
      background: "#f8fafd",
    },
    fonts: {
      heading: "'Pacifico', 'Gaegu', cursive",
      body: "'Shadows Into Light', 'Patrick Hand', sans-serif",
      formula: "'Fira Mono', 'SF Mono', monospace"
    }
  },
  {
    name: "Pastel Gold",
    palette: {
      pageHeading: "#e2b659", // pastel gold
      pageHeadingUnderline: "#fffde7", // light gold highlighter
      subHeading: "#112f63",
      subHeadingUnderline: "#fffde7",
      paragraph: "#263238",
      bullet: "#e2b659",
      formulaBoxBg: "#fffde7",
      formulaBoxBorder: "#ffe666",
      formulaText: "#263238",
      diagramBoxBg: "#fffde7",
      diagramBoxBorder: "#ffe666",
      textBoxBg: "#f5e8d7",
      textBoxBorder: "#ffe666",
      stickyNoteBg: "#fffde7",
      stickyNoteTape: "#ffe666",
      washiTape: "#ffe666",
      highlighter: "rgba(255, 230, 102, 0.5)",
      background: "#fffdfa",
    },
    fonts: {
      heading: "'Pacifico', 'Gaegu', cursive",
      body: "'Shadows Into Light', 'Patrick Hand', sans-serif",
      formula: "'Fira Mono', 'SF Mono', monospace"
    }
  }
];
