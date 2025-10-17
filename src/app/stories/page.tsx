"use client";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Award } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const stories = [
  {
    title: "From Zero to 10K Followers in 90 Days",
    company: "TechStart Solutions",
    industry: "SaaS",
    challenge: "Building brand awareness in a crowded market",
    solution: "Implemented the Spark phase methodology to define clear value proposition",
    results: [
      "10,000+ engaged followers",
      "300% increase in website traffic",
      "50 qualified leads generated"
    ],
    testimonial: "The Wyatt Works Method gave us the structure we needed to build a brand that actually resonates with our audience.",
    author: "Sarah Chen",
    role: "Founder & CEO",
    image: "👩‍💼"
  },
  {
    title: "Launching a Personal Brand That Pays",
    company: "Creative Freelancer",
    industry: "Design",
    challenge: "Transitioning from freelancer to thought leader",
    solution: "Used The Forge and Flow phases to create consistent content and build authority",
    results: [
      "$15K/month recurring revenue",
      "Speaking opportunities at major conferences",
      "Book deal with major publisher"
    ],
    testimonial: "This method transformed my approach from random content to strategic brand building. The results speak for themselves.",
    author: "Marcus Rodriguez",
    role: "Design Consultant",
    image: "👨‍🎨"
  },
  {
    title: "Scaling a Service Business 5x",
    company: "Growth Marketing Agency",
    industry: "Marketing",
    challenge: "Scaling beyond founder-led growth",
    solution: "Applied The Impact phase to systematize and scale operations",
    results: [
      "5x revenue growth in 12 months",
      "Team expanded from 2 to 15 people",
      "Multiple acquisition offers"
    ],
    testimonial: "The systematic approach helped us build systems that work without us. We went from working in the business to working on it.",
    author: "Jennifer Park",
    role: "Managing Partner",
    image: "👩‍💻"
  }
];

const stats = [
  { icon: Users, value: "500+", label: "Brands Transformed" },
  { icon: TrendingUp, value: "300%", label: "Average Growth" },
  { icon: Award, value: "95%", label: "Success Rate" },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-[var(--brand)]/5 to-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            Success <span className="text-[var(--brand)]">Stories</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            See how entrepreneurs and businesses have transformed their ideas into impactful brands using the Wyatt Works Method.
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-[var(--brand)]" />
                  <div className="text-2xl font-bold text-[var(--gold)]">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Stories Grid */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300">
                  <div className="text-4xl mb-4">{story.image}</div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-[var(--brand)]/10 text-[var(--brand)]">
                      {story.industry}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="font-medium text-sm text-zinc-300 mb-1">Challenge:</h4>
                      <p className="text-sm text-zinc-400">{story.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-zinc-300 mb-1">Solution:</h4>
                      <p className="text-sm text-zinc-400">{story.solution}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-sm text-zinc-300 mb-2">Results:</h4>
                    <ul className="space-y-1">
                      {story.results.map((result, j) => (
                        <li key={j} className="text-sm text-zinc-400 flex items-center gap-2">
                          <span className="text-[var(--brand)]">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="border-l-2 border-[var(--brand)] pl-4 mb-4">
                    <p className="text-sm text-zinc-300 italic">&ldquo;{story.testimonial}&rdquo;</p>
                  </blockquote>

                  <div className="text-sm">
                    <div className="font-medium text-[var(--brand)]">{story.author}</div>
                    <div className="text-zinc-400">{story.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
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
            Ready to Write Your Success Story?
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 mb-8"
            variants={itemVariants}
          >
            Join hundreds of entrepreneurs who have transformed their ideas into impactful brands.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-[var(--brand)] text-black hover:opacity-90">
              <Link href="/app" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
