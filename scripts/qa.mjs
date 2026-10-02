// Isolated application QA. Does not use the user's browser/profile.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base=process.env.QA_URL||'http://127.0.0.1:3000', output='docs/qa/v3';
await mkdir(output,{recursive:true});
const manifest=JSON.parse(await readFile('docs/audit/derivatives-v3.json','utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const result={version:'V3',status:'RUNNING',viewports:[],checks:[],errors:[],accessibility:[],images:[],motion:[],videos:[],performance:[]};
let currentPage;
const chapterIds=['inicio','desenvolvimento','competencias','pratica','especialistas','em-acao','empresa','formatos','origem','conversa'];
const navigate=async(page,id)=>{await page.locator('.chapter-menu summary').click();await page.locator(`.chapter-panel a[href="#${id}"]`).click();await page.waitForTimeout(300);assert.equal(await page.locator('.chapter-menu').getAttribute('open'),null);};
const geometry=page=>page.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,pins:document.querySelectorAll('.pin-spacer').length,clipped:[...document.querySelectorAll('h1,h2,h3,p,summary,figcaption')].filter(e=>e.clientWidth>1&&e.scrollWidth>e.clientWidth+3).map(e=>e.textContent.slice(0,70))}));
const capture=async(page,label)=>page.screenshot({path:`${output}/${label}.png`});
const scroll=async(page,y,delay=300)=>{await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(delay);};
const sourceInventory=async(page,label)=>{
 const images=await page.locator('[data-media]').evaluateAll(imgs=>imgs.map(img=>{const r=img.getBoundingClientRect(),s=getComputedStyle(img);return {name:img.dataset.media,currentSrc:img.currentSrc,srcset:img.srcset,sizes:img.sizes,cssWidth:r.width,cssHeight:r.height,objectFit:s.objectFit,objectPosition:s.objectPosition,dpr:devicePixelRatio,complete:img.complete,naturalWidth:img.naturalWidth};}));
 for(const image of images){
  const asset=manifest[image.name],file=image.currentSrc.split('/').at(-1),derivative=asset.derivatives.find(d=>d.file===file);
  assert.ok(derivative,`${label}: image loaded ${image.name} ${image.currentSrc}`);
  const effective=image.objectFit==='cover'?Math.max(image.cssWidth,image.cssHeight*asset.width/asset.height):image.objectFit==='contain'?Math.min(image.cssWidth,image.cssHeight*asset.width/asset.height):image.cssWidth;
  image.source=asset.source;image.original={width:asset.width,height:asset.height,bytes:asset.sourceBytes,format:asset.sourceFormat};image.derivative=derivative;image.requiredPixels=effective*image.dpr;image.densityCoverage=derivative.width/image.requiredPixels;
  assert.ok(image.cssWidth>0&&image.cssHeight>0,'Nonzero media layout');
  assert.ok(image.densityCoverage>=.985,`${label}: insufficient raster ${image.name}: ${derivative.width} / ${image.requiredPixels}`);
 }
 result.images.push({label,images});
};
try{
 for(const [width,height,dpr] of [[1920,1080,1],[1440,900,1],[1366,768,1],[768,1024,1],[390,844,1],[360,800,1],[1920,1080,2],[390,844,2]]){
  const label=`${width}x${height}-dpr${dpr}`,desktop=width>=1024;
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr,hasTouch:!desktop,isMobile:width<600});
  await context.addInitScript(()=>{window.__qa={cls:0,lcp:0};new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__qa.cls+=e.value;}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>window.__qa.lcp=list.getEntries().at(-1)?.startTime||0).observe({type:'largest-contentful-paint',buffered:true});});
  const page=await context.newPage();currentPage=page;page.on('pageerror',e=>result.errors.push(label+': '+e.message));page.on('response',r=>{if(r.status()>=400)result.errors.push(label+': '+r.status()+' '+r.url());});
  await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);if(desktop)await page.waitForFunction(()=>document.querySelectorAll('.pin-spacer').length===5);
  let g=await geometry(page);assert.equal(g.pins,desktop?5:0);assert.equal(g.overflow,false);assert.deepEqual(g.clipped,[]);
  assert.equal(await page.locator('[data-chapter]').count(),10);assert.equal(await page.locator('.format-item').count(),2);assert.doesNotMatch(await page.locator('main').innerText(),/TODO|IDENTIDADE A CONFIRMAR|Método BTF/);
  assert.equal(await page.locator('video source').count(),0,'No opening video download');
  await capture(page,'opening-'+label);result.performance.push({label,...await page.evaluate(()=>({...window.__qa,resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').at(-1),type:r.initiatorType,bytes:r.transferSize}))}))});
  await page.locator('.chapter-menu summary').click();await page.keyboard.press('Escape');assert.equal(await page.locator('.chapter-menu').getAttribute('open'),null);assert.ok(await page.locator('.chapter-menu summary').evaluate(e=>e===document.activeElement));
  for(const id of chapterIds){await navigate(page,id);g=await geometry(page);assert.equal(g.overflow,false,label+' overflow '+id);assert.deepEqual(g.clipped,[],label+' text '+id);if(width===1920||width<600)await capture(page,id+'-'+label);}
  result.checks.push(label+': all ten anchors, chapter geometry, menu/Escape, factual copy');
  await navigate(page,'desenvolvimento');
  if(desktop){
   const initial=await page.locator('[data-node]').evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,opacity:+getComputedStyle(n).opacity})));
   assert.ok(initial.every(n=>n.opacity<.02),'Initial network collected');
   await page.getByRole('button',{name:'Explorar a rede',exact:true}).click();
   for(const word of ['Comunicação','Oratória','Argumentação','Persuasão','Presença','Escuta']){const b=page.locator('.network-node').getByRole('button',{name:word,exact:true});await b.focus();await b.press('Enter');assert.equal(await b.getAttribute('aria-pressed'),'true');assert.match(await page.locator('#network-description').innerText(),new RegExp(word));}
   const completed=await page.locator('[data-node]').evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,opacity:+getComputedStyle(n).opacity})));
   assert.ok(completed.every(n=>n.opacity>.99));assert.ok(Math.abs(completed[0].x-initial[0].x)>100,'Spatial expansion');
  }else{await page.locator('.competency-detail summary').filter({hasText:'Oratória'}).click();assert.equal(await page.locator('.competency-detail[open]').count(),1);await page.locator('.competency-detail summary').filter({hasText:'Oratória'}).press('Enter');}
  result.checks.push(label+': meaningful network, selection and explanation');
  for(const id of ['competencias','pratica','empresa']){
   await navigate(page,id);const buttons=page.locator(`#${id} .scene-header nav button, #${id} .business-map button`);const scenes=page.locator(`#${id} [data-scene]`);
   for(let i=0;i<await buttons.count();i++){
    const button=buttons.nth(i);await button.focus();await button.press('Enter');await page.waitForTimeout(320);
    assert.equal(await button.getAttribute('aria-pressed'),'true',id+' active control');
    if(desktop){assert.equal(await scenes.nth(i).getAttribute('aria-hidden'),null);const r=await scenes.nth(i).boundingBox();assert.ok(r.y>=62&&r.y<height,id+' scene in view');}
    if(id!=='empresa'){const image=scenes.nth(i).locator('img');if(await image.count())await image.waitFor({state:'visible'});if(await image.count())await page.waitForFunction(sel=>{const img=document.querySelector(sel);return img.complete&&img.naturalWidth>0;},`#${id} [data-scene]:nth-child(${i+1}) img`);}
    if(width===1920||width<600)await capture(page,`${id}-scene${i}-${label}`);
   }
  }
  await navigate(page,'especialistas');if(desktop){for(const [i,name] of ['Claudia','Francisco','Luís'].entries()){const b=page.locator('.expert-toolbar').getByRole('button',{name,exact:true});await b.focus();await b.press('Enter');await page.waitForTimeout(250);const r=await page.locator('.expert').nth(i).boundingBox();assert.ok(Math.abs(r.x)<4,'Individual expert in view');await page.locator('.expert').nth(i).locator('img').evaluate(img=>img.decode());if(width===1920)await capture(page,`expert${i}-${label}`);}}
  result.checks.push(label+': all competency/practice/business states and specialist controls');
  // Complete traversal loads every lazy image, including fallback/mobile specialists.
  const total=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<total;y+=height*.7)await scroll(page,y,50);
  await sourceInventory(page,label);
  result.checks.push(label+': every rendered image has adequate raster density and intrinsic frame');
  if(desktop&&dpr===1){
   for(const id of ['desenvolvimento','competencias','pratica','especialistas','em-acao','empresa']){
    const range=await page.locator('#'+id).evaluate(e=>({start:Number(e.dataset.motionStart)||scrollY+e.getBoundingClientRect().top-64,end:Number(e.dataset.motionEnd)||scrollY+e.getBoundingClientRect().bottom-innerHeight}));
    const samples=[];for(const p of [0,.08,.2,.4,.6,.82,.97,.2,.03,.75]){await scroll(page,range.start+(range.end-range.start)*p,p===.97||p===.2?80:260);samples.push(await page.locator('#'+id).evaluate(e=>({scroll:scrollY,active:e.dataset.activeScene||null,transforms:[...e.querySelectorAll('[data-node], [data-scene], .experts-track, [data-drift]')].map(n=>getComputedStyle(n).transform)})));}
    assert.ok(new Set(samples.map(s=>JSON.stringify(s.transforms))).size>2,id+' transforms beyond appearance');
    result.motion.push({label,id,range,samples});if(width===1920)await capture(page,`${id}-reverse-${label}`);
    // Mid-page refresh without a hash must preserve the reading position and reconstruct all pins.
    await page.evaluate(()=>history.replaceState(null,'',location.pathname));const y=await page.evaluate(()=>scrollY);await page.reload({waitUntil:'networkidle'});await page.waitForTimeout(450);assert.equal((await geometry(page)).pins,5);assert.ok(Math.abs(await page.evaluate(()=>scrollY)-y)<15,`${id} refresh preserves progress`);
   }
   result.checks.push(label+': six chapters slow/fast/reverse/stop/mid-page refresh');
  }
  const videoFrame=page.locator('[data-video="practice"]');await videoFrame.scrollIntoViewIfNeeded();await page.waitForTimeout(350);
  if(!desktop){assert.equal(await page.locator('[data-video="practice"] source').count(),0);await videoFrame.getByRole('button',{name:'Reproduzir vídeo',exact:true}).click();}
  await page.waitForFunction(()=>{const v=document.querySelector('[data-video="practice"] video');return v.readyState>=2&&!v.paused;});
  const metadata=await videoFrame.locator('video').evaluate(v=>({width:v.videoWidth,height:v.videoHeight,muted:v.muted,loop:v.loop,duration:v.duration,currentTime:v.currentTime,cssWidth:v.getBoundingClientRect().width}));assert.equal(metadata.width,478);assert.equal(metadata.height,850);assert.ok(metadata.muted&&metadata.loop);assert.ok(metadata.cssWidth<=239.5);
  await videoFrame.getByRole('button',{name:'Pausar vídeo',exact:true}).click();await navigate(page,'origem');await videoFrame.scrollIntoViewIfNeeded();await page.waitForTimeout(350);assert.ok(await videoFrame.locator('video').evaluate(v=>v.paused),'User pause persists');
  await navigate(page,'pratica');await page.locator('#pratica .scene-header button').nth(1).click();await page.waitForTimeout(300);const lecture=page.locator('[data-video="lecture"]');
  if(!desktop)await lecture.getByRole('button',{name:'Reproduzir vídeo',exact:true}).click();
  await page.waitForFunction(()=>{const v=document.querySelector('[data-video="lecture"] video');return v.readyState>=2&&!v.paused;});
  const lesson=await lecture.locator('video').evaluate(v=>({width:v.videoWidth,height:v.videoHeight,muted:v.muted,loop:v.loop,duration:v.duration,cssWidth:v.getBoundingClientRect().width}));assert.equal(lesson.width,464);assert.equal(lesson.height,832);assert.ok(lesson.cssWidth<=232.5);
  if(desktop){await page.locator('#pratica .scene-header button').nth(2).click();await page.waitForTimeout(300);assert.ok(await lecture.locator('video').evaluate(v=>v.paused),'Hidden pinned video pauses');}
  assert.ok(await page.locator('video').evaluateAll(videos=>videos.filter(v=>!v.paused).length<=1));result.videos.push({label,practice:metadata,lecture:lesson});result.checks.push(label+': both videos, mute/loop/ratio/lazy loading, persistent pause and hidden-scene pause');
  await navigate(page,'empresa');const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();result.accessibility.push({label,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  assert.deepEqual(axe.violations.map(v=>v.id),[],label+' axe');result.viewports.push(await geometry(page));console.log(label+' PASS');await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});const page=await context.newPage();currentPage=page;await page.goto(base,{waitUntil:'networkidle'});assert.equal((await geometry(page)).pins,0);assert.equal(await page.locator('video source').count(),0);assert.equal(await page.locator('[data-scene][aria-hidden=true]').count(),0);await page.locator('[data-video="lecture"]').scrollIntoViewIfNeeded();await page.locator('[data-video="lecture"] button').click();await page.waitForFunction(()=>!document.querySelector('[data-video="lecture"] video').paused);await capture(page,'reduced-motion');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>document.querySelectorAll('.pin-spacer').length===5);
 for(const [w,h] of [[390,844],[844,390],[1920,1080],[2560,1440],[1280,1600]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(500);assert.equal((await geometry(page)).overflow,false);assert.equal((await geometry(page)).pins,w>=1024?5:0);}
 await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(350);for(const id of ['desenvolvimento','competencias','pratica','especialistas','em-acao','empresa']){await navigate(page,'inicio');await navigate(page,id);await page.goBack();await page.waitForTimeout(250);assert.match(page.url(),/#inicio$/);await page.goForward();await page.waitForTimeout(300);assert.match(page.url(),new RegExp('#'+id+'$'));}
 await page.getByRole('button',{name:'Tela cheia',exact:true}).click();await page.waitForFunction(()=>!!document.fullscreenElement);await navigate(page,'empresa');assert.equal((await geometry(page)).overflow,false);await capture(page,'fullscreen');await page.getByRole('button',{name:'Sair da tela cheia',exact:true}).click();await page.waitForFunction(()=>!document.fullscreenElement);await context.close();result.checks.push('Reduced/live preference, resize/landscape/wide/tall, six back-forward routes, real fullscreen');
 const saved=await browser.newContext({viewport:{width:1440,height:900}});await saved.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true,addEventListener(){},removeEventListener(){}}}));const dataPage=await saved.newPage();currentPage=dataPage;await dataPage.goto(base,{waitUntil:'networkidle'});await dataPage.locator('[data-video="practice"]').scrollIntoViewIfNeeded();await dataPage.waitForTimeout(350);assert.equal(await dataPage.locator('video source').count(),0);await dataPage.locator('[data-video="practice"] button').click();await dataPage.waitForFunction(()=>!document.querySelector('[data-video="practice"] video').paused);
 // Simulate the browser visibility signal and dispatch its native event.
 await dataPage.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await dataPage.waitForFunction(()=>document.querySelector('[data-video="practice"] video').paused);await dataPage.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});await dataPage.waitForFunction(()=>!document.querySelector('[data-video="practice"] video').paused);await saved.close();result.checks.push('Save-Data prevents automatic sources; explicit play; simulated inactive-tab pause/resume');
 const nojs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});const staticPage=await nojs.newPage();currentPage=staticPage;await staticPage.goto(base,{waitUntil:'networkidle'});assert.equal(await staticPage.locator('[data-chapter]').count(),10);assert.equal(await staticPage.locator('[data-scene]').count(),11);assert.equal(await staticPage.locator('.video-noscript a').count(),2);assert.equal((await geometry(staticPage)).overflow,false);await staticPage.locator('.chapter-menu summary').click();assert.ok(await staticPage.locator('.chapter-panel').isVisible());await capture(staticPage,'no-js');await nojs.close();result.checks.push('No-JS: ten chapters, eleven full scenes, two video links and native menu');
 for(const asset of JSON.parse(await readFile('docs/audit/media-metadata.json','utf8')))assert.equal(createHash('sha256').update(await readFile('img/'+asset.file)).digest('hex'),asset.sha256,asset.file);result.checks.push('All 21 originals preserve SHA-256');
 assert.deepEqual(result.errors,[]);result.status='PASS';
}catch(error){result.status='FAIL';result.failure=error.stack;console.error(error);process.exitCode=1;if(currentPage&&!currentPage.isClosed()){result.failureState=await geometry(currentPage);await capture(currentPage,'failure');}}
finally{await writeFile(output+'/results.json',JSON.stringify(result,null,2));await browser.close();console.log(JSON.stringify({status:result.status,viewports:result.viewports.length,checks:result.checks.length,errors:result.errors,a11y:result.accessibility.map(v=>({label:v.label,violations:v.violations.length})),failure:result.failure},null,2));}
