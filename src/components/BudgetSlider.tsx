import React from 'react';
import { motion } from 'framer-motion';
import { BUDGET_RANGES } from '../data';

interface BudgetSliderProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({ budget, onBudgetChange }) => {
  const maxBudget = 1000000;
  const percentage = (budget / maxBudget) * 100;

  const getBudgetCategory = (amount: number) => {
    if (amount <= BUDGET_RANGES.coffee.max) return 'coffee';
    if (amount <= BUDGET_RANGES.salary.max) return 'salary';
    return 'expedition';
  };

  const category = getBudgetCategory(budget);
  const categoryInfo = BUDGET_RANGES[category];

  return (
    <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-lg border border-gold-500/20 p-8 backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sand-200 font-semibold text-lg">Ваш бюджет</label>
          <motion.div
            key={category}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/50"
          >
            <span className="text-2xl">{categoryInfo.emoji}</span>
            <span className="text-gold-300 font-bold">{categoryInfo.label}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-gold-400 mb-2"
        >
          ₽{(budget / 1000).toFixed(0)}k
        </motion.div>

        <div className="text-sm text-sand-300">
          {budget <= BUDGET_RANGES.coffee.max && (
            <p>🎯 Идеально для выходных рядом с домом</p>
          )}
          {budget > BUDGET_RANGES.coffee.max && budget <= BUDGET_RANGES.salary.max && (
            <p>🎯 Планируй полноценный отпуск</p>
          )}
          {budget > BUDGET_RANGES.salary.max && (
            <p>🎯 Готов к экспедиции мечты</p>
          )}
        </div>
      </div>

      {/* Slider track background */}
      <div className="relative mb-4">
        <input
          type="range"
          min="0"
          max={maxBudget}
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="budget-slider"
          style={{
            background: `linear-gradient(to right, 
              rgba(255, 205, 51, 0.5) 0%, 
              rgba(255, 205, 51, 0.5) ${percentage}%, 
              rgba(45, 134, 89, 0.2) ${percentage}%, 
              rgba(45, 134, 89, 0.2) 100%)`,
          }}
        />
      </div>

      {/* Budget markers */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {Object.entries(BUDGET_RANGES).map(([key, range]) => (
          <motion.button
            key={key}
            onClick={() =>
              onBudgetChange(
                category === key ? range.max : range.min + (range.max - range.min) / 2
              )
            }
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
              category === key
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 shadow-lg shadow-gold-500/30 scale-105'
                : 'bg-forest-700 text-sand-200 hover:bg-forest-600 border border-forest-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-lg mb-1">{range.emoji}</div>
            <div className="text-xs leading-tight">{range.label}</div>
            <div className="text-xs text-opacity-70">до ₽{(range.max / 1000).toFixed(0)}k</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
