"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface Skill {
  id: number
  name: string
  category: string
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/skills/")  // Backend API
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        const skillsList = Array.isArray(data) ? data : data.results || []  // Adjust based on API response
        setSkills(skillsList)
      } catch (error) {
        console.log("[v0] Error fetching skills, using fallback:", error)
        // Static fallback data
        setSkills([
          { id: 1, name: "React", category: "frontend" },
          { id: 2, name: "Next.js", category: "frontend" },
          { id: 3, name: "TypeScript", category: "frontend" },
          { id: 4, name: "Tailwind CSS", category: "frontend" },
          { id: 5, name: "Node.js", category: "backend" },
          { id: 6, name: "Django", category: "backend" },
          { id: 7, name: "PostgreSQL", category: "backend" },
          { id: 8, name: "MongoDB", category: "backend" },
          { id: 9, name: "AWS", category: "tools" },
          { id: 10, name: "Docker", category: "tools" },
          { id: 11, name: "Git", category: "tools" },
          { id: 12, name: "VS Code", category: "tools" },
        ])
      } finally {
        setLoading(false)  // Update loading state after fetch attempt (successful or not)
      }
    }
    fetchSkills()
  }, [])

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other"
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Tools & Platforms",
    other: "Other",
  }

  // Show loading indicator if still fetching data
  if (loading) return <div>Loading...</div>

  return (
    <section id="skills" className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Skills & Technologies</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="glass-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">{categoryLabels[category] || category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 transition"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
