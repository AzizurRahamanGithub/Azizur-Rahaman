"use client"

import { useState, useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  featured_image: string
  category: string
  read_time: number
  created_at: string
  slug: string
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/blog-posts/featured/")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setPosts(Array.isArray(data) ? data : data.results || [])
      } catch (error) {
        console.log("[v0] Error fetching blog posts, using fallback:", error)
        setPosts([
          {
            id: 1,
            title: "Building Interactive 3D Web Experiences with Three.js",
            excerpt:
              "Learn how to create stunning 3D visualizations on the web using Three.js. A comprehensive guide to getting started.",
            featured_image: "/3d-web-visualization.jpg",
            category: "Tutorial",
            read_time: 8,
            created_at: "2024-12-15",
            slug: "3d-web-experiences",
          },
          {
            id: 2,
            title: "Optimizing React Performance: From Theory to Practice",
            excerpt:
              "Dive deep into React optimization techniques. Discover memoization, code splitting, and profiling strategies that work.",
            featured_image: "/react-optimization.jpg",
            category: "Technical",
            read_time: 10,
            created_at: "2024-12-08",
            slug: "react-performance",
          },
          {
            id: 3,
            title: "The Future of Web Animation: GSAP vs Native APIs",
            excerpt:
              "Comparing popular animation libraries and native browser APIs. Which one should you choose for your next project?",
            featured_image: "/web-animation.jpg",
            category: "Comparison",
            read_time: 6,
            created_at: "2024-11-28",
            slug: "web-animation",
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogPosts()
  }, [])

  if (loading) return null

  return (
    <section id="blog" className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Blog & Articles</h2>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <a
                key={post.id}
                href={`#blog/${post.slug}`}
                className="glass-border rounded-lg overflow-hidden hover:border-white/30 transition block group"
              >
                <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
                  {post.featured_image && (
                    <div className="w-full md:w-48 h-40 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={post.featured_image || "/placeholder.svg?height=200&width=400&query=blog"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-3 leading-relaxed text-sm md:text-base">{post.excerpt}</p>

                    <span className="text-sm text-gray-500">{post.read_time} min read</span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No blog posts available yet.</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#blog"
            className="inline-block px-8 py-3 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition font-medium"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  )
}
