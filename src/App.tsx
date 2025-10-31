import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import type { Location, ThemeFilters } from './data/types';
import { locations } from './data/locations';
import { paths } from './data/paths';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeFilters, setThemeFilters] = useState<ThemeFilters>({
    dawn: 0,
    rain: 0,
    battle: 0,
    soma: 0,
    fire: 0,
    rta: 0,
  });

  // Apply theme based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load path from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathId = params.get('path');
    if (pathId && paths.find(p => p.id === pathId)) {
      setSelectedPath(pathId);
    }
  }, []);

  // Update URL when path changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedPath) {
      params.set('path', selectedPath);
    } else {
      params.delete('path');
    }
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [selectedPath]);

  // Don't filter locations - show all and let MapComponent handle visualization
  const filteredLocations = locations;

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* Sidebar - Always visible on desktop (md+), toggleable on mobile */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`} style={{ width: '480px', flexShrink: 0, height: '100%', overflow: 'auto' }}>
          <Sidebar
            selectedLocation={selectedLocation}
            selectedPath={selectedPath}
            onPathSelect={setSelectedPath}
            themeFilters={themeFilters}
            onThemeChange={setThemeFilters}
            paths={paths}
          />
        </div>
        {/* Map */}
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <MapComponent
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            selectedPath={selectedPath}
            paths={paths}
            themeFilters={themeFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
