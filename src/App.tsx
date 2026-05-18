import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { InteractiveMap } from './components/InteractiveMap';
import { BudgetSlider } from './components/BudgetSlider';
import { TagFilter } from './components/TagFilter';
import { TourCard } from './components/TourCard';
import { TOUR_LOCATIONS } from './data';
import type { Location, FilterState } from './types';
import './index.css';

function App() {
  const [filterState, setFilterState] = useState<FilterState>({
    budget: 100000,
    tags: [],
  });
  const [highlightedLocation, setHighlightedLocation] = useState<Location | undefined>();
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');

  const filteredLocations = useMemo(() => {
    return TOUR_LOCATIONS.filter((location) => {
      const withinBudget = location.minPrice <= filterState.budget;

      if (filterState.tags.length === 0) {
        return withinBudget;
      }

      const hasMatchingTag = filterState.tags.some((tag) =>
        location.tags.includes(tag)
      );

      return withinBudget && hasMatchingTag;
    });
  }, [filterState]);

  const highlightedForSubtropic = TOUR_LOCATIONS.find(
    (loc) => loc.id === 'sochi'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left column - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <BudgetSlider
              budget={filterState.budget}
              onBudgetChange={(budget) =>
                setFilterState({ ...filterState, budget })
              }
            />
            <TagFilter
              selectedTags={filterState.tags}
              onTagChange={(tags) =>
                setFilterState({ ...filterState, tags })
              }
            />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gold-500/10 to-sand-500/10 rounded-lg border border-gold-500/20 p-6 backdrop-blur-sm"
            >
              <h4 className="text-sand-200 font-semibold mb-3">Найдено туров</h4>
              <div className="text-4xl font-bold text-gold-400 mb-2">
                {filteredLocations.length}
              </div>
              <p className="text-sand-300 text-sm">
                из {TOUR_LOCATIONS.length} доступных направлений
              </p>
            </motion.div>
          </div>

          {/* Right column - Map and Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* View toggle */}
            <div className="flex gap-2">
              {['map', 'cards'].map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode as 'map' | 'cards')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 shadow-lg shadow-gold-500/30'
                      : 'bg-forest-700 text-sand-200 hover:bg-forest-600 border border-forest-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {mode === 'map' ? '🗺️ Карта' : '🎫 Туры'}
                </motion.button>
              ))}
            </div>

            {/* Map view */}
            <AnimatePresence mode="wait">
              {viewMode === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <InteractiveMap
                    locations={filteredLocations}
                    budget={filterState.budget}
                    onLocationClick={(location) => {
                      setHighlightedLocation(location);
                      setViewMode('cards');
                    }}
                    highlightedLocation={highlightedLocation}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards view */}
            <AnimatePresence mode="wait">
              {viewMode === 'cards' && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <TourCard
                          location={location}
                          budget={filterState.budget}
                          isHighlighted={
                            highlightedLocation?.id === location.id
                          }
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-4xl mb-4">🗺️</div>
                      <h3 className="text-2xl font-bold text-sand-200 mb-2">
                        Нет туров в этом бюджете
                      </h3>
                      <p className="text-sand-300">
                        Увеличь бюджет или измени фильтры поиска
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Spotlight section - Subtropics */}
        {highlightedForSubtropic && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-16"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  <span className="bg-gradient-to-r from-sand-300 via-gold-400 to-sand-300 bg-clip-text text-transparent">
                    ☀️ Субтропический рай
                  </span>
                </h2>
                <p className="text-center text-sand-200 text-lg mb-8">
                  Круглогодичное направление с контрастом моря и гор
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative h-96 rounded-lg overflow-hidden group"
                >
                  <img
                    src={highlightedForSubtropic.image}
                    alt="Сочи"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent opacity-70" />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-6 bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 px-6 py-3 rounded-full font-bold shadow-lg shadow-gold-500/30"
                  >
                    🌴 {highlightedForSubtropic.name}
                  </motion.div>
                </motion.div>

                {/* Content section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gold-300 mb-3">
                      {highlightedForSubtropic.description}
                    </h3>
                    <p className="text-sand-200 leading-relaxed text-lg">
                      Сочи - это уникальное место, где субтропический климат
                      встречается с кавказскими горами. Здесь можно загорать
                      на пляжах и одновременно кататься в горах. Идеальное
                      место для любого времени года.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-forest-700/50 p-4 rounded-lg border border-gold-500/20"
                    >
                      <div className="text-2xl mb-2">📅</div>
                      <div className="text-sm text-sand-300">Сезон</div>
                      <div className="font-bold text-gold-400">
                        Круглый год
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-forest-700/50 p-4 rounded-lg border border-gold-500/20"
                    >
                      <div className="text-2xl mb-2">💰</div>
                      <div className="text-sm text-sand-300">От</div>
                      <div className="font-bold text-gold-400">
                        ₽{(highlightedForSubtropic.minPrice / 1000).toFixed(0)}k
                      </div>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-forest-900 py-4 px-6 rounded-lg font-bold text-lg shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-all"
                  >
                    🏖️ Узнать больше о Сочи
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-gold-500/10 text-center text-sand-300"
        >
          <h3 className="text-2xl font-bold text-sand-200 mb-2">За Краем</h3>
          <p className="text-lg mb-4">Доступность всей России для каждого</p>
          <p className="text-sm opacity-75">
            © 2026 За Краем. Путешествуй мудро. Исследуй постоянно.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;
