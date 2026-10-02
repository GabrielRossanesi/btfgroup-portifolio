// Focused acceptance checks for V3 composition and player behavior.
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const output='docs/qa/v3';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:2});
const page=await context.newPage();
const results={status:'RUNNING',checks:[],errors:[],composition:[]};
page.on('pageerror',error=>results.errors.push(error.message));
const navigate=async id=>{await page.locator('.chapter-menu summary').click();await page.locator(`.chapter-panel a[href="#${id}"]`).click();await page.waitForTimeout(300);};
const snapshot=async name=>page.screenshot({path:`${output}/${name}.png`});
try {
 await page.goto(process.env.QA_URL||'http://127.0.0.1:3000',{waitUntil:'networkidle'});
 await navigate('desenvolvimento');
 await page.evaluate(()=>{const section=document.getElementById('desenvolvimento');scrollTo(0,+section.dataset.motionEnd-2);});await page.waitForTimeout(450);
 const climax=await page.locator('#desenvolvimento').evaluate(section=>({nodes:[...section.querySelectorAll('[data-node]')].map(n=>({name:n.textContent,x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y,right:n.getBoundingClientRect().right,bottom:n.getBoundingClientRect().bottom})),core:section.querySelector('.network-core').getBoundingClientRect().toJSON(),paths:[...section.querySelectorAll('[data-connection]')].map(p=>({d:p.getAttribute('d'),offset:getComputedStyle(p).strokeDashoffset,dash:getComputedStyle(p).strokeDasharray}))}));
 assert.ok(climax.nodes.every(n=>n.x>=0&&n.right<=1920&&n.y>=64&&n.bottom<=1080));assert.ok(climax.core.right<=1920);assert.ok(climax.paths.every(p=>p.dash==='none'&&parseFloat(p.offset)===0));assert.match(climax.paths[0].d,/M730/);
 await snapshot('network-climax-dpr2');results.composition.push({chapter:'network-climax',climax});results.checks.push('Network climax: all six words and core fit; all connectors remain visible after reorganization');
 for(const id of ['competencias','pratica']){
  await navigate(id);const buttons=page.locator(`#${id} .scene-header button`);
  for(let i=0;i<await buttons.count();i++){await buttons.nth(i).click();await page.waitForTimeout(250);const bounds=await page.locator(`#${id} [data-scene]`).nth(i).evaluate(scene=>({title:scene.querySelector('h3').getBoundingClientRect().toJSON(),content:[...scene.querySelectorAll('p,figcaption,button,img,video')].map(e=>({tag:e.tagName,text:e.textContent.slice(0,60),rect:e.getBoundingClientRect().toJSON()}))}));assert.ok(bounds.content.every(e=>e.rect.y>=64&&e.rect.bottom<=1082),id+' content visible in pin');results.composition.push({id,index:i,bounds});}
 }
 // Resize while reading each animated chapter, including the unpinned mural.
 for(const id of ['desenvolvimento','competencias','pratica','especialistas','em-acao','empresa']){
  await navigate(id);
  for(const size of [{width:1366,height:768},{width:1920,height:1080},{width:390,height:844},{width:1920,height:1080}]){
   await page.setViewportSize(size);await page.waitForTimeout(450);
   const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,pins:document.querySelectorAll('.pin-spacer').length,hiddenScenes:document.querySelectorAll('[data-scene][aria-hidden=true]').length}));
   assert.equal(geometry.overflow,false,id+' resize overflow');assert.equal(geometry.pins,size.width<1024?0:5);if(size.width<1024)assert.equal(geometry.hiddenScenes,0,'All fallback scenes remain readable');
  }
  await navigate(id);results.checks.push(id+': live resize desktop/short/mobile/desktop, cleanup and content restoration');
 }
 await navigate('pratica');await page.locator('#pratica .scene-header button').nth(1).click();await page.waitForTimeout(300);
 const lesson=page.locator('[data-video="lecture"] video');await page.waitForFunction(()=>!document.querySelector('[data-video="lecture"] video').paused);await lesson.evaluate(video=>video.currentTime=video.duration-.2);await page.waitForFunction(()=>{const v=document.querySelector('[data-video="lecture"] video');return v.currentTime<1&&!v.paused;});await snapshot('lecture-loop-dpr2');results.checks.push('Lecture wraps through actual loop boundary while playing');
 const practice=page.locator('[data-video="practice"] video');await practice.scrollIntoViewIfNeeded();await page.waitForFunction(()=>!document.querySelector('[data-video="practice"] video').paused);assert.ok(await lesson.evaluate(v=>v.paused));await practice.evaluate(video=>video.currentTime=video.duration-.2);await page.waitForFunction(()=>{const v=document.querySelector('[data-video="practice"] video');return v.currentTime<1&&!v.paused;});await snapshot('practice-loop-dpr2');results.checks.push('Practice wraps actual loop; previous chapter player pauses; only one playback');
 await navigate('em-acao');
 const mural=await page.locator('.action-canvas').boundingBox();
 const muralTop=mural.y+await page.evaluate(()=>scrollY);
 for(const [index,amount] of [0,.28,.54,.79].entries()){await page.evaluate(y=>scrollTo(0,y),muralTop+mural.height*amount);await page.waitForTimeout(350);await snapshot('mural-'+index+'-dpr2');}
 results.checks.push('Four viewport captures cover complete editorial mural in DPR2');
 // Small-height scenes: captions and playback controls must fit, not merely the image.
 await page.setViewportSize({width:1366,height:768});await page.waitForTimeout(450);await navigate('pratica');
 for(let i=0;i<3;i++){await page.locator('#pratica .scene-header button').nth(i).click();await page.waitForTimeout(250);const bounds=await page.locator('#pratica [data-scene]').nth(i).evaluate(scene=>[...scene.querySelectorAll('p,figcaption,button,img,video')].map(e=>({tag:e.tagName,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})));assert.ok(bounds.every(b=>b.top>=64&&b.bottom<=770),'Short viewport has full scene content: '+JSON.stringify(bounds));await snapshot('practice-short-'+i);}
 results.checks.push('1366x768: all practice copy, captions and player controls fit the stage');
 assert.deepEqual(results.errors,[]);results.status='PASS';
}catch(error){results.status='FAIL';results.failure=error.stack;process.exitCode=1;await snapshot('story-failure');console.error(error);}
finally{await writeFile(output+'/story-results.json',JSON.stringify(results,null,2));await browser.close();console.log(JSON.stringify({status:results.status,checks:results.checks.length,errors:results.errors,failure:results.failure},null,2));}
