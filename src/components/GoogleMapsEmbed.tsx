import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface GoogleMapsEmbedProps {
  name: string;
  address: string;
  city?: string;
  dish?: string;
  currentLang?: Language;
  height?: string | number;
  className?: string;
  showCardHeader?: boolean;
}

export const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  name,
  address,
  city,
  dish,
  currentLang = 'vi',
  height = '240px',
  className = '',
  showCardHeader = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fullSearchQuery = `${name}, ${address}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullSearchQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullSearchQuery)}`;

  const handleCopyAddress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-amber-200/80 bg-white overflow-hidden shadow-xs ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {showCardHeader && (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/60 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-900 truncate">
                  Google Map • {name}
                </span>
                {city && (
                  <span className="px-1.5 py-0.2 rounded-md bg-amber-200/70 text-amber-900 text-[10px] font-bold">
                    {city}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate">{address}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
              title="Sao chép địa chỉ"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">
                    {currentLang === 'vi'
                      ? 'Đã chép'
                      : currentLang === 'ko'
                      ? '복사됨'
                      : 'Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {currentLang === 'vi'
                      ? 'Chép địa chỉ'
                      : currentLang === 'ko'
                      ? '주소 복사'
                      : 'Copy'}
                  </span>
                </>
              )}
            </button>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
              title="Mở Google Maps chỉ đường"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'vi'
                  ? 'Chỉ đường'
                  : currentLang === 'ko'
                  ? '길찾기'
                  : 'Directions'}
              </span>
            </a>

            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
              title="Mở trên Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Embedded Google Map Iframe */}
      <div className="relative bg-slate-100" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-2xs z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <Compass className="w-4 h-4 animate-spin text-amber-600" />
              <span>
                {currentLang === 'vi'
                  ? 'Đang tải bản đồ Google Maps...'
                  : currentLang === 'ko'
                  ? '구글 지도 불러오는 중...'
                  : 'Loading Google Maps...'}
              </span>
            </div>
          </div>
        )}

        <iframe
          title={`Google Maps - ${name}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full"
        />
      </div>

      {/* Helpful Map footer */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 gap-2">
        <span className="flex items-center gap-1 truncate">
          <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
          <span>
            {currentLang === 'vi'
              ? 'Bản đồ định vị chính xác vị trí quán ăn trên Google Maps'
              : currentLang === 'ko'
              ? '구글 지도 기반 식당 위치 및 길찾기 안내'
              : 'Accurate eatery location powered by Google Maps'}
          </span>
        </span>

        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 hover:text-amber-900 font-bold shrink-0 hover:underline"
        >
          {currentLang === 'vi'
            ? 'Xem trên Google Maps ↗'
            : currentLang === 'ko'
            ? '구글 지도에서 크게 보기 ↗'
            : 'Open in Google Maps ↗'}
        </a>
      </div>
    </div>
  );
};
