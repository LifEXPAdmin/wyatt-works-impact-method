"use client";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Download, FileText, Video, Image, Users, BookOpen, Calendar } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const resources = [
  {
    title: "Brand Purpose Worksheet",
    category: "Templates",
    description: "Define your one-sentence purpose and clarify who you serve.",
    icon: FileText,
    type: "PDF Template",
    downloads: "2.3K",
    phase: "Spark",
    featured: true
  },
  {
    title: "Content Calendar Template",
    category: "Templates",
    description: "Plan your content strategy with this comprehensive calendar.",
    icon: Calendar,
    type: "Excel Template",
    downloads: "1.8K",
    phase: "Flow"
  },
  {
    title: "Brand Kit Checklist",
    category: "Checklists",
    description: "Everything you need to create a cohesive brand identity.",
    icon: Image,
    type: "PDF Checklist",
    downloads: "1.5K",
    phase: "Forge"
  },
  {
    title: "Partnership Outreach Script",
    category: "Scripts",
    description: "Professional templates for reaching out to potential partners.",
    icon: Users,
    type: "Email Templates",
    downloads: "1.2K",
    phase: "Impact"
  },
  {
    title: "Video Content Planning Guide",
    category: "Guides",
    description: "Step-by-step guide to creating engaging video content.",
    icon: Video,
    type: "PDF Guide",
    downloads: "980",
    phase: "Flow"
  },
  {
    title: "Complete Method Blueprint",
    category: "Comprehensive",
    description: "The full Wyatt Works Method with all phases and tasks.",
    icon: BookOpen,
    type: "Interactive Tool",
    downloads: "3.1K",
    phase: "All Phases",
    featured: true
  }
];

const categories = [
  { name: "All", count: resources.length },
  { name: "Templates", count: resources.filter(r => r.category === "Templates").length },
  { name: "Checklists", count: resources.filter(r => r.category === "Checklists").length },
  { name: "Guides", count: resources.filter(r => r.category === "Guides").length },
  { name: "Scripts", count: resources.filter(r => r.category === "Scripts").length },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            Resource <span className="text-[var(--gold)]">Library</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Download templates, checklists, and guides to accelerate your brand building journey. Everything you need to implement the Wyatt Works Method.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section 
        className="py-8 border-b border-[var(--border)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.div key={category.name} variants={itemVariants}>
                <Badge 
                  variant={category.name === "All" ? "default" : "secondary"}
                  className="px-4 py-2 cursor-pointer hover:bg-[var(--brand)] hover:text-black transition-colors"
                >
                  {category.name} ({category.count})
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Resources */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 
            className="text-2xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            Featured Resources
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resources.filter(r => r.featured).map((resource, i) => {
              const Icon = resource.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--gold)]/5 border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[var(--gold)] text-black">Featured</Badge>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[var(--brand)]/10">
                        <Icon className="w-6 h-6 text-[var(--brand)]" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.phase}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                        <p className="text-zinc-400 mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-500">
                            {resource.type} • {resource.downloads} downloads
                          </div>
                          <Button size="sm" className="bg-[var(--brand)] text-black hover:opacity-90">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* All Resources */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2 
            className="text-2xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            All Resources
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => {
              const Icon = resource.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] group-hover:bg-[var(--brand)]/10 group-hover:border-[var(--brand)] transition-all duration-300">
                        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-[var(--brand)] transition-colors" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.phase}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold mb-2 group-hover:text-[var(--brand)] transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-zinc-500">
                            {resource.type}
                          </div>
                          <Button size="sm" variant="outline" className="hover:bg-[var(--brand)] hover:text-black transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--gold)]/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Need More Resources?
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 mb-8"
            variants={itemVariants}
          >
            Access our complete library when you start your blueprint journey.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-[var(--brand)] text-black hover:opacity-90">
              <Link href="/app">
                Start Free Blueprint
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}