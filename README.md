# 🏔️ За Краем - Travel Aggregator

**За Краем** is a high-tech, responsive travel aggregator showcasing Russia's diverse destinations with an interactive budget-based filtering system.

## ✨ Features

- **Interactive SVG Map** - Dynamic map with clickable destination markers
- **Smart Budget Filter** - Adjust budget slider to see affordable destinations
- **Category Tags** - Filter by trip types: ☕ Coffee Trip, 💰 Salary Trip, 🏔️ Expedition  
- **Beautiful UI** - Premium design with forest green, sand, and gold color palette
- **Smooth Animations** - Framer Motion animations for a polished experience
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Featured Destinations** - Special spotlight on Sochi's subtropical paradise

## 🗺️ Destinations Included

- **Сочи** (Sochi) - Year-round subtropical resort ☀️
- **Байкал** (Lake Baikal) - Ancient freshwater lake 💎
- **Камчатка** (Kamchatka) - Volcanic plateaus & geysers 🌋
- **Мурманск** (Murmansk) - Northern lights & Arctic beauty ✨
- **Алтай** (Altai) - Mountain lakes & taiga 🏔️
- **Симеиз** (Simeis) - Southern Black Sea coast 🏖️
- **Оймякон** (Oymyakon) - Coldest inhabited place ❄️
- **Ладожское озеро** (Lake Ladoga) - Europe's largest lake 🌊

## 💰 Budget Categories

- **☕ Цена чашки кофе** (Coffee Price) - ₽0-30k - Weekend getaways
- **💰 На одну зарплату** (One Salary) - ₽30k-200k - Full vacation
- **🏔️ За горизонт** (Beyond the Horizon) - ₽200k+ - Expedition adventures

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v3 with custom color palette
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🎨 Design System

**Color Palette:**
- Forest Green: `#2d8659` (primary)
- Sand: `#c9985a` (secondary)  
- Gold: `#ffcd33` (accent)

**Typography:**
- Display: Georgia (serif)
- Body: Inter (system-ui)
- Wide letter-spacing for premium feel

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Surge.sh
```bash
npm install -g surge
surge dist
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── InteractiveMap.tsx
│   ├── BudgetSlider.tsx
│   ├── TagFilter.tsx
│   └── TourCard.tsx
├── App.tsx
├── data.ts
├── types.ts
└── index.css
```

## 📊 Performance

- Gzip CSS: 4.54 kB
- Gzip JS: 107.40 kB
- 60fps animations
- Fast load times

---

**Путешествуй мудро. Исследуй постоянно.**
