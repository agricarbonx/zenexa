
import React from 'react';

export const ZenexaLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 450 100" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Zenexa Infotech Logo"
    >
      <defs>
        <linearGradient id="zenexaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#D9232D'}} />
          <stop offset="60%" style={{stopColor: '#D9232D'}} />
          <stop offset="60.01%" style={{stopColor: '#3F4383'}} />
          <stop offset="100%" style={{stopColor: '#3F4383'}} />
        </linearGradient>
      </defs>
      
      {/* Abstract Logo Mark */}
      <g transform="scale(0.9) translate(0, 5)">
          <path d="M73.5,23.1c-1.8-6.1-5.7-11.4-11.2-15.3C56.7,4,49.9,1.7,42.8,1.7c-7.3,0-14.2,2.4-19.9,7.2 c-6.1,5.2-9.7,12.5-10.1,20.5c-0.1,2.8,0.3,5.6,1.2,8.3c1.9,5.7,5.5,10.6,10.3,14.3c5.6,4.3,12.2,6.5,19.2,6.5 c2.7,0,5.4-0.4,8-1.2c1.7-0.5,3.3-1.1,4.9-1.9c0,0,0,0,0.1,0c6.4-3.2,11.2-8.5,13.8-15.1c0.8-2,1.3-4.1,1.5-6.2 C74.1,34.5,74.5,28.7,73.5,23.1z" fill="#3F4383"/>
          <path d="M57.9,51.8c-2.3,1.3-4.7,2.2-7.2,2.8c-6.1,1.5-12.4,0.7-18-2.6c-5.8-3.4-10-8.8-12-15.2c-1-3.2-1.4-6.6-1.1-9.9 C20,21.5,22,16.4,25.6,12c4.4-5.3,10.7-8.5,17.6-8.5c6.3,0,12.2,2.8,16.5,7.7c3.9,4.4,6.2,10,6.5,15.8c0.1,2.3-0.2,4.6-0.9,6.8 c-1.5,4.9-4.3,9.1-8,12.2C57.9,51.8,57.9,51.8,57.9,51.8z M72.8,70.9c-2.6,6.6-7.4,11.9-13.8,15.1c-0.1,0-0.1,0-0.1,0 c-1.6,0.8-3.2,1.4-4.9,1.9c-2.6,0.8-5.3,1.2-8,1.2c-7,0-13.6-2.2-19.2-6.5c-4.8-3.7-8.4-8.6-10.3-14.3c-0.9-2.7-1.3-5.5-1.2-8.3 c0.4-8,4-15.3,10.1-20.5c5.7-4.8,12.6-7.2,19.9-7.2c2.8,0,5.5,0.4,8.2,1.2C65.5,33.5,70,39,72.4,45.8c1.3,3.7,1.8,7.6,1.5,11.5 C74,60.8,73.6,65.9,72.8,70.9z" fill="#D9232D"/>
      </g>
      
      {/* Text: zenexa */}
      <text x="120" y="60" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold" fill="url(#zenexaGradient)">zenexa</text>
      
      {/* Text: INFOTECH */}
      <text x="125" y="90" fontFamily="Arial, sans-serif" fontSize="24" fill="#231F20" letterSpacing="10">INFOTECH</text>
    </svg>
  );
};
