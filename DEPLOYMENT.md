# Deployment Guide

## Quick Deployment Steps

### Option 1: Vercel (Easiest - Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```
   
   Or use the Vercel dashboard:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy using Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

   Or use Netlify dashboard:
   - Go to https://app.netlify.com
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** (add these scripts):
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.js** (set base URL):
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/smart-parking-lot-system/'  // Replace with your repo name
   });
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Save

### Option 4: Render

1. Go to https://render.com
2. Click "New" > "Static Site"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. Click "Create Static Site"

## Testing Locally Before Deployment

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173 in your browser

# Build for production
npm run build

# Preview production build
npm run preview
```

## Post-Deployment Checklist

- [ ] Test all features on live URL
- [ ] Verify slot creation works
- [ ] Verify parking allocation logic
- [ ] Verify vehicle removal
- [ ] Test on mobile devices
- [ ] Update README.md with live URL
- [ ] Record 2-minute demo video
- [ ] Make at least 3 git commits
- [ ] Submit GitHub repo link
- [ ] Submit live deployment URL

## Git Commit Examples

Make meaningful commits throughout development:

```bash
# Initial commit
git add .
git commit -m "Initial commit: Project setup with Vite and React"
git push

# Feature commits
git add src/parking-lot-system.jsx
git commit -m "Add core parking lot logic and smart allocation algorithm"
git push

git add src/parking-lot-system.jsx
git commit -m "Implement UI with brutalist design and real-time statistics"
git push

git add README.md DEPLOYMENT.md
git commit -m "Add comprehensive documentation and deployment guide"
git push
```

## Troubleshooting

### Build fails
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Blank page after deployment
- Check browser console for errors
- Verify `base` path in vite.config.js matches your deployment URL
- Ensure all file paths are correct

### 404 errors
- For SPA routing, add a `_redirects` file (Netlify) or `vercel.json` (Vercel)
- Ensure index.html is in the root of dist folder

## Environment Variables

This project doesn't require any environment variables.

## Performance Tips

The app is already optimized:
- Minimal dependencies
- No heavy libraries
- CSS-in-JS for zero overhead
- Vite for fast builds
- Code splitting enabled by default

## Support

If you encounter issues:
1. Check the deployment platform's documentation
2. Verify build logs for errors
3. Test locally first with `npm run preview`
4. Ensure all files are committed to git

---

Good luck with your deployment! 🚀
