"use client"

import { useEffect, useState } from "react"

interface HeroData {
  title: string
  subtitle: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
}

export function Hero() {
  const [data, setData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/hero/1/")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.log("[v0] Error fetching hero data:", error)
        setData({
          title: "Crafting Digital Experiences",
          subtitle:
            "Full stack developer specializing in interactive web experiences, 3D animations, and innovative digital solutions.",
          cta_primary_text: "View My Work",
          cta_primary_link: "#projects",
          cta_secondary_text: "Get In Touch",
          cta_secondary_link: "#contact",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return null

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 md:py-32 pt-32 md:pt-40">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance">{data?.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-balance leading-relaxed">
            {data?.subtitle}
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <a
            href={data?.cta_primary_link}
            className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
          >
            {data?.cta_primary_text}
          </a>
          <a
            href={data?.cta_secondary_link}
            className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 text-white font-medium transition"
          >
            {data?.cta_secondary_text}
          </a>
        </div>

        <div className="flex justify-center gap-6 pt-8">
          <a
            href="https://github.com"
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  )
}
