"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { fabric } from "fabric"
import { noteTemplates } from "@/assets/notes-templates"

interface StudyNotesCanvasProps {
  templateKey: string
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 1100

const StudyNotesCanvas: React.FC<StudyNotesCanvasProps> = ({ templateKey }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    // Clean up previous canvas if it exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose()
    }

    // Create new canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: "#ffffff",
      selection: true,
    })

    fabricCanvasRef.current = canvas

    // Get template data
    const templateData = noteTemplates[templateKey]
    if (!templateData) {
      setIsLoading(false)
      return
    }

    // Render template
    renderTemplate(canvas, templateData)

    setIsLoading(false)

    // Cleanup
    return () => {
      canvas.dispose()
      fabricCanvasRef.current = null
    }
  }, [templateKey])

  const renderTemplate = (canvas: fabric.Canvas, template: any) => {
    // Clear canvas
    canvas.clear()
    canvas.setBackgroundColor(template.backgroundColor || "#ffffff", canvas.renderAll.bind(canvas))

    // Add title
    if (template.title) {
      const title = new fabric.Text(template.title.text, {
        left: template.title.left || 40,
        top: template.title.top || 30,
        fontSize: template.title.fontSize || 48,
        fontFamily: template.title.fontFamily || "Pacifico, cursive",
        fill: template.title.color || "#000000",
        fontWeight: template.title.fontWeight || "bold",
        shadow: template.title.shadow,
        editable: true,
        selectable: true,
      })
      canvas.add(title)
    }

    // Add subtitle if exists
    if (template.subtitle) {
      if (template.subtitle.background) {
        const subtitleBg = new fabric.Rect({
          left: template.subtitle.background.left || 40,
          top: template.subtitle.background.top || 100,
          width: template.subtitle.background.width || 700,
          height: template.subtitle.background.height || 50,
          fill: template.subtitle.background.fill || "#f0f0f0",
          rx: template.subtitle.background.rx || 8,
          ry: template.subtitle.background.ry || 8,
          selectable: false,
          evented: false,
        })
        canvas.add(subtitleBg)
      }

      const subtitle = new fabric.Textbox(template.subtitle.text, {
        left: template.subtitle.left || 50,
        top: template.subtitle.top || 110,
        width: template.subtitle.width || 680,
        fontSize: template.subtitle.fontSize || 18,
        fontFamily: template.subtitle.fontFamily || "Montserrat, sans-serif",
        fill: template.subtitle.color || "#333333",
        fontStyle: template.subtitle.fontStyle || "normal",
        editable: true,
        selectable: true,
      })
      canvas.add(subtitle)
    }

    // Add sections
    if (template.sections) {
      let y = template.sectionsStartY || 180

      template.sections.forEach((section: any, idx: number) => {
        // Section heading
        if (section.heading) {
          const heading = new fabric.Text(section.heading.text, {
            left: section.heading.left || 40,
            top: y,
            fontSize: section.heading.fontSize || 24,
            fontFamily: section.heading.fontFamily || "Montserrat, sans-serif",
            fill: section.heading.color || (idx % 2 === 0 ? "#1976d2" : "#00838f"),
            fontWeight: section.heading.fontWeight || "bold",
            editable: true,
            selectable: true,
          })
          canvas.add(heading)

          y += section.heading.marginBottom || 36
        }

        // Section content
        if (section.content) {
          const content = new fabric.Textbox(section.content.text, {
            left: section.content.left || 60,
            top: y,
            width: section.content.width || 680,
            fontSize: section.content.fontSize || 16,
            fontFamily: section.content.fontFamily || "Shadows Into Light, cursive",
            fill: section.content.color || "#333333",
            editable: true,
            selectable: true,
          })
          canvas.add(content)

          y += content.height! + (section.content.marginBottom || 24)
        }

        // Add bullet points if they exist
        if (section.bulletPoints) {
          section.bulletPoints.forEach((bullet: any) => {
            const bulletPoint = new fabric.Text("• " + bullet.text, {
              left: bullet.left || 80,
              top: y,
              fontSize: bullet.fontSize || 16,
              fontFamily: bullet.fontFamily || "Shadows Into Light, cursive",
              fill: bullet.color || "#333333",
              editable: true,
              selectable: true,
            })
            canvas.add(bulletPoint)

            y += bullet.marginBottom || 24
          })
        }

        // Add formulas if they exist
        if (section.formulas) {
          section.formulas.forEach((formula: any) => {
            // Optional formula background
            if (formula.background) {
              const formulaBg = new fabric.Rect({
                left: formula.background.left || 60,
                top: y,
                width: formula.background.width || 300,
                height: formula.background.height || 60,
                fill: formula.background.fill || "#f5f5f5",
                rx: formula.background.rx || 4,
                ry: formula.background.ry || 4,
                selectable: false,
                evented: false,
              })
              canvas.add(formulaBg)
            }

            const formulaText = new fabric.Text(formula.text, {
              left: formula.left || 70,
              top: y + 10,
              fontSize: formula.fontSize || 18,
              fontFamily: formula.fontFamily || "Courier New, monospace",
              fill: formula.color || "#000000",
              editable: true,
              selectable: true,
            })
            canvas.add(formulaText)

            y += formula.marginBottom || 70
          })
        }

        // Add diagrams if they exist
        if (section.diagrams) {
          section.diagrams.forEach((diagram: any) => {
            if (diagram.type === "rect") {
              const rect = new fabric.Rect({
                left: diagram.left || 60,
                top: y,
                width: diagram.width || 200,
                height: diagram.height || 100,
                fill: diagram.fill || "transparent",
                stroke: diagram.stroke || "#000000",
                strokeWidth: diagram.strokeWidth || 1,
                rx: diagram.rx || 0,
                ry: diagram.ry || 0,
                selectable: true,
              })
              canvas.add(rect)
            } else if (diagram.type === "circle") {
              const circle = new fabric.Circle({
                left: diagram.left || 60,
                top: y,
                radius: diagram.radius || 50,
                fill: diagram.fill || "transparent",
                stroke: diagram.stroke || "#000000",
                strokeWidth: diagram.strokeWidth || 1,
                selectable: true,
              })
              canvas.add(circle)
            } else if (diagram.type === "line") {
              const line = new fabric.Line(
                [diagram.x1 || 60, y + (diagram.y1 || 0), diagram.x2 || 260, y + (diagram.y2 || 0)],
                {
                  stroke: diagram.stroke || "#000000",
                  strokeWidth: diagram.strokeWidth || 2,
                  selectable: true,
                },
              )
              canvas.add(line)
            }

            y += diagram.marginBottom || 120
          })
        }

        // Add grid if it exists
        if (section.grid) {
          const gridSize = section.grid.size || 20
          const gridWidth = section.grid.width || 200
          const gridHeight = section.grid.height || 200
          const gridLeft = section.grid.left || 60
          const gridTop = y

          // Create grid background
          const gridBg = new fabric.Rect({
            left: gridLeft,
            top: gridTop,
            width: gridWidth,
            height: gridHeight,
            fill: section.grid.background || "#f9f9f9",
            stroke: section.grid.stroke || "#cccccc",
            strokeWidth: 1,
            selectable: false,
            evented: false,
          })
          canvas.add(gridBg)

          // Create vertical lines
          for (let i = 0; i <= gridWidth; i += gridSize) {
            const line = new fabric.Line([gridLeft + i, gridTop, gridLeft + i, gridTop + gridHeight], {
              stroke: section.grid.lineColor || "#dddddd",
              strokeWidth: 1,
              selectable: false,
              evented: false,
            })
            canvas.add(line)
          }

          // Create horizontal lines
          for (let i = 0; i <= gridHeight; i += gridSize) {
            const line = new fabric.Line([gridLeft, gridTop + i, gridLeft + gridWidth, gridTop + i], {
              stroke: section.grid.lineColor || "#dddddd",
              strokeWidth: 1,
              selectable: false,
              evented: false,
            })
            canvas.add(line)
          }

          y += gridHeight + (section.grid.marginBottom || 30)
        }

        // Add horizontal line if needed
        if (section.divider) {
          const line = new fabric.Line([section.divider.x1 || 40, y, section.divider.x2 || 760, y], {
            stroke: section.divider.color || "#dddddd",
            strokeWidth: section.divider.strokeWidth || 1,
            selectable: false,
            evented: false,
          })
          canvas.add(line)

          y += section.divider.marginBottom || 20
        }
      })
    }

    // Add icons if they exist
    if (template.icons) {
      template.icons.forEach((icon: any) => {
        if (icon.type === "rect") {
          const rect = new fabric.Rect({
            left: icon.left,
            top: icon.top,
            width: icon.width || 40,
            height: icon.height || 40,
            fill: icon.fill || "transparent",
            stroke: icon.stroke || "#000000",
            strokeWidth: icon.strokeWidth || 1,
            rx: icon.rx || 0,
            ry: icon.ry || 0,
            selectable: true,
          })
          canvas.add(rect)

          if (icon.label) {
            const label = new fabric.Text(icon.label, {
              left: icon.left + (icon.labelOffsetX || 0),
              top: icon.top + (icon.labelOffsetY || 40),
              fontSize: icon.labelFontSize || 12,
              fontFamily: icon.labelFontFamily || "Arial",
              fill: icon.labelColor || "#000000",
              editable: true,
              selectable: true,
            })
            canvas.add(label)
          }
        } else if (icon.type === "circle") {
          const circle = new fabric.Circle({
            left: icon.left,
            top: icon.top,
            radius: icon.radius || 20,
            fill: icon.fill || "transparent",
            stroke: icon.stroke || "#000000",
            strokeWidth: icon.strokeWidth || 1,
            selectable: true,
          })
          canvas.add(circle)

          if (icon.label) {
            const label = new fabric.Text(icon.label, {
              left: icon.left + (icon.labelOffsetX || 0),
              top: icon.top + (icon.labelOffsetY || 40),
              fontSize: icon.labelFontSize || 12,
              fontFamily: icon.labelFontFamily || "Arial",
              fill: icon.labelColor || "#000000",
              editable: true,
              selectable: true,
            })
            canvas.add(label)
          }
        }
      })
    }

    // Add decorative elements
    if (template.decorations) {
      template.decorations.forEach((decoration: any) => {
        if (decoration.type === "line") {
          const line = new fabric.Line([decoration.x1, decoration.y1, decoration.x2, decoration.y2], {
            stroke: decoration.color || "#ffcc00",
            strokeWidth: decoration.strokeWidth || 3,
            selectable: decoration.selectable || false,
            evented: decoration.evented || false,
          })
          canvas.add(line)
        } else if (decoration.type === "rect") {
          const rect = new fabric.Rect({
            left: decoration.left,
            top: decoration.top,
            width: decoration.width || 100,
            height: decoration.height || 5,
            fill: decoration.fill || "#ffcc00",
            rx: decoration.rx || 0,
            ry: decoration.ry || 0,
            selectable: decoration.selectable || false,
            evented: decoration.evented || false,
          })
          canvas.add(rect)
        }
      })
    }

    canvas.renderAll()
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <div className="text-lg">Loading template...</div>
        </div>
      )}
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  )
}

export default StudyNotesCanvas
