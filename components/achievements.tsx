"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Award, Medal, Star } from "lucide-react"
import Head from "next/head"

interface Achievement {
  id: number
  title: string
  description: string
  issuer: string
  date: string
  achievement_type: string
}

const achievementIcons: Record<string, React.ReactNode> = {
  award: <Trophy className="w-5 h-5" />,
  certification: <Medal className="w-5 h-5" />,
  competition: <Star className="w-5 h-5" />,
  recognition: <Award className="w-5 h-5" />,
}

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/achievements/")
        const data = await response.json()
        const achList = Array.isArray(data) ? data : data.results || []
        setAchievements(achList)
      } catch (error) {
        console.log("[v0] Error fetching achievements, using fallback data:", error)
        const achievementsData: Achievement[] = [
          {
            id: 1,
            title: "ICPC 2024 - International Collegiate Programming Contest",
            description:
              "Participated in the prestigious ICPC competition, solving complex algorithmic problems under time pressure.",
            issuer: "International Collegiate Programming Contest",
            date: "2024-03-15",
            achievement_type: "competition",
          },
          {
            id: 2,
            title: "Most Improved Award 2023",
            description:
              "Recognized for exceptional growth and improvement in academic performance and technical skills throughout the year.",
            issuer: "University of Scholars",
            date: "2023-12-20",
            achievement_type: "award",
          },
          {
            id: 3,
            title: "First Delivered Award",
            description:
              "Awarded for delivering the first successful project implementation ahead of schedule with excellent quality standards.",
            issuer: "Betopia Group",
            date: "2023-06-10",
            achievement_type: "recognition",
          },
          {
            id: 4,
            title: "Full Stack Development Certification",
            description:
              "Completed comprehensive certification program covering modern web development, databases, and cloud technologies.",
            issuer: "Professional Development Institute",
            date: "2023-09-05",
            achievement_type: "certification",
          },
        ]
        setAchievements(achievementsData)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
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
    <>
      {/* SEO Optimized Meta Tags */}
      <Head>
        <title>Azizur Rahaman - Achievements and Awards</title>
        <meta name="description" content="Explore the professional achievements and awards of Azizur Rahaman, a skilled developer and problem solver." />
        <meta property="og:title" content="Azizur Rahaman - Achievements and Awards" />
        <meta property="og:description" content="Explore the professional achievements and awards of Azizur Rahaman, a skilled developer and problem solver." />
        <meta property="og:image" content="/assets/azizur-image.jpg" />
        <meta property="og:url" content="https://azizur-rahaman.vercel.app" />
        <meta name="twitter:title" content="Azizur Rahaman - Achievements and Awards" />
        <meta name="twitter:description" content="Explore the professional achievements and awards of Azizur Rahaman." />
        <meta name="twitter:image" content="/assets/azizur-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Azizur Rahaman" />
      </Head>

      <section id="achievements" className="py-20 px-4 md:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Achievements & Awards</h2>
            <p className="text-muted-foreground mb-12">Recognition and milestones in my professional journey</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-border p-6 rounded-lg hover:bg-card/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    {achievementIcons[item.achievement_type] || achievementIcons.award}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.issuer}</p>
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{item.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
