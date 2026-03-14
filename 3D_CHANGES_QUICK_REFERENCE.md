# 3D Visualization Changes — Quick Reference

## Moon Phases (`moon-phases/game.js`)

### Lighting Changes

```javascript
// BEFORE
const sunLight = new THREE.DirectionalLight(0xffffee, 2.5);
sunLight.position.set(20, 2, 0);
scene.add(new THREE.AmbientLight(0x112244, 0.35));

// AFTER
const sunLight = new THREE.DirectionalLight(0xffffee, 3);
sunLight.position.set(20, 5, 5);
const fillLight = new THREE.DirectionalLight(0x6699ff, 1.5);
fillLight.position.set(-15, -5, -5);
scene.add(new THREE.AmbientLight(0x4488dd, 0.6));
```

### Material Changes

```javascript
// BEFORE - Earth
new THREE.MeshLambertMaterial({ color: 0x2266cc });

// AFTER - Earth
new THREE.MeshStandardMaterial({
  color: 0x1e90ff,
  metalness: 0.3,
  roughness: 0.4,
  emissive: 0x0047ab,
  emissiveIntensity: 0.2
});
```

### Animation Changes

```javascript
// AFTER - Added pulsing glow
earth.material.emissiveIntensity = 0.2 + Math.sin(Date.now() * 0.002) * 0.1;
```

---

## Photosynthesis Explorer (`photosynthesis-explorer/game.js`)

### Key Enhancements

- Sun: Added emissive glow with 0.8 intensity
- Leaf: Added emissive green glow + bobbing animation
- Lighting: Added green fill light for accent
- Animation: Leaf bobs vertically with sine wave

### Example: Sun Material

```javascript
// BEFORE
new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

// AFTER
new THREE.MeshStandardMaterial({
  color: 0xfcd34d,
  emissive: 0xfbbf24,
  emissiveIntensity: 0.8,
  metalness: 0.2,
  roughness: 0.3
});
```

---

## Water Cycle (`water-cycle/game.js`)

### Ocean Enhancement

```javascript
// BEFORE
new THREE.MeshLambertMaterial({ color: 0x0369a1 });

// AFTER
new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  metalness: 0.3,
  roughness: 0.4,
  emissive: 0x015a96,
  emissiveIntensity: 0.15
});
```

### Particle Enhancement

- Count: 12 → 16 particles
- Color: 0xdbeafe → 0xe0f4ff (brighter)
- Added: Emissive glow (0xb3e5fc)
- Animation: Scale pulsing for visibility

### Background

- 0x87ceeb → 0x87d4ff (brighter sky)

---

## Day & Night (`day-and-night/game.js`)

### Earth Material

```javascript
// BEFORE
new THREE.MeshLambertMaterial({ color: 0x22c55e });

// AFTER
new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  metalness: 0.2,
  roughness: 0.4,
  emissive: 0x16a34a,
  emissiveIntensity: 0.15
});
```

### Lighting Improvements

- Sun Light: 2.0 → 2.8 intensity
- Added fill light: Blue directional (0x3b82f6, 1.2)
- Ambient: 0x1a1a2e → 0x3b5998 (more blue)

### Animation

```javascript
// New glow pulsing
earth.material.emissiveIntensity = 0.15 + Math.sin(timeVal * 0.8) * 0.08;
```

---

## Seasons Science (`seasons-science/game.js`)

### Key Changes

- Camera: 0, 2, 10 → 3, 4, 11 (better angled view)
- Orbit line: Color 0x444444 → 0x6b7280 (brighter)
- Sun sphere size: 1.2 → 1.3
- Stars: 300 → 400
- Added: Fill light (indigo, 1.2)

### Background

- 0x0a0a0a → 0x0d1220 (blue-tinted space)

---

## Volcano Science (`volcano-science/game.js`)

### Magma Chamber Glow

```javascript
// BEFORE - weak glow
new THREE.MeshLambertMaterial({
  color: 0xdc2626,
  emissive: 0x7f1313
});

// AFTER - strong glow
new THREE.MeshStandardMaterial({
  color: 0xef4444,
  emissive: 0xdc2626,
  emissiveIntensity: 0.8,
  metalness: 0.1,
  roughness: 0.3
});
```

### Core Glow

- Brightness: 0xff4444 → 0xff6b35 (brighter)
- Added: Emissive 0xff4444 at max intensity (1.0)
- Animation: Pulsing scale + emissive intensity

### Lighting

- Added second light: 0xff6b35 (red glow)
- Ambient: 0x663300 → 0x8b4513 (warmer brown)

---

## Earthquake Science (`earthquake-science/game.js`)

### Plate Materials

```javascript
// BEFORE - basic brown
new THREE.MeshLambertMaterial({ color: 0x92400e });

// AFTER - textured with glow
new THREE.MeshStandardMaterial({
  color: 0xb8860b,
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x8b6914,
  emissiveIntensity: 0.1
});
```

### Stress Indicator

- Added emissive glow (0xff4444, 1.0)
- Increased size: 0.4 → 0.5
- Animation: Larger scale pulses (up to 1.5x)

### Fault Line

```javascript
// Added emissive glow pulsing
fault.material.emissiveIntensity = 0.6 + Math.sin(timeVal * 0.8) * 0.2;
```

---

## Gravity Science (`gravity-science/game.js`)

### Object Enhancements

```javascript
// Red falling sphere BEFORE
new THREE.MeshLambertMaterial({ color: 0xef4444 });

// Red falling sphere AFTER
new THREE.MeshStandardMaterial({
  color: 0xff6b6b,
  emissive: 0xef4444,
  emissiveIntensity: 0.4,
  metalness: 0.1,
  roughness: 0.3
});
```

### Gravity Well

- Wireframe color: 0x8b5cf6 → 0xa78bfa (brighter purple)
- Opacity range: 0.1 constant → 0.15-0.35 pulsing
- Size: 5.0 → 5.5 radius

### Lighting

- Added point light at Earth position (0xa78bfa, 0.8)
- Ambient: 0x6366f1 → 0x7c3aed (deeper purple)

---

## Rainbows Science (`rainbows-science/game.js`)

### Rainbow Rays Enhancement

```javascript
// BEFORE - basic colors
const rayMat = new THREE.MeshBasicMaterial({ color });

// AFTER - glowing colors
const rayMat = new THREE.MeshStandardMaterial({
  color,
  emissive: color,
  emissiveIntensity: 0.7,
  metalness: 0.1,
  roughness: 0.1
});
```

### Particle Changes

- Cylinder radius: 0.08 → 0.12 (larger, more visible)
- Ray positions: Adjusted for better fan pattern
- Animation: Individual glow pulsing per color

### Sun Enhancement

```javascript
// New emissive sun
color: 0xffffff,
emissive: 0xfcd34d,
emissiveIntensity: 1.0
```

### Lighting

- Added point light: 0xffffff, 1.5 strength
- Added directional light: 0xffffff, 1.0 strength

---

## Common Patterns Applied

### 1. Material Upgrade Pattern

```javascript
// Old: MeshLambertMaterial
new THREE.MeshLambertMaterial({ color: 0xXXXXXX })

// New: MeshStandardMaterial
new THREE.MeshStandardMaterial({
  color: 0xXXXXXX,
  metalness: 0.1-0.3,
  roughness: 0.3-0.6,
  emissive: 0xXXXXXX,
  emissiveIntensity: 0.15-0.8
})
```

### 2. Lighting Pattern

```javascript
// Main light (sun direction)
const mainLight = new THREE.DirectionalLight(0xffffee, 2.0-3.0);
mainLight.position.set(x, y, z);

// Fill light (opposite direction)
const fillLight = new THREE.DirectionalLight(0xCCCCCC, 1.0-1.5);
fillLight.position.set(-x, -y, -z);

// Ambient base
scene.add(new THREE.AmbientLight(0xXXXXXX, 0.6-0.9));
```

### 3. Animation Pattern

```javascript
// Glow pulsing
object.material.emissiveIntensity = base + Math.sin(Date.now() * speed) * range;

// Scale pulsing
const pulse = 1 + Math.sin(Date.now() * speed) * amount;
object.scale.set(pulse, pulse, pulse);
```

---

## Testing Checklist

- [ ] All 9 games load without console errors
- [ ] Glow effects are smooth (no flickering)
- [ ] Objects stand out against background
- [ ] Animations are subtle but noticeable
- [ ] Performance is acceptable (60 FPS)
- [ ] Mobile view looks good (portrait & landscape)
- [ ] Colors appear vibrant and saturated
- [ ] Lighting creates proper depth/dimension
