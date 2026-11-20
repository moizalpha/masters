import { useState } from 'react';
import { Watch } from 'lucide-react';

interface WatchImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  style?: React.CSSProperties;
  dataCase?: string;
}

export function WatchImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Master Horology',
  style,
  dataCase,
}: WatchImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`image-fallback ${className}`} style={style} role="img" aria-label={alt}>
        <Watch size={28} strokeWidth={1.5} aria-hidden="true" />
        <span className="image-fallback-label">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      data-case={dataCase}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
