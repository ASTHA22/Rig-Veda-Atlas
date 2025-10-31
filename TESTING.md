# 🧪 Testing Checklist - Rig Veda Sacred Atlas

## 🌐 Open the App

**URL**: http://localhost:5173

The dev server is already running! Just open this URL in your browser.

---

## ✅ Feature Testing Checklist

### 1. Map Loads (30 seconds)
- [ ] Dark theme map appears
- [ ] You see markers on the map (India region)
- [ ] Map is centered around North India
- [ ] No console errors (press F12 to check)

### 2. Markers Work (1 minute)
- [ ] Click on **Sarasvati River** marker (blue, near Punjab)
- [ ] Sidebar shows verse details
- [ ] Click on **Mujavat Mountains** marker (purple, northwest)
- [ ] Popup appears on hover
- [ ] Dashed border on high-uncertainty locations

### 3. Theme Sliders (2 minutes)
- [ ] Move **Dawn** slider to 50%
- [ ] Map filters to show only dawn-related locations
- [ ] Move **Rain** slider to 70%
- [ ] Fewer markers visible (only high rain values)
- [ ] Reset all sliders to 0
- [ ] All markers reappear

### 4. Curated Paths (2 minutes)
- [ ] Click **"Journey of Sacred Rivers"** in sidebar
- [ ] Blue line appears connecting river locations
- [ ] Map auto-zooms to fit the path
- [ ] Click **"Dawn Across the Vedic World"**
- [ ] Amber line appears
- [ ] Click path again to deselect

### 5. Verse Details (1 minute)
- [ ] Click any marker
- [ ] Sidebar shows:
  - Location name
  - Type (river/mountain/tribe/place)
  - Description
  - Uncertainty level (low/medium/high)
  - Verses with RV references
  - Griffith translation
  - Theme presence bars

### 6. Mobile Responsive (1 minute)
- [ ] Resize browser window to mobile size (< 768px)
- [ ] Hamburger menu appears (top left)
- [ ] Click hamburger to toggle sidebar
- [ ] Sidebar overlays map with backdrop
- [ ] Click backdrop to close sidebar

### 7. UI/UX Polish (1 minute)
- [ ] Smooth animations when clicking markers
- [ ] Hover effects on sliders
- [ ] Gold accent colors visible
- [ ] Dark theme consistent throughout
- [ ] Legend visible (bottom left)
- [ ] Instructions overlay (top center)

---

## 🐛 Common Issues & Fixes

### Map doesn't load
**Symptoms**: Blank gray area where map should be  
**Fix**: 
1. Check browser console (F12)
2. Look for network errors
3. Ensure internet connection (needs to load tiles)
4. Try hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)

### Markers not appearing
**Symptoms**: Map loads but no markers  
**Fix**:
1. Check if theme sliders are at 0
2. Zoom out to see full India
3. Check console for JavaScript errors

### Sidebar not showing verses
**Symptoms**: Click marker but sidebar empty  
**Fix**:
1. Click marker again
2. Check console for errors
3. Refresh page

### Paths not drawing
**Symptoms**: Click path but no line appears  
**Fix**:
1. Ensure at least 2 locations in path are visible
2. Check if theme filters are hiding path locations
3. Reset theme sliders to 0

---

## 📊 Performance Check

Open browser DevTools (F12) → Network tab:

**Expected metrics:**
- **Initial load**: < 2 seconds
- **Bundle size**: ~375KB (main JS)
- **CSS size**: ~26KB
- **Map tiles**: Load on demand
- **No failed requests**: All green in network tab

---

## 🎨 Visual Quality Check

### Colors
- [ ] Background: Deep black (#0a0a0a)
- [ ] Cards: Dark gray (#1a1a1a)
- [ ] Accent: Vedic gold (#D4AF37)
- [ ] Rivers: Blue (#3B82F6)
- [ ] Mountains: Purple (#8B5CF6)
- [ ] Tribes: Red (#EF4444)
- [ ] Places: Amber (#F59E0B)

### Typography
- [ ] Headings: Bold, gold color
- [ ] Body text: Light gray, readable
- [ ] Verse references: Monospace font
- [ ] Inter font loaded from Google Fonts

### Animations
- [ ] Markers pulse when selected
- [ ] Smooth zoom on marker click
- [ ] Slider thumbs glow on hover
- [ ] Path lines animate smoothly

---

## 🚀 Ready for Deployment?

If all checks pass:
- ✅ Map loads and works
- ✅ All features functional
- ✅ Mobile responsive
- ✅ No console errors
- ✅ Performance is good

**You're ready to deploy!** 🎉

Next step: `vercel --prod`

---

## 📝 Notes

**Current Status**: 
- Dev server running on port 5173
- Leaflet maps (no API key needed)
- Build size: 375KB
- Zero data collection
- Public domain translations

**Test on different browsers:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (Mac)

**Test on mobile device:**
- [ ] iPhone/Android
- [ ] Tablet
