const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove framer-motion imports
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*["']framer-motion["'];?/g, '');

  // 2. Replace <motion.tag> with <tag>
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

  // 3. Remove framer-motion specific props
  // We use regex to match propName={...} or propName="..."
  const propsToRemove = ['initial', 'animate', 'whileInView', 'viewport', 'transition', 'variants', 'whileHover', 'whileTap', 'exit', 'layout'];
  
  for (const prop of propsToRemove) {
    // This is a naive regex for props on a single line. 
    // A safer way is to just let React ignore them or remove them specifically.
    // Let's remove them if they are on a single line: prop={{...}} or prop="..." or prop={...}
    const regex1 = new RegExp(`\\s+${prop}=\\{\\{[^}]*\\}\\}(?=\\s|>)`, 'g');
    const regex2 = new RegExp(`\\s+${prop}=\\{[^}]*\\}(?=\\s|>)`, 'g');
    const regex3 = new RegExp(`\\s+${prop}="[^"]*"(?=\\s|>)`, 'g');
    const regex4 = new RegExp(`\\s+${prop}(?=\\s|>)`, 'g'); // boolean prop
    
    content = content.replace(regex1, '');
    content = content.replace(regex2, '');
    content = content.replace(regex3, '');
  }

  // 4. Handle AnimatePresence in FAQ.tsx
  content = content.replace(/<AnimatePresence>/g, '<>');
  content = content.replace(/<\/AnimatePresence>/g, '</>');

  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log("Framer Motion removed from all components.");
