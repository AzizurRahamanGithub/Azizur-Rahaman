"use client"

import { useEffect, useState } from "react"

interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
  achievements_list: string[]
  is_current: boolean
}

export function Experience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/experience/")
        const data = await response.json()
        const expList = Array.isArray(data) ? data : data.results || []
        setExperience(expList)
      } catch (error) {
        console.log("[v0] Error fetching experience:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  if (loading) return null

  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Experience</h2>

        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id} className="glass-border rounded-lg p-6 md:p-8 hover:border-white/30 transition">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-blue-400 font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap">{exp.period}</span>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.achievements_list?.map((achievement, i) => (
                  <span key={i} className="inline-flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
