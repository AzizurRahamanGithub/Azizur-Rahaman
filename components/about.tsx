"use client"

import { useState, useEffect } from "react"

interface AboutData {
  id: number
  title: string
  profile_photo: string
  bio_paragraphs: string
  achievements: string
}

export function About() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/about/")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        const aboutData = Array.isArray(data) ? data[0] : data.results?.[0] || data
        setAbout(aboutData)
      } catch (error) {
        console.log("[v0] Error fetching about data, using fallback:", error)
        setAbout({
          id: 1,
          title: "About Me",
          profile_photo: "/professional-headshot.png",
          bio_paragraphs:
            "I'm Azizur Rahaman, a passionate full stack developer with a deep love for crafting beautiful, performant digital experiences.[NEW_PARA]Currently, I'm focused on building innovative web applications and heading Softimize, my digital agency.",
          achievements:
            "Over 5 years of professional experience\nFounder of Softimize Digital Agency\nOpen source contributor",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const bioPoints = about?.bio_paragraphs?.split("[NEW_PARA]") || []

  const achievements = about?.achievements?.split("\n").filter((a) => a.trim()) || []

  if (loading) return null

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {about?.profile_photo && (
              <div className="glass-border-subtle p-4 rounded-xl overflow-hidden">
                <img
                  src={about.profile_photo || "/placeholder.svg"}
                  alt="Azizur Rahaman - Profile"
                  className="w-full h-auto rounded-lg object-cover aspect-square"
                  onError={(e) => {
                    e.currentTarget.src = "/professional-headshot.png"
                  }}
                />
              </div>
            )}
            {bioPoints.map((para, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed text-lg">
                {para.trim()}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-border-subtle p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Key Highlights</h3>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-6 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
