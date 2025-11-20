"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

interface Experience {
  id: number
  title: string
  company: string
  location?: string
  period: string
  description: string
  achievements_list: string[]
  technologies: string[]
  is_current: boolean
}

interface EducationItem {
  id: number
  degree: string
  institution: string
  location?: string
  start_date: string
  end_date: string | null
  description: string
  achievements_list: string[]
  is_current: boolean
}

export function EducationExperience() {
  const [education, setEducation] = useState<EducationItem[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedEdu, setExpandedEdu] = useState<number[]>([])
  const [expandedExp, setExpandedExp] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch education
        const eduResponse = await fetch("http://localhost:8000/api/education/") // Replace with actual API
        const eduData = await eduResponse.json()
        const eduList = Array.isArray(eduData) ? eduData : eduData.results || []

        // Fetch experience
        const expResponse = await fetch("http://localhost:8000/api/experience/") // Replace with actual API
        const expData = await expResponse.json()
        const expList = Array.isArray(expData) ? expData : expData.results || []

        setEducation(eduList.length > 0 ? eduList : fallbackEducation)
        setExperience(expList.length > 0 ? expList : fallbackExperience)
        
        if (eduList.length > 0) setExpandedEdu([eduList[0].id])
        if (expList.length > 0) setExpandedExp([expList[0].id])
      } catch (error) {
        console.log("Error fetching data, using fallback:", error)
        setEducation(fallbackEducation)
        setExperience(fallbackExperience)
        setExpandedEdu([1])
        setExpandedExp([1])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleEdu = (id: number) => {
    setExpandedEdu(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleExp = (id: number) => {
    setExpandedExp(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

const fallbackEducation: EducationItem[] = [ { id: 1, degree: "Diploma in Computer Science", institution: "Mymensingh Polytechnic Institute", location: "Mymensingh", start_date: "2021-01-01", end_date: "2025-12-31", description: "", achievements_list: [ "CGPA: 3.8 / 4.0", "Active in programming clubs", "Project-based learning" ], is_current: true, }, { id: 2, degree: "CSE Fundamentals Certificate", institution: "Phitron.io", location: "Online", start_date: "2023-01-01", end_date: "2023-12-31", description: "", achievements_list: [ "CGPA: 4.0 / 4.0", "Problem Solving", "OOP Concepts" ], is_current: false, } ] 

const fallbackExperience: Experience[] = [ { 
  
  id: 1, title: "Back-End Developer", company: "Betopia Group", location: "Dhaka, Banasree", period: "MAY 2025 - Present", description: "Built RESTful APIs and scalable backend architecture for enterprise clients using Django. Set up PostgreSQL performance optimization and Docker-based CI/CD pipelines.", achievements_list: [ "Built RESTful APIs and scalable backend architecture for enterprise clients using Django", "Set up PostgreSQL performance optimization and Docker-based CI/CD pipelines", "Implemented microservices architecture with Redis and Celery for task processing", "Collaborated with frontend teams to deliver seamless full-stack solutions" ], technologies: ["Django", "PostgreSQL", "Docker", "Redis", "AWS"], is_current: true, }, 

{ id: 2, title: "Front-End Developer", company: "Free Ecom", location: "Dhaka, Malibag", period: "FEB 2024 - JAN 2025", description: "Provided professional video editing services for various clients.", achievements_list: [ "Edited 50+ videos for various clients", "Maintained 5-star rating on platform", "Specialized in promotional and content videos" ], technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"], is_current: false, }, 

{ id: 3, title: "Front-End Developer (Intern)", company: "YES TO PEOPLE", location: "Dhaka, Dhanmondi ", period: "NOV 2022 - JAN 2023", description: "Provided professional video editing services for various clients.", achievements_list: [ "Edited 50+ videos for various clients", "Maintained 5-star rating on platform", "Specialized in promotional and content videos" ], technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"], is_current: false, } ]

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
    <>
      {/* SEO Optimized Meta Tags */}
      <Head>
        <title>Azizur Rahaman - Developer Portfolio</title>
        <meta name="description" content="Explore projects, education, and experience of Azizur Rahaman, a passionate full-stack developer." />
        <meta property="og:title" content="Azizur Rahaman - Developer Portfolio" />
        <meta property="og:description" content="Explore projects, education, and experience of Azizur Rahaman, a passionate full-stack developer." />
        <meta property="og:image" content="/assets/azizur-image.jpg" />
        <meta property="og:url" content="https://azizur-rahaman.vercel.app" />
        <meta name="twitter:title" content="Azizur Rahaman - Developer Portfolio" />
        <meta name="twitter:description" content="Explore projects, education, and experience of Azizur Rahaman." />
        <meta name="twitter:image" content="/assets/azizur-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section id="education-experience" className="py-20 px-4 md:px-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Main Grid - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Experience Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Work Experience</h2>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-border p-6 rounded-lg hover:bg-card/50 transition-colors"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{exp.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-accent font-medium mb-2">
                        <span className="text-sm sm:text-base">{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className={`text-2xl  hidden sm:inline ${
                      exp.is_current 
                        ? ' text-green-400' 
                        : ' text-blue-400'
                    }`}>•</span>
                            <span className="text-muted-foreground text-xs sm:text-sm">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm whitespace-nowrap px-3 py-1 rounded-full border ${
                      exp.is_current 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Technologies - Horizontal List */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies?.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                    {exp.description}
                  </p>

                  {/* Achievements List with Animation */}
                  <AnimatePresence>
                    {expandedExp.includes(exp.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-4">
                          {exp.achievements_list?.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-start gap-3 text-foreground/80 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Show More/Less Button */}
                  {exp.achievements_list?.length > 0 && (
                    <button
                      onClick={() => toggleExp(exp.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      {expandedExp.includes(exp.id) ? 'Show Less' : 'Show More'}
                      <motion.svg 
                        animate={{ rotate: expandedExp.includes(exp.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Education</h2>

            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-border p-6 rounded-lg hover:bg-card/50 transition-colors"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{item.degree}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-accent font-medium mb-2">
                        <span className="text-sm sm:text-base">{item.institution}</span>
                        {/* {item.location && (
                          <>
                            <span className="text-muted-foreground hidden sm:inline">•</span>
                            <span className="text-muted-foreground text-xs sm:text-sm">{item.location}</span>
                          </>
                        )} */}
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm whitespace-nowrap px-3 py-1 rounded-full border ${
                      item.is_current 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {new Date(item.start_date).getFullYear()} – {item.is_current ? 'Present' : new Date(item.end_date!).getFullYear()}
                    </span>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                      {item.description}
                    </p>
                  )}

                  {/* Achievements List with Animation */}
                  <AnimatePresence>
                    {expandedEdu.includes(item.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-4">
                          {item.achievements_list?.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-start gap-3 text-foreground/80 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Show More/Less Button */}
                  {item.achievements_list?.length > 0 && (
                    <button
                      onClick={() => toggleEdu(item.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      {expandedEdu.includes(item.id) ? 'Show Less' : 'Show More'}
                      <motion.svg 
                        animate={{ rotate: expandedEdu.includes(item.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </section>
    </>
  )
}
