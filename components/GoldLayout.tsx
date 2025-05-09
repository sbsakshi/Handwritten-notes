// GoldLayoutCanvas.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { structuredText } from '@/assets/structuredText';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 1100;

const GoldLayoutCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH, height: CANVAS_HEIGHT, backgroundColor: '#fffdfa'
    });

    // Header
    canvas.add(new fabric.Text('chemistry', {
      left: 30, top: 30, fontSize: 54, fontFamily: 'Pacifico, cursive',
      fill: '#222', fontWeight: 'bold', editable: true
    }));

    // Unit title
    canvas.add(new fabric.Text('UNIT 1 (PROPERTIES OF MATTER)', {
      left: 30, top: 90, fontSize: 22, fontFamily: 'Montserrat, sans-serif',
      fill: '#bfa100', fontWeight: 'bold', editable: true
    }));

    // Sections single column
    let y = 130;
    structuredText.sections.forEach((section) => {
      canvas.add(new fabric.Text(section.heading, {
        left: 40, top: y, fontSize: 18, fontFamily: 'Montserrat, sans-serif',
        fill: '#ffb300', fontWeight: 'bold', underline: true, editable: true
      }));
      canvas.add(new fabric.Textbox(section.content, {
        left: 60, top: y + 22, width: 660, fontSize: 15, fontFamily: 'Shadows Into Light, cursive',
        fill: '#263238', editable: true
      }));
      y += 70;
    });

    // Sticky note for formulas
    canvas.add(new fabric.Rect({
      left: 500, top: 60, width: 180, height: 80, fill: '#fffde7', rx: 8, ry: 8
    }));
    canvas.add(new fabric.Text('formulas', {
      left: 520, top: 75, fontSize: 20, fontFamily: 'Pacifico, cursive', fill: '#bfa100', fontWeight: 'bold'
    }));
    canvas.add(new fabric.Text('ΔT = Q/mC\nQ = mCΔT', {
      left: 520, top: 100, fontSize: 16, fontFamily: 'Montserrat, sans-serif', fill: '#263238'
    }));

    return () => { canvas.dispose(); };
  }, []);

  return <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />;
};

export default GoldLayoutCanvas;
