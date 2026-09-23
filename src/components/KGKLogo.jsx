import React from 'react';

/* KGK Academy Logo — matches the circular monogram badge in reference */
const KGKLogo = ({ size = 68, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer circle */}
    <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="1.5" fill="none" />

    {/* Inner thin circle */}
    <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="0.5" fill="none" />

    {/* K - left */}
    <text
      x="18" y="50"
      fill="white"
      fontSize="26"
      fontWeight="800"
      fontFamily="Raleway, Georgia, serif"
      dominantBaseline="middle"
      letterSpacing="-1"
    >K</text>

    {/* G - center */}
    <text
      x="37" y="50"
      fill="white"
      fontSize="22"
      fontWeight="700"
      fontFamily="Raleway, Georgia, serif"
      dominantBaseline="middle"
      letterSpacing="-1"
    >G</text>

    {/* K - right */}
    <text
      x="57" y="50"
      fill="white"
      fontSize="26"
      fontWeight="800"
      fontFamily="Raleway, Georgia, serif"
      dominantBaseline="middle"
      letterSpacing="-1"
    >K</text>

    {/* Horizontal divider line */}
    <line x1="22" y1="62" x2="78" y2="62" stroke="white" strokeWidth="0.8" />

    {/* ACADEMY text */}
    <text
      x="50" y="75"
      fill="white"
      fontSize="9"
      fontWeight="500"
      fontFamily="Raleway, sans-serif"
      textAnchor="middle"
      letterSpacing="3"
    >ACADEMY</text>
  </svg>
);

export default KGKLogo;
