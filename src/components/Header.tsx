import { Mountain, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ 
      backgroundColor: 'var(--bg-card)', 
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }} className="px-4 md:px-6 py-4">
      <div className="flex items-center justify-between max-w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg transition-all duration-200"
            aria-label="Toggle sidebar"
            style={{ 
              color: 'var(--accent-color)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Mountain className="w-7 md:w-9 h-7 md:h-9" style={{ color: 'var(--accent-color)' }} />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Rig Veda <span style={{ color: 'var(--accent-color)' }}>Sacred Atlas</span>
            </h1>
            <p className="text-xs md:text-sm hidden sm:block mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Interactive Geography of the Vedic World
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg transition-all duration-200"
            aria-label="Toggle theme"
            style={{ 
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <div className="text-xs hidden lg:block px-3 py-1.5 rounded-full" style={{ 
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            Mandalas 1-10 • Griffith (1896)
          </div>
        </div>
      </div>
    </header>
  );
}
