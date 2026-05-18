import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, MapPin, Clock } from 'lucide-react';
import type { Location } from '../types';

interface TourCardProps {
  location: Location;
  budget: number;
  isHighlighted?: boolean;
}

export const TourCard: React.FC<TourCardProps> = ({
  location,
  budget,
  isHighlighted,
}) => {
  const isAffordable = location.minPrice <= budget;

  const seasonEmoji = {
    'year-round': '🌍',
    summer: '☀️',
    winter: '❄️',
    spring: '🌸',
    autumn: '🍂',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`tour-card ${isHighlighted ? 'featured' : ''} group relative overflow-hidden`}
    >
      {/* Highlight indicator */}
      {isHighlighted && (
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-gold-400 to-transparent" />
      )}

      {/* Background image */}
      <div className="relative h-48 -m-6 mb-4 overflow-hidden rounded-lg">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent opacity-60" />

        {/* Price badge */}
        {isAffordable && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="price-badge"
          >
            ₽{(location.minPrice / 1000).toFixed(0)}k
          </motion.div>
        )}

        {/* Season badge */}
        <div className="absolute bottom-4 left-4 text-2xl">
          {seasonEmoji[location.season]}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gold-300 mb-1">{location.name}</h3>
            <div className="flex items-center gap-2 text-sand-200 text-sm">
              <MapPin className="w-4 h-4" />
              {location.region}
            </div>
          </div>
        </div>

        <p className="text-sand-200 text-sm mb-4 leading-relaxed">
          {location.description}
        </p>

        {/* Price info */}
        <div className="mb-4 p-3 bg-forest-700/50 rounded-lg">
          <div className="text-xs text-sand-300 mb-1">Стоимость тура</div>
          <div className="text-lg font-bold text-gold-400">
            ₽{(location.minPrice / 1000).toFixed(0)}k - ₽{(location.maxPrice / 1000).toFixed(0)}k
          </div>
          {isAffordable && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-green-400 mt-2 font-semibold"
            >
              ✓ В рамках вашего бюджета
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sand-300 text-sm">
            <Mountain className="w-4 h-4 text-gold-400" />
            <span>Сложность: {location.tags.length === 3 ? 'Высокая' : 'Средняя'}</span>
          </div>
          <div className="flex items-center gap-2 text-sand-300 text-sm">
            <Clock className="w-4 h-4 text-gold-400" />
            <span>
              {location.season === 'year-round' ? 'Круглый год' : 'Сезонный'}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            isAffordable
              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 hover:shadow-lg hover:shadow-gold-500/30'
              : 'bg-forest-700 text-sand-300 opacity-60 cursor-not-allowed'
          }`}
          disabled={!isAffordable}
        >
          {isAffordable ? '📌 Добавить в план' : '💸 Выше бюджета'}
        </motion.button>
      </div>
    </motion.div>
  );
};
