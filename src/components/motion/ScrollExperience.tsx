"use client";
import { useEffect } from "react";

export function ScrollExperience() {
  useEffect(()=>{
    let disposed=false,started=false;
    let cleanup:(()=>void)|undefined;
    const rule="(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    const eligible=window.matchMedia(rule);
    async function setup(){
      const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
      if(disposed)return;
      gsap.registerPlugin(ScrollTrigger);
      const mm=gsap.matchMedia();
      const removals:(()=>void)[]=[];
      const position=(id:string)=>{
        const element=document.getElementById(id);
        if(!element)return;
        const trigger=ScrollTrigger.getById(id==="desenvolvimento"?"btf-network":id==="especialistas"?"btf-experts":"");
        const top=trigger?trigger.start:window.scrollY+element.getBoundingClientRect().top-64;
        window.scrollTo({top:Math.max(0,top),behavior:"instant"});
        ScrollTrigger.update();
      };
      mm.add(rule,()=>{
        const modeRemovals:(()=>void)[]=[];
        const network=document.getElementById("desenvolvimento");
        const frame=network?.querySelector<HTMLElement>(".network-frame");
        const canvas=network?.querySelector<HTMLElement>(".network-canvas");
        const core=network?.querySelector<HTMLElement>(".network-core");
        if(network&&frame&&canvas&&core){
          network.classList.add("is-building");
          const nodes=gsap.utils.toArray<HTMLElement>("[data-node]",network);
          const paths=gsap.utils.toArray<SVGPathElement>("[data-connection]",network);
          const timeline=gsap.timeline({scrollTrigger:{id:"btf-network",trigger:network,pin:frame,start:"top 64px",end:()=>`+=${(window.innerHeight-64)*2}`,scrub:.25,invalidateOnRefresh:true}});
          // CSS owns the -50% layout translate; GSAP owns only incremental transforms.
          timeline.fromTo(core,{scale:1.1},{scale:1,duration:3,ease:"none"},0);
          nodes.forEach((node,i)=>{
            const x=()=>canvas.clientWidth*(.46-parseFloat(node.style.left)/100);
            const y=()=>canvas.clientHeight*(.49-parseFloat(node.style.top)/100);
            const length=paths[i].getTotalLength();
            timeline.fromTo(paths[i],{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.85,ease:"none"},i*.8+.25);
            timeline.fromTo(node,{x,y,scale:.6,opacity:0},{x:0,y:0,scale:1,opacity:1,duration:.85,ease:"power1.out"},i*.8+.4);
          });
          timeline.to({}, {duration:1.1});
          const explore=()=>{
            const trigger=timeline.scrollTrigger;
            if(!trigger)return;
            window.scrollTo({top:trigger.end-1,behavior:"instant"});
            // Immediate completion ensures focused controls never wait for scrub.
            ScrollTrigger.update();trigger.getTween()?.progress(1);timeline.progress(1);
          };
          network.addEventListener("btf:explore",explore);
          modeRemovals.push(()=>network.removeEventListener("btf:explore",explore));
        }
        const bridge=document.querySelector(".opening-bridge");
        if(bridge)gsap.to(bridge,{y:35,scale:.86,transformOrigin:"right center",ease:"none",scrollTrigger:{trigger:"#inicio",start:"bottom bottom",end:"bottom 64px",scrub:true}});
        const experts=document.getElementById("especialistas");
        const viewport=experts?.querySelector<HTMLElement>(".experts-viewport");
        const track=experts?.querySelector<HTMLElement>(".experts-track");
        if(experts&&viewport&&track){
          experts.classList.add("is-horizontal");
          const distance=()=>Math.max(0,track.scrollWidth-viewport.clientWidth);
          let previous=-1;
          const tween=gsap.to(track,{x:()=>-distance(),ease:"none",scrollTrigger:{id:"btf-experts",trigger:viewport,pin:true,start:"top 64px",end:()=>`+=${distance()}`,scrub:.35,invalidateOnRefresh:true,
            onUpdate:self=>{const index=Math.min(2,Math.round(self.progress*2));if(previous!==index){previous=index;experts.dispatchEvent(new CustomEvent("btf:expert",{detail:index}));}}
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
        requestAnimationFrame(()=>{if(!disposed){ScrollTrigger.refresh();if(location.hash)position(decodeURIComponent(location.hash.slice(1)));}});
        return()=>{modeRemovals.forEach(fn=>fn());network?.classList.remove("is-building");experts?.classList.remove("is-horizontal");};
      });
      let refreshFrame=0;
      const refresh=()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>{if(!disposed)ScrollTrigger.refresh();});};
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
      refresh();
      cleanup=()=>{mm.revert();cancelAnimationFrame(refreshFrame);removals.forEach(fn=>fn());document.removeEventListener("click",click);document.removeEventListener("fullscreenchange",refresh);window.removeEventListener("hashchange",hash);window.removeEventListener("popstate",hash);window.removeEventListener("pageshow",refresh);};
    }
    const activate=()=>{if(!started&&eligible.matches){started=true;void setup();}};
    const timer=window.setTimeout(activate,250);
    eligible.addEventListener("change",activate);
    return()=>{disposed=true;clearTimeout(timer);eligible.removeEventListener("change",activate);cleanup?.();};
  },[]);
  return null;
}
