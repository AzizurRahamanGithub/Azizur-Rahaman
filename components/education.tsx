"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EducationItem {
  id: number
  degree: string
  institution: string
  start_date: string
  end_date: string | null
  description: string
  is_current: boolean
}

export function Education() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/education/")
        const data = await response.json()
        const eduList = Array.isArray(data) ? data : data.results || []
        setEducation(eduList)
      } catch (error) {
        console.log("[v0] Error fetching education, using fallback data:", error)
        // Fallback to local data if API is not available
        const educationData: EducationItem[] = [
          {
            id: 1,
            degree: "Bachelor of Science in Computer Science & Engineering",
            institution: "University of Scholars",
            start_date: "2021-01-15",
            end_date: "2024-12-15",
            description:
              "Focused on full-stack development, algorithms, and software engineering principles. Completed projects in web development, database design, and system architecture.",
            is_current: false,
          },
          {
            id: 2,
            degree: "Advanced Diploma in Information Technology",
            institution: "Ideal College",
            start_date: "2019-06-01",
            end_date: "2021-01-15",
            description:
              "Foundation in programming languages, web development, and IT fundamentals. Built strong coding practices and problem-solving skills.",
            is_current: false,
          },
        ]
        setEducation(educationData)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-32 bg-card rounded-lg animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section id="education" className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Education</h2>
          <p className="text-muted-foreground mb-12">My academic journey and learning experiences</p>
        </motion.div>

        <div className="space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-border p-6 rounded-lg hover:bg-card/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.degree}</h3>
                  <p className="text-accent font-medium mb-3">{item.institution}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {new Date(item.start_date).toLocaleDateString("en-US", { year: "numeric", month: "short" })} →{" "}
                    {item.is_current
                      ? "Present"
                      : new Date(item.end_date!).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">{item.description}</p>
                </div>
                {item.is_current && (
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full whitespace-nowrap">
                    Current
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
