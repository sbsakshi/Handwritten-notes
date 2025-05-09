'use client';

import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { structuredText } from '@/assets/structuredText';
import { THEMES,Theme } from '@/assets/theme';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1100;

const HandwrittenCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const fabricObjectsRef = useRef<fabric.Object[]>([]);

  // Update colors of canvas objects when theme changes
  const applyTheme = (theme: Theme) => {
    fabricObjectsRef.current.forEach(obj => {
      if (obj.data?.role === 'header') obj.set('fill', theme.primary);
      if (obj.data?.role === 'section-heading') obj.set('fill', theme.secondary);
      if (obj.data?.role === 'highlight-bg') obj.set('fill', theme.highlight);
      if (obj.data?.role === 'text') obj.set('fill', theme.text);
    });
    const canvas = (canvasRef.current as any)?._fabric as fabric.Canvas;
    if (canvas) {
      canvas.setBackgroundColor(theme.background, canvas.renderAll.bind(canvas));
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: theme.background,
      selection: false,
    });
    (canvasRef.current as any)._fabric = canvas;

    const objs: fabric.Object[] = [];

    // Header
    const header = new fabric.Text(structuredText.chapter, {
      left: 40,
      top: 30,
      fontSize: 64,
      fontFamily: 'Pacifico, cursive',
      fill: theme.primary,
      fontWeight: 'bold',
      shadow: `2px 2px 0 ${theme.secondary}`,
      editable: true,
      selectable: true,
      data: { role: 'header' }
    });
    canvas.add(header);
    objs.push(header);

    // Subtitle highlight background
    const subtitleBg = new fabric.Rect({
      left: 40,
      top: 110,
      width: 700,
      height: 60,
      fill: theme.highlight,
      rx: 8,
      ry: 8,
      selectable: false,
      evented: false,
      data: { role: 'highlight-bg' }
    });
    const subtitle = new fabric.Textbox(structuredText.subtitle, {
      left: 55,
      top: 120,
      width: 670,
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fill: theme.text,
      fontStyle: 'italic',
      editable: true,
      selectable: true,
      data: { role: 'text' }
    });
    canvas.add(subtitleBg);
    canvas.add(subtitle);
    objs.push(subtitleBg, subtitle);

    // Sections
    let y = 200;
    structuredText.sections.forEach((section) => {
      const heading = new fabric.Text(section.heading, {
        left: 55,
        top: y,
        fontSize: 26,
        fontFamily: 'Montserrat, sans-serif',
        fill: theme.secondary,
        fontWeight: 'bold',
        editable: true,
        selectable: true,
        data: { role: 'section-heading' }
      });
      canvas.add(heading);
      objs.push(heading);

      y += 36;

      const content = new fabric.Textbox(section.content, {
        left: 70,
        top: y,
        width: 660,
        fontSize: 18,
        fontFamily: 'Shadows Into Light, cursive',
        fill: theme.text,
        editable: true,
        selectable: true,
        data: { role: 'text' }
      });
      canvas.add(content);
      objs.push(content);

      y += content.height + 24;
    });

    fabricObjectsRef.current = objs;

    return () => {
      canvas.dispose();
    };
  // eslint-disable-next-line
  }, []);

  // Apply theme when changed
  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line
  }, [theme]);

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        {THEMES.map((t) => (
          <button
            key={t.name}
            style={{
              background: t.primary,
              color: '#fff',
              border: theme.name === t.name ? '2px solid #000' : '1px solid #ccc',
              borderRadius: 6,
              padding: '0.5em 1em',
              cursor: 'pointer',
              fontWeight: theme.name === t.name ? 'bold' : 'normal'
            }}
            onClick={() => setTheme(t)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
};

export default HandwrittenCanvas;
