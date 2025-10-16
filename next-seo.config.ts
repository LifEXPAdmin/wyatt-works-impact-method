import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s | Wyatt Works Method",
  defaultTitle: "From Idea to Impact — Wyatt Works Method",
  description: "A living, interactive blueprint to build your brand from idea to impact.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://method.wyatt-works.com",
    siteName: "Wyatt Works Method",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "From Idea to Impact - The Wyatt Works Method",
      },
    ],
  },
  twitter: { 
    cardType: "summary_large_image",
    handle: "@wyattworks"
  },
};

export default config;
