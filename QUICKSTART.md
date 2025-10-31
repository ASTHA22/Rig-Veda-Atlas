# ⚡ Quick Start - Get Your Project Live in 10 Minutes

## Step 1: Test Locally (2 minutes)

```bash
# Make sure dev server is running
npm run dev

# Open http://localhost:5173
# Test all features:
# - Click markers
# - Adjust theme sliders
# - Select curated paths
```

## Step 2: Deploy to Vercel (3 minutes)

### Option A: Quick Deploy (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Option B: GitHub + Vercel Dashboard
1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Rig Veda Sacred Atlas - Hackathon submission"
   git remote add origin https://github.com/yourusername/rigveda-atlas.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Click "Deploy"

## Step 3: Record Demo (5 minutes)

### Recording Tips
1. Use QuickTime (Mac) or OBS (Windows/Mac)
2. Record in 1080p
3. Keep it 60 seconds max
4. Show these features:
   - Map overview (5s)
   - Click a marker → verse panel (10s)
   - Adjust theme sliders → map updates (15s)
   - Select curated path → animated route (15s)
   - Mobile view (10s)
   - Closing statement (5s)

### Demo Script
```
"Rig Veda Sacred Atlas - explore the geography of the Vedic world.

Click any marker to see verses from the Rig Veda with translations.

Use theme sliders to filter by Dawn, Rain, Battle, Soma, Fire, and Ṛta.
Watch the map highlight relevant locations.

Select a curated journey like 'Journey of Sacred Rivers' 
to follow an animated path through connected places.

Every location is backed by verse citations with uncertainty indicators.
Zero data collection, fully accessible, mobile-friendly.

Explore the Rig Veda like never before."
```

## Step 4: Submit (1 minute)

### Tweet Format
```
🕉️ Rig Veda Sacred Atlas - My #RigVedaHack submission!

Interactive map combining geography, thematic filtering, and curated journeys through the Vedic world.

✨ Features:
- Click markers for verses
- Theme sliders (Dawn/Rain/Battle/Soma/Fire/Ṛta)
- Animated path journeys
- 20+ verse citations
- Mobile responsive

🔗 Live: [your-vercel-url]
📹 Demo: [youtube/loom link]
💻 Code: [github link]

Built with React + Leaflet + TailwindCSS
Zero data collection | Public domain translations

#RigVeda #VedicStudies #InteractiveViz
```

---

## ✅ Pre-Submission Checklist

- [ ] Live site loads without errors
- [ ] All markers clickable
- [ ] Theme sliders work
- [ ] Paths animate correctly
- [ ] Mobile responsive (test on phone)
- [ ] Demo video recorded (60s max)
- [ ] GitHub repo public
- [ ] Tweet drafted with #RigVedaHack

---

## 🐛 Quick Troubleshooting

**Map doesn't load?**
→ Check browser console for errors
→ Ensure internet connection (needs to load map tiles)

**Build fails?**
→ Run `npm run build` locally first
→ Check for TypeScript errors

**Styles broken?**
→ Clear browser cache
→ Hard refresh (Cmd+Shift+R)

**Mobile menu not working?**
→ Click hamburger icon (top left)

---

## 📊 Expected Performance

- **Build time**: ~2-3 seconds
- **Bundle size**: ~375KB (optimized with Leaflet!)
- **Load time**: <2 seconds on fast connection
- **Lighthouse score**: 90+ (excellent!)

---

## 🎯 What Makes This Win

1. **Visual Impact**: Maps are memorable
2. **Feature Combo**: 3 ideas in 1 (unique!)
3. **Rigor**: Every claim cited
4. **Polish**: Smooth animations, beautiful design
5. **Usability**: Value in 30 seconds

---

## 🚀 You're Ready!

Your project is **production-ready** and **hackathon-compliant**.

Just deploy, record demo, and submit! No API keys needed!

**Good luck! 🍀**

---

**Questions?** Check:
- `README.md` - Full setup guide
- `DEPLOYMENT.md` - Detailed deploy instructions
- `PROJECT_SUMMARY.md` - Complete feature list
- `DEMO.md` - Submission template
