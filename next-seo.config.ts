import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s | Wyatt Works Method",
  defaultTitle: "From Idea to Impact — Wyatt Works Method",
  description: "Transform your ideas into impactful brands with our proven 4-phase methodology. Interactive blueprints, templates, and step-by-step guidance to build a brand that matters.",
  canonical: "https://method.wyatt-works.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://method.wyatt-works.com",
    siteName: "Wyatt Works Method",
    title: "From Idea to Impact — Wyatt Works Method",
    description: "Transform your ideas into impactful brands with our proven 4-phase methodology. Interactive blueprints, templates, and step-by-step guidance.",
    images: [
      {
        url: "https://method.wyatt-works.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "From Idea to Impact - The Wyatt Works Method",
        type: "image/png",
      },
    ],
  },
  twitter: { 
    cardType: "summary_large_image",
    site: "@wyattworks",
    handle: "@wyattworks",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "brand building, entrepreneurship, business strategy, personal brand, startup, marketing, brand strategy, business growth, entrepreneur, brand development",
    },
    {
      name: "author",
      content: "Wyatt Works",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
  ],
};

export default config;
