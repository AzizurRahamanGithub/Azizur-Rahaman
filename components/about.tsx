"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image" // Next.js Image Component for better image optimization

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
          profile_photo: "/azizur rahaman softwear developer azizur.dev.png",
          bio_paragraphs:
            "Hi, I'm Azizur Rahaman, a passionate full-stack web and app developer with over 3 years of experience creating exceptional digital experiences. I'm the founder of Softimize Digital Agency, specializing in innovative web development solutions. My skills span from backend development to crafting interactive front-end interfaces, and I thrive on building projects that provide real value to users. I am always learning and improving, keeping up with the latest technologies and trends in the web development ecosystem.",
          achievements:
            "Over 3 years of professional experience\nFounder of Softimize Digital Agency\nOpen source contributor\nExpert in React, Node.js, Django, and MongoDB\nSpecialized in performance optimization and responsive design",
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
    <>
      {/* SEO meta tags */}
      <Head>
        <title>{about?.title} | Azizur Rahaman - Full Stack Developer</title>
        <meta name="description" content={`Learn more about Azizur Rahaman, a passionate Full Stack Developer. Discover his achievements, projects, and experience.`} />
        <meta property="og:title" content={about?.title} />
        <meta property="og:description" content={`Learn more about Azizur Rahaman, a passionate Full Stack Developer. Discover his achievements, projects, and experience.`} />
        <meta property="og:image" content={about?.profile_photo || "/placeholder-image.jpg"} />
        <meta property="og:url" content="https://yourwebsite.com/about" />
        <meta name="twitter:title" content={about?.title} />
        <meta name="twitter:description" content={`Learn more about Azizur Rahaman, a passionate Full Stack Developer.`} />
        <meta name="twitter:image" content={about?.profile_photo || "/placeholder-image.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Azizur Rahaman",
              jobTitle: "Full Stack Developer",
              image: about?.profile_photo || "/placeholder-image.jpg",
              description: `Azizur Rahaman is a Full Stack Developer with over 3 years of experience, founder of Softimize, and passionate about building innovative web applications.`,
              url: "https://yourwebsite.com/about",
              sameAs: [
                "https://www.linkedin.com/in/programmer-azizur-rahaman",
                "https://github.com/AzizurRahamanGithub",
                "https://www.instagram.com/_azizur_rahaman_/"
              ],
            }),
          }}
        />
      </Head>

      <section
        id="about"
        className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">{about?.title}</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {about?.profile_photo && (
                <div className="glass-border-subtle p-4 rounded-xl overflow-hidden">
                  <Image
                    src={about.profile_photo || "/placeholder.svg"}
                    alt="Azizur Rahaman - Profile"
                    width={400}
                    height={400}
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
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col gap-5 *:text-center">
                <Link 
                    className="inline-block px-6 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition text-nowrap"
                  href="https://drive.google.com/file/d/1o4Qr7sZq98I_m5Y1r-r91QZj4WhUosfE/view?usp=sharing"
                  target="_blank"
                  passHref
                >
                  
                    Preview Resume
                </Link>
                
                <Link  download="Full Stack App & Web Developer Azizur Rahaman.pdf"
                    className="inline-block px-6 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition text-nowrap"
                  href="/files/Azizur-Rahaman-Resume-7_11_2025.pdf"
                  passHref
                >
                    Download Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
