import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const pages = JSON.parse(readFileSync(new URL('../src/content/pages.json', import.meta.url)));
test('Every migrated route has desktop and phone content',()=>{
  assert.equal(Object.keys(pages).length,10);
  for (const [route,page] of Object.entries(pages)) for(const mode of ['desktop','mobile']) assert.match(page[mode],/<h1[\s>]/,`${route} ${mode}`);
});
test('Page and CSS assets exist locally; no Framer runtime scripts',()=>{
  const content=Object.values(pages).flatMap(p=>[p.desktop,p.mobile]).join('\n')+readFileSync(new URL('../src/source.css',import.meta.url));
  assert.doesNotMatch(content, /<script\b|\[Truncated\]/i);
  assert.doesNotMatch(content,/https:\/\/(?:framerusercontent\.com|fonts\.gstatic\.com)/);
  for(const asset of content.matchAll(/\/assets\/([^\s"'<>),;]+)/g))assert.ok(existsSync(new URL('../public/assets/'+asset[1],import.meta.url)),asset[1]);
});
test('Every internal page link points to a migrated route',()=>{
  for(const p of Object.values(pages))for(const markup of [p.desktop,p.mobile])for(const link of markup.matchAll(/href="(\/[^"#?]*)"/g))assert.ok(pages[link[1]],link[1]);
});
