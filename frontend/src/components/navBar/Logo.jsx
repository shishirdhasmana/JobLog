import React from 'react';

const Logo = () => {
  return (
    <svg className="h-10 w-auto sm:h-12" viewBox="0 0 680 72" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Ghosted navbar logo</title>
      <desc>Compact black and white Ghosted logo for a navigation bar, with animated trailing dots.</desc>
      <defs>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .ghost-body { fill: #f0f0f0; }
            .eye-bg     { fill: #1a1a1a; }
            .pupil      { fill: #f0f0f0; }
            .dot        { fill: #aaaaaa; }
            .wordmark   { fill: #f0f0f0; }
            .tagline    { fill: #888888; }
          }
          .ghost-body { fill: #111111; }
          .eye-bg     { fill: #f5f5f5; }
          .pupil      { fill: #111111; }
          .dot        { fill: #555555; }
          .wordmark   { fill: #111111; }
          .tagline    { fill: #777777; }

          @keyframes pulse1 {
            0%, 100% { opacity: 0.7; }
            50%       { opacity: 0.2; }
          }
          @keyframes pulse2 {
            0%, 100% { opacity: 0.45; }
            50%       { opacity: 0.1; }
          }
          @keyframes pulse3 {
            0%, 100% { opacity: 0.25; }
            50%       { opacity: 0.05; }
          }
          .d1 { animation: pulse1 2.4s ease-in-out infinite; }
          .d2 { animation: pulse2 2.4s ease-in-out infinite 0.4s; }
          .d3 { animation: pulse3 2.4s ease-in-out infinite 0.8s; }
        `}</style>
      </defs>

      <g transform="translate(16, 10)">
        <path className="ghost-body" d="
        M 4 30
        C 3 16 8 2 22 2
        C 36 2 41 16 41 29
        L 41 54
        C 37 50 34 53 31 50
        C 28 47 25 52 22 49
        C 19 46 16 51 13 48
        C 10 45 7 49 4 46
        Z
        "/>
        <ellipse className="eye-bg" cx="15" cy="26" rx="5" ry="5.5"/>
        <ellipse className="eye-bg" cx="30" cy="25" rx="4.5" ry="5"/>
        <ellipse className="pupil" cx="17" cy="28" rx="2.5" ry="3"/>
        <ellipse className="pupil" cx="32" cy="27" rx="2.2" ry="2.7"/>
        <circle fill="#f5f5f5" cx="15.5" cy="25" r="1.2"/>
        <circle fill="#f5f5f5" cx="30.5" cy="24" r="1.1"/>

        <circle className="dot d1" cx="51" cy="12" r="3.5"/>
        <circle className="dot d2" cx="62" cy="5"  r="2.2"/>
        <circle className="dot d3" cx="70" cy="0"  r="1.3"/>
      </g>

      <text
        className="wordmark"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.5"
        x="98" y="38"
      >ghosted</text>

      <rect className="dot" x="222" y="26" width="1" height="20" rx="0.5" opacity="0.4"/>

      <text
        className="tagline"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="400"
        letterSpacing="2.5"
        x="230" y="40"
      >YOUR MINI ATS</text>

    </svg>
  );
};

export default Logo;