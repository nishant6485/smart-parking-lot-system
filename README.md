# Smart Parking Lot System

A modern, automated parking slot allocation and management system built with React. Features intelligent slot matching based on vehicle requirements (EV charging, covered parking) and automatic allocation of the nearest available slot.

##  Live Demo

[Live Deployment URL will be added here after deployment]

## 📹 Demo Video

[2-minute demo video link will be added here]

##  Features

### Core Functionality
- **Add Parking Slot**: Create new parking slots with customizable features (EV charging, covered)
- **View All Slots**: Visual dashboard showing all slots with real-time status
- **Park Vehicle**: Intelligent allocation system that finds the nearest matching slot
- **Remove Vehicle**: Free up occupied slots with one click

### Smart Allocation Logic
The system implements an efficient allocation algorithm:
1. Filters all available (non-occupied) slots
2. Matches EV charging requirement if needed
3. Matches covered parking requirement if needed
4. Selects the nearest slot (lowest slot number)
5. Returns "No slot available" if no matching slot exists

### UI Features
- **Real-time Statistics Dashboard**: Track total, occupied, available, EV, and covered slots
- **Tab-based Navigation**: Clean interface with Park, Add Slot, and View All sections
- **Status Indicators**: Visual feedback for slot availability and features
- **Notifications**: Success/error messages for all actions
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Inline CSS with custom design system
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd smart-parking-lot-system
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🏗️ Project Structure

```
smart-parking-lot-system/
├── src/
│   ├── main.jsx                    # Application entry point
│   └── parking-lot-system.jsx      # Main component with all logic
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # Project documentation
```

## 💡 Usage Guide

### Adding a Parking Slot
1. Click the "Add Slot" tab
2. Select desired features (EV Charging, Covered)
3. Click "Create Slot"
4. The slot is automatically assigned the next available number

### Parking a Vehicle
1. Click the "Park Vehicle" tab
2. Select required features (Needs EV Charging, Needs Cover)
3. Click "Allocate Slot"
4. System finds and assigns the nearest matching slot
5. If no slot matches, you'll see "No slot available"

### Viewing All Slots
1. Click the "View All" tab
2. See all slots with their current status
3. Occupied slots show a red indicator
4. Available slots show a green indicator
5. Click the X button on occupied slots to free them

## 🎨 Design Philosophy

The UI implements a **brutalist/industrial** aesthetic with:
- Monospace typography (Space Mono font)
- High-contrast dark theme
- Bold neon accent colors (#00ff88 green, #0088ff blue, #ff3366 red)
- Grid-based backgrounds
- Sharp, unrounded corners
- Bold shadows and borders

## 🧪 Data Model

Each parking slot contains:
```javascript
{
  slotNo: number,        // Unique slot identifier
  isCovered: boolean,    // Has weather protection
  isEVCharging: boolean, // Has EV charging station
  isOccupied: boolean    // Current occupancy status
}
```

## 🔍 Key Implementation Details

### Allocation Algorithm
```javascript
// Filter available slots matching requirements
const availableSlots = slots.filter(slot => {
  if (slot.isOccupied) return false;
  if (needsEV && !slot.isEVCharging) return false;
  if (needsCover && !slot.isCovered) return false;
  return true;
});

// Select nearest slot (lowest number)
const nearestSlot = availableSlots.reduce((nearest, slot) => 
  slot.slotNo < nearest.slotNo ? slot : nearest
);
```

### State Management
- Single state array for all slots
- Controlled forms with useState
- Immutable state updates with array methods

### Error Handling
- Validates slot availability before allocation
- Shows clear error messages for failed operations
- Prevents invalid state transitions

## 📊 Statistics Tracking

The dashboard automatically calculates:
- **Total Slots**: All created slots
- **Occupied**: Currently in use
- **Available**: Ready for parking
- **EV Available**: Available slots with EV charging
- **Covered Available**: Available covered slots

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

## 🧑‍💻 Development

The application uses:
- **No external CSS files**: All styling is inline for portability
- **No API calls**: Pure frontend logic
- **Local state only**: No database or backend required
- **Modular components**: Easy to extend and modify

## 📝 Assignment Requirements Checklist

- ✅ Add Parking Slot functionality
- ✅ View All Slots functionality
- ✅ Park Vehicle with smart allocation (needsEV, needsCover)
- ✅ Remove Vehicle functionality
- ✅ "No slot available" message when no match
- ✅ Complete UI with all required screens
- ✅ Add Slot form
- ✅ Slot listing screen
- ✅ Park/Remove screen
- ✅ Output display panel
- ✅ Clean, modular, readable code
- ✅ Error handling for invalid inputs
- ✅ Professional UI/UX

## 🤝 Contributing

This is an assignment project. Feel free to fork and modify for your own use.

## 📄 License

This project is created for educational purposes as part of a technical assignment.

## 👨‍💻 Author

[Your Name]

---

**Note**: Remember to add your live deployment URL and demo video link before final submission!
