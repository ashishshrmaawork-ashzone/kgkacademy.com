import React from 'react';

const CourseMeta = ({ duration, level }) => (
  <div className="flex flex-wrap gap-2 text-xs">
    {[duration, level].filter(value => String(value || '').trim()).map((value, index) => (
      <span key={index} className="rounded-full border border-current/20 px-2.5 py-1 capitalize">{value}</span>
    ))}
  </div>
);

export default CourseMeta;
