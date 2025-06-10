import React from 'react';

type PulseChipProps = {
  text: string;
  color: 'blue' | 'orange' | 'green';
  className?: string;
};

export function PulseChip({ text, color, className = '' }: PulseChipProps) {
  // Map color names to their Tailwind classes
  const colorMap = {
    blue: {
      ping: 'bg-blue-400',
      dot: 'bg-blue-500',
    },
    orange: {
      ping: 'bg-orange-400',
      dot: 'bg-orange-500',
    },
    green: {
      ping: 'bg-green-400',
      dot: 'bg-green-500',
    },
  };

  const { ping, dot } = colorMap[color];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-600 text-sm md:text-base text-neutral-600 ${className}`}>
      <div className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ping} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dot}`}></span>
      </div>
      {text}
    </div>
  );
} 