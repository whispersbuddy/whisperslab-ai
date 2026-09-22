// One-off: remove the <header> and <footer> blocks from the extracted legacy
// page strings in app/_content/*.ts. The site header and footer are now React
// components rendered once from app/layout.tsx (components/SiteHeader.tsx,
// components/SiteFooter.tsx). Safe to re-run: files without the blocks are
// left untouched.
const fs = require("fs");
const path = require("path");

const FILES = ["home.ts", "audit.ts", "coreBuild.ts", "contact.ts"];
const dir = path.join(__dirname, "..", "app", "_content");

for (const name of FILES) {
  const file = path.join(dir, name);
  let src = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [open, close] of [["<header", "</header>"], ["<footer", "</footer>"]]) {
    const start = src.indexOf(open);
    const end = src.indexOf(close, start);
    if (start === -1 || end === -1) continue;
    src = src.slice(0, start) + src.slice(end + close.length);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, src);
    console.log("stripped", name);
  } else {
    console.log("no chrome found in", name);
  }
}
