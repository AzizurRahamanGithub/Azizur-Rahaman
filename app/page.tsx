import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { Courses } from "@/components/courses"
import { Blog } from "@/components/blog"
import { Agency } from "@/components/agency"
import { Contact } from "@/components/contact"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

export const dynamic = "force-static"

export default function Page() {
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://azizur.dev/",
    name: "Azizur Rahaman - Full Stack Developer",
    description:
      "Portfolio of Azizur Rahaman - Full stack developer specializing in web development, 3D animations, and digital experiences.",
    url: "https://azizur.dev/",
    mainEntity: {
      "@type": "Person",
      name: "Azizur Rahaman",
      url: "https://azizur.dev",
      jobTitle: "Full Stack Developer",
      sameAs: ["https://github.com/azizur", "https://linkedin.com/in/azizur"],
    },
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <About />
        <Skills/>
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Blog />
        <Courses />
        <Agency />
        <Contact />
        <AppverseFooter />
      </main>

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
