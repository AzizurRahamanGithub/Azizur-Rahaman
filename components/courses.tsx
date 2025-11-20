"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code2, BookOpen, Zap } from "lucide-react"

interface Course {
  id: number
  title: string
  provider: string
  description: string
  course_url: string
  certificate_url: string
  thumbnail: string
  category: string
  progress: number
  start_date: string
  expected_end_date: string
  is_active: boolean
}

const categoryIcons: Record<string, React.ReactNode> = {
  "web-dev": <Code2 className="w-5 h-5" />,
  "mobile-dev": <Zap className="w-5 h-5" />,
  "data-science": <BookOpen className="w-5 h-5" />,
  "ai-ml": <Zap className="w-5 h-5" />,
  devops: <Code2 className="w-5 h-5" />,
  design: <BookOpen className="w-5 h-5" />,
  other: <Code2 className="w-5 h-5" />,
}

const categoryLabels: Record<string, string> = {
  "web-dev": "Web Development",
  "mobile-dev": "Mobile Development",
  "data-science": "Data Science",
  "ai-ml": "AI & Machine Learning",
  devops: "DevOps",
  design: "Design",
  other: "Other",
}

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced React Performance",
      provider: "Udemy",
      description: "Master React optimization techniques and build high-performance applications",
      course_url: "https://udemy.com",
      certificate_url: "https://udemy.com",
      thumbnail: "/react-performance-course.jpg",
      category: "web-dev",
      progress: 75,
      start_date: "2024-01-15",
      expected_end_date: "2024-12-31",
      is_active: true,
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      provider: "Coursera",
      description: "Comprehensive ML course covering supervised and unsupervised learning",
      course_url: "https://coursera.org",
      certificate_url: "https://coursera.org",
      thumbnail: "/machine-learning-concept.png",
      category: "ai-ml",
      progress: 60,
      start_date: "2024-02-01",
      expected_end_date: "2024-11-30",
      is_active: true,
    },
    {
      id: 3,
      title: "DevOps with Kubernetes",
      provider: "Linux Academy",
      description: "Learn Docker, Kubernetes, and cloud deployment best practices",
      course_url: "https://linuxacademy.com",
      certificate_url: "https://linuxacademy.com",
      thumbnail: "/devops-kubernetes.jpg",
      category: "devops",
      progress: 45,
      start_date: "2024-03-10",
      expected_end_date: "2025-01-31",
      is_active: true,
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      provider: "Skillshare",
      description: "Master modern design principles and create beautiful user experiences",
      course_url: "https://skillshare.com",
      certificate_url: "https://skillshare.com",
      thumbnail: "/ui-ux-design-concept.png",
      category: "design",
      progress: 85,
      start_date: "2024-01-01",
      expected_end_date: "2024-10-15",
      is_active: true,
    },
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const response = await fetch(`${apiUrl}/api/courses/`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) throw new Error("Failed to fetch courses")
        const data = await response.json()
        const coursesList = Array.isArray(data) ? data : data.results || []
        if (coursesList.length > 0) {
          setCourses(coursesList)
        }
        setError(null)
      } catch (err) {
        console.log("[v0] Using fallback courses data")
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) return null

  return (
    <section
      id="courses"
      className="relative py-20 px-4 md:px-6 lg:px-8 bg-transparent "
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Active Courses</h2>
          <p className="text-lg text-gray-400 text-pretty">Continuously learning and improving my skills</p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              {/* Thumbnail */}
              {course.thumbnail && (
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-400">{course.provider}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400 border border-blue-500/30">
                    {categoryIcons[course.category]}
                    <span>{categoryLabels[course.category]}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-semibold text-blue-400">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="text-xs text-gray-400 mb-4 space-y-1">
                  <p>Started: {new Date(course.start_date).toLocaleDateString()}</p>
                  {course.expected_end_date && (
                    <p>Expected: {new Date(course.expected_end_date).toLocaleDateString()}</p>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {course.course_url && (
                    <a
                      href={course.course_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-semibold rounded border border-blue-500/30 hover:border-blue-500 transition-all"
                    >
                      View Course
                    </a>
                  )}
                  {course.certificate_url && (
                    <a
                      href={course.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-semibold rounded border border-green-500/30 hover:border-green-500 transition-all"
                    >
                      Certificate
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {error && <div className="text-center text-red-400 mt-8">{error}</div>}
      </div>
    </section>
  )
}
