import React from 'react';

interface CustomSparkProps {
  size?: number;
  className?: string;
}

export const CustomSpark: React.FC<CustomSparkProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Main spark core */}
      <circle
        cx="12"
        cy="12"
        r="2"
        fill="currentColor"
        className="opacity-90"
      />
      
      {/* Radiating spark lines */}
      <path
        d="M12 4L12 8M12 16L12 20M4 12L8 12M16 12L20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-80"
      />
      
      {/* Diagonal spark lines */}
      <path
        d="M6 6L9 9M15 15L18 18M6 18L9 15M15 9L18 6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="opacity-70"
      />
      
      {/* Outer spark tendrils */}
      <path
        d="M3 12L6 12M18 12L21 12M12 3L12 6M12 18L12 21"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        className="opacity-60"
      />
      
      {/* Curved spark lines for more organic look */}
      <path
        d="M8 4C10 6 10 10 8 12M16 4C14 6 14 10 16 12M8 20C10 18 10 14 8 12M16 20C14 18 14 14 16 12"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        className="opacity-50"
      />
    </svg>
  );
};
