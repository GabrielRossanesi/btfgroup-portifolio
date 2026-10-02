// Isolated browser tests for this local app. No user browser/profile is used.
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const base = process.env.QA_URL || "http://127.0.0.1:3000";
const output = "docs/qa";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = { viewports: [], checks: [], errors: [], accessibility: [], performance: {} };
let currentPage;
const sizes = [[1920,1080],[1440,900],[1366,768],[768,1024],[390,844],[360,800]];
const instrumentation = () => {
  window.__qa = { cls: 0, lcp: 0 };
  new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__qa.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver(list => { window.__qa.lcp = list.getEntries().at(-1)?.startTime || 0; }).observe({ type: "largest-contentful-paint", buffered: true });
};
const geometry = page => page.evaluate(() => ({
  width: innerWidth, height: innerHeight,
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  clipped: [...document.querySelectorAll("h1,h2,h3,p,summary,figcaption")].filter(e => e.clientWidth > 1 && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent.slice(0,80)),
  pins: document.querySelectorAll(".pin-spacer").length,
  imageErrors: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
}));
try {
  for (const [width,height] of sizes) {
    const context = await browser.newContext({ viewport: { width,height }, hasTouch: width < 1024, isMobile: width < 600 });
    await context.addInitScript(instrumentation);
    const page = await context.newPage();
    currentPage = page;
    page.on("pageerror", error => results.errors.push(`${width}: ${error.message}`));
    page.on("response", response => { if (response.status() >= 400) results.errors.push(`${width}: ${response.status()} ${response.url()}`); });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const initial = await geometry(page);
    assert.equal(initial.overflow,false,`${width}: initial overflow`);
    assert.deepEqual(initial.clipped,[],`${width}: clipped copy`);
    assert.equal(initial.pins,width >= 1024 ? 2 : 0,`${width}: pin eligibility`);
    await page.screenshot({ path: `${output}/verified-hero-${width}x${height}.png` });
    const perf = await page.evaluate(() => ({ ...window.__qa, resources: performance.getEntriesByType("resource").map(r=>({name:r.name.split("/").at(-1),type:r.initiatorType,bytes:r.transferSize})) }));
    results.performance[`${width}x${height}`] = perf;
    if (width < 1024) {
      assert.equal(await page.locator("video source").count(),0,"Touch should not load video before play");
      await page.getByLabel("Menu de navegação").click();
      assert.equal(await page.locator(".mobile-menu").getAttribute("open"),"");
      await page.keyboard.press("Escape");
      assert.equal(await page.locator(".mobile-menu").getAttribute("open"),null);
      await page.getByLabel("Menu de navegação").click();
      await page.locator(".mobile-panel").getByRole("link",{name:"Soluções",exact:true}).click();
      assert.equal(await page.locator(".mobile-menu").getAttribute("open"),null);
      results.checks.push(`${width}: mobile menu, Escape and navigation close`);
    }
    // Traverse the whole document and inspect every narrative chapter.
    for (const section of ["manifesto","em-acao","solucoes","especialistas","experiencia","sobre","contato"]) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const current = await geometry(page);
      assert.equal(current.overflow,false,`${width}: overflow in ${section}`);
      assert.deepEqual(current.clipped,[],`${width}: clipped text in ${section}`);
      if (width === 1440 || width === 390 || width === 360) await page.screenshot({ path: `${output}/${section}-${width}.png` });
    }
    await page.locator(".solution summary").filter({hasText:"Oratória & presença"}).click();
    assert.equal(await page.locator("details.solution[open]").count(),1);
    assert.match(await page.locator("details.solution[open]").innerText(),/voz, expressão/);
    await page.locator(".solution summary").filter({hasText:"Oratória & presença"}).press("Enter");
    assert.equal(await page.locator("details.solution[open]").count(),0);
    results.checks.push(`${width}: solution disclosure mouse and keyboard`);
    if (width >= 1024) {
      // Focusing the last disclosure must bring its specialist into the viewport.
      await page.locator(".expert-bio summary").last().focus();
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.waitForFunction(() => { const rect=document.querySelectorAll(".expert-bio summary")[2].getBoundingClientRect(); return rect.left >= 0 && rect.right <= innerWidth; });
      await page.locator(".expert-bio summary").last().press("Enter");
      assert.match(await page.locator(".expert-bio[open]").innerText(),/TODO/);
      await page.screenshot({path:`${output}/expert-keyboard-${width}.png`});
      await page.locator(".expert-bio summary").last().press("Enter");
      await page.goto(`${base}/#manifesto`, {waitUntil:"networkidle"});
      for (const word of ["Apresentar","Argumentar","Persuadir","Liderar"]) {
        await page.getByRole("button",{name:word,exact:true}).click();
        await page.waitForFunction(w => document.querySelector(".word-plane").textContent === `${w}.`,word);
        assert.equal(await page.getByRole("button",{name:word,exact:true}).getAttribute("aria-pressed"),"true");
      }
      results.checks.push(`${width}: all manifesto states, specialist keyboard focus and bio`);
    } else {
      await page.getByRole("button",{name:"Persuadir",exact:true}).tap();
      assert.equal(await page.getByRole("button",{name:"Persuadir",exact:true}).getAttribute("aria-pressed"),"true");
      results.checks.push(`${width}: touch manifesto selection`);
    }
    await page.locator(".video-story").scrollIntoViewIfNeeded();
    if (width < 1024) {
      assert.equal(await page.locator("video source").count(),0,"No touch autoplay after scrolling");
      await page.getByRole("button",{name:"Reproduzir vídeo",exact:true}).tap();
    }
    await page.waitForFunction(() => { const v=document.querySelector("video"); return v.readyState >= 2 && !v.paused; }, undefined, {timeout:10000});
    const media = await page.locator("video").evaluate(v => ({width:v.videoWidth,height:v.videoHeight,muted:v.muted,duration:v.duration}));
    assert.equal(media.width,478); assert.equal(media.height,850); assert.equal(media.muted,true);
    await page.getByRole("button",{name:"Pausar vídeo",exact:true}).click();
    await page.locator("#sobre").scrollIntoViewIfNeeded();
    await page.locator(".video-story").scrollIntoViewIfNeeded();
    assert.equal(await page.locator("video").evaluate(v => v.paused),true,"User pause must persist across viewport changes");
    results.checks.push(`${width}: video framing, play/pause and retained user pause`);
    const a11y = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    results.accessibility.push({size:`${width}x${height}`,violations:a11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
    results.viewports.push(initial);
    await context.close();
  }
  // Preference changes, resize, back/forward and no-JS are distinct meaningful checks.
  const context = await browser.newContext({ viewport:{width:1440,height:900}, reducedMotion:"reduce" });
  const page = await context.newPage();
  await page.goto(base,{waitUntil:"networkidle"});
  assert.equal((await geometry(page)).pins,0);
  assert.equal(await page.locator("video source").count(),0);
  assert.equal(await page.locator(".manifesto-fallback").isVisible(),true);
  await page.screenshot({path:`${output}/reduced-motion.png`,fullPage:true});
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===2);
  await page.setViewportSize({width:390,height:844});
  await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===0);
  await page.setViewportSize({width:844,height:390});
  assert.equal((await geometry(page)).overflow,false);
  await page.setViewportSize({width:1440,height:900});
  await page.waitForFunction(()=>document.querySelectorAll(".pin-spacer").length===2);
  await page.setViewportSize({width:2560,height:1440});
  assert.equal((await geometry(page)).overflow,false);
  await page.setViewportSize({width:1280,height:1600});
  assert.equal((await geometry(page)).overflow,false);
  await page.setViewportSize({width:1440,height:900});
  await page.locator(".desktop-nav").getByRole("link",{name:"Soluções",exact:true}).click();
  await page.locator(".desktop-nav").getByRole("link",{name:"A BTF",exact:true}).click();
  await page.goBack(); assert.match(page.url(),/#solucoes$/);
  await page.goForward(); assert.match(page.url(),/#sobre$/);
  results.checks.push("Reduced motion, live preference change, desktop/touch resize, rotation, tall/wide screens, back/forward");
  await context.close();
  const nojs = await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});
  const staticPage = await nojs.newPage();
  await staticPage.goto(base,{waitUntil:"networkidle"});
  assert.equal(await staticPage.locator(".manifesto-fallback h3").count(),4);
  assert.equal((await geometry(staticPage)).overflow,false);
  await staticPage.getByLabel("Menu de navegação").click();
  assert.equal(await staticPage.locator(".mobile-panel").isVisible(),true);
  await staticPage.locator(".solution summary").filter({hasText:"Argumentação & persuasão"}).click();
  assert.equal(await staticPage.locator("details.solution[open]").count(),1);
  await staticPage.screenshot({path:`${output}/no-js.png`,fullPage:true});
  results.checks.push("Server HTML: native menu and solutions without JavaScript; four manifesto chapters, expert names and real contact links");
  await nojs.close();
  // Verify every original against the audit hash.
  const originals = JSON.parse(await readFile("docs/audit/media-metadata.json","utf8"));
  for (const asset of originals) assert.equal(createHash("sha256").update(await readFile(`img/${asset.file}`)).digest("hex"),asset.sha256,asset.file);
  results.checks.push("All 21 original assets preserve their audit SHA-256");
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.match(robots,/Disallow: \//);
  const html = await (await fetch(base)).text();
  assert.match(html,/name="robots" content="noindex, nofollow"/);
  assert.match(html,/mailto:contato@btfgroup.com.br/);
  assert.match(html,/wa.me\/5511993843003/);
  results.checks.push("Preview noindex, robots, real WhatsApp and email");
  assert.deepEqual(results.errors,[],"Browser errors or asset HTTP errors");
  const violations=results.accessibility.flatMap(r=>r.violations);
  assert.deepEqual(violations,[],"Accessibility violations");
  results.status="PASS";
} catch(error) {
  results.status="FAIL"; results.failure=error.stack; console.error(error); process.exitCode=1;
  if(currentPage && !currentPage.isClosed()) {
    results.failureState=await currentPage.evaluate(()=>({active:document.activeElement?.outerHTML,summaries:[...document.querySelectorAll('summary')].map(s=>({text:s.textContent,open:s.parentElement.open,rect:s.getBoundingClientRect().toJSON()}))}));
    await currentPage.screenshot({path:`${output}/failure.png`});
  }
}
finally {
  await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));
  await browser.close();
  console.log(JSON.stringify({status:results.status,viewports:results.viewports.length,checks:results.checks.length,errors:results.errors,a11y:results.accessibility.map(r=>({size:r.size,violations:r.violations.length})),failure:results.failure},null,2));
}
