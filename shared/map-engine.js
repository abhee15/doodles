/**
 * REUSABLE MAP ENGINE FOR GEOGRAPHY GAMES
 *
 * This is the foundation for all geography-based educational games.
 * Use this for: Earth Explorer, USA States, Europe Map, etc.
 *
 * HOW TO USE:
 * 1. Define your map regions (continents, countries, states, etc.)
 * 2. Call createInteractiveMap(scene, regions, options)
 * 3. Handle clicks with the provided callbacks
 *
 * Features:
 * - Clickable polygon regions
 * - Hover effects
 * - Auto-labeling when answered
 * - Persistent answered regions
 * - Beautiful visual feedback
 */

/**
 * Create an interactive map with clickable regions
 * @param {Phaser.Scene} scene - Phaser scene
 * @param {Object} regions - Map regions data (continents, countries, etc.)
 * @param {Object} options - Configuration options
 * @returns {Object} Map controller with helper methods
 */
// eslint-disable-next-line no-unused-vars
function createInteractiveMap(scene, regions, options = {}) {
  const defaults = {
    backgroundColor: 0x87ceeb, // Sky blue
    oceanColor: 0x4a90e2, // Ocean blue
    highlightColor: 0xffff00, // Yellow highlight
    borderColor: 0x000000, // Black borders
    borderWidth: 2,
    borderAlpha: 0.4,
    onRegionClick: null, // Callback when region clicked
    onRegionHover: null, // Callback when region hovered
    showLabelsOnAnswer: true, // Auto-label when answered
    labelStyle: {
      fontSize: '16px',
      fill: '#000000',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      backgroundColor: '#FFFFFF',
      padding: { x: 8, y: 4 }
    }
  };

  const config = { ...defaults, ...options };
  const mapObjects = {};
  const answeredRegions = new Set();

  // Draw ocean background
  scene.add.rectangle(450, 325, 900, 650, config.backgroundColor);

  // Render all regions
  Object.entries(regions).forEach(([id, region]) => {
    if (region.isOcean) {
      // Handle ocean regions (simple rectangles for now)
      renderOceanRegion(scene, id, region, mapObjects, config);
    } else {
      // Handle land regions (polygons)
      renderLandRegion(scene, id, region, mapObjects, config);
    }
  });

  // Public API
  return {
    /**
     * Mark a region as answered (highlight and label it)
     */
    answerRegion(regionId) {
      if (answeredRegions.has(regionId)) {
        return false;
      }

      answeredRegions.add(regionId);
      const region = regions[regionId];
      const obj = mapObjects[regionId];

      if (!obj) {
        return false;
      }

      // Show label if enabled
      if (config.showLabelsOnAnswer) {
        showRegionLabel(scene, obj, region, config);
      }

      // Make non-interactive
      obj.polygons.forEach(polygon => {
        polygon.disableInteractive();
        if (region.isOcean) {
          polygon.setFillStyle(config.oceanColor, 0.6);
        }
      });

      // Show existing label if it exists (for oceans)
      if (obj.label) {
        obj.label.setVisible(true);
        obj.label.setDepth(1500);
      }

      return true;
    },

    /**
     * Check if region is already answered
     */
    isAnswered(regionId) {
      return answeredRegions.has(regionId);
    },

    /**
     * Get region object for custom manipulation
     */
    getRegion(regionId) {
      return mapObjects[regionId];
    },

    /**
     * Shake a region (for wrong answers)
     */
    shakeRegion(regionId) {
      const obj = mapObjects[regionId];
      if (!obj) {
        return;
      }

      obj.polygons.forEach(polygon => {
        scene.tweens.add({
          targets: polygon,
          x: polygon.x + 5,
          duration: 50,
          yoyo: true,
          repeat: 3
        });
      });
    },

    /**
     * Get all region IDs
     */
    getAllRegionIds() {
      return Object.keys(regions);
    },

    /**
     * Reset the map (clear all answers)
     */
    reset() {
      answeredRegions.clear();
      Object.values(mapObjects).forEach(obj => {
        obj.polygons.forEach(polygon => polygon.destroy());
        if (obj.text) {
          obj.text.destroy();
        }
        if (obj.label) {
          obj.label.destroy();
        }
      });
    }
  };
}

/**
 * Render a land region (continent, country, state, etc.)
 */
function renderLandRegion(scene, id, region, mapObjects, config) {
  const polygon = scene.add.polygon(0, 0, region.points, region.color, 1);
  polygon.setOrigin(0);
  polygon.setStrokeStyle(config.borderWidth, config.borderColor, config.borderAlpha);
  polygon.setInteractive(new Phaser.Geom.Polygon(region.points), Phaser.Geom.Polygon.Contains);

  mapObjects[id] = {
    polygons: [polygon],
    text: null,
    type: 'land',
    data: region
  };

  // Hover effects
  polygon.on('pointerover', () => {
    polygon.setFillStyle(config.highlightColor, 0.8);
    if (config.onRegionHover) {
      config.onRegionHover(id, region);
    }
  });

  polygon.on('pointerout', () => {
    polygon.setFillStyle(region.color, 1);
  });

  polygon.on('pointerdown', () => {
    if (config.onRegionClick) {
      config.onRegionClick(id, region);
    }
  });
}

/**
 * Render an ocean region (simple rectangular area)
 */
function renderOceanRegion(scene, id, region, mapObjects, config) {
  if (!region.areas) {
    return;
  }

  const polygons = [];

  region.areas.forEach(area => {
    const rect = scene.add.rectangle(area.x, area.y, area.width, area.height, config.oceanColor, 0);
    rect.setStrokeStyle(3, 0xffffff, 0.5);
    rect.setInteractive({ useHandCursor: true });

    rect.on('pointerover', () => {
      rect.setFillStyle(config.highlightColor, 0.3);
    });

    rect.on('pointerout', () => {
      rect.setFillStyle(config.oceanColor, 0);
    });

    rect.on('pointerdown', () => {
      if (config.onRegionClick) {
        config.onRegionClick(id, region);
      }
    });

    polygons.push(rect);
  });

  // Create label (hidden initially)
  const firstArea = region.areas[0];
  const label = scene.add
    .text(firstArea.labelX || firstArea.x, firstArea.labelY || firstArea.y, region.name, {
      fontSize: '16px',
      fill: '#FFFFFF',
      fontFamily: 'Arial',
      align: 'center',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3
    })
    .setOrigin(0.5)
    .setVisible(false);

  mapObjects[id] = {
    polygons: polygons,
    text: null,
    label: label,
    type: 'ocean',
    data: region
  };
}

/**
 * Show label on a region
 */
function showRegionLabel(scene, obj, region, config) {
  if (obj.label) {
    // Ocean - just show existing label
    obj.label.setVisible(true);
    obj.label.setDepth(1500);
    return;
  }

  // Land region - create new label
  const bounds = obj.polygons[0].getBounds();
  const labelText = scene.add
    .text(bounds.centerX, bounds.centerY, region.name, config.labelStyle)
    .setOrigin(0.5);
  labelText.setDepth(1500);
  obj.text = labelText;
}

/**
 * Helper: Create clickable region from image map coordinates
 * (For future: if we use image maps with coordinate data)
 */
// eslint-disable-next-line no-unused-vars
function createRegionFromImageMap(imageMapCoords) {
  // Convert image map coords to Phaser polygon
  // Implementation for future image-based maps
  return imageMapCoords;
}
