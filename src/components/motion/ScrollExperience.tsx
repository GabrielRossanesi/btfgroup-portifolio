"use client";
import { useEffect } from "react";

export function ScrollExperience() {
  useEffect(()=>{
    let disposed=false,started=false;
    let cleanup:(()=>void)|undefined;
    let restoredY:number|null=null;
    try {
      const entry=performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming|undefined;
      const saved=JSON.parse(sessionStorage.getItem("btf:reading-position")??"null") as {href:string;y:number}|null;
      if(entry?.type==="reload"&&saved?.href===location.href&&Number.isFinite(saved.y))restoredY=saved.y;
    } catch { /* Native restoration remains available if storage is unavailable. */ }
    const savePosition=()=>{try{sessionStorage.setItem("btf:reading-position",JSON.stringify({href:location.href,y:scrollY}));}catch{/* Optional enhancement. */}};
    window.addEventListener("pagehide",savePosition);
    const rule="(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    const eligible=window.matchMedia(rule);
    async function setup(){
      const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
      if(disposed)return;
      await document.fonts.ready;
      if(disposed)return;
      gsap.registerPlugin(ScrollTrigger);
      const mm=gsap.matchMedia();
      const removals:(()=>void)[]=[];
      const position=(id:string)=>{
        const element=document.getElementById(id);
        if(!element)return;
        const trigger=ScrollTrigger.getById(id==="desenvolvimento"?"btf-network":id==="especialistas"?"btf-experts":`btf-${id}`);
        const top=trigger?trigger.start:window.scrollY+element.getBoundingClientRect().top-64;
        window.scrollTo({top:Math.max(0,top),behavior:"instant"});
        ScrollTrigger.update();
      };
      mm.add(rule,()=>{
        const modeRemovals:(()=>void)[]=[];
        const createScenes=(chapter:HTMLElement)=>{
          const stage=chapter.querySelector<HTMLElement>(".scene-stage");
          const scenes=Array.from(chapter.querySelectorAll<HTMLElement>("[data-scene]"));
          if(!stage||!scenes.length)return;
          chapter.classList.add("has-scenes");
          const business=chapter.dataset.sceneChapter==="business";
          const horizontal=chapter.dataset.sceneChapter==="horizontal";
          const axis=horizontal?"xPercent":"yPercent";
          const duration=scenes.length*2;
          let previous=-1;
          const announce=(index:number)=>{
            if(previous===index)return;
            previous=index;chapter.dataset.activeScene=String(index);
            chapter.dispatchEvent(new CustomEvent("btf:scene-index",{detail:index}));
            document.dispatchEvent(new CustomEvent("btf:scene"));
          };
          scenes.forEach((scene,i)=>gsap.set(scene,{[axis]:i===0?0:business?10:105,autoAlpha:i===0?1:0}));
          const timeline=gsap.timeline({scrollTrigger:{id:`btf-${chapter.id}`,trigger:chapter,pin:stage,start:"top 64px",end:()=>`+=${(innerHeight-64)*(business?2:horizontal?1.65:2.25)}`,scrub:.2,invalidateOnRefresh:true,
            onUpdate:self=>announce(Math.min(scenes.length-1,Math.floor(((self.animation?.time()??0)+.4)/2))),
            onRefresh:self=>{chapter.dataset.motionStart=String(self.start);chapter.dataset.motionEnd=String(self.end);}
          }});
          scenes.forEach((scene,i)=>{
            if(i>0)timeline.fromTo(scene,{[axis]:business?10:105,autoAlpha:0},{[axis]:0,autoAlpha:1,duration:.7,ease:"none"},i*2-.4);
            const title=scene.querySelector<HTMLElement>(".scene-title");
            if(title&&!business)timeline.to(title,{x:()=>innerWidth*.035,scale:.87,duration:.65,ease:"none"},i*2+.85);
            const image=scene.querySelector<HTMLElement>(".scene-media");
            if(image)timeline.fromTo(image,{clipPath:"inset(0 18% 0 0)",x:horizontal?70:0,scale:horizontal?.94:1},{clipPath:"inset(0 0% 0 0)",x:0,scale:1,duration:.9,ease:"none"},i*2);
            if(i<scenes.length-1)timeline.to(scene,{[axis]:business?-10:-105,autoAlpha:0,duration:.7,ease:"none"},i*2+1.55);
          });
          timeline.to({}, {duration:.5},duration-.5);
          timeline.eventCallback("onUpdate",()=>announce(Math.min(scenes.length-1,Math.floor((timeline.time()+.4)/2))));
          if(business){
            const map=chapter.querySelector(".business-map");
            const core=chapter.querySelector(".business-core");
            const paths=chapter.querySelectorAll<SVGPathElement>(".business-map path");
            const buttons=chapter.querySelectorAll<HTMLElement>(".business-map button");
            paths.forEach((path,i)=>{const length=path.getTotalLength();timeline.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.8,ease:"none"},i*2);});
            buttons.forEach((button,i)=>{timeline.to(button,{scale:1.12,duration:.5,ease:"none"},i*2);if(i<scenes.length-1)timeline.to(button,{scale:1,duration:.5,ease:"none"},i*2+1.5);});
            if(core)scenes.forEach((_,i)=>timeline.to(core,{x:i%2?12:-12,scale:i===3?1.03:.98,duration:.7,ease:"none"},i*2));
            if(map)gsap.fromTo(map,{y:25},{y:0,ease:"none",scrollTrigger:{trigger:chapter,start:"top bottom",end:"top 64px",scrub:true}});
          }
          const choice=(event:Event)=>{
            const index=Math.max(0,Math.min(scenes.length-1,(event as CustomEvent<number>).detail));
            const trigger=timeline.scrollTrigger;if(!trigger)return;
            const progress=(index*2+.6)/timeline.duration();
            window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*progress,behavior:"instant"});
            ScrollTrigger.update();trigger.getTween()?.progress(1);timeline.progress(progress);announce(index);
          };
          chapter.addEventListener("btf:select-scene",choice);
          announce(0);
          modeRemovals.push(()=>{chapter.removeEventListener("btf:select-scene",choice);chapter.classList.remove("has-scenes");delete chapter.dataset.motionStart;delete chapter.dataset.motionEnd;delete chapter.dataset.activeScene;chapter.dispatchEvent(new CustomEvent("btf:scene-index",{detail:0}));document.dispatchEvent(new CustomEvent("btf:scene"));});
        };
        const bridge=document.querySelector(".opening-bridge");
        if(bridge)gsap.to(bridge,{x:-40,y:-18,scale:.94,transformOrigin:"right center",ease:"none",scrollTrigger:{id:"btf-opening-bridge",trigger:"#inicio",start:"bottom bottom",end:"bottom 64px",scrub:true,invalidateOnRefresh:true}});
        const network=document.getElementById("desenvolvimento");
        const frame=network?.querySelector<HTMLElement>(".network-frame");
        const canvas=network?.querySelector<HTMLElement>(".network-canvas");
        const core=network?.querySelector<HTMLElement>(".network-core");
        if(network&&frame&&canvas&&core){
          gsap.set(core,{xPercent:-50,yPercent:-50,x:0,y:0,scale:1.1});
          const nodes=gsap.utils.toArray<HTMLElement>("[data-node]",network);
          const paths=gsap.utils.toArray<SVGPathElement>("[data-connection]",network);
          // Establish the initial state before releasing the CSS loading guard.
          // autoAlpha also prevents focus/pointer access to unrevealed nodes.
          nodes.forEach(node=>gsap.set(node,{x:()=>canvas.clientWidth*(.46-parseFloat(node.style.left)/100),y:()=>canvas.clientHeight*(.49-parseFloat(node.style.top)/100),scale:.6,autoAlpha:0}));
          paths.forEach(path=>{const length=Math.ceil(path.getTotalLength())+2;gsap.set(path,{strokeDasharray:`${length} ${length+4}`,strokeDashoffset:length+1});});
          network.classList.add("is-building");
          let previous=-2;
          const timeline=gsap.timeline({scrollTrigger:{id:"btf-network",trigger:network,pin:frame,start:"top 64px",end:()=>`+=${(window.innerHeight-64)*2.2}`,scrub:.2,invalidateOnRefresh:true,
            onUpdate:self=>{const time=self.animation?.time()??0;const index=time<.4?-1:Math.min(5,Math.floor((time-.4)/.8));if(previous!==index){previous=index;network.dispatchEvent(new CustomEvent("btf:network-active",{detail:index<0?null:index}));}},
            onRefresh:self=>{network.dataset.motionStart=String(self.start);network.dataset.motionEnd=String(self.end);document.dispatchEvent(new CustomEvent("btf:network-layout"));}
          }});
          // CSS owns the -50% layout translate; GSAP owns only incremental transforms.
          timeline.to(core,{scale:1,duration:3,ease:"none"},0);
          nodes.forEach((node,i)=>{
            const x=()=>canvas.clientWidth*(.46-parseFloat(node.style.left)/100);
            const y=()=>canvas.clientHeight*(.49-parseFloat(node.style.top)/100);
            const length=Math.ceil(paths[i].getTotalLength())+2;
            timeline.fromTo(paths[i],{strokeDasharray:`${length} ${length+4}`,strokeDashoffset:length+1},{strokeDashoffset:0,duration:.85,ease:"none",immediateRender:false},i*.8+.25);
            timeline.fromTo(node,{x,y,scale:.6,autoAlpha:0},{x:0,y:0,scale:1,autoAlpha:1,duration:.85,ease:"power1.out",immediateRender:false},i*.8+.4);
          });
          timeline.to({}, {duration:1.1});
          // The finished network becomes an editorial lexicon, carrying its words onward.
          timeline.to(core,{x:()=>canvas.clientWidth*.27,y:()=>-canvas.clientHeight*.31,scale:.58,duration:1.15,ease:"none"},6.4);
          const positions=[[22,20],[22,43],[22,66],[72,66],[22,88],[72,43]];
          nodes.forEach((node,i)=>timeline.to(node,{x:()=>canvas.clientWidth*(positions[i][0]/100-parseFloat(node.style.left)/100),y:()=>canvas.clientHeight*(positions[i][1]/100-parseFloat(node.style.top)/100),scale:i===0?1.5:1,duration:1.15,ease:"none"},6.4));
          const editorialPaths=["M730 94 C620 110 340 104 220 104","M220 104 C200 150 230 200 220 224","M220 224 C190 260 230 300 220 343","M220 343 C380 290 550 400 720 343","M220 224 C580 210 550 470 220 458","M220 104 C450 30 680 160 720 224"];
          timeline.set(paths,{strokeDasharray:"none",strokeDashoffset:0},6.4);
          paths.forEach((path,i)=>timeline.to(path,{attr:{d:editorialPaths[i]},duration:1.15,ease:"none"},6.4));
          timeline.to({}, {duration:.5});
          timeline.eventCallback("onUpdate",()=>{const time=timeline.time();const index=time<.4?-1:Math.min(5,Math.floor((time-.4)/.8));if(previous!==index){previous=index;network.dispatchEvent(new CustomEvent("btf:network-active",{detail:index<0?null:index}));}});
          const explore=()=>{
            const trigger=timeline.scrollTrigger;
            if(!trigger)return;
            const progress=5.8/timeline.duration();
            window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*progress,behavior:"instant"});
            // Immediate completion ensures focused controls never wait for scrub.
            ScrollTrigger.update();trigger.getTween()?.progress(1);timeline.progress(progress);
          };
          network.addEventListener("btf:explore",explore);
          modeRemovals.push(()=>{network.removeEventListener("btf:explore",explore);delete network.dataset.motionStart;delete network.dataset.motionEnd;document.dispatchEvent(new CustomEvent("btf:network-layout"));});
        }
        document.querySelectorAll<HTMLElement>('[data-scene-chapter="vertical"], [data-scene-chapter="horizontal"]').forEach(createScenes);
        const experts=document.getElementById("especialistas");
        const viewport=experts?.querySelector<HTMLElement>(".experts-viewport");
        const track=experts?.querySelector<HTMLElement>(".experts-track");
        if(experts&&viewport&&track){
          experts.classList.add("is-horizontal");
          const distance=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
          let previous=-1;
          const tween=gsap.to(track,{x:()=>-distance(),ease:"none",scrollTrigger:{id:"btf-experts",trigger:viewport,pin:true,start:"top 64px",end:()=>`+=${distance()}`,scrub:.35,invalidateOnRefresh:true,
            onUpdate:self=>{const index=Math.min(2,Math.round(self.progress*2));if(previous!==index){previous=index;experts.dispatchEvent(new CustomEvent("btf:expert",{detail:index}));}},
            onRefresh:self=>{experts.dataset.motionStart=String(self.start);experts.dataset.motionEnd=String(self.end);}
          }});
          const select=(index:number)=>{
            const trigger=tween.scrollTrigger;
            if(!trigger)return;
            window.scrollTo({top:trigger.start+distance()*(index/2),behavior:"instant"});
            ScrollTrigger.update();trigger.getTween()?.progress(1);tween.progress(index/2);
          };
          const choice=(event:Event)=>select((event as CustomEvent<number>).detail);
          const focus=(event:FocusEvent)=>{
            const article=(event.target as Element).closest<HTMLElement>(".expert");
            if(!article)return;
            select(Array.from(track.querySelectorAll(".expert")).indexOf(article));
          };
          experts.addEventListener("btf:select-expert",choice);
          track.addEventListener("focusin",focus);
          modeRemovals.push(()=>{experts.removeEventListener("btf:select-expert",choice);track.removeEventListener("focusin",focus);});
        }
        document.querySelectorAll<HTMLElement>("[data-drift]").forEach(element=>{
          const speed=parseFloat(element.dataset.drift??"1");
          const distance=speed===1?40:speed<1?65:52;
          gsap.fromTo(element,{y:distance},{y:-distance,ease:"none",scrollTrigger:{trigger:element,start:"clamp(top bottom)",end:"clamp(bottom top)",scrub:true,invalidateOnRefresh:true}});
        });
        const business=document.querySelector<HTMLElement>('[data-scene-chapter="business"]');if(business)createScenes(business);
        document.querySelectorAll<HTMLElement>(".chapter-handoff>span").forEach(word=>gsap.fromTo(word,{x:-25},{x:20,ease:"none",scrollTrigger:{trigger:word.parentElement,start:"clamp(top bottom)",end:"clamp(bottom top)",scrub:true}}));
        const conversation=document.getElementById("conversa");
        if(conversation)gsap.fromTo(conversation,{"--conversation-tone":0},{"--conversation-tone":1,ease:"none",scrollTrigger:{id:"btf-conversation-tone",trigger:conversation,start:"top bottom",end:"top 64px",scrub:true,invalidateOnRefresh:true}});
        requestAnimationFrame(()=>{if(!disposed){ScrollTrigger.refresh();if(restoredY!==null){window.scrollTo({top:restoredY,behavior:"instant"});ScrollTrigger.update();restoredY=null;}else if(location.hash)position(decodeURIComponent(location.hash.slice(1)));}});
        return()=>{modeRemovals.forEach(fn=>fn());network?.classList.remove("is-building");experts?.classList.remove("is-horizontal");network?.dispatchEvent(new CustomEvent("btf:network-active",{detail:null}));};
      });
      let refreshFrame=0;
      let resizePosition:{id:string;progress:number}|undefined;
      const refresh=()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>{if(!disposed){ScrollTrigger.refresh();if(resizePosition){const trigger=ScrollTrigger.getById(resizePosition.id);if(trigger){window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*resizePosition.progress,behavior:"instant"});ScrollTrigger.update();}resizePosition=undefined;}}});};
      const resize=()=>{const active=ScrollTrigger.getAll().find(trigger=>trigger.pin&&trigger.isActive);if(active?.vars.id)resizePosition={id:active.vars.id,progress:active.progress};refresh();};
      const hash=()=>{refresh();requestAnimationFrame(()=>position(decodeURIComponent(location.hash.slice(1))));};
      // Preserve href/history. Handle only ordinary same-page chapter clicks in the enhanced mode.
      const click=(event:MouseEvent)=>{
        if(!eligible.matches||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
        const anchor=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        if(!anchor)return;
        const id=anchor.getAttribute("href")?.slice(1);
        if(!id||!document.getElementById(id))return;
        event.preventDefault();
        if(location.hash!==`#${id}`)history.pushState(null,"",`#${id}`);
        position(id);
      };
      void document.fonts.ready.then(refresh);
      document.querySelectorAll("img").forEach(img=>{img.addEventListener("load",refresh);removals.push(()=>img.removeEventListener("load",refresh));});
      document.querySelectorAll("details").forEach(d=>{d.addEventListener("toggle",refresh);removals.push(()=>d.removeEventListener("toggle",refresh));});
      document.addEventListener("click",click);
      document.addEventListener("fullscreenchange",refresh);
      window.addEventListener("hashchange",hash);
      window.addEventListener("popstate",hash);
      window.addEventListener("pageshow",refresh);
      window.addEventListener("resize",resize);
      refresh();
      cleanup=()=>{mm.revert();cancelAnimationFrame(refreshFrame);removals.forEach(fn=>fn());document.removeEventListener("click",click);document.removeEventListener("fullscreenchange",refresh);window.removeEventListener("hashchange",hash);window.removeEventListener("popstate",hash);window.removeEventListener("pageshow",refresh);window.removeEventListener("resize",resize);};
    }
    const activate=()=>{if(!started&&eligible.matches){started=true;void setup();}};
    const timer=window.setTimeout(activate,250);
    eligible.addEventListener("change",activate);
    return()=>{disposed=true;clearTimeout(timer);window.removeEventListener("pagehide",savePosition);eligible.removeEventListener("change",activate);cleanup?.();};
  },[]);
  return null;
}
