# 🚀 Deployment Guide - Rig Veda Sacred Atlas

## Quick Deploy to Vercel (5 minutes)

### Step 1: Get Mapbox Token (2 min)
1. Go to https://account.mapbox.com/
2. Sign up for free account (no credit card required)
3. Copy your **Default public token** from the dashboard
4. Free tier includes 50,000 map loads/month - more than enough!

### Step 2: Deploy to Vercel (3 min)

#### Option A: Deploy via Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Add environment variable
vercel env add VITE_MAPBOX_TOKEN
# Paste your Mapbox token when prompted
# Select: Production, Preview, Development (all three)

# Deploy to production
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add Environment Variable:
   - Name: `VITE_MAPBOX_TOKEN`
   - Value: Your Mapbox token
4. Click "Deploy"

### Step 3: Test Your Deployment
1. Visit your Vercel URL (e.g., `https://rigveda-atlas.vercel.app`)
2. Check that the map loads correctly
3. Test theme sliders
4. Test curated paths
5. Test on mobile device

---

## Alternative: Deploy to Netlify

### Via Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod

# Add environment variable in Netlify dashboard:
# Site settings → Environment variables → Add variable
# VITE_MAPBOX_TOKEN = your_token_here
```

### Via Netlify Dashboard
1. Go to https://app.netlify.com/
2. Drag and drop the `dist` folder after running `npm run build`
3. Add environment variable in Site Settings
4. Trigger a rebuild

---

## Testing the Build Locally

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Open http://localhost:4173
```

---

## Environment Variables

### Required
- `VITE_MAPBOX_TOKEN` - Your Mapbox public token

### Optional
None - the app has zero external dependencies beyond Mapbox

---

## Build Optimization Checklist

✅ Vite automatically optimizes:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

✅ Mapbox GL CSS is imported correctly
✅ TailwindCSS purges unused styles
✅ TypeScript compiled to optimized JS

---

## Performance Tips

1. **Mapbox Token**: Use a restricted token in production
   - Go to Mapbox dashboard → Tokens
   - Create a new token with URL restrictions
   - Add your Vercel domain to allowed URLs

2. **Caching**: Vercel automatically handles caching
   - Static assets cached for 1 year
   - HTML cached with revalidation

3. **CDN**: Both Vercel and Netlify use global CDN
   - Fast load times worldwide
   - Automatic HTTPS

---

## Troubleshooting

### Map doesn't load
- Check browser console for errors
- Verify `VITE_MAPBOX_TOKEN` is set correctly
- Ensure token is a **public** token, not secret

### Build fails
- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all dependencies are installed

### Styles look broken
- Clear browser cache
- Check that TailwindCSS is processing correctly
- Verify `postcss.config.js` and `tailwind.config.js` exist

---

## Post-Deployment

### 1. Update DEMO.md
Replace placeholder URLs with your actual deployment URL

### 2. Test All Features
- [ ] Map loads and displays markers
- [ ] Theme sliders filter locations
- [ ] Curated paths animate correctly
- [ ] Verse panels show on marker click
- [ ] Mobile responsive layout works
- [ ] No console errors

### 3. Share Your Link
- Tweet with #RigVedaHack
- Include 1-line pitch + demo video + live link
- Tag the hackathon organizer

---

## Custom Domain (Optional)

### Vercel
```bash
vercel domains add yourdomain.com
```

### Netlify
Go to Domain Settings → Add custom domain

---

**Your app is now live! 🎉**

Share it with the world and let people explore the sacred geography of the Rig Veda.
