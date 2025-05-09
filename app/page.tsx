"use client"

import { useState } from "react"
import StudyNotesCanvas from "@/components/study-notes-canvas"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("vitamins")

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Study Notes Canvas</h1>

        <div className="mb-6 flex items-center gap-4 justify-center">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vitamins">Vitamins</SelectItem>
              <SelectItem value="idealGas">Ideal Gas</SelectItem>
              <SelectItem value="chemistryBasics">Chemistry Basics</SelectItem>
              <SelectItem value="metacognition">Metacognition</SelectItem>
              <SelectItem value="chemistryFormulas">Chemistry Formulas</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => window.print()} variant="outline">
            Print / Save as PDF
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md print:shadow-none">
          <StudyNotesCanvas templateKey={selectedTemplate} />
        </div>
      </div>
    </main>
  )
}
