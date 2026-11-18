import React from 'react';
import {
  Cake,
  Gift,
  Flower2,
  Star,
  Heart,
  PencilLine,
  Sparkles,
  Sun,
  Smile,
  UserRound,
  GraduationCap,
} from 'lucide-react';

interface BirthdayCardArtworkProps {
  artKey: string;
  image?: string;
  alt?: string;
  isSelected?: boolean;
  compact?: boolean;
}

export const BirthdayCardArtwork: React.FC<BirthdayCardArtworkProps> = ({
  artKey,
  image,
  alt,
  compact = false,
}) => {
  const [hasError, setHasError] = React.useState(false);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const imageSrc = image ? `${basePath}/${image.replace(/^\//, '')}` : '';

  if (imageSrc && !hasError) {
    return (
      <div className="w-full aspect-square max-h-36 sm:max-h-40 rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-1">
        <img
          src={imageSrc}
          alt={alt || artKey}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain pointer-events-none select-none rounded-lg"
          loading="lazy"
        />
      </div>
    );
  }

  if (artKey === 'custom' && !compact) {
    return (
      <div className="w-full aspect-square max-h-36 sm:max-h-40 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
          <PencilLine className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
        </div>
      </div>
    );
  }

  switch (artKey) {
    // Q1 Recipients - friendly, warm SVG illustrations
    case 'mom':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true">
            <circle cx="32" cy="30" r="18" fill="#5D4037" />
            <circle cx="32" cy="33" r="14" fill="#FFE0BD" />
            <path d="M18 28c0-9 7-15 14-15s14 6 14 15c-3-4-8-6-14-6s-11 2-14 6z" fill="#5D4037" />
            <circle cx="26.5" cy="33" r="1.8" fill="#334155" />
            <circle cx="37.5" cy="33" r="1.8" fill="#334155" />
            <circle cx="23" cy="37" r="2.5" fill="#FDA4AF" opacity="0.65" />
            <circle cx="41" cy="37" r="2.5" fill="#FDA4AF" opacity="0.65" />
            <path d="M27 38.5c1.5 2.5 8.5 2.5 10 0" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M47 16c-1.5-2.5-5-1.5-5 1 0 2.5 5 5.5 5 5.5s5-3 5-5.5c0-2.5-3.5-3.5-5-1z" fill="#F43F5E" />
          </svg>
        </div>
      );
    case 'dad':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true">
            <circle cx="32" cy="33" r="14.5" fill="#FFE0BD" />
            <path d="M17.5 29c0-9 6-15 14.5-15s14.5 6 14.5 15c-3-5-8-7-14.5-7s-11.5 2-14.5 7z" fill="#334155" />
            <circle cx="26.5" cy="32.5" r="1.8" fill="#1E293B" />
            <circle cx="37.5" cy="32.5" r="1.8" fill="#1E293B" />
            <path d="M26 39c2 2.5 10 2.5 12 0" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M26 48l6 6 6-6" fill="#0EA5E9" />
            <circle cx="32" cy="51" r="2.2" fill="#0369A1" />
          </svg>
        </div>
      );
    case 'friend':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true">
            <circle cx="23" cy="33" r="11" fill="#FFE0BD" />
            <path d="M12 30c0-7 5-12 11-12s11 5 11 12c-3-3-6-4-11-4s-8 1-11 4z" fill="#1E293B" />
            <circle cx="19.5" cy="33" r="1.5" fill="#1E293B" />
            <circle cx="26.5" cy="33" r="1.5" fill="#1E293B" />
            <path d="M19.5 37.5c1.5 2 5.5 2 7 0" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="42" cy="34" r="11" fill="#FAD7B8" />
            <path d="M31 31c0-7 5-12 11-12s11 5 11 12c-3-3-6-4-11-4s-8 1-11 4z" fill="#78350F" />
            <circle cx="38.5" cy="34" r="1.5" fill="#1E293B" />
            <circle cx="45.5" cy="34" r="1.5" fill="#1E293B" />
            <path d="M38.5 38.5c1.5 2 5.5 2 7 0" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M32 14l1.5 3.2 3.5.5-2.5 2.4.6 3.5-3.1-1.7-3.1 1.7.6-3.5-2.5-2.4 3.5-.5z" fill="#F59E0B" />
          </svg>
        </div>
      );
    case 'teacher':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <GraduationCap className="w-9 h-9 sm:w-10 sm:h-10 text-teal-600" />
            <UserRound className="w-6 h-6 text-teal-500 -mt-1" />
          </div>
        </div>
      );
    case 'grandma':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true">
            <circle cx="32" cy="17" r="7" fill="#CBD5E1" />
            <circle cx="32" cy="34" r="14.5" fill="#FFE0BD" />
            <path d="M17.5 31c0-9 6-14 14.5-14s14.5 5 14.5 14c-4-4-8-5-14.5-5s-10.5 1-14.5 5z" fill="#E2E8F0" />
            <circle cx="26.5" cy="34" r="3.8" fill="none" stroke="#64748B" strokeWidth="1.6" />
            <circle cx="37.5" cy="34" r="3.8" fill="none" stroke="#64748B" strokeWidth="1.6" />
            <line x1="30.3" y1="34" x2="33.7" y2="34" stroke="#64748B" strokeWidth="1.6" />
            <circle cx="26.5" cy="34" r="1.4" fill="#334155" />
            <circle cx="37.5" cy="34" r="1.4" fill="#334155" />
            <path d="M27.5 41c1.8 2 7.2 2 9 0" stroke="#9333EA" strokeWidth="2.1" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );
    case 'grandpa':
      return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden="true">
            <circle cx="32" cy="33" r="14.5" fill="#FFE0BD" />
            <path d="M17.5 29c0-7 6-12 14.5-12s14.5 5 14.5 12c-3-3-8-4-14.5-4s-11.5 1-14.5 4z" fill="#CBD5E1" />
            <circle cx="26.5" cy="32" r="3.8" fill="none" stroke="#475569" strokeWidth="1.6" />
            <circle cx="37.5" cy="32" r="3.8" fill="none" stroke="#475569" strokeWidth="1.6" />
            <line x1="30.3" y1="32" x2="33.7" y2="32" stroke="#475569" strokeWidth="1.6" />
            <circle cx="26.5" cy="32" r="1.4" fill="#1E293B" />
            <circle cx="37.5" cy="32" r="1.4" fill="#1E293B" />
            <path d="M25 38.5c2.2-1.8 4.8-1.5 7 0 2.2-1.5 4.8-1.8 7 0" stroke="#CBD5E1" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            <path d="M28 42c1.5 1.8 6.5 1.8 8 0" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    // Q2 Decorations
    case 'balloon':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true">
            <ellipse cx="24" cy="24" rx="11" ry="13.5" fill="#38BDF8" />
            <ellipse cx="20.5" cy="19" rx="2.5" ry="4" fill="#BAE6FD" opacity="0.8" />
            <path d="M24 37.5l-2.5 3h5z" fill="#0284C7" />
            <path d="M24 40.5c-2 5 2 10 0 15" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <ellipse cx="41" cy="28" rx="10.5" ry="13" fill="#FB7185" />
            <ellipse cx="37.5" cy="23.5" rx="2.3" ry="3.6" fill="#FECDD3" opacity="0.85" />
            <path d="M41 41l-2.5 3h5z" fill="#E11D48" />
            <path d="M41 44c2 5-2 9 0 13" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );
    case 'cake':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center">
          <Cake className="w-8 h-8 sm:w-9 sm:h-9 text-pink-500 fill-pink-100" />
        </div>
      );
    case 'gift':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <Gift className="w-8 h-8 sm:w-9 sm:h-9 text-amber-500 fill-amber-100" />
        </div>
      );
    case 'flower':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
          <Flower2 className="w-8 h-8 sm:w-9 sm:h-9 text-rose-500 fill-rose-100" />
        </div>
      );
    case 'star':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center">
          <Star className="w-8 h-8 sm:w-9 sm:h-9 text-yellow-500 fill-yellow-200" />
        </div>
      );
    case 'heart':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
          <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-rose-500 fill-rose-200" />
        </div>
      );

    // Q3 Moods
    case 'mood_cute':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center">
          <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-pink-500 fill-pink-200" />
        </div>
      );
    case 'mood_bright':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <Smile className="w-8 h-8 sm:w-9 sm:h-9 text-amber-500 fill-amber-100" />
        </div>
      );
    case 'mood_warm':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
          <Sun className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500 fill-orange-100" />
        </div>
      );
    case 'mood_sparkle':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center">
          <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-violet-500 fill-violet-100" />
        </div>
      );

    // Custom Input shared icon
    case 'custom':
    default:
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
          <PencilLine className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
        </div>
      );
  }
};
