"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhaseCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function EnhancedPhaseCard({
  title,
  description,
  icon,
  href,
  onClick,
  className,
}: PhaseCardProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
      };
      
      setRipples((prev) => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 600);
    }
  };

  const CardContent = () => (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--border)] p-6 bg-[var(--card)] cursor-pointer",
        "shadow-xl hover:shadow-2xl transition-all duration-300",
        "hover:border-[var(--brand)] backdrop-blur-sm",
        className
      )}
      onClick={handleClick}
      whileHover={{
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--brand)]/10 to-[var(--gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-[var(--brand)]/30 pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 text-[var(--brand)] group-hover:text-[var(--gold)] transition-colors">
            {icon}
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand)] transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--brand)]/50 transition-all duration-300" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        <CardContent />
      </a>
    );
  }

  return <CardContent />;
}
