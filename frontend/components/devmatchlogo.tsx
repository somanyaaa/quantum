import React from 'react';
import Image from 'next/image';

interface DevMatchLogoProps {
  className?: string; // Corrected casing from 'classname'
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function DevMatchLogo({ className = '', size = 'md' }: DevMatchLogoProps) {
  // Mapping sizes to actual pixel values for Next.js Image optimization
  const dimensions = {
    sm: 24,
    md: 48,
    lg: 96,
    xl: 192,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center rounded-xl bg-[#285A48] border border-[#408A71]/30 p-1">
        <Image 
          src="/dev-logo.ico"
          alt="DevMatch Logo"
          width={dimensions[size]}
          height={dimensions[size]}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}