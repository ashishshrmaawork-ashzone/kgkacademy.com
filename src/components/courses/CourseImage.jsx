import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const CourseImage = ({ src, title, className = '' }) => {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div className="w-full h-full bg-gray-100 text-gray-500 flex flex-col items-center justify-center gap-2"
        role="img" aria-label={'Image unavailable for ' + title}>
        <ImageOff size={32} aria-hidden="true" />
        <span className="text-sm">Course image unavailable</span>
      </div>
    );
  }

  return <img src={src} alt={title} className={className} onError={() => setFailedSrc(src)} />;
};

export default CourseImage;