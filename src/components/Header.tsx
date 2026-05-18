import { Compass } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-gradient-to-b from-forest-900 to-forest-800 border-b border-gold-500/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="relative">
            <div className="landscape-line absolute -bottom-2 left-0 right-0 w-16" />
            <Compass className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="brand-name">За Краем</h1>
        </div>
        <p className="brand-subtitle text-center">
          Доступность всей России: от бюджетных вылазок до эксклюзивных экспедиций
        </p>
      </div>
    </div>
  );
};
