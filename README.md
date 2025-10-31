# 🕉️ Rig Veda Sacred Atlas

**Interactive geographical exploration of the Rig Veda** - Combining sacred geography, thematic filtering, and curated journeys through the Vedic world.

🌐 **[Live Demo](https://rigveda-atlas.vercel.app)** | 📖 [Documentation](./QUICKSTART.md)

## ✨ Features

- 🗺️ **Interactive Map**: Explore rivers, mountains, tribes, and sacred places mentioned in the Rig Veda
- 🎨 **Theme Filters**: Dynamic sliders for Dawn, Rain, Battle, Soma, Fire, and Ṛta (cosmic order)
- 🛤️ **Curated Journeys**: Follow pre-made paths like "Journey of Sacred Rivers" and "Path of Sacred Fire"
- 📜 **Verse Citations**: Every location linked to specific Rig Veda verses with translations
- 🎯 **Uncertainty Indicators**: Visual markers for disputed geographical locations
- 🌓 **Dark/Light Mode**: Automatic theme switching based on system preference
- 📱 **Responsive Design**: Works beautifully on desktop and mobile
- 🔗 **Shareable Journeys**: Share specific paths via URL

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (you have v18.18.0 - perfect!)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📊 Data Sources

- **Text**: Rig Veda Samhita (Mandalas 1-10 only, no Khilas)
- **Translation**: Ralph T.H. Griffith (1896) - Public Domain
- **Geographical Data**: Curated from academic sources with uncertainty indicators

## 🎯 Hackathon Compliance

✅ **No login or paywall** - Fully public access  
✅ **Zero data collection** - No analytics, no tracking  
✅ **Public domain translations** - Griffith (1896)  
✅ **Clear source attribution** - In sidebar footer  
✅ **Desktop + Mobile** - Responsive design  
✅ **Mandalas 1-10 only** - No Khilas included  

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Maps**: Leaflet + React-Leaflet (100% Free & Open Source)
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Top navigation
│   ├── Sidebar.tsx      # Theme filters + paths + verse details
│   └── Map.tsx          # Interactive Leaflet map
├── data/
│   ├── types.ts         # TypeScript interfaces
│   ├── locations.ts     # Geographical data with verses
│   └── paths.ts         # Curated journey definitions
└── App.tsx              # Main application logic
```

## 🎨 Color Scheme

- **Gold** (#D4AF37) - Vedic accent color
- **Saffron** (#FF9933) - Cultural resonance
- **Dark Background** (#0a0a0a) - Premium dark theme

## 📝 License

This project uses public domain translations (Griffith 1896). The code is open source.

## 🙏 Acknowledgments

Built for the Rig Veda Hackathon. Inspired by vedaweb.uni-koeln.de and iashris.com.
