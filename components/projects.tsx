"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  tags_list: string[]
  category: string
  image: string
  link: string
}

const categories = ["all", "full-stack", "frontend", "backend"]

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/projects/")
        const data = await response.json()
        const projectList = Array.isArray(data) ? data : data.results || []
        setProjects(projectList)
      } catch (error) {
        console.log("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)

  if (loading) return null

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Projects</h2>

        <div className="flex gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg transition capitalize font-medium text-sm ${
                activeCategory === cat ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat === "full-stack" ? "Full Stack" : cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <a
              key={project.id}
              href={project.link || "#"}
              className="glass-border rounded-lg overflow-hidden hover:border-white/30 transition group"
            >
              <div className="aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags_list?.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags_list && project.tags_list.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                      +{project.tags_list.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
