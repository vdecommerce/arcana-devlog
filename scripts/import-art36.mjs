/** Import the 14 verified Art36 wide PNGs and optionally two Moon instrument PNGs.
 * Usage: node scripts/import-art36.mjs --renders-dir <absolute directory> [--instruments-dir <absolute directory>] [--check-only]
 * Does not edit posts, world descriptions, site status, or existing media keys.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const usage='Usage: node scripts/import-art36.mjs --renders-dir <absolute directory> [--instruments-dir <absolute directory>] [--check-only]';
const rows=[
  ['Saturn','saturn','Saturnus','Level_1_QuestLink',4],
  ['Earth','earth','Aarde','Earth',6],
  ['Mercury','mercury','Mercurius','Level_4_Mercury',5],
  ['Mars','mars','Mars','Level_5_Mars',2],
  ['Moon','moon','Maan','Level_6_Moon',2],
  ['Jupiter','jupiter','Jupiter','Level_3_Jupiter',2],
  ['Sun','sun','Zon','Level_7_Sun',4],
];
const fail=message=>{throw new Error(message);};
const ensure=(condition,message)=>{if(!condition)fail(message);};
const sha256=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
function hashField(value,label){
  ensure(typeof value==='string' && /^[a-f\d]{64}$/i.test(value),`${label}: missing or invalid SHA256`);
  return value.toLowerCase();
}
function readFields(bytes,label){
  const fields=Object.create(null);
  for(const line of bytes.toString('utf8').replace(/^\uFEFF/,'').split(/\r?\n/)){
    const match=/^([a-z0-9_]+)=(.*)$/.exec(line);
    if(!match)continue;
    ensure(!Object.hasOwn(fields,match[1]),`${label}: duplicate report field ${match[1]}`);
    fields[match[1]]=match[2];
  }
  return fields;
}
function integerField(fields,key,label){
  ensure(typeof fields[key]==='string' && /^\d+$/.test(fields[key]),`${label}: missing or invalid ${key}`);
  const value=Number(fields[key]);
  ensure(Number.isSafeInteger(value),`${label}: unsafe ${key}`);
  return value;
}
function parseArgs(){
  let rendersDir;let instrumentsDir;let checkOnly=false;
  const args=process.argv.slice(2);
  for(let index=0;index<args.length;index++){
    const arg=args[index];
    if(arg==='--help')return {help:true};
    if(arg==='--check-only'){
      ensure(!checkOnly,'Duplicate --check-only');checkOnly=true;
    }else if(arg==='--renders-dir'){
      ensure(!rendersDir,'Duplicate --renders-dir');
      rendersDir=args[++index];
      ensure(rendersDir && !rendersDir.startsWith('--'),'--renders-dir needs an absolute directory');
    }else if(arg==='--instruments-dir'){
      ensure(!instrumentsDir,'Duplicate --instruments-dir');
      instrumentsDir=args[++index];
      ensure(instrumentsDir && !instrumentsDir.startsWith('--'),'--instruments-dir needs an absolute directory');
    }else fail(`Unknown argument: ${arg}`);
  }
  ensure(rendersDir && path.isAbsolute(rendersDir),'An explicit absolute --renders-dir is required');
  rendersDir=path.resolve(rendersDir);
  ensure(fs.statSync(rendersDir).isDirectory(),'--renders-dir is not a directory');
  if(instrumentsDir){
    ensure(path.isAbsolute(instrumentsDir),'--instruments-dir must be absolute');
    instrumentsDir=path.resolve(instrumentsDir);
    ensure(fs.statSync(instrumentsDir).isDirectory(),'--instruments-dir is not a directory');
  }
  return {rendersDir,instrumentsDir,checkOnly};
}
function verifyRun(rendersDir,row,variant,view='wide'){
  const [folder,key,display,map,components]=row;
  const label=`${folder}/${view}/${variant}`;
  const directory=path.join(rendersDir,folder,variant);
  // Use only known filenames beneath the explicit input directory. The paths,
  // arguments and any private configuration recorded in run.json are not imported.
  const record=readJson(path.join(directory,'run.json'));
  ensure(record.status==='PASS' && record.exit_code===0,`${label}: run did not finish with PASS/exit 0`);
  ensure(record.world===folder && record.variant===variant,`${label}: run scope mismatch`);
  ensure((record.view??'wide')===view,`${label}: recorded view mismatch`);
  ensure(record.headset_proof===false,`${label}: expected a renderer reference`);
  const baseline=variant==='baseline';
  const expected=baseline?0:components;
  ensure(record.expected_components===expected,`${label}: expected-component record mismatch`);
  const dllHash=hashField(record.dll_sha256,label+' DLL');
  const args=record.arguments;
  ensure(Array.isArray(args) && args.every(value=>typeof value==='string'),`${label}: missing recorded render arguments`);
  for(const flag of ['-featureleveles31','-ArcanaQualityReview','-ArcanaVoiceRosterQA'])
    ensure(args.includes(flag),`${label}: missing ${flag}`);
  ensure(args.includes('-ArcanaArt36Baseline')===baseline,`${label}: baseline command flag mismatch`);
  ensure(args.includes('-ArcanaArt36InstrumentReview')===(view==='instrument'),`${label}: instrument command flag mismatch`);
  const bytes=fs.readFileSync(path.join(directory,map+'-game.png'));
  ensure(bytes.length>=33 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii',12,16)==='IHDR',`${label}: invalid PNG`);
  ensure(bytes.readUInt32BE(16)===1600 && bytes.readUInt32BE(20)===900,`${label}: expected PNG 1600x900`);
  const pngHash=sha256(bytes);
  ensure(pngHash===hashField(record.png_sha256,label+' PNG'),`${label}: PNG SHA256 mismatch`);
  const report=fs.readFileSync(path.join(directory,map+'-review.txt'));
  ensure(sha256(report)===hashField(record.report_sha256,label+' report'),`${label}: report SHA256 mismatch`);
  const fields=readFields(report,label);
  ensure(typeof fields.map==='string' && fields.map.endsWith(map),`${label}: report map mismatch`);
  ensure(fields.review_view===view,`${label}: expected a ${view} review`);
  for(const counter of ['collision_errors','inlay_errors','frame_errors','art36_errors'])
    ensure(integerField(fields,counter,label)===0,`${label}: ${counter} must be zero`);
  ensure(integerField(fields,'art36_components',label)===expected,`${label}: incorrect Art36 component count`);
  ensure(integerField(fields,'art36_baseline',label)===(baseline?1:0),`${label}: report baseline mismatch`);
  ensure(integerField(fields,'art36_instances',label)<=64 && integerField(fields,'art36_triangles',label)<=12000 && integerField(fields,'art36_material_sections',label)<=12,`${label}: Art36 budget exceeded`);
  if(baseline)for(const counter of ['art36_instances','art36_triangles','art36_material_sections'])
    ensure(integerField(fields,counter,label)===0,`${label}: baseline still contains Art36 geometry`);
  const log=fs.readFileSync(path.join(directory,'render.log'),'utf8');
  ensure(/shaderplatform="PCD3D_ES3_1"/i.test(log),`${label}: ES3.1 renderer not confirmed in log`);
  const imageKey=`${key}-art36-${view}-${variant}`;
  const relative=`assets/media/${imageKey}.png`;
  const metadata={
    path:relative,width:1600,height:900,revision:pngHash.slice(0,12),buildVersion:36,
    label:`${display} · ${view==='instrument'?'instrumentdetail':'overzicht'} · visuele proef 36 met nieuwe details ${baseline?'uit':'aan'} · mobiele Unreal-preview op Windows (ES3.1), geen headsetbeeld`,
  };
  return {imageKey,metadata,bytes,pngHash,dllHash,destination:path.join(root,'public',relative)};
}
function main(){
  const options=parseArgs();
  if(options.help){console.log(usage);return;}
  const manifestFile=path.join(root,'content/media.json');
  const manifestBytes=fs.readFileSync(manifestFile);
  const manifest=JSON.parse(manifestBytes.toString('utf8').replace(/^\uFEFF/,''));
  ensure(manifest && typeof manifest==='object' && !Array.isArray(manifest),'Invalid media manifest');
  const imports=[];
  for(const row of rows){
    const baseline=verifyRun(options.rendersDir,row,'baseline');
    const candidate=verifyRun(options.rendersDir,row,'candidate');
    ensure(baseline.dllHash===candidate.dllHash,`${row[0]}: baseline/candidate DLL mismatch`);
    imports.push(baseline,candidate);
  }
  if(options.instrumentsDir){
    const moon=rows.find(row=>row[0]==='Moon');
    const baseline=verifyRun(options.instrumentsDir,moon,'baseline','instrument');
    const candidate=verifyRun(options.instrumentsDir,moon,'candidate','instrument');
    const wideMoon=imports.find(item=>item.imageKey==='moon-art36-wide-baseline');
    ensure(baseline.dllHash===candidate.dllHash,'Moon instrument: baseline/candidate DLL mismatch');
    ensure(baseline.dllHash===wideMoon.dllHash,'Moon instrument/wide DLL mismatch');
    imports.push(baseline,candidate);
  }
  let existing=0;
  // Validate every run and destination before the first write. Unique keys keep
  // all previously published screenshots and historical references unchanged.
  for(const item of imports){
    if(Object.hasOwn(manifest,item.imageKey)){
      for(const [field,value] of Object.entries(item.metadata))
        ensure(manifest[item.imageKey]?.[field]===value,`${item.imageKey}: existing metadata conflicts; refusing overwrite`);
      ensure(fs.existsSync(item.destination),`${item.imageKey}: existing manifest entry has no PNG`);
      existing++;
    }
    if(fs.existsSync(item.destination))
      ensure(sha256(fs.readFileSync(item.destination))===item.pngHash,`${item.imageKey}: destination differs; refusing overwrite`);
  }
  const result={status:'PASS',mode:options.checkOnly?'check-only':'import',pairs:imports.length/2,validated_runs:imports.length,new_media_keys:imports.length-existing,existing_identical_keys:existing,unchanged_png_bytes:true};
  if(options.checkOnly){console.log(JSON.stringify(result));return;}
  ensure(fs.readFileSync(manifestFile).equals(manifestBytes),'Media manifest changed while checking; retry import');
  fs.mkdirSync(path.join(root,'public/assets/media'),{recursive:true});
  for(const item of imports){
    if(!fs.existsSync(item.destination))fs.writeFileSync(item.destination,item.bytes,{flag:'wx'});
    ensure(sha256(fs.readFileSync(item.destination))===item.pngHash,`${item.imageKey}: copied PNG verification failed`);
    if(!Object.hasOwn(manifest,item.imageKey))manifest[item.imageKey]=item.metadata;
  }
  // An identical rerun preserves the existing manifest bytes too.
  if(existing!==imports.length){
    ensure(fs.readFileSync(manifestFile).equals(manifestBytes),'Media manifest changed during copy; refusing replacement');
    const temporary=path.join(path.dirname(manifestFile),`.media-art36-${crypto.randomUUID()}.tmp`);
    try{
      fs.writeFileSync(temporary,JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
      fs.renameSync(temporary,manifestFile);
    }finally{if(fs.existsSync(temporary))fs.unlinkSync(temporary);}
  }
  console.log(JSON.stringify(result));
}
try{main();}catch(error){console.error(`Art36 import failed: ${error.message}`);process.exitCode=1;}
