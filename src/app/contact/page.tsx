"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@wyatt-works.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri from 9am to 5pm EST"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote First",
    description: "Serving clients worldwide"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual Formspree integration)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            Get in <span className="text-[var(--brand)]">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
              Have questions about the method? Need help getting started? We&apos;re here to help you succeed.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="h-full p-6 bg-[var(--card)] border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand)]/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[var(--brand)]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-[var(--brand)] font-medium mb-2">{info.value}</p>
                    <p className="text-sm text-zinc-400">{info.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-transparent to-[var(--brand)]/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
            <p className="text-zinc-400">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-8 bg-[var(--card)] border-[var(--border)]">
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-zinc-400">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-[var(--card)] border-[var(--border)] focus:border-[var(--brand)]"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[var(--card)] border-[var(--border)] focus:border-[var(--brand)]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[var(--card)] border-[var(--border)] focus:border-[var(--brand)]"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[var(--card)] border-[var(--border)] focus:border-[var(--brand)]"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--brand)] text-black hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-400">
              Quick answers to common questions about the Wyatt Works Method.
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            {[
              {
                question: "Is the method suitable for any type of business?",
                answer: "Yes! The Wyatt Works Method works for service businesses, product companies, personal brands, and even non-profits. The principles are universal."
              },
              {
                question: "How long does it take to see results?",
                answer: "Most people see initial traction within 30-60 days, with significant growth typically occurring in the first 6 months of consistent implementation."
              },
              {
                question: "Do I need any technical skills?",
                answer: "Not at all. The method focuses on strategy and content, not technical implementation. We provide simple, actionable steps anyone can follow."
              },
              {
                question: "Is there ongoing support?",
                answer: "Yes! We offer community support, regular updates to the method, and premium coaching for those who want additional guidance."
              }
            ].map((faq, i) => (
              <Card key={i} className="p-6 bg-[var(--card)] border-[var(--border)]">
                <h3 className="font-semibold mb-3 text-[var(--brand)]">{faq.question}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}