# Quick Start Guide

## Option 1: Test Immediately (No Setup Required)

Open `demo.html` in your browser - it's a standalone file that works immediately!

```bash
# Just double-click demo.html or open it in a browser
# No installation needed!
```

## Option 2: Full Development Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Steps

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open in browser**
```
http://localhost:5173
```

4. **Build for production**
```bash
npm run build
```

The built files will be in the `dist/` folder.

## Testing the Application

### Test Scenario 1: Basic Slot Creation
1. Go to "Add Slot" tab
2. Create 5 slots with different configurations
3. Check "View All" to see all slots

### Test Scenario 2: Smart Allocation
1. Create slots:
   - Slot 1: No features
   - Slot 2: EV Charging only
   - Slot 3: Covered only
   - Slot 4: Both EV and Covered
2. Go to "Park Vehicle"
3. Try parking with different requirements:
   - No requirements → Should get Slot 1
   - EV only → Should get Slot 2
   - Cover only → Should get Slot 3
   - Both → Should get Slot 4

### Test Scenario 3: "No Slot Available"
1. Create 2 slots without EV charging
2. Try to park a vehicle that needs EV charging
3. Should see "No slot available" message

### Test Scenario 4: Nearest Slot Selection
1. Create slots 1, 2, 3 (all with EV)
2. Park vehicle needing EV
3. Should allocate Slot 1 (lowest number)
4. Park another → Should get Slot 2
5. Remove vehicle from Slot 1
6. Park another → Should get Slot 1 again (nearest)

## Features to Verify

- ✅ Add slots with customizable features
- ✅ View all slots with real-time status
- ✅ Park vehicles with smart allocation
- ✅ Remove vehicles from occupied slots
- ✅ Statistics dashboard updates live
- ✅ Proper "No slot available" handling
- ✅ Nearest slot selection (lowest number)
- ✅ Visual feedback and notifications
- ✅ Responsive design

## File Structure

```
smart-parking-lot-system/
├── demo.html                  ← Open this for instant demo!
├── src/
│   ├── main.jsx              ← React entry point
│   └── parking-lot-system.jsx ← Main component
├── index.html                 ← Vite HTML template
├── package.json              ← Dependencies
├── vite.config.js            ← Build config
├── README.md                 ← Full documentation
├── DEPLOYMENT.md             ← Deployment guide
└── QUICKSTART.md             ← This file
```

## Common Issues

### Port already in use
```bash
# Kill the process using port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
# Ensure Node.js version is 16+
node --version

# Update npm
npm install -g npm@latest
```

## Next Steps

1. Test all features locally
2. Make your git commits
3. Deploy to your chosen platform (see DEPLOYMENT.md)
4. Record your 2-minute demo video
5. Update README.md with live URL
6. Submit!

## Questions?

Check the main README.md for detailed documentation or DEPLOYMENT.md for deployment help.

---

**Pro Tip**: Start with `demo.html` to see the app working immediately, then set up the full development environment for customization!
