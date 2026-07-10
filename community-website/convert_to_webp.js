const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const GALLERY_DIR = path.join(__dirname, 'public', 'images', 'gallery');
const GALLERY_DATA_FILE = path.join(__dirname, 'data', 'galleryData.ts');

async function convertImages() {
  console.log('Starting conversion to WebP...');

  // Find all images recursively
  const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = walkSync(path.join(dir, file), filelist);
      }
      else {
        filelist.push(path.join(dir, file));
      }
    });
    return filelist;
  };

  const allFiles = walkSync(GALLERY_DIR, []);
  
  let convertedCount = 0;

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.avif') {
      const dir = path.dirname(file);
      const name = path.basename(file, ext);
      const webpPath = path.join(dir, `${name}.webp`);

      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        fs.unlinkSync(file); // Delete the original file
        console.log(`Converted: ${path.relative(GALLERY_DIR, file)} -> ${name}.webp`);
        convertedCount++;
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }

  console.log(`Converted ${convertedCount} images to WebP.`);

  // Now update galleryData.ts
  if (fs.existsSync(GALLERY_DATA_FILE)) {
    let content = fs.readFileSync(GALLERY_DATA_FILE, 'utf-8');
    
    // Replace .jpg, .jpeg, .png, .avif with .webp
    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');
    content = content.replace(/\.png/g, '.webp');
    content = content.replace(/\.avif/g, '.webp');

    fs.writeFileSync(GALLERY_DATA_FILE, content, 'utf-8');
    console.log('Updated galleryData.ts');
  }
}

convertImages().catch(console.error);
