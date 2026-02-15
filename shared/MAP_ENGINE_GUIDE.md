# 🗺️ Map Engine - Geography Game Foundation

## What is This?

The **Map Engine** is a reusable foundation for creating interactive geography games. Build unlimited map-based games by just swapping the data!

---

## 🎮 Games You Can Build

- ✅ **Earth Explorer** (continents & oceans) - DONE!
- 🔜 **USA States** (50 states to click)
- 🔜 **Europe Map** (40+ countries)
- 🔜 **Africa Explorer** (countries + capitals)
- 🔜 **Asia Map** (countries)
- 🔜 **USA Capitals** (click capital cities)
- 🔜 **World Landmarks** (famous places)
- 🔜 **Oceans & Seas** (detailed water bodies)
- 🔜 **Mountain Ranges** (geography features)
- 🔜 **ANY map-based game you can imagine!**

---

## 🏗️ How It Works

### **Three Files for Every Geography Game:**

1. **map-engine.js** (shared/map-engine.js)
   - Reusable for ALL games
   - Handles map rendering, clicks, labels
   - **Never needs to change!**

2. **map-data.js** (your-game/map-data.js)
   - Define your regions (states, countries, etc.)
   - Polygon coordinates
   - Colors and fun facts
   - **This is what you customize!**

3. **game.js** (your-game/game.js)
   - Game logic (questions, scoring, etc.)
   - Uses map engine to render
   - **Mostly copy-paste from Earth Explorer!**

---

## 📖 Quick Start: Build USA States Explorer

### **Step 1: Create Game Directory**
```bash
mkdir games/usa-states-explorer
```

### **Step 2: Copy Template Files**
```bash
# Copy index.html from Earth Explorer
cp games/earth-explorer/index.html games/usa-states-explorer/

# Copy game.js template
cp games/earth-explorer/game.js games/usa-states-explorer/
```

### **Step 3: Create Your Map Data**

Create `games/usa-states-explorer/map-data.js`:

```javascript
// USA States map data
const STATE_COLORS = {
    california: 0xFFD700,
    texas: 0xFF6B6B,
    florida: 0x87CEEB,
    // ... etc
};

const STATES = {
    california: {
        name: 'California',
        color: STATE_COLORS.california,
        funFact: 'California has the most people of any US state!',
        points: [
            // Polygon coordinates for California shape
            120, 200,
            140, 250,
            160, 300,
            // ... more points
        ]
    },

    texas: {
        name: 'Texas',
        color: STATE_COLORS.texas,
        funFact: 'Texas is the second biggest state!',
        points: [
            // Polygon coordinates for Texas shape
            300, 350,
            350, 380,
            // ... more points
        ]
    }

    // ... 48 more states!
};

const ALL_REGIONS = { ...STATES };
```

### **Step 4: Update game.js**

Just change the game title and analytics:

```javascript
// USA States Explorer - Interactive Geography Learning Game
// BUILT ON REUSABLE MAP ENGINE

// ... rest of the code stays the SAME!
// Just change titles, menu text, etc.
```

### **Step 5: Add to Main Menu**

Update `index.html`:
```html
<div class="game-card">
    <div class="game-icon">🗺️</div>
    <h2>USA States</h2>
    <p>Click on all 50 states!</p>
    <a href="games/usa-states-explorer/index.html" class="play-btn">Play Now</a>
</div>
```

**That's it! You have a new game!** 🎉

---

## 🎨 Map Engine API

### **createInteractiveMap(scene, regions, options)**

Creates an interactive clickable map.

**Parameters:**
- `scene` - Phaser scene object
- `regions` - Object with region definitions
- `options` - Configuration options

**Options:**
```javascript
{
    backgroundColor: 0x87CEEB,     // Sky blue
    oceanColor: 0x4A90E2,          // Ocean blue
    highlightColor: 0xFFFF00,      // Yellow on hover
    borderColor: 0x000000,         // Black borders
    borderWidth: 2,
    onRegionClick: (id, data) => { }, // Click callback
    onRegionHover: (id, data) => { }, // Hover callback
    showLabelsOnAnswer: true,      // Auto-label correct answers
    labelStyle: { ... }            // Text style for labels
}
```

**Returns:** Map controller object

---

## 🎮 Map Controller Methods

```javascript
const mapController = createInteractiveMap(scene, regions, options);

// Mark region as answered (highlights & labels it)
mapController.answerRegion('california');

// Check if region already answered
if (mapController.isAnswered('texas')) { ... }

// Shake a region (for wrong answers)
mapController.shakeRegion('florida');

// Get all region IDs
const allIds = mapController.getAllRegionIds();

// Reset the map (clear all answers)
mapController.reset();
```

---

## 📝 Region Data Format

### **Land Regions (Continents, Countries, States)**

```javascript
regionId: {
    name: "Region Name",           // Display name
    color: 0xHEXCOLOR,             // Fill color
    funFact: "Educational fact!",  // Shows after correct answer
    points: [                      // Polygon coordinates
        x1, y1,
        x2, y2,
        x3, y3,
        // ... more points
    ]
}
```

### **Ocean/Water Regions**

```javascript
oceanId: {
    name: "Ocean Name",
    color: 0xHEXCOLOR,
    funFact: "Educational fact!",
    isOcean: true,                 // Mark as ocean
    areas: [                       // Rectangular areas
        {
            x: 100,                // Center X
            y: 200,                // Center Y
            width: 150,            // Width
            height: 200,           // Height
            labelX: 100,           // Label X position
            labelY: 180            // Label Y position
        }
    ]
}
```

---

## 🎯 Tips for Creating Polygon Coordinates

### **Method 1: Draw on Paper**
1. Print a blank world map (900x650 pixels)
2. Mark key points of the region
3. Measure pixel coordinates
4. Enter into points array

### **Method 2: Use Image Editor**
1. Open world map in Photoshop/GIMP
2. Use pen tool to trace region
3. Export path coordinates
4. Convert to array format

### **Method 3: Simplify Existing Data**
1. Find SVG world maps online
2. Extract path data
3. Simplify to 15-25 key points
4. Convert to our format

### **Method 4: Trial & Error**
1. Start with rough approximation
2. Test in game
3. Adjust points until it looks right
4. Kids don't need perfect accuracy!

---

## 🌈 Color Recommendations

### **Kid-Friendly Color Palette:**
```javascript
const COLORS = {
    red: 0xFF6B6B,
    orange: 0xFFB347,
    yellow: 0xFFD93D,
    green: 0xA8E6CF,
    mint: 0x95E1D3,
    blue: 0x87CEEB,
    pink: 0xFF6B9D,
    purple: 0xB19CD9,
    coral: 0xFFAA85,
    gray: 0xE0E0E0
};
```

**Tips:**
- Use distinct colors for neighboring regions
- Bright colors = more engaging for kids
- Keep good contrast with labels
- Test on mobile (colors look different)

---

## 📏 Canvas Dimensions

**Standard:** 900px wide × 650px tall

**Coordinate System:**
- X: 0 (left) to 900 (right)
- Y: 0 (top) to 650 (bottom)
- Origin: Top-left corner

**Safe Zones:**
- Top: Reserve 60px for question text
- Bottom: Reserve 50px for buttons
- Sides: Leave 20px padding

**Usable Map Area:** ~860px × 540px

---

## 🔧 Troubleshooting

### **Problem: Regions don't look accurate**
- Add more polygon points (15-25 is good)
- Test and adjust coordinates
- Simplify complex shapes

### **Problem: Click detection not working**
- Ensure polygon is closed (first point = last point OR let Phaser close it)
- Check points are in clockwise or counter-clockwise order
- Use `setInteractive()` with polygon geometry

### **Problem: Labels overlap**
- Adjust label positions manually
- Use smaller font sizes
- Abbreviate long names

### **Problem: Colors look bad**
- Test on actual device (not just desktop)
- Use kid-friendly bright colors
- Ensure good contrast

---

## 📚 Examples

### **Earth Explorer**
- File: `games/earth-explorer/map-data.js`
- Regions: 7 continents + 5 oceans
- Shows both polygon (continents) and rectangular (oceans) regions

### **USA States (Template)**
```javascript
const STATES = {
    california: {
        name: 'California',
        color: 0xFFD700,
        funFact: 'Hollywood is in California!',
        points: [120,200, 140,250, 160,300, 140,340, 110,320, 100,260]
    }
};
```

### **Europe Countries (Template)**
```javascript
const COUNTRIES = {
    france: {
        name: 'France',
        color: 0x0055A4,
        funFact: 'The Eiffel Tower is in Paris, France!',
        points: [450,220, 470,240, 460,260, 440,250, 430,230]
    }
};
```

---

## ✅ Checklist for New Geography Game

- [ ] Create game directory
- [ ] Copy index.html template
- [ ] Copy game.js template
- [ ] Create map-data.js with regions
- [ ] Define polygon coordinates (15-25 points per region)
- [ ] Choose distinct colors
- [ ] Write fun facts for each region
- [ ] Test click detection
- [ ] Test on mobile
- [ ] Add to main menu (index.html)
- [ ] Update meta tags
- [ ] Test full game flow
- [ ] Commit and deploy!

---

## 🚀 Future Enhancements

**Planned Features:**
- [ ] SVG map import tool
- [ ] Visual polygon editor
- [ ] Auto-generate coordinates from images
- [ ] Difficulty levels (hints, timer)
- [ ] Multiplayer mode
- [ ] Progress tracking across games
- [ ] Printable certificates

---

## 📞 Need Help?

**Common Questions:**

**Q: How accurate do coordinates need to be?**
A: Kids don't need perfect accuracy! Rough shape recognition is enough.

**Q: How many points per region?**
A: 15-25 points gives good balance of accuracy and simplicity.

**Q: Can I use image maps instead?**
A: Yes! You can convert image map coordinates to our polygon format.

**Q: What about curved borders?**
A: Use more points to approximate curves (polygons only have straight edges).

---

**You now have the foundation to build UNLIMITED geography games!** 🌍

Every new geography game = 30-45 minutes of work instead of 4+ hours from scratch.

**Build your geography game empire!** 🏆
