import React from 'react';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * علامة تنسيق متجر ممدوح فون
 * A stylized geometric tech monogram & precision formatting mark.
 * Strictly without any emojis!
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision Formatting Emblem / علامة التنسيق الهندسية */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20`}
        aria-label="علامة تنسيق ممدوح فون"
      >
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden group">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4px_4px]" />
          
          {/* Geometric formatting brackets and monogram symbol */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5/6 h-5/6 text-cyan-400"
          >
            {/* Formatting bracket left */}
            <path
              d="M7 9C7 7.89543 7.89543 7 9 7H11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M7 23C7 24.1046 7.89543 25 9 25H11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Formatting bracket right */}
            <path
              d="M25 9C25 7.89543 24.1046 7 23 7H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M25 23C25 24.1046 24.1046 25 23 25H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Center stylized phone & formatting crossmark */}
            <rect
              x="11.5"
              y="9.5"
              width="9"
              height="13"
              rx="2"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            {/* Phone speaker / screen indicator */}
            <line x1="14" y1="11.5" x2="18" y2="11.5" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="16" cy="19.5" r="0.8" fill="#38bdf8" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-white ${textSizes[size]}`}>
            ممدوح فون
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
            MP
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs text-slate-400 font-normal">
            علامة التنسيق المعتمدة للهواتف الذكية
          </span>
        )}
      </div>
    </div>
  );
};
