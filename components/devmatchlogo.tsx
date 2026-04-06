import React from 'react';
import Image from 'next/image';

interface DevMatchLogoProps {
  className?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function DevMatchLogo({ className = '', size = 'md' }: DevMatchLogoProps) {
  // 1. I slightly increased the base pixel numbers here so the source image is rendered larger
  const dimensions = {
    sm: 32,  
    md: 56,  
    lg: 112, 
    xl: 250,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 2. Changed p-2 to p-1 to reduce the dead space inside the box */}
      <div className="relative flex items-center justify-center rounded-xl bg-[#285A48] border border-[#408A71]/30 p-1 overflow-hidden">
        <Image 
          src="/devm-logo.ico"
          alt="DevMatch Logo"
          width={dimensions[size]}
          height={dimensions[size]}
          // 3. Added scale-110 to physically stretch the image closer to the box edges
          className="object-contain scale-110"
          priority
        />
      </div>
    </div>
  );
}