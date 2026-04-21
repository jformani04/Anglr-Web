import Link from 'next/link';

interface AnglrLogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: 'text-lg' },
  md: { icon: 36, text: 'text-2xl' },
  lg: { icon: 44, text: 'text-3xl' },
};

function FishHookIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hook-grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2d7cf6" />
          <stop offset="100%" stopColor="#16c96a" />
        </linearGradient>
        <linearGradient id="ripple-grad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2d7cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#16c96a" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Background glow circle */}
      <circle cx="22" cy="22" r="20" fill="url(#ripple-grad)" />
      {/* Fishing line - vertical */}
      <line x1="22" y1="6" x2="22" y2="20" stroke="url(#hook-grad)" strokeWidth="2.2" strokeLinecap="round" />
      {/* Hook curve */}
      <path
        d="M22 20 Q22 32 30 34 Q36 35 36 29"
        stroke="url(#hook-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hook barb */}
      <path
        d="M36 29 L32 26"
        stroke="url(#hook-grad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Line bobber / eye at top */}
      <circle cx="22" cy="8" r="2.5" fill="url(#hook-grad)" />
      {/* Water ripple lines */}
      <path
        d="M10 38 Q14 35 18 38 Q22 41 26 38"
        stroke="#16c96a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export default function AnglrLogo({ size = 'md', href, className = '' }: AnglrLogoProps) {
  const { icon, text } = sizes[size];

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <FishHookIcon size={icon} />
      <span
        className={`font-extrabold tracking-tight ${text}`}
        style={{
          background: 'linear-gradient(135deg, #f0f4ff 0%, #8ba3c0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        ANGLR
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
