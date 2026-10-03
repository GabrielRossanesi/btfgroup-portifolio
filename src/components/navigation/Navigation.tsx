"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "../ui/Media";
import { site } from "@/content/site";

export function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const [open,setOpen] = useState(false);
  const [active,setActive] = useState(0);
  const [fullscreen,setFullscreen] = useState(false);
  const [fullscreenAvailable,setFullscreenAvailable] = useState(false);
  const [error,setError] = useState("");
  const reduced = useReducedMotion();
  const close = () => { if(menu.current) menu.current.open=false; };
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      let index=0;
      site.chapters.forEach((chapter,i)=>{
        const section=document.getElementById(chapter.id);
        // Pin spacers keep the outer chapter in document flow.
        if(!section)return;
        // Pinned chapters announce their actual start, including on reverse.
        const entered=section.dataset.motionStart!==undefined
          ? window.scrollY>=Number(section.dataset.motionStart)-1
          : section.getBoundingClientRect().top<=65;
        if(entered)index=i;
      });
      setActive(index);
    };
    const scroll=()=>{ if(!frame) frame=requestAnimationFrame(update); };
    const escape=(e:KeyboardEvent)=>{if(e.key==="Escape" && menu.current?.open){close();menu.current.querySelector("summary")?.focus();}};
    const outside=(e:PointerEvent)=>{if(menu.current?.open && !menu.current.contains(e.target as Node)) close();};
    const fs=()=>setFullscreen(Boolean(document.fullscreenElement));
    frame=requestAnimationFrame(()=>{setFullscreenAvailable(Boolean(document.fullscreenEnabled));update();});
    window.addEventListener("scroll",scroll,{passive:true});
    window.addEventListener("resize",scroll);
    window.addEventListener("keydown",escape);
    document.addEventListener("pointerdown",outside);
    document.addEventListener("fullscreenchange",fs);
    document.addEventListener("btf:network-layout",scroll);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);window.removeEventListener("keydown",escape);document.removeEventListener("pointerdown",outside);document.removeEventListener("fullscreenchange",fs);document.removeEventListener("btf:network-layout",scroll);};
  },[]);
  const toggleFullscreen=async()=>{
    setError("");
    try { if(document.fullscreenElement) await document.exitFullscreen();else await document.documentElement.requestFullscreen(); }
    catch {setError(site.ui.fullscreenError);}
  };
  return <header className="site-header">
    <a className="brand-link" href="#inicio" aria-label={site.ui.home} onClick={close}><Logo /></a>
    <span className="chapter-current" aria-label={site.ui.current}><span>{String(active+1).padStart(2,"0")}</span>{site.chapters[active].title}</span>
    <div className="header-controls">
      {fullscreenAvailable && <button className="fullscreen-toggle" type="button" onClick={toggleFullscreen} aria-pressed={fullscreen}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5" fill="none"/></svg><span>{fullscreen?site.ui.exitFullscreen:site.ui.fullscreen}</span></button>}
      <details ref={menu} className="chapter-menu" onToggle={e=>setOpen(e.currentTarget.open)}>
        <summary aria-label={site.ui.chapterNav}>{site.ui.chapters}<span className="menu-lines" aria-hidden="true"><i/><i/></span></summary>
        <motion.nav className="chapter-panel" aria-label={site.ui.chapterNav} initial={false} animate={open&&!reduced?{opacity:[.75,1]}:undefined} transition={{duration:reduced?0:.18}}>
          {site.chapters.map((chapter,i)=><a key={chapter.id} href={`#${chapter.id}`} onClick={close} aria-current={active===i?"location":undefined}><span>{String(i+1).padStart(2,"0")}</span>{chapter.title}<span aria-hidden="true">↗</span></a>)}
        </motion.nav>
      </details>
    </div>
    <span className="sr-only" role="status">{error}</span>
  </header>;
}
