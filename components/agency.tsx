"use client"

export function Agency() {
  const clients = [
    { name: "TechStartup Inc", country: "USA" },
    { name: "GlobalBrand Ltd", country: "UK" },
    { name: "InnovateCo", country: "Canada" },
    { name: "DigitalSolutions", country: "Australia" },
    { name: "CreativeStudio", country: "Germany" },
    { name: "WebInnovators", country: "Singapore" },
  ]

  const caseStudies = [
    {
      id: 1,
      title: "SaaS Platform Redesign",
      client: "TechStartup Inc",
      country: "USA",
      description: "Complete redesign and optimization of a SaaS platform resulting in 3x user engagement increase.",
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
      results: ["40% faster load times", "3x engagement growth", "50% reduction in support tickets"],
      link: "#",
    },
    {
      id: 2,
      title: "E-Commerce Performance Optimization",
      client: "GlobalBrand Ltd",
      country: "UK",
      description:
        "Optimized e-commerce platform for high traffic events. Implemented advanced caching and CDN strategies.",
      technologies: ["Next.js", "Redis", "MongoDB", "Vercel"],
      results: ["99.9% uptime", "2x conversion increase", "$500K additional revenue"],
      link: "#",
    },
    {
      id: 3,
      title: "3D Product Visualization",
      client: "InnovateCo",
      country: "Canada",
      description: "Built interactive 3D product visualizer that increased customer confidence and reduced returns.",
      technologies: ["Three.js", "React", "GSAP", "TypeScript"],
      results: ["35% increase in product views", "15% higher conversion", "Industry award for innovation"],
      link: "#",
    },
  ]

  return (
    <section
      id="agency"
      className="py-20 md:py-32 px-4 md:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* About Softimize */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Softimize Digital Agency</h2>
            <div className="glass-border rounded-lg p-8 md:p-10 h-full">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Softimize is a digital agency dedicated to delivering cutting-edge web solutions, 3D animations, and
                innovative digital experiences for startups and enterprises worldwide.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We specialize in full-stack development, interactive web design, and creative technology solutions that
                help brands stand out and achieve their digital goals.
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Services</h3>
            <div className="grid gap-6">
              {[
                { title: "Web Development", desc: "Full-stack development with modern tech stack" },
                { title: "3D Animation", desc: "Interactive 3D experiences and visualizations" },
                { title: "UI/UX Design", desc: "Beautiful and functional digital interfaces" },
                { title: "Performance Optimization", desc: "Lightning-fast web applications" },
                { title: "API Development", desc: "Scalable backend services and integrations" },
                { title: "Consulting", desc: "Technical strategy and architecture guidance" },
              ].map((service, i) => (
                <div key={i} className="glass-border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white">Featured Case Studies</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <a
                key={study.id}
                href={study.link}
                className="glass-border rounded-lg p-8 hover:border-white/30 transition group block h-full"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition mb-1">
                      {study.title}
                    </h4>
                    <p className="text-blue-400">
                      {study.client} • {study.country}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{study.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3 font-medium">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-3 font-medium">Results</p>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Global Clients */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white">Global Clients</h3>
          <div className="overflow-hidden">
            <div className="animate-scroll flex gap-4 w-max">
              {/* First set of clients */}
              {clients.map((client) => (
                <div
                  key={`${client.name}-1`}
                  className="glass-border rounded-lg p-4 text-center hover:border-white/30 transition flex-shrink-0 w-48"
                >
                  <p className="font-semibold text-white text-sm">{client.name}</p>
                  <p className="text-xs text-gray-400">{client.country}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client) => (
                <div
                  key={`${client.name}-2`}
                  className="glass-border rounded-lg p-4 text-center hover:border-white/30 transition flex-shrink-0 w-48"
                >
                  <p className="font-semibold text-white text-sm">{client.name}</p>
                  <p className="text-xs text-gray-400">{client.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
