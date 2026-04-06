import React from 'react';
import Image from 'next/image';

interface DevMatchLogoProps {
  className?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function DevMatchLogo({ className = '', size = 'md' }: DevMatchLogoProps) {
  const dimensions = {
    sm: 32,  
    md: 56,  
    lg: 112, 
    xl: 250,
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center rounded-xl bg-[#285A48] border border-[#408A71]/30 p-1 overflow-hidden">
        <Image 
          src="/dev-logo.ico"
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