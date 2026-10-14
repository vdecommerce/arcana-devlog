import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const site=JSON.parse(fs.readFileSync(path.join(root,'content/site.json')));
const base=new URL(site.url).pathname;
const all=[];function walk(folder){for(const item of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,item.name);if(item.isDirectory())walk(file);else all.push(file);}}walk(dist);
const worlds=JSON.parse(fs.readFileSync(path.join(root,'content/worlds.json')));
const posts=JSON.parse(fs.readFileSync(path.join(root,'content/posts.json')));
const media=JSON.parse(fs.readFileSync(path.join(root,'content/media.json')));
const pages=all.filter(p=>p.endsWith('.html'));assert.equal(pages.length,6+worlds.length+posts.length);
const seen=new Set();let links=0;
for(const file of pages){
  const text=fs.readFileSync(file,'utf8');
  assert.match(text,/<html lang="nl">/);assert.match(text,/<title>.+<\/title>/);assert.match(text,/<main id="main">/);
  assert.doesNotMatch(text,/file:\/\/|localhost|[A-Z]:\\|FAL_KEY|OPENAI_API_KEY|sk-proj-/);
  const canonical=text.match(/rel="canonical" href="([^"]+)"/)[1];assert.ok(!seen.has(canonical),'Duplicate canonical');seen.add(canonical);
  assert.equal((text.match(/<h1[ >]/g)||[]).length,1,'One page heading');
  for(const match of text.matchAll(/(?:src|href)="([^"]+)"/g)){
    const href=match[1];if(!href.startsWith(base))continue;
    const decoded=decodeURIComponent(href.split(/[?#]/)[0].slice(base.length));
    let target=path.join(dist,decoded);if(href.endsWith('/'))target=path.join(target,'index.html');
    assert.ok(fs.existsSync(target),`Missing ${href} from ${path.relative(dist,file)}`);links++;
  }
  for(const match of text.matchAll(/<img [^>]*>/g)){
    assert.match(match[0],/alt="[^"]*"/);
    if(!match[0].includes('<img alt="">')){assert.match(match[0],/width="\d+"/);assert.match(match[0],/height="\d+"/);}
  }
}
assert.ok(fs.existsSync(path.join(dist,'robots.txt')));assert.ok(fs.existsSync(path.join(dist,'sitemap.xml')));assert.ok(fs.existsSync(path.join(dist,'feed.xml')));
const webImages=all.filter(f=>f.endsWith('.webp')).length;
assert.equal(webImages,Object.values(media).filter(m=>m.path.endsWith('.webp')).length);
console.log(JSON.stringify({status:'PASS',pages:pages.length,local_links_and_assets:links,web_images:webImages,canonicals_unique:true}));
