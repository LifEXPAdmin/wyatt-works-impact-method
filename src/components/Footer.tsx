"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Support", href: "/support" },
  ],
  external: [
    { label: "Main Site", href: "https://wyatt-works.com", external: true },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/wyattworks", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/wyattworks", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/wyattworks", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@wyatt-works.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] bg-gradient-to-b from-transparent to-[var(--brand)]/5">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)]/5 via-transparent to-[var(--gold)]/5 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight mb-4 block hover:text-[var(--brand)] transition-colors"
            >
              Wyatt Works Method
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              From idea to impact, step by step. A living blueprint that turns your brand into a system.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon 
                      size={20} 
                      className="text-zinc-400 group-hover:text-[var(--brand)] transition-colors" 
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-[var(--brand)] transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand)] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.external.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-zinc-400 hover:text-[var(--brand)] transition-colors relative group inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && (
                        <span className="text-xs">↗</span>
                      )}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand)] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Wyatt Works. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Built with</span>
              <span className="text-red-500">♥</span>
              <span>by Wyatt Works</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
