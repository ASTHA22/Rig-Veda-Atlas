import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Location, Path, ThemeFilters } from '../data/types';
import { useTheme } from '../context/ThemeContext';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location | null) => void;
  selectedPath: string | null;
  paths: Path[];
  themeFilters?: ThemeFilters;
}

// Helper to fit bounds when path changes
function PathBounds({ path, locations }: { path: Path | null; locations: Location[] }) {
  const map = useMap();

  useEffect(() => {
    if (!path) return;

    const pathLocations = path.locations
      .map((id) => locations.find((loc) => loc.id === id))
      .filter((loc): loc is Location => loc !== undefined);

    if (pathLocations.length > 0) {
      const bounds = L.latLngBounds(
        pathLocations.map((loc) => [loc.coordinates[1], loc.coordinates[0]] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [path, locations, map]);

  return null;
}

// Custom marker creator with theme intensity glow and icons
function createCustomIcon(type: string, isSelected: boolean, uncertainty: string, themeIntensity: number = 0, activeTheme: string = '', hasActiveSlider: boolean = false) {
  const colors = {
    river: '#38bdf8', // blue
    mountain: '#8B5CF6', // purple
    tribe: '#ef4444', // red
    place: '#fb923c', // orange
  };

  const themeColors = {
    dawn: '#fbbf24', // amber
    rain: '#38bdf8', // blue
    battle: '#ef4444', // red
    soma: '#a78bfa', // purple
    fire: '#fb923c', // orange
    rta: '#fde047', // yellow
  };

  // Use theme color if active, otherwise use type color
  const color = activeTheme && themeColors[activeTheme as keyof typeof themeColors] 
    ? themeColors[activeTheme as keyof typeof themeColors]
    : colors[type as keyof typeof colors] || '#fb923c';

  const baseSize = 24;
  // If slider is active and location has low/no intensity, make it much smaller
  const sizeMultiplier = hasActiveSlider ? (themeIntensity < 10 ? 0.5 : themeIntensity < 30 ? 0.6 : 1) : 1;
  const size = isSelected ? 36 : (baseSize + (themeIntensity / 100) * 12) * sizeMultiplier; // Grows with theme intensity
  const borderStyle = uncertainty === 'high' ? 'dashed' : 'solid';
  const glowSize = isSelected ? 20 : 10 + (themeIntensity / 100) * 20; // Stronger glow with theme
  // Reduce opacity dramatically for low-intensity locations when slider is active
  const baseOpacity = hasActiveSlider ? (themeIntensity < 10 ? 0.15 : themeIntensity < 30 ? 0.25 : 0.5) : 0.5;
  const opacity = baseOpacity + (themeIntensity / 100) * 0.5; // More opaque with theme

  // Theme icon SVGs matching sidebar
  const themeIcons = {
    dawn: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`, // Sunrise
    rain: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`, // Droplets
    battle: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>`, // Swords
    soma: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>`, // Wine
    fire: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`, // Flame
    rta: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`, // Sparkles
  };

  // Type-based icons (default when no theme is active)
  const typeIcons = {
    river: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`, // Droplets
    mountain: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`, // Mountain
    tribe: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>`, // Swords
    place: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`, // Pin
  };

  const icon = activeTheme && themeIcons[activeTheme as keyof typeof themeIcons]
    ? themeIcons[activeTheme as keyof typeof themeIcons]
    : typeIcons[type as keyof typeof typeIcons] || typeIcons.place;

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px ${borderStyle} #ffffff;
      box-shadow: 0 0 ${glowSize}px ${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')};
      animation: ${themeIntensity > 50 ? 'pulse 2s infinite' : 'none'};
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      ${icon}
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    </style>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapComponent({
  locations,
  selectedLocation,
  onLocationSelect,
  selectedPath,
  paths,
  themeFilters,
}: MapProps) {
  const { theme } = useTheme();
  const selectedPathData = paths.find((p) => p.id === selectedPath) || null;
  
  // Check if any slider is active
  const hasActiveSlider = themeFilters ? Object.values(themeFilters).some(v => v > 0) : false;

  const pathCoordinates = selectedPathData
    ? selectedPathData.locations
        .map((id) => locations.find((loc) => loc.id === id))
        .filter((loc): loc is Location => loc !== undefined)
        .map((loc) => [loc.coordinates[1], loc.coordinates[0]] as [number, number])
    : [];

  // Calculate theme intensity for a location and get active theme
  const getThemeIntensity = (location: Location): { intensity: number; activeTheme: string } => {
    if (!themeFilters) return { intensity: 0, activeTheme: '' };
    
    const activeThemes = Object.entries(themeFilters).filter(([_, value]) => (value as number) > 0);
    
    // If no sliders are active, show the location's strongest theme
    if (activeThemes.length === 0) {
      let maxIntensity = 0;
      let dominantTheme = '';
      
      Object.entries(location.themes).forEach(([theme, intensity]) => {
        if (intensity > maxIntensity) {
          maxIntensity = intensity;
          dominantTheme = theme;
        }
      });
      
      return { intensity: maxIntensity, activeTheme: dominantTheme };
    }
    
    // When sliders are active, find which active theme this location has strongest
    let maxIntensity = 0;
    let dominantTheme = '';
    
    // Check all active themes and find which one this location has strongest
    activeThemes.forEach(([theme]) => {
      const intensity = location.themes[theme as keyof typeof location.themes] || 0;
      if (intensity > maxIntensity) {
        maxIntensity = intensity;
        dominantTheme = theme;
      }
    });
    
    // If location has none of the active themes, use the highest slider's theme
    if (maxIntensity === 0) {
      let highestSliderValue = 0;
      activeThemes.forEach(([theme, sliderValue]) => {
        if ((sliderValue as number) > highestSliderValue) {
          highestSliderValue = sliderValue as number;
          dominantTheme = theme;
        }
      });
    }
    
    return { intensity: maxIntensity, activeTheme: dominantTheme };
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <MapContainer
        center={[28.0, 77.0]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
      <TileLayer
        url={theme === 'dark' 
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={20}
      />

      {locations.map((location) => {
        const { intensity, activeTheme } = getThemeIntensity(location);
        return (
          <Marker
            key={location.id}
            position={[location.coordinates[1], location.coordinates[0]]}
            icon={createCustomIcon(
              location.type,
              selectedLocation?.id === location.id,
              location.uncertainty,
              intensity,
              activeTheme,
              hasActiveSlider
            )}
            eventHandlers={{
              click: () => {}, // Don't update sidebar, only show popup
            }}
          >
            <Popup maxWidth={400} maxHeight={500}>
              <div className="text-sm" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ fontSize: '16px', color: 'var(--accent-color)' }}>{location.name}</strong>
                  <br />
                  <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{location.type}</span>
                </div>

                {/* Uncertainty Flag */}
                <div style={{ marginBottom: '12px' }}>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Uncertainty:
                  </span>
                  {' '}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      location.uncertainty === 'low'
                        ? 'bg-green-900/30 text-green-400'
                        : location.uncertainty === 'medium'
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}
                  >
                    {location.uncertainty.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '12px' }}>
                  <p className="text-xs" style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>
                    {location.description}
                  </p>
                </div>

                {/* Verses */}
                {location.verses.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Verses ({location.verses.length})
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {location.verses.map((verse, idx) => (
                        <div key={idx} style={{ 
                          marginBottom: '8px', 
                          padding: '8px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '4px',
                          borderLeft: '3px solid var(--accent-color)'
                        }}>
                          <div className="text-xs font-mono" style={{ color: 'var(--accent-color)', marginBottom: '4px' }}>
                            {verse.reference}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>
                            {verse.translation}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                            — {verse.translator}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Theme Intensity */}
                {intensity > 0 && (
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                    <span className="text-xs" style={{ color: 'var(--accent-color)' }}>
                      Theme Intensity: {Math.round(intensity)}%
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {selectedPathData && pathCoordinates.length > 1 && (
        <Polyline
          positions={pathCoordinates}
          pathOptions={{
            color: selectedPathData.color,
            weight: 4,
            opacity: 0.8,
          }}
        />
      )}

      <PathBounds path={selectedPathData} locations={locations} />
    </MapContainer>
    </div>
  );
}
