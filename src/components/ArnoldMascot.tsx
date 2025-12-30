const ArnoldMascot = () => {
  return (
    <svg
      viewBox="0 0 600 300"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="arnold" transform="translate(150, 80)">
        <path
          d="M 80 20 Q 60 -10, 100 -15 Q 130 -18, 140 0 Q 150 -18, 180 -15 Q 220 -10, 200 20 Q 210 25, 215 35 Q 220 50, 210 55 L 200 60 Q 180 75, 140 75 Q 100 75, 80 60 L 70 55 Q 60 50, 65 35 Q 70 25, 80 20 Z"
          fill="#F5A962"
        />
        
        <path
          d="M 85 -5 Q 75 -20, 55 -18 Q 40 -15, 42 -5 Q 45 0, 55 -3 Q 65 -5, 75 0"
          fill="#F5A962"
        />
        <path
          d="M 195 -5 Q 205 -20, 225 -18 Q 240 -15, 238 -5 Q 235 0, 225 -3 Q 215 -5, 205 0"
          fill="#F5A962"
        />
        
        <ellipse cx="110" cy="25" rx="18" ry="22" fill="white" />
        <ellipse cx="170" cy="25" rx="18" ry="22" fill="white" />
        
        <circle cx="110" cy="28" r="8" fill="#000" />
        <circle cx="170" cy="28" r="8" fill="#000" />
        
        <ellipse cx="55" cy="45" rx="12" ry="18" fill="#F4C8A8" />
        <ellipse cx="225" cy="45" rx="12" ry="18" fill="#F4C8A8" />
        
        <path
          d="M 125 -12 Q 130 -22, 140 -22 Q 150 -22, 155 -12"
          fill="#33C3F0"
        />
      </g>
      
      <text
        x="300"
        y="260"
        fontFamily="IBM Plex Sans, sans-serif"
        fontSize="48"
        fontWeight="bold"
        fill="currentColor"
        textAnchor="middle"
      >
        HEY, STORE!
      </text>
    </svg>
  );
};

export default ArnoldMascot;