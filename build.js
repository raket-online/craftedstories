const { execSync } = require('child_process');
const fs = require('fs');

// 1. Build Tailwind CSS
execSync('npx tailwindcss -i ./src/input.css -o ./tailwind.css --minify', { stdio: 'inherit' });

// 2. Read the built CSS
const css = fs.readFileSync('./tailwind.css', 'utf8');
const styleTag = `<style id="tw">${css}</style>`;

// 3. Inject into all HTML files
const files = ['index.html', 'producten.html', 'over-ons.html', 'contact.html'];
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Replace existing inline style tag (re-runs)
  if (/<style id="tw">/.test(html)) {
    html = html.replace(/<style id="tw">[\s\S]*?<\/style>/, styleTag);
  } else {
    // First run: replace the external link
    html = html.replace('<link rel="stylesheet" href="tailwind.css">', styleTag);
  }

  fs.writeFileSync(file, html);
  console.log(`  Injected CSS into ${file}`);
}
console.log('Build done.');
