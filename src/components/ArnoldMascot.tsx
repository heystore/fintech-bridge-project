const ArnoldMascot = () => {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="arnold">
        <path
          d="M 120 80 Q 100 50, 130 40 Q 150 35, 160 50 Q 170 35, 180 40 Q 200 45, 200 60 L 200 100 Q 180 120, 160 100 Q 140 120, 120 100 Z"
          fill="#F5A962"
        />
        
        <path
          d="M 130 45 Q 120 30, 100 35 Q 85 40, 90 50 Q 95 55, 105 50"
          fill="#F5A962"
        />
        <path
          d="M 190 45 Q 200 30, 220 35 Q 235 40, 230 50 Q 225 55, 215 50"
          fill="#F5A962"
        />
        
        <ellipse cx="140" cy="70" rx="12" ry="16" fill="white" />
        <ellipse cx="180" cy="70" rx="12" ry="16" fill="white" />
        
        <circle cx="140" cy="72" r="5" fill="#000" />
        <circle cx="180" cy="72" r="5" fill="#000" />
        
        <ellipse cx="100" cy="90" rx="8" ry="12" fill="#F4C8A8" />
        <ellipse cx="220" cy="90" rx="8" ry="12" fill="#F4C8A8" />
        
        <path
          d="M 150 35 Q 155 25, 165 25 Q 170 25, 170 35"
          fill="#33C3F0"
        />
        
        <rect x="120" y="100" width="80" height="60" rx="10" fill="#33C3F0" />
      </g>
      
      <text
        x="200"
        y="180"
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="#2C3E50"
        textAnchor="middle"
      >
        HEY, STORE!
      </text>
    </svg>
  );
};

export default ArnoldMascot;
