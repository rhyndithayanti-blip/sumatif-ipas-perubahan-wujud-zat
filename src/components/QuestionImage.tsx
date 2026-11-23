import React, { useState } from 'react';
import { FlaskConical } from 'lucide-react';

interface QuestionImageProps {
  src?: string;
  caption?: string;
  alt: string;
  compact?: boolean;
}

export const QuestionImage: React.FC<QuestionImageProps> = ({
  src,
  caption,
  alt,
  compact = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;

  return (
    <figure
      className={`mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${
        compact ? 'max-w-xs' : 'max-w-md'
      }`}
    >
      {!hasError ? (
        <div className="aspect-[4/3] w-full bg-white flex items-center justify-center overflow-hidden">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center p-4 text-center gap-2 text-slate-600">
          <FlaskConical className="w-8 h-8 text-blue-600" />
          <span className="text-xs font-semibold">{alt}</span>
        </div>
      )}
      {caption && (
        <figcaption className="px-3 py-2 text-[11px] text-slate-600 bg-slate-50 border-t border-slate-200 font-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
