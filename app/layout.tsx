import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Azizur Rahaman | Full-Stack Web & App Developer | Founder of Softimize",
  description:
    "Hi, I'm Azizur Rahaman — a full-stack web & app developer with 3+ years of experience. Founder of Softimize Digital Agency, specializing in modern web apps, APIs, and creative digital experiences.",
  keywords: [
    "Azizur Rahaman",
    "Full Stack Developer",
    "Web Developer Bangladesh",
    "Django Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "API Developer",
    "Softimize",
    "Portfolio Developer",
    "MERN Developer",
    "Software Developer",
  ],
  authors: [{ name: "Azizur Rahaman", url: "https://azizur-rahaman.vercel.app" }],
  icons: {
    icon: "/icons/favicon-light.svg",
    shortcut: "/icons/favicon-light.svg",
  },
  metadataBase: new URL("https://azizur-rahaman.vercel.app"),
  openGraph: {
    title: "Azizur Rahaman | Full-Stack Developer & Creative Technologist",
    description:
      "Full-stack developer building modern websites, web apps, and creative digital experiences. Founder of Softimize Digital Agency.",
    url: "https://azizur-rahaman.vercel.app",
    siteName: "Azizur Rahaman Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azizur Rahaman Portfolio",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://azizur-rahaman.vercel.app",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload custom font */}
        <link
          rel="preload"
          href="/fonts/Geist.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://azizur-rahaman.vercel.app" />

        {/* Dynamic Favicon */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const icon = darkMode ? '/icons/favicon-dark.svg' : '/icons/favicon-light.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
              }
              link.href = icon;
            }
            updateFavicon();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P9SSSZ86');
          `}
        </Script>

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R"></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LV22900R');
          `}
        </Script>

        {/* JSON-LD Structured Data (Boost SEO + Google Knowledge Panel) */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Azizur Rahaman",
            url: "https://azizur-rahaman.vercel.app",
            jobTitle: "Full-Stack Web Developer",
            worksFor: {
              "@type": "Organization",
              name: "Softimize Digital Agency",
            },
            sameAs: [
              "https://www.linkedin.com/in/programmer-azizur-rahaman/",
              "https://github.com/azizurrahamangithub",
              "https://x.com/az_rahaman",
              "https://www.facebook.com/azizur.rahaman.240729",
              "https://www.instagram.com/_azizur_rahaman_/",
            ],
          })}
        </Script>

      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9SSSZ86"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 bg-black">
            <Plasma color="#3b82f6" speed={0.8} direction="forward" scale={1.5} opacity={0.3} mouseInteractive={true} />
          </div>

          <div className="relative z-10">{children}</div>
        </Suspense>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
