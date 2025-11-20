"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import Head from "next/head"
import { motion, AnimatePresence } from "framer-motion"

interface Skill {
  id: number
  name: string
  category: string
  icon: string
  description: string
  officialDoc: string
  proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const skillRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/skills/")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        const skillsList = Array.isArray(data) ? data : data.results || []
        setSkills(skillsList)
      } catch (error) {
        console.log("[v0] Error fetching skills, using fallback:", error)
        setSkills([
          { 
            id: 1, 
            name: "React", 
            category: "frontend", 
            icon: "fab fa-react",
            description: "Modern React with Hooks, Context API, and performance optimization. Built 10+ production applications.",
            officialDoc: "https://react.dev",
            proficiency: "Expert"
          },
          { 
            id: 2, 
            name: "Next.js", 
            category: "frontend", 
            icon: "fas fa-bolt",
            description: "Full-stack React framework with SSR, SSG, and API routes. SEO optimized applications.",
            officialDoc: "https://nextjs.org",
            proficiency: "Advanced"
          },
          { 
            id: 3, 
            name: "TypeScript", 
            category: "frontend", 
            icon: "fab fa-js-square",
            description: "Type-safe JavaScript for scalable applications. Strong typing and better developer experience.",
            officialDoc: "https://www.typescriptlang.org",
            proficiency: "Advanced"
          },
          { 
            id: 4, 
            name: "Tailwind CSS", 
            category: "frontend", 
            icon: "fas fa-palette",
            description: "Utility-first CSS framework for rapid UI development. Responsive design and dark mode support.",
            officialDoc: "https://tailwindcss.com",
            proficiency: "Expert"
          },
          { 
            id: 5, 
            name: "Node.js", 
            category: "backend", 
            icon: "fab fa-node-js",
            description: "Server-side JavaScript runtime. Built RESTful APIs, microservices, and real-time applications.",
            officialDoc: "https://nodejs.org",
            proficiency: "Advanced"
          },
          { 
            id: 6, 
            name: "Django", 
            category: "backend", 
            icon: "fab fa-python",
            description: "High-level Python web framework. MVC architecture, ORM, and built-in admin panel.",
            officialDoc: "https://www.djangoproject.com",
            proficiency: "Intermediate"
          },
          { 
            id: 7, 
            name: "PostgreSQL", 
            category: "database", 
            icon: "fas fa-database",
            description: "Advanced open-source relational database. Complex queries, transactions, and data integrity.",
            officialDoc: "https://www.postgresql.org",
            proficiency: "Advanced"
          },
          { 
            id: 8, 
            name: "MongoDB", 
            category: "database", 
            icon: "fas fa-server",
            description: "NoSQL document database for flexible data models. Aggregation pipeline and indexing.",
            officialDoc: "https://www.mongodb.com",
            proficiency: "Intermediate"
          },
          { 
            id: 9, 
            name: "AWS", 
            category: "cloud", 
            icon: "fab fa-aws",
            description: "Cloud computing services. EC2, S3, Lambda, and cloud infrastructure management.",
            officialDoc: "https://aws.amazon.com",
            proficiency: "Intermediate"
          },
          { 
            id: 10, 
            name: "Docker", 
            category: "tools", 
            icon: "fab fa-docker",
            description: "Containerization platform for consistent development and deployment environments.",
            officialDoc: "https://www.docker.com",
            proficiency: "Intermediate"
          },
          { 
            id: 11, 
            name: "Git", 
            category: "tools", 
            icon: "fab fa-git-alt",
            description: "Version control system. Branch management, collaboration, and CI/CD integration.",
            officialDoc: "https://git-scm.com",
            proficiency: "Expert"
          },
          { 
            id: 12, 
            name: "VS Code", 
            category: "tools", 
            icon: "fas fa-code",
            description: "Code editor with extensive extensions, debugging, and integrated terminal.",
            officialDoc: "https://code.visualstudio.com",
            proficiency: "Expert"
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const handleMouseEnter = (skillId: number) => {
    setHoveredSkill(skillId)
    
    setTimeout(() => {
      const skillElement = skillRefs.current.get(skillId)
      if (skillElement) {
        const rect = skillElement.getBoundingClientRect()
        setTooltipPos({ 
          x: rect.left + rect.width / 2, 
          y: rect.bottom + window.scrollY + 10 
        })
      }
    }, 10)
  }

  const handleMouseMove = (e: React.MouseEvent, skillId: number) => {
    if (hoveredSkill === skillId) {
      setTooltipPos({ 
        x: e.clientX, 
        y: e.clientY + 20 
      })
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other"
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryIcons: Record<string, string> = {
    frontend: "fas fa-desktop",
    backend: "fas fa-server", 
    database: "fas fa-database",
    cloud: "fas fa-cloud",
    tools: "fas fa-tools",
    "app-development": "fas fa-mobile-alt",
    other: "fas fa-star",
  }

  const categoryLabels: Record<string, string> = {
    frontend: "Frontend Development",
    backend: "Backend Development", 
    database: "Database & Storage",
    cloud: "Cloud & Deployment",
    tools: "Tools & Software",
    "app-development": "Mobile Development",
    other: "Other Skills",
  }

  const categoryColors: Record<string, string> = {
    frontend: "text-blue-400",
    backend: "text-green-400",
    database: "text-purple-400", 
    cloud: "text-cyan-400",
    tools: "text-yellow-400",
    "app-development": "text-pink-400",
    other: "text-gray-400",
  }

  const proficiencyColors: Record<string, string> = {
    Beginner: "bg-gray-500",
    Intermediate: "bg-blue-500", 
    Advanced: "bg-green-500",
    Expert: "bg-purple-500"
  }

  const hoveredSkillData = skills.find(s => s.id === hoveredSkill)

  if (loading) {
    return (
      <section id="skills" className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-32 bg-card rounded-lg animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <>
      <Head>
        <title>Technical Skills & Expertise | Azizur Rahaman - Full Stack Developer</title>
        <meta 
          name="description" 
          content="Comprehensive technical skills of Azizur Rahaman including React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, AWS with detailed descriptions and proficiency levels." 
        />
        <meta 
          name="keywords" 
          content="Azizur Rahaman skills, React expert, Next.js developer, Node.js developer, TypeScript, MongoDB, PostgreSQL, AWS, Full Stack Developer Bangladesh, web development skills"
        />
        
        <link rel="canonical" href="https://azizur-rahaman.vercel.app/skills" />
        
        <meta property="og:title" content="Technical Skills & Expertise | Azizur Rahaman" />
        <meta property="og:description" content="Explore detailed technical skills and proficiency levels of Azizur Rahaman in modern web development technologies." />
        <meta property="og:url" content="https://azizur-rahaman.vercel.app/skills" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azizur Rahaman - Technical Skills" />
        <meta name="twitter:description" content="Full Stack Developer skilled in React, Next.js, Node.js, TypeScript and modern web technologies." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Azizur Rahaman",
              "jobTitle": "Full Stack Developer",
              "description": "Skilled Full Stack Developer specializing in modern web technologies",
              "url": "https://azizur-rahaman.vercel.app",
              "sameAs": [
                "https://github.com/AzizurRahamanGithub",
                "https://www.linkedin.com/in/programmer-azizur-rahaman",
                "https://www.instagram.com/_azizur_rahaman_/",
                "https://codeforces.com/profile/Azizur_Rahaman"
              ],
              "knowsAbout": skills.map(skill => ({
                "@type": "Thing",
                "name": skill.name,
                "description": skill.description,
                "url": skill.officialDoc,
                "skillLevel": skill.proficiency
              })),
              "hasOccupation": {
                "@type": "Occupation", 
                "name": "Full Stack Developer",
                "skills": skills.map(skill => skill.name),
                "description": "Web application development using modern technologies"
              }
            }),
          }}
        />
      </Head>

      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        crossOrigin="anonymous"
      />

      <section id="skills" className="py-20 md:py-32 px-4 md:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Technical Skills & Expertise
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Detailed overview of my technical proficiency across modern web development technologies and tools
            </p>
            
            <div className="flex justify-center gap-6 mt-8 flex-wrap">
              {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${proficiencyColors[level]}`}></div>
                  <span className="text-sm text-gray-400">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="glass-border rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${categoryColors[category]}`}>
                  <i className={`${categoryIcons[category]} ${categoryColors[category]}`}></i>
                  {categoryLabels[category] || category}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <div 
                      key={skill.id}
                      ref={(el) => {
                        if (el) {
                          skillRefs.current.set(skill.id, el)
                        } else {
                          skillRefs.current.delete(skill.id)
                        }
                      }}
                      className="relative"
                    >
                      <motion.a
                        href={skill.officialDoc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onMouseEnter={() => handleMouseEnter(skill.id)}
                        onMouseMove={(e) => handleMouseMove(e, skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 cursor-pointer group h-full`}>
                          
                          <div className="text-center">
                            <i className={`${skill.icon} text-3xl mb-3 ${categoryColors[category]} group-hover:text-white transition-colors duration-300`}></i>
                            <h4 className={`text-sm font-semibold ${categoryColors[category]} group-hover:text-white transition-colors duration-300 mb-2`}>
                              {skill.name}
                            </h4>
                            
                            {skill.proficiency && (
                              <div className="flex items-center justify-center gap-1 mb-2">
                                <div className={`w-2 h-2 rounded-full ${proficiencyColors[skill.proficiency]}`}></div>
                                <span className="text-xs text-gray-400">{skill.proficiency}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tooltip - Follows mouse and allows interaction */}
          <AnimatePresence>
            {hoveredSkill !== null && hoveredSkillData && (
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="fixed z-50"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y}px`,
                  transform: 'translateX(-50%)',
                }}
                onMouseEnter={() => setHoveredSkill(hoveredSkill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="bg-gray-900 border border-blue-500/50 rounded-lg p-4 shadow-2xl w-64 backdrop-blur-sm">
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    {hoveredSkillData.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <span className="text-xs text-blue-400">Click to view official docs</span>
                    <i className="fas fa-external-link-alt text-blue-400 text-xs"></i>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 border-l border-t border-blue-500/50 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16">
            <div className="glass-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Continuous Skill Development & Learning Journey
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Development Philosophy</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    As a passionate Full Stack Developer, I believe in continuous learning and staying updated with 
                    the latest technologies and best practices in web development.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-400"></i>
                      <span>Clean, maintainable code following best practices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-400"></i>
                      <span>Performance optimization and SEO considerations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-green-400"></i>
                      <span>Responsive design and cross-browser compatibility</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Technical Focus Areas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <i className="fas fa-rocket text-blue-400"></i>
                      <span>Performance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <i className="fas fa-shield-alt text-green-400"></i>
                      <span>Security</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <i className="fas fa-search text-purple-400"></i>
                      <span>SEO Optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <i className="fas fa-mobile-alt text-yellow-400"></i>
                      <span>Responsive Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}