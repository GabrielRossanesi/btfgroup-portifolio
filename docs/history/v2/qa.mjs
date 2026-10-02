// Isolated local-app browser QA: no user profile or tabs are used.
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir,writeFile,readFile } from "node:fs/promises";
import {createHash} from "node:crypto";
import assert from "node:assert/strict";
const base=process.env.QA_URL||"http://127.0.0.1:3000";
const output="docs/qa";
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:"msedge",headless:true});
const results={version:"V2",viewports:[],checks:[],errors:[],accessibility:[],performance:{}};
let currentPage;
const sizes=[[1920,1080],[1440,900],[1366,768],[768,1024],[390,844],[360,800]];
const chapterIds=["inicio","desenvolvimento","competencias","pratica","especialistas","em-acao","empresa","formatos","origem","conversa"];
const titles=["Abertura","Desenvolvimento profissional","O que desenvolvemos","Como desenvolvemos","Especialistas","BTF em ação","Para sua empresa","Formatos","Nossa origem","Conversa"];
const settle=p=>p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
const geometry=page=>page.evaluate(()=>({
  width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1,
  clipped:[...document.querySelectorAll("h1,h2,h3,p,summary,figcaption")].filter(e=>e.clientWidth>1&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.slice(0,90)),
  pins:document.querySelectorAll(".pin-spacer").length,
  imageErrors:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)
}));
const navigate=async(page,id)=>{
  await page.locator(".chapter-menu summary").click();
  await page.locator(".chapter-panel").getByRole("link",{name:new RegExp(titles[chapterIds.indexOf(id)])}).click();
  await settle(page);
  assert.equal(await page.locator(".chapter-menu").getAttribute("open"),null,"Chapter menu closes");
  assert.match(page.url(),new RegExp("#"+id+"$"));
};
const networkState=p=>p.evaluate(()=>({
  nodes:[...document.querySelectorAll("[data-node]")].map(n=>({opacity:parseFloat(getComputedStyle(n).opacity),rect:n.getBoundingClientRect().toJSON()})),
  lines:[...document.querySelectorAll("[data-connection]")].map(n=>({offset:parseFloat(getComputedStyle(n).strokeDashoffset),length:n.getTotalLength()}))
}));
try {
  for(const [width,height] of sizes){
    const context=await browser.newContext({viewport:{width,height},hasTouch:width<1024,isMobile:width<600});
    await context.addInitScript(()=>{
      window.__qa={cls:0,lcp:0};
      new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__qa.cls+=e.value;}).observe({type:"layout-shift",buffered:true});
      new PerformanceObserver(list=>{window.__qa.lcp=list.getEntries().at(-1)?.startTime||0;}).observe({type:"largest-contentful-paint",buffered:true});
    });
    const page=await context.newPage();currentPage=page;
    page.on("pageerror",e=>results.errors.push(width+": "+e.message));
    page.on("response",r=>{if(r.status()>=400)results.errors.push(width+": "+r.status()+" "+r.url());});
    await page.goto(base,{waitUntil:"networkidle"});await page.evaluate(()=>document.fonts.ready);
    if(width>=1024)await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===2);
    const initial=await geometry(page);
    assert.equal(initial.overflow,false,width+": initial overflow");
    assert.deepEqual(initial.clipped,[],width+": clipped text");
    assert.equal(initial.pins,width>=1024?2:0,width+": pins");
    assert.equal(await page.locator("[data-chapter]").count(),10);
    assert.doesNotMatch(await page.locator("main").innerText(),/TODO|IDENTIDADE A CONFIRMAR|PROVISÓRIO/);
    assert.equal(await page.locator(".format-item").count(),2);
    assert.equal(await page.locator(".expert-bio").count(),0);
    await page.screenshot({path:output+"/v2-opening-"+width+"x"+height+".png"});
    results.performance[width+"x"+height]=await page.evaluate(()=>({...window.__qa,resources:performance.getEntriesByType("resource").map(r=>({name:r.name.split("/").at(-1),type:r.initiatorType,bytes:r.transferSize}))}));
    if(width<1024)assert.equal(await page.locator("video source").count(),0,"No mobile video source");
    await page.locator(".chapter-menu summary").click();
    await page.keyboard.press("Escape");assert.equal(await page.locator(".chapter-menu").getAttribute("open"),null);
    assert.equal(await page.locator(".chapter-menu summary").evaluate(e=>e===document.activeElement),true);
    // Guided meeting route deliberately crosses both pins and then returns.
    for(const id of ["inicio","especialistas","empresa","desenvolvimento","origem"]){
      await navigate(page,id);
      const top=await page.locator("#"+id).evaluate(e=>e.getBoundingClientRect().top);
      assert.ok(Math.abs(top-64)<5||id==="especialistas"&&Math.abs(top-64)<6,width+": chapter alignment "+id+" "+top);
    }
    results.checks.push(width+": guided chapter route, alignment, Escape and menu close");
    await navigate(page,"desenvolvimento");
    if(width>=1024){
      await page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector("[data-node]")).opacity)<.05);
      const first=await networkState(page);assert.ok(first.lines.every(l=>Math.abs(l.offset-l.length)<2),"Empty initial connectors");
      const y=await page.evaluate(()=>scrollY);
      await page.evaluate(y=>scrollTo(0,y+(innerHeight-64)*.75),y);
      await page.waitForFunction(()=>{const n=[...document.querySelectorAll("[data-node]")].map(e=>parseFloat(getComputedStyle(e).opacity));return n[1]>.99&&n[5]<.05;});
      const middle=await networkState(page);
      assert.ok(middle.nodes.filter(n=>n.opacity>.9).length>=2&&middle.nodes.filter(n=>n.opacity<.1).length>=1,"Intermediate build");
      assert.ok(Math.abs(middle.nodes[0].rect.left-first.nodes[0].rect.left)>100,"Spatial construction beyond opacity");
      if(width===1440)await page.screenshot({path:output+"/v2-network-middle.png"});
      await page.getByRole("button",{name:"Explorar a rede",exact:true}).click();
      await page.waitForFunction(()=>[...document.querySelectorAll("[data-node]")].every(n=>parseFloat(getComputedStyle(n).opacity)>.99)&&[...document.querySelectorAll("[data-connection]")].every(n=>parseFloat(getComputedStyle(n).strokeDashoffset)<1));
      const final=await networkState(page);
      assert.ok(final.lines.every(l=>l.offset<1),"Connectors drawn: "+JSON.stringify(final.lines));
      assert.ok(final.nodes.every(n=>n.rect.left>=0&&n.rect.right<=width),"Nodes fit width");
      for(const word of ["Comunicação","Oratória","Argumentação","Persuasão","Presença","Escuta"]){
        const button=page.locator(".network-node").getByRole("button",{name:word,exact:true});
        await button.focus();await button.press("Enter");
        assert.equal(await button.getAttribute("aria-pressed"),"true");
        assert.match(await page.locator("#network-description").innerText(),new RegExp(word));
      }
      await page.screenshot({path:output+"/v2-network-"+width+".png"});
      results.checks.push(width+": initial/intermediate/final network, six nodes by keyboard, connector drawing");
      await navigate(page,"especialistas");
      for(const [i,name] of ["Claudia","Francisco","Luís"].entries()){
        const button=page.locator(".expert-toolbar").getByRole("button",{name,exact:true});
        await button.focus();await button.press("Enter");
        await page.waitForFunction(i=>{const r=document.querySelectorAll(".expert")[i].getBoundingClientRect();return Math.abs(r.left)<3&&r.right<=innerWidth+3;},i);
        assert.equal(await button.getAttribute("aria-pressed"),"true");
        if(width===1440)await page.screenshot({path:output+"/v2-expert-"+i+".png"});
      }
      results.checks.push(width+": all three individual specialists by keyboard");
    }else{
      for(const word of ["Comunicação","Oratória","Argumentação","Persuasão","Presença","Escuta"]){
        const summary=page.locator(".competency-detail summary").filter({hasText:word});
        await summary.tap();assert.equal(await summary.evaluate(e=>e.parentElement.open),true);await summary.press("Enter");
      }
      results.checks.push(width+": native competency disclosures by touch and keyboard");
    }
    // Traverse every scene, including the three full-height competency acts.
    for(const id of chapterIds){
      await navigate(page,id);
      if(id==="desenvolvimento"&&width>=1024)await page.getByRole("button",{name:"Explorar a rede",exact:true}).click();
      const state=await geometry(page);assert.equal(state.overflow,false,width+": overflow "+id);assert.deepEqual(state.clipped,[],width+": clip "+id);
      if(width===1440||width===390||width===360)await page.screenshot({path:output+"/v2-"+id+"-"+width+".png"});
    }
    for(const act of await page.locator(".competency-act").all()){
      await act.scrollIntoViewIfNeeded();assert.equal((await geometry(page)).overflow,false);
      if(width===1440)await act.screenshot({path:output+"/v2-"+await act.getAttribute("class").then(v=>v.split(" ").at(-1))+".png"});
    }
    await navigate(page,"empresa");
    for(const area of ["Liderança","Reuniões","Apresentações","Comercial","Negociação","Atendimento","Jurídico","Comunicação interna"]){
      // Use exact text minus decorative marker to avoid Reuniões matching another node.
      const target=page.locator(".business-application").filter({has:page.locator("summary").filter({hasText:area})}).locator("summary");
      if(await target.evaluate(e=>!e.parentElement.open))await target.click();
      assert.equal(await page.locator(".business-application[open]").count(),1);
      assert.equal(await target.evaluate(e=>e.parentElement.querySelectorAll("h3 span").length),3);
      await target.press("Enter");assert.equal(await page.locator(".business-application[open]").count(),0);
    }
    results.checks.push(width+": eight business relationships with native keyboard disclosures");
    await page.locator(".practice-film").scrollIntoViewIfNeeded();
    if(width<1024){assert.equal(await page.locator("video source").count(),0);await page.getByRole("button",{name:"Reproduzir vídeo",exact:true}).tap();}
    await page.waitForFunction(()=>{const v=document.querySelector("video");return v.readyState>=2&&!v.paused;},undefined,{timeout:10000});
    const v=await page.locator("video").evaluate(v=>({width:v.videoWidth,height:v.videoHeight,muted:v.muted,duration:v.duration}));
    assert.equal(v.width,478);assert.equal(v.height,850);assert.equal(v.muted,true);
    await page.getByRole("button",{name:"Pausar vídeo",exact:true}).click();
    await navigate(page,"origem");await page.locator(".practice-film").scrollIntoViewIfNeeded();
    assert.equal(await page.locator("video").evaluate(v=>v.paused),true);
    results.checks.push(width+": video format, conditional loading and persistent pause");
    const axe=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    results.accessibility.push({size:width+"x"+height,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
    results.viewports.push(initial);
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:"reduce"});
  const page=await context.newPage();currentPage=page;
  await page.goto(base,{waitUntil:"networkidle"});
  assert.equal((await geometry(page)).pins,0);assert.equal(await page.locator("video source").count(),0);
  await navigate(page,"desenvolvimento");
  assert.ok((await networkState(page)).nodes.every(n=>n.opacity===1));
  await page.locator(".network-node").getByRole("button",{name:"Escuta",exact:true}).click();
  assert.match(await page.locator("#network-description").innerText(),/Escuta/);
  await page.screenshot({path:output+"/v2-reduced-motion.png"});
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===2);
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===0);
  assert.equal((await geometry(page)).overflow,false);
  await page.setViewportSize({width:844,height:390});assert.equal((await geometry(page)).overflow,false);
  await page.setViewportSize({width:1440,height:900});await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===2);
  for(const [width,height]of [[2560,1440],[1280,1600]]){
    await page.setViewportSize({width,height});await settle(page);assert.equal((await geometry(page)).overflow,false);
  }
  await page.setViewportSize({width:1440,height:900});await settle(page);
  await navigate(page,"especialistas");await navigate(page,"empresa");
  await page.goBack();await settle(page);assert.match(page.url(),/#especialistas$/);
  await page.goForward();await settle(page);assert.match(page.url(),/#empresa$/);
  await page.getByRole("button",{name:"Tela cheia",exact:true}).click();
  await page.waitForFunction(()=>Boolean(document.fullscreenElement));
  await navigate(page,"desenvolvimento");await page.getByRole("button",{name:"Explorar a rede",exact:true}).click();
  assert.equal((await geometry(page)).overflow,false);
  await page.screenshot({path:output+"/v2-fullscreen.png"});
  await page.getByRole("button",{name:"Sair da tela cheia",exact:true}).click();
  await page.waitForFunction(()=>!document.fullscreenElement);
  results.checks.push("Reduced motion/live preference/resize/rotation/wide/tall/back-forward/real fullscreen and return");
  await context.close();
  const nojs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});
  const staticPage=await nojs.newPage();currentPage=staticPage;
  await staticPage.goto(base,{waitUntil:"networkidle"});
  assert.equal(await staticPage.locator("[data-chapter]").count(),10);
  assert.equal(await staticPage.locator(".competency-detail").count(),6);
  assert.equal((await geometry(staticPage)).overflow,false);
  await staticPage.locator(".chapter-menu summary").click();assert.equal(await staticPage.locator(".chapter-panel").isVisible(),true);
  await staticPage.locator(".chapter-panel").getByRole("link",{name:/Desenvolvimento profissional/}).click();
  await staticPage.locator(".competency-detail summary").filter({hasText:"Oratória"}).click();
  assert.equal(await staticPage.locator(".competency-detail[open]").count(),1);
  await staticPage.screenshot({path:output+"/v2-no-js.png",fullPage:true});
  results.checks.push("No-JS server content, ten chapters, six native competencies, menu and real contact");
  await nojs.close();
  const originals=JSON.parse(await readFile("docs/audit/media-metadata.json","utf8"));
  for(const asset of originals)assert.equal(createHash("sha256").update(await readFile("img/"+asset.file)).digest("hex"),asset.sha256,asset.file);
  results.checks.push("21 original assets preserve audit SHA-256");
  const html=await(await fetch(base)).text();const robots=await(await fetch(base+"/robots.txt")).text();
  assert.match(robots,/Disallow: \//);assert.match(html,/name="robots" content="noindex, nofollow"/);assert.match(html,/mailto:contato@btfgroup.com.br/);assert.match(html,/wa.me\/5511993843003/);
  assert.doesNotMatch(html,/TODO —|Biografia e especialidades aguardam/);
  results.checks.push("Noindex/robots/WhatsApp/email/unknown facts omitted");
  assert.deepEqual(results.errors,[]);
  assert.deepEqual(results.accessibility.flatMap(r=>r.violations),[],"Accessibility violations");
  results.status="PASS";
}catch(error){
  results.status="FAIL";results.failure=error.stack;console.error(error);process.exitCode=1;
  if(currentPage&&!currentPage.isClosed()){
    results.failureState=await geometry(currentPage);
    await currentPage.screenshot({path:output+"/v2-failure.png"});
  }
}finally{
  await writeFile(output+"/results.json",JSON.stringify(results,null,2));
  await browser.close();
  console.log(JSON.stringify({status:results.status,viewports:results.viewports.length,checks:results.checks.length,errors:results.errors,a11y:results.accessibility.map(r=>({size:r.size,violations:r.violations.length})),failure:results.failure},null,2));
}
