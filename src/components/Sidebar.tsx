import { useState } from 'react';
import { Sunrise, Droplets, Swords, Wine, Flame, Sparkles, MapPin, X, Share2 } from 'lucide-react';
import type { Location, ThemeFilters, Path } from '../data/types';

interface SidebarProps {
  selectedLocation: Location | null;
  selectedPath: string | null;
  onPathSelect: (pathId: string | null) => void;
  themeFilters: ThemeFilters;
  onThemeChange: (filters: ThemeFilters) => void;
  paths: Path[];
}

const themeConfig = [
  { key: 'dawn', label: 'Dawn (Uṣas)', icon: Sunrise, color: '#fbbf24' }, // amber
  { key: 'rain', label: 'Rain & Waters', icon: Droplets, color: '#38bdf8' }, // blue
  { key: 'battle', label: 'Battle & Victory', icon: Swords, color: '#ef4444' }, // red
  { key: 'soma', label: 'Soma', icon: Wine, color: '#a78bfa' }, // purple
  { key: 'fire', label: 'Fire (Agni)', icon: Flame, color: '#fb923c' }, // orange
  { key: 'rta', label: 'Ṛta (Order)', icon: Sparkles, color: '#fde047' }, // yellow
];

export default function Sidebar({
  selectedLocation,
  selectedPath,
  onPathSelect,
  themeFilters,
  onThemeChange,
  paths,
}: SidebarProps) {
  const [copiedPathId, setCopiedPathId] = useState<string | null>(null);
  
  const handleThemeChange = (theme: keyof ThemeFilters, value: number) => {
    onThemeChange({
      ...themeFilters,
      [theme]: value,
    });
  };

  return (
    <div className="sidebar-dark overflow-y-auto overflow-x-hidden flex flex-col h-full flex-shrink-0" style={{
      borderRight: '1px solid var(--border-color)',
      width: '100%'
    }}>
      {/* Selected Location Details - Show at top when selected */}
      {selectedLocation && (
        <div className="sidebar-section py-6 border-b" style={{ borderColor: 'var(--accent-color)' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--accent-color)' }}>
                {selectedLocation.name}
              </h2>
            </div>
            <button
              onClick={() => {}}
              className="hover:opacity-70 transition-opacity"
              aria-label="Close"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Type</div>
              <div className="text-sm capitalize" style={{ color: 'var(--text-primary)' }}>{selectedLocation.type}</div>
            </div>

            <div>
              <div className="text-xs uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Description</div>
              <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{selectedLocation.description}</div>
            </div>

            <div>
              <div className="text-xs uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>
                Location Uncertainty
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedLocation.uncertainty === 'low'
                      ? 'bg-green-900/30 text-green-400'
                      : selectedLocation.uncertainty === 'medium'
                      ? 'bg-yellow-900/30 text-yellow-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}
                >
                  {selectedLocation.uncertainty.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                Verses ({selectedLocation.verses.length})
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedLocation.verses.map((verse, idx) => (
                  <div key={idx} className="p-3 rounded border" style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)'
                  }}>
                    <div className="text-xs font-mono mb-1" style={{ color: 'var(--accent-color)' }}>
                      {verse.reference}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {verse.translation}
                    </div>
                    <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                      — {verse.translator}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {Object.keys(selectedLocation.themes).length > 0 && (
              <div>
                <div className="text-xs uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>Theme Presence</div>
                <div className="space-y-2">
                  {Object.entries(selectedLocation.themes).map(([theme, value]) => {
                    const config = themeConfig.find((t) => t.key === theme);
                    if (!config || !value) return null;
                    const Icon = config.icon;
                    return (
                      <div key={theme} className="flex items-center gap-2">
                        <Icon className="w-3 h-3" style={{ color: config.color }} />
                        <div className="flex-1 rounded-full h-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${value}%`, backgroundColor: config.color }}
                          />
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{value}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Theme Sliders */}
      <div className="sidebar-section border-b border-vedic-gold/20" style={{ paddingTop: '0px', paddingBottom: '32px' }}>
        <h2 className="text-lg font-semibold text-vedic-gold mb-4">Theme Filters</h2>
        <div className="space-y-4">
          {themeConfig.map(({ key, label, icon: Icon, color }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <label className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</label>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {themeFilters[key as keyof ThemeFilters]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={themeFilters[key as keyof ThemeFilters]}
                onChange={(e) =>
                  handleThemeChange(key as keyof ThemeFilters, parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none slider"
                style={{ color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Curated Paths */}
      <div className="sidebar-section border-b" style={{ borderColor: 'var(--border-color)', paddingTop: '32px', paddingBottom: '20px' }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-color)' }}>
          Curated Journeys
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
          Explore thematic paths through the Vedic world
        </p>
        
        <div className="space-y-3">
          {paths.map((path) => {
            const purposeEmoji: Record<string, string> = {
              fire: '🔥',
              hospitality: '🤝',
              cosmic: '⭐',
              battle: '⚔️',
              water: '💧',
              ritual: '🍷'
            };
            const emoji = path.purpose ? purposeEmoji[path.purpose] || '📍' : '📍';
            
            // Better color contrast for yellow
            const displayColor = path.color === '#fde047' ? '#eab308' : path.color;
            
            return (
              <div 
                key={path.id} 
                className="relative group rounded-lg transition-all hover:shadow-lg"
                style={{
                  borderWidth: '1px',
                  borderColor: selectedPath === path.id ? displayColor : 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: selectedPath === path.id 
                    ? `${displayColor}15` 
                    : 'rgba(255, 255, 255, 0.05)',
                  padding: '16px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <button
                  onClick={() => onPathSelect(selectedPath === path.id ? null : path.id)}
                  className="w-full text-left pr-12"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ opacity: selectedPath === path.id ? 1 : 0.7 }}
                    >
                      {emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base mb-1.5" style={{ color: displayColor }}>
                        {path.name}
                      </div>
                      {path.purpose && (
                        <span 
                          className="inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-2"
                          style={{ 
                            backgroundColor: `${displayColor}20`,
                            color: displayColor,
                            border: `1px solid ${displayColor}60`
                          }}
                        >
                          {path.purpose}
                        </span>
                      )}
                      <div className="text-sm leading-relaxed mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                        {path.description}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" style={{ color: displayColor }} />
                        <span className="text-xs font-medium" style={{ color: displayColor }}>
                          {path.locations.length} locations
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = `${window.location.origin}${window.location.pathname}?path=${path.id}`;
                    navigator.clipboard.writeText(url);
                    setCopiedPathId(path.id);
                    setTimeout(() => setCopiedPathId(null), 2000);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-lg transition-all hover:scale-110 hover:rotate-12"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                  title="Share this journey"
                >
                  {copiedPathId === path.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <Share2 className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                  )}
                </button>
                {copiedPathId === path.id && (
                  <div
                    className="absolute top-4 right-16 text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.5)',
                      color: '#10b981'
                    }}
                  >
                    Path URL copied
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


      {/* Attribution Footer */}
      <div className="p-4 border-t border-vedic-gold/20 text-xs text-gray-500">
        <p className="mb-1">
          <strong>Sources:</strong> Rig Veda Samhita (Mandalas 1-10)
        </p>
        <p className="mb-1">
          <strong>Translation:</strong> Ralph T.H. Griffith (1896) - Public Domain
        </p>
        <p>
          <strong>Data Collection:</strong> Zero. No analytics, no tracking.
        </p>
      </div>
    </div>
  );
}
