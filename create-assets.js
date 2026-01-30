const fs = require('fs');
const path = require('path');

const assetsDir = './assets';

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Simple 1x1 pixel PNG (minimal valid PNG)
const createSimplePng = (filename) => {
  // This is a minimal valid PNG file (1x1 blue pixel)
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, // bit depth, color type, etc
    0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
    0x08, 0xD7, 0x63, 0x38, 0x68, 0xD6, 0x00, 0x00, // compressed data (blue pixel)
    0x00, 0x82, 0x00, 0x81, 0xDD, 0x91, 0x8E, 0xCD, // checksum
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND chunk
    0xAE, 0x42, 0x60, 0x82 // IEND CRC
  ]);
  
  fs.writeFileSync(path.join(assetsDir, filename), pngData);
  console.log(`Created: ${filename}`);
};

// Create all required assets
createSimplePng('icon.png');
createSimplePng('splash-icon.png');
createSimplePng('adaptive-icon.png');
createSimplePng('favicon.png');

console.log('\nAll assets created successfully!');
console.log('Note: These are placeholder images. Replace them with real icons later.');
