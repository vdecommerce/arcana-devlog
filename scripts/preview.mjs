import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const base=new URL(JSON.parse(fs.readFileSync(new URL('../content/site.json',import.meta.url))).url).pathname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
  try {
    let route=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    if(route==='/'){res.writeHead(302,{Location:base});res.end();return;}
    if(!route.startsWith(base)){res.writeHead(404);res.end('Not found');return;}
    let target=path.resolve(root,route.slice(base.length));
    if(!target.startsWith(root+path.sep)&&target!==root)throw Error('Path outside site');
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory()){
      if(!route.endsWith('/')){res.writeHead(301,{Location:route+'/'});res.end();return;}
      target=path.join(target,'index.html');
    }
    let status=200;if(!fs.existsSync(target)){status=404;target=path.join(root,'404.html');}
    res.writeHead(status,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(target).pipe(res);
  }catch{res.writeHead(400);res.end('Invalid path');}
});
server.listen(8089,'127.0.0.1',()=>console.log('Local URL: http://127.0.0.1:8089'+base));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close());
