// One-off conversion script: extracts <body> inner HTML from the legacy static
// pages and writes them out as TS modules exporting a raw HTML string, with
// path rewrites (assets/ -> /assets/, *.html -> Next routes) and the inert
// onsubmit="return false;" stripped so the real submit handlers can run.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.resolve(__dirname, '..', 'app', '_content');
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  { src: 'index.html', out: 'home.ts', varName: 'HOME_HTML' },
  { src: 'audit.html', out: 'audit.ts', varName: 'AUDIT_HTML' },
  { src: 'core-build.html', out: 'coreBuild.ts', varName: 'CORE_BUILD_HTML' },
  { src: 'contact.html', out: 'contact.ts', varName: 'CONTACT_HTML' },
];

function extractBody(html) {
  const start = html.indexOf('<body>') + '<body>'.length;
  const end = html.indexOf('</body>');
  return html.slice(start, end);
}

function transform(body) {
  let out = body;
  // drop the legacy script tag, we re-implement behavior in a client component
  out = out.replace(/\s*<script src="script\.js"><\/script>\s*/g, '\n');
  // remove inert inline handlers; real handlers are wired via addEventListener
  out = out.replace(/ onsubmit="return false;"/g, '');
  // asset paths
  out = out.replace(/(src|href)="assets\//g, '$1="/assets/');
  // internal page links
  out = out.replace(/href="index\.html#/g, 'href="/#');
  out = out.replace(/href="index\.html"/g, 'href="/"');
  out = out.replace(/href="audit\.html"/g, 'href="/audit"');
  out = out.replace(/href="core-build\.html"/g, 'href="/core-build"');
  out = out.replace(/href="contact\.html"/g, 'href="/contact"');
  return out;
}

for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p.src), 'utf8');
  const body = transform(extractBody(html));
  const ts = `// AUTO-EXTRACTED from legacy ${p.src} — markup preserved verbatim.\nexport const ${p.varName} = ${JSON.stringify(body)};\n`;
  fs.writeFileSync(path.join(OUT, p.out), ts);
  console.log('wrote', p.out, body.length, 'chars');
}
