"use client";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

export function SEOProvider() {
  return <DefaultSeo {...SEO} />;
}
