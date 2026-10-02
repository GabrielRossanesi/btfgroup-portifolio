"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

type Connection = { saveData?: boolean };
export function PracticeVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const pausedByUser = useRef(false);
  const visible = useRef(false);
  const explicitPlayback = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const saveData = (navigator as Navigator & { connection?: Connection }).connection?.saveData;
    const allowed = () => desktop.matches && !reduced.matches && !saveData;
    const tryPlay = () => { if (visible.current && !document.hidden && !pausedByUser.current && (allowed() || explicitPlayback.current)) void element.play().catch(() => setPlaying(false)); };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (visible.current && allowed()) { setLoaded(true); if (loaded) tryPlay(); }
      else if (!visible.current) element.pause();
      else if (explicitPlayback.current && loaded) tryPlay();
    }, { threshold: .25 });
    observer.observe(element);
    const visibility = () => { if (document.hidden) element.pause(); else tryPlay(); };
    const preference = () => { if (!allowed()) element.pause(); };
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    desktop.addEventListener("change", preference);
    element.addEventListener("loadeddata", tryPlay);
    if (loaded) { element.load(); tryPlay(); }
    return () => { observer.disconnect(); element.pause(); document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", preference); desktop.removeEventListener("change", preference); element.removeEventListener("loadeddata", tryPlay); };
  }, [loaded]);
  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { pausedByUser.current = true; explicitPlayback.current = false; element.pause(); }
    else {
      pausedByUser.current = false; explicitPlayback.current = true;
      if (!loaded) setLoaded(true);
      else void element.play().catch(() => setPlaying(false));
    }
  };
  return <div className="practice-player">
    <video ref={video} className="practice-video" width="478" height="850" poster="/media/practice-poster.webp" playsInline muted loop controls={loaded} preload="none" aria-label={site.ui.video.label} onPlay={() => setPlaying(true)} onPause={() => { setPlaying(false); if (visible.current && !document.hidden) pausedByUser.current = true; }}>
      {loaded && <><source src="/media/practice.webm" type="video/webm" /><source src="/media/practice.mp4" type="video/mp4" /></>}
      {site.ui.video.fallback}
    </video>
    <button className="video-toggle" type="button" onClick={toggle} aria-label={playing ? site.ui.video.pause : site.ui.video.play}>
      {playing ? <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z" fill="currentColor" /></svg> : <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m8 4 12 8-12 8z" fill="currentColor" /></svg>}
      {playing ? site.ui.video.paused : site.ui.video.watch}<span className="video-silent">{site.ui.video.silent}</span>
    </button>
    <noscript><p className="video-noscript">{site.ui.video.fallback} <a href="/media/practice.mp4">{site.ui.video.link}</a>.</p></noscript>
  </div>;
}
