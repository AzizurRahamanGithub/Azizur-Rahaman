"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="liquid-glass-header fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          AR
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm text-gray-300 hover:text-white transition">
            About
          </Link>
          <Link href="#projects" className="text-sm text-gray-300 hover:text-white transition">
            Projects
          </Link>
          <Link href="#experience" className="text-sm text-gray-300 hover:text-white transition">
            Experience
          </Link>
          <Link href="#courses" className="text-sm text-gray-300 hover:text-white transition">
            Courses
          </Link>
          <Link href="#agency" className="text-sm text-gray-300 hover:text-white transition">
            My Agency
          </Link>
          <Link href="#contact" className="text-sm text-gray-300 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur border-b border-white/10">
          <div className="flex flex-col gap-4 p-4">
            <Link href="#about" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link
              href="#projects"
              className="text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#courses"
              className="text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link href="#agency" className="text-gray-300 hover:text-white transition" onClick={() => setIsOpen(false)}>
              My Agency
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
