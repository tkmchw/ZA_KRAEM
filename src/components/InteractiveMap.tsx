import React from 'react';
import { motion } from 'framer-motion';
import type { Location } from '../types';

interface InteractiveMapProps {
  locations: Location[];
  budget: number;
  onLocationClick: (location: Location) => void;
  highlightedLocation?: Location;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  budget,
  onLocationClick,
  highlightedLocation,
}) => {
  const getMarkerStatus = (location: Location) => {
    const affordable = location.minPrice <= budget;
    return affordable ? 'active' : 'inactive';
  };

  return (
    <div className="w-full bg-forest-800/50 backdrop-blur-sm rounded-lg border border-gold-500/10 overflow-hidden">
      <svg
        viewBox="0 0 1200 800"
        className="w-full h-auto"
        style={{ minHeight: '500px' }}
      >
        {/* Russia outline simplified */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background map (simplified Russia shape) */}
        <path
          d="M 100 300 L 150 250 L 200 280 L 250 200 L 300 220 L 350 180 L 400 190 L 450 150 L 500 170 L 550 140 L 600 160 L 650 130 L 700 150 L 750 120 L 800 140 L 850 110 L 900 130 L 950 100 L 1000 120 L 1050 90 L 1100 110 L 1150 100 L 1200 120 L 1200 700 L 100 700 Z"
          fill="rgba(45, 134, 89, 0.05)"
          stroke="rgba(255, 205, 51, 0.1)"
          strokeWidth="2"
        />

        {/* Grid lines */}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map(
          (x) => (
            <line
              key={`vline-${x}`}
              x1={x}
              y1="200"
              x2={x}
              y2="700"
              stroke="rgba(255, 205, 51, 0.05)"
              strokeWidth="1"
            />
          )
        )}

        {/* Horizontal decorative lines */}
        {[200, 300, 400, 500, 600, 700].map((y) => (
          <line
            key={`hline-${y}`}
            x1="100"
            y1={y}
            x2="1100"
            y2={y}
            stroke="rgba(255, 205, 51, 0.03)"
            strokeWidth="1"
          />
        ))}

        {/* Markers */}
        {locations.map((location) => {
          const status = getMarkerStatus(location);
          const isHighlighted = highlightedLocation?.id === location.id;
          
          // Normalize coordinates to SVG viewBox (0-1200, 0-800)
          const x = ((location.lng + 180) / 360) * 1200;
          const y = ((90 - location.lat) / 180) * 800;

          return (
            <g key={location.id}>
              {/* Pin glow effect */}
              {status === 'active' && (
                <circle
                  cx={x}
                  cy={y}
                  r={isHighlighted ? 50 : 35}
                  fill="rgba(255, 205, 51, 0.1)"
                  className="transition-all duration-300"
                />
              )}

              {/* Main pin */}
              <motion.circle
                cx={x}
                cy={y}
                r={isHighlighted ? 16 : 12}
                fill={status === 'active' ? '#ffd966' : '#666666'}
                stroke={status === 'active' ? '#f4b81b' : '#444444'}
                strokeWidth="2"
                className={`cursor-pointer transition-all duration-300 ${
                  status === 'active' ? 'marker-pin active' : 'marker-pin inactive'
                }`}
                onClick={() => onLocationClick(location)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                filter={status === 'active' ? 'url(#glow)' : 'none'}
              />

              {/* Location label */}
              <motion.text
                x={x}
                y={y - 30}
                textAnchor="middle"
                className="text-xs font-bold fill-gold-300"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: -40 }}
                transition={{ duration: 0.3 }}
                pointerEvents="none"
              >
                {location.name}
              </motion.text>

              {/* Price badge */}
              {status === 'active' && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <rect
                    x={x + 15}
                    y={y - 20}
                    width="60"
                    height="20"
                    rx="4"
                    fill="rgba(255, 205, 51, 0.9)"
                  />
                  <text
                    x={x + 45}
                    y={y - 6}
                    textAnchor="middle"
                    className="text-xs font-bold fill-forest-900"
                  >
                    от {(location.minPrice / 1000).toFixed(0)}k
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="px-6 py-4 bg-forest-900/50 border-t border-gold-500/10 flex gap-8 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold-400" />
          <span className="text-sm text-sand-200">Доступные туры</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500 opacity-50" />
          <span className="text-sm text-sand-300/50">Выше бюджета</span>
        </div>
      </div>
    </div>
  );
};
