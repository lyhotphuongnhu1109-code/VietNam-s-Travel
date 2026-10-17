import React, { useState, useEffect } from 'react';

interface AppLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'dark' | 'light';
  subtitle?: string;
  className?: string;
}

const DEFAULT_ICON = '/logo-icon.png?v=3';
const DEFAULT_LOGO = '/logo.png?v=3';
const FALLBACK_LOGO = '/logo.jpg?v=3';

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = false,
  textColor = 'dark',
  subtitle = 'THE LAND OF ENDLESS DISCOVERY',
  className = '',
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    return localStorage.getItem('vietnam_travel_custom_logo') || (showText ? DEFAULT_LOGO : DEFAULT_ICON);
  });

  useEffect(() => {
    const handleLogoUpdate = (e: any) => {
      if (e.detail) {
        setLogoSrc(e.detail);
      }
    };
    window.addEventListener('app_logo_updated', handleLogoUpdate);
    return () => window.removeEventListener('app_logo_updated', handleLogoUpdate);
  }, []);

  const sizeMap = {
    xs: 'w-7 h-7 rounded-lg',
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl',
    xl: 'w-24 h-24 rounded-3xl',
  };

  const isLight = textColor === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official App Logo Image */}
      <div
        className={`${sizeMap[size]} bg-white p-1 border border-slate-200/80 shadow-md shadow-slate-900/5 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-105`}
      >
        <img
          src={logoSrc}
          alt="VIETNAM'S TRAVEL Official Logo"
          className="w-full h-full object-contain rounded-lg"
          referrerPolicy="no-referrer"
          onError={() => {
            if (logoSrc !== FALLBACK_LOGO) {
              setLogoSrc(FALLBACK_LOGO);
            }
          }}
        />
      </div>

      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${
                size === 'xs'
                  ? 'text-sm'
                  : size === 'sm'
                  ? 'text-base'
                  : size === 'lg'
                  ? 'text-2xl'
                  : 'text-lg sm:text-xl'
              } ${isLight ? 'text-white' : 'text-slate-900 group-hover:text-sky-600 transition-colors'}`}
            >
              VIETNAM'S TRAVEL
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          </div>
          {subtitle && (
            <p
              className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-0.5 ${
                isLight ? 'text-sky-200' : 'text-slate-500'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
