import React from 'react';
import { motion } from 'framer-motion';
import type { BudgetTag } from '../types';
import { BUDGET_RANGES } from '../data';

interface TagFilterProps {
  selectedTags: BudgetTag[];
  onTagChange: (tags: BudgetTag[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagChange }) => {
  const handleToggle = (tag: BudgetTag) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-lg border border-gold-500/20 p-6 backdrop-blur-sm">
      <h3 className="text-sand-200 font-semibold text-lg mb-4">Тип путешествия</h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(BUDGET_RANGES).map(([key, range]) => {
          const isSelected = selectedTags.includes(key as BudgetTag);

          return (
            <motion.button
              key={key}
              onClick={() => handleToggle(key as BudgetTag)}
              className={`tag-button ${isSelected ? 'active' : 'inactive'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-lg mr-2">{range.emoji}</span>
              <span>{range.label}</span>
            </motion.button>
          );
        })}
      </div>

      {selectedTags.length === 0 && (
        <p className="text-sand-300/50 text-sm mt-4 italic">
          Выбери тип путешествия для фильтрации
        </p>
      )}

      {selectedTags.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold-300 text-sm mt-4"
        >
          ✓ Выбрано: {selectedTags.length} категория/категорий
        </motion.p>
      )}
    </div>
  );
};
