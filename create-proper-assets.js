const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const assetsDir = './assets';

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

function createIcon(filename, size, bgColor = { r: 30, g: 58, b: 95 }) {
  const png = new PNG({ width: size, height: size });
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      
      // Calculate center and radius for a circle
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.4;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      if (distance < radius) {
        // White circle (letter area)
        png.data[idx] = 255;     // R
        png.data[idx + 1] = 255; // G
        png.data[idx + 2] = 255; // B
        png.data[idx + 3] = 255; // A
      } else {
        // Background color
        png.data[idx] = bgColor.r;     // R
        png.data[idx + 1] = bgColor.g; // G
        png.data[idx + 2] = bgColor.b; // B
        png.data[idx + 3] = 255;       // A
      }
    }
  }
  
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(path.join(assetsDir, filename), buffer);
  console.log(`Created: ${filename} (${size}x${size})`);
}

// Create all required assets with proper sizes
createIcon('icon.png', 1024);           // App icon
createIcon('adaptive-icon.png', 1024);  // Android adaptive icon
createIcon('splash-icon.png', 200);     // Splash screen icon
createIcon('favicon.png', 48);          // Web favicon

console.log('\nAll assets created successfully!');

