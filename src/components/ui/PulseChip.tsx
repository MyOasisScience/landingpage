import React from 'react';

type PulseChipProps = {
  text: string;
  className?: string;
};

export function PulseChip({ text, className = '' }: PulseChipProps) {
  // Always use neon green for the dot
  const neonGreen = '#C6FF00';

  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-600 text-neutral-600 font-mono text-sm md:text-base transition-colors duration-200 hover:bg-neutral-100 ${className}`}
    >
      <div className="relative flex h-2.5 w-2.5">
        <span 
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            backgroundColor: neonGreen,
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
          }}
        />
        <span 
          className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{ backgroundColor: neonGreen }}
        />
      </div>
      {text}
    </div>
  );
} 