import React, { useState } from 'react';
import { Check, ImageOff } from 'lucide-react';
import { OptionItem } from '../data/characterData';

interface ImageCardProps {
  option: OptionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  aspectSquare?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const [hasError, setHasError] = useState(false);

  // Safe asset path resolving for both Vite dev and GitHub Pages base path
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const imageSrc = option.image ? `${basePath}/${option.image.replace(/^\//, '')}` : '';

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`group relative flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-teal-50/70 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
          : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/60 shadow-sm'
      }`}
      aria-pressed={isSelected}
    >
      {/* Checkmark badge */}
      {isSelected && (
        <span className="absolute top-2.5 right-2.5 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white animate-in zoom-in-75 duration-150">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </span>
      )}

      {/* Image / Illustration Container */}
      <div className="w-full aspect-square max-h-40 sm:max-h-48 rounded-xl overflow-hidden bg-white/80 border border-slate-100 flex items-center justify-center p-1 sm:p-1.5 mb-3 transition-transform group-hover:scale-[1.02]">
        {!hasError && imageSrc ? (
          <img
            src={imageSrc}
            alt={option.name}
            onError={() => setHasError(true)}
            className="w-full h-full object-contain pointer-events-none select-none rounded-lg"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg">
            <ImageOff className="w-8 h-8 mb-1.5 text-slate-300 stroke-[1.5]" />
            <span className="text-xs font-medium text-slate-500">예시 이미지</span>
          </div>
        )}
      </div>

      {/* Label and Subtitle */}
      <div className="w-full text-center">
        <h4 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
          isSelected ? 'text-teal-900 font-extrabold' : 'text-slate-800'
        }`}>
          {option.name}
        </h4>
        {option.description && (
          <p className="mt-1 text-xs text-slate-500 leading-snug line-clamp-2">
            {option.description}
          </p>
        )}
      </div>
    </button>
  );
};
