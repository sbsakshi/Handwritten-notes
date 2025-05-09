export type NoteContent = {
    pageHeading: string;
    subHeadings: {
      title: string;
      paragraphs: string[];
      formulas?: string[];
      diagram?: { src: string; caption: string };
      textBox?: string;
    }[];
  };