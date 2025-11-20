"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

const categories = ["all", "full-stack", "frontend", "backend"] as const

type Category = typeof categories[number]

interface Project {
  id: number
  title: string
  description: string
  tags_list: string[]
  category: Category
  image: string
  link: string
  github_link?: string
  live_demo?: string
  features?: string[]
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [visibleCount, setVisibleCount] = useState(6)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  // Enhanced projects data with Azizur Rahaman's real links
  const projects: Project[] = [
    // Full Stack Projects
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard built by Azizur Rahaman",
      tags_list: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express"],
      category: "full-stack",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/ecommerce-platform",
      github_link: "https://github.com/AzizurRahamanGithub/ecommerce-platform",
      live_demo: "https://azizur-ecommerce.vercel.app",
      features: [
        "User authentication & authorization",
        "Payment integration with Stripe",
        "Admin dashboard for product management",
        "Shopping cart & order tracking",
        "Responsive design for all devices"
      ]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features by Azizur Rahaman",
      tags_list: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Redis", "JWT"],
      category: "full-stack",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/task-manager",
      github_link: "https://github.com/AzizurRahamanGithub/task-manager",
      live_demo: "https://azizur-tasks.vercel.app",
      features: [
        "Real-time collaboration",
        "Drag & drop interface",
        "Team management system",
        "Progress tracking & analytics",
        "File attachments & comments"
      ]
    },
    
    // Frontend Projects
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive charts by Azizur Rahaman",
      tags_list: ["React", "Chart.js", "API", "CSS3", "Responsive", "TypeScript"],
      category: "frontend",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/weather-dashboard",
      github_link: "https://github.com/AzizurRahamanGithub/weather-dashboard",
      live_demo: "https://azizur-weather.vercel.app",
      features: [
        "Location-based weather data",
        "Interactive charts & graphs",
        "7-day forecast display",
        "Dark/light theme toggle",
        "Progressive Web App"
      ]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Modern portfolio website with smooth animations and dark/light mode by Azizur Rahaman",
      tags_list: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "SEO"],
      category: "frontend",
      image: "/placeholder.svg",
      link: "https://azizur-rahaman.vercel.app",
      github_link: "https://github.com/AzizurRahamanGithub/portfolio",
      live_demo: "https://azizur-rahaman.vercel.app",
      features: [
        "Smooth animations with Framer Motion",
        "SEO optimized for search engines",
        "Responsive design",
        "Contact form integration",
        "Project showcase gallery"
      ]
    },
    {
      id: 5,
      title: "Music Player UI",
      description: "Spotify-inspired music player interface with playlist management by Azizur Rahaman",
      tags_list: ["React", "Context API", "CSS Grid", "Audio API", "PWA"],
      category: "frontend",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/music-player",
      github_link: "https://github.com/AzizurRahamanGithub/music-player",
      live_demo: "https://azizur-music.vercel.app",
      features: [
        "Spotify-like user interface",
        "Playlist creation & management",
        "Audio visualization",
        "Offline PWA capability",
        "Cross-platform compatibility"
      ]
    },
    
    // Backend Projects
    {
      id: 6,
      title: "REST API Service",
      description: "Scalable REST API with authentication, rate limiting, and comprehensive documentation by Azizur Rahaman",
      tags_list: ["Node.js", "Express", "JWT", "Swagger", "MongoDB", "Docker"],
      category: "backend",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/rest-api",
      github_link: "https://github.com/AzizurRahamanGithub/rest-api",
      features: [
        "JWT authentication system",
        "Rate limiting & security",
        "Comprehensive API documentation",
        "Docker containerization",
        "MongoDB database integration"
      ]
    },
    {
      id: 7,
      title: "Authentication Microservice",
      description: "Microservice handling user authentication with OAuth2 and social login by Azizur Rahaman",
      tags_list: ["Python", "FastAPI", "OAuth2", "PostgreSQL", "Docker", "JWT"],
      category: "backend",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/auth-service",
      github_link: "https://github.com/AzizurRahamanGithub/auth-service",
      features: [
        "OAuth2 & social login integration",
        "Multi-factor authentication",
        "Session management",
        "Secure password hashing",
        "Microservice architecture"
      ]
    },
    {
      id: 8,
      title: "Real-time Chat Server",
      description: "WebSocket server for real-time messaging with room management by Azizur Rahaman",
      tags_list: ["Socket.io", "Node.js", "Redis", "JWT", "WebSockets", "Express"],
      category: "backend",
      image: "/placeholder.svg",
      link: "https://github.com/AzizurRahamanGithub/chat-server",
      github_link: "https://github.com/AzizurRahamanGithub/chat-server",
      features: [
        "Real-time messaging with WebSockets",
        "Room-based chat system",
        "Message persistence",
        "User presence indicators",
        "File sharing capability"
      ]
    }
  ]

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)
  const visibleProjects = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    setVisibleCount(6)
    setExpandedProject(null)
  }

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  const toggleProjectExpand = (projectId: number) => {
    setExpandedProject(prev => prev === projectId ? null : projectId)
  }

  return (
    <>
      {/* SEO Optimized Head */}
      <Head>
        <title>Projects by Azizur Rahaman - Full Stack Developer</title>
        <meta name="description" content="Explore the full stack, frontend, and backend projects by Azizur Rahaman. Learn about my work and see the technologies used." />
        <meta property="og:title" content="Projects by Azizur Rahaman - Full Stack Developer" />
        <meta property="og:description" content="Explore the full stack, frontend, and backend projects by Azizur Rahaman. Learn about my work and see the technologies used." />
        <meta property="og:image" content="/assets/projects-image.jpg" />
        <meta property="og:url" content="https://azizur-rahaman.vercel.app/projects" />
        <meta name="twitter:title" content="Projects by Azizur Rahaman - Full Stack Developer" />
        <meta name="twitter:description" content="Explore the full stack, frontend, and backend projects by Azizur Rahaman." />
        <meta name="twitter:image" content="/assets/projects-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section id="projects" className="py-20 md:py-32 px-4 md:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Projects by Azizur Rahaman
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Full Stack Developer & Problem Solver - Building modern web applications with cutting-edge technologies
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-3 mb-12 flex-wrap justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 capitalize font-medium text-sm border ${
                  activeCategory === cat 
                    ? "bg-blue-500 hover:bg-blue-600 text-white transparent shadow-lg shadow-blue-600/25" 
                    : "bg-blue-800/10 text-blue-400 border-white/20 hover:bg-blue-500/20 hover:border-blue-800/80"
                }`}
              >
                {cat === "full-stack" ? "Full Stack" : cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-white/10 hover:border-blue-500/30 h-auto flex flex-col">
                    
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} - Project by Azizur Rahaman`}
                        width={400}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                        className="group-hover:scale-110 transition duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex flex-col" style={{ minHeight: 'min-content' }}>
                      <div className="flex-grow-0">
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h2>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags_list?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 transition"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Expanded Features */}
                        <AnimatePresence>
                          {expandedProject === project.id && project.features && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                              <ul className="space-y-2">
                                {project.features.map((feature, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-gray-300"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-white/10 mt-auto">
                        <button
                          onClick={() => toggleProjectExpand(project.id)}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          {expandedProject === project.id ? 'Show Less' : 'See More'}
                          <motion.svg
                            animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                        
                        <div className="flex gap-2">
                          {project.github_link && (
                            <Link target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                                aria-label={`View ${project.title} on GitHub`} href={project.github_link} passHref>
                              
                          
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                          )}
                          
                          {project.live_demo && (
                            <Link target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transparent transition-colors text-sm font-bold flex items-center justify-center gap-1" href={project.live_demo} passHref>
                              
                                <span>Live</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <button
                onClick={handleViewMore}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 font-medium shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35"
              >
                View More Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
