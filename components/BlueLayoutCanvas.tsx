// BluePastelLayout.tsx
'use client';

import React from 'react';
import { Theme } from '@/assets/theme';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
// import './pagination.css'; // create this file to style A4 pages

export type NoteContent = {
  pageHeading: string;
  subHeadings: {
    title: string;
    paragraphs: string[];
    formulas?: string[];
  }[];
  diagrams?: { src: string; caption: string }[];
};

type Props = { theme: Theme; content: NoteContent };

const BluePastelLayout: React.FC<Props> = ({ theme, content }) => {
  const itemsPerPage = 3;
  const pages = [];

  for (let i = 0; i < content.subHeadings.length; i += itemsPerPage) {
    pages.push(content.subHeadings.slice(i, i + itemsPerPage));
  }

  return (
    <div>
      {pages.map((pageContent, pageIndex) => (
        <div
          key={pageIndex}
          className="a4-page"
          style={{
            background: theme.palette.background,
            fontFamily: theme.fonts.body,
            padding: 32,
            borderRadius: 16,
            maxWidth: '100%',
            margin: '40px auto',
            boxShadow: '0 0 12px rgba(0,0,0,0.1)'
          }}
        >
          {pageIndex === 0 && (
            <div style={{ textAlign: 'center', marginBottom: 12, position: 'relative' }}>
              <span
                style={{
                  fontFamily: theme.fonts.heading,
                  fontSize: 38,
                  color: theme.palette.pageHeading,
                  position: 'relative',
                  zIndex: 2,
                  fontWeight: 700,
                }}
              >
                {content.pageHeading}
              </span>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 4,
                  width: '70%',
                  height: 14,
                  background: theme.palette.pageHeadingUnderline,
                  borderRadius: 6,
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              />
            </div>
          )}

          {pageContent.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 24 }}>
              <div style={{ display: 'inline-block', position: 'relative', marginBottom: 4 }}>
                <span
                  style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: 22,
                    color: theme.palette.subHeading,
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {section.title}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 2,
                    width: '100%',
                    height: 10,
                    background: theme.palette.subHeadingUnderline,
                    borderRadius: 4,
                    zIndex: 1,
                  }}
                />
              </div>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                {section.paragraphs.map((p, i) => (
                  <li
                    key={i}
                    contentEditable
                    suppressContentEditableWarning={true}
                    style={{
                      marginBottom: 6,
                      fontSize: 24,
                      color: theme.palette.paragraph,
                      fontFamily: theme.fonts.body,
                      listStyle: 'disc',
                      lineHeight: 1.8,
                    }}
                  >
                    {p}
                  </li>
                ))}
              </ul>
              {section.formulas && section.formulas.length > 0 && (
                <div
                  style={{
                    background: theme.palette.stickyNoteBg,
                    border: `2px solid ${theme.palette.formulaBoxBorder}`,
                    borderRadius: 8,
                    boxShadow: '2px 4px 10px #bfe7f688',
                    padding: '10px 18px',
                    margin: '14px 0 0 0',
                    fontFamily: theme.fonts.formula,
                    fontSize: 16,
                    color: theme.palette.formulaText,
                    position: 'relative',
                  }}
                >
                  {section.formulas.map((f, i) => (
                    <div key={i} style={{ marginBottom: 2 }}>
                      <BlockMath math={f} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BluePastelLayout;
