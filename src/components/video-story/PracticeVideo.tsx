"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

type Connection = EventTarget & { saveData?: boolean };
let activePlayer: HTMLVideoElement | null = null;
export function PracticeVideo({ name = "practice" }: { name?: keyof typeof site.videos }) {
  const metadata = site.videos[name];
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const pausedByUser = useRef(false);
  const intersecting = useRef(false);
  const explicit = useRef(false);
  const autoPause = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const allowed = () => desktop.matches && !reduced.matches && !connection?.saveData;
    const shown = () => {
      const scene = element.closest<HTMLElement>("[data-scene]");
      return intersecting.current && (!scene || getComputedStyle(scene).visibility !== "hidden");
    };
    const pause = () => { if (!element.paused) { autoPause.current = true; element.pause(); } };
    const update = () => {
      if (!shown() || document.hidden || pausedByUser.current || (!allowed() && !explicit.current)) { pause(); return; }
      if (!loaded) { setLoaded(true); return; }
      activePlayer = element;
      void element.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { intersecting.current = entry.isIntersecting && entry.intersectionRatio >= .25; update(); }, { threshold: [0, .25, .5] });
    observer.observe(element);
    const other = (event: Event) => { if ((event as CustomEvent).detail !== element) pause(); };
    document.addEventListener("visibilitychange", update);
    document.addEventListener("btf:scene", update);
    document.addEventListener("btf:video-play", other);
    reduced.addEventListener("change", update);
    desktop.addEventListener("change", update);
    connection?.addEventListener("change", update);
    element.addEventListener("loadeddata", update);
    if (loaded) { element.load(); update(); }
    return () => {
      observer.disconnect(); pause(); if (activePlayer === element) activePlayer = null;
      document.removeEventListener("visibilitychange", update); document.removeEventListener("btf:scene", update); document.removeEventListener("btf:video-play", other);
      reduced.removeEventListener("change", update); desktop.removeEventListener("change", update); connection?.removeEventListener("change", update); element.removeEventListener("loadeddata", update);
    };
  }, [loaded]);
  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { pausedByUser.current = true; explicit.current = false; element.pause(); }
    else {
      pausedByUser.current = false; explicit.current = true;
      if (!loaded) setLoaded(true);
      else void element.play().catch(() => setPlaying(false));
    }
  };
  return <div className="practice-player" data-video={name}>
    <video ref={video} className="practice-video" width={metadata.width} height={metadata.height} poster={`/media/${name}-poster.webp`} playsInline muted loop controls={loaded} preload="none" aria-label={metadata.label}
      onPlay={() => { setPlaying(true); activePlayer = video.current; document.dispatchEvent(new CustomEvent("btf:video-play", { detail: video.current })); }}
      onPause={() => { setPlaying(false); if (autoPause.current) autoPause.current = false; else if (intersecting.current && !document.hidden) pausedByUser.current = true; }}>
      {loaded && <><source src={`/media/${name}.webm`} type="video/webm" /><source src={`/media/${name}.mp4`} type="video/mp4" /></>}{metadata.description}
    </video>
    <button className="video-toggle" type="button" onClick={toggle} aria-label={playing ? site.ui.video.pause : site.ui.video.play}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d={playing ? "M7 5h3v14H7zm7 0h3v14h-3z" : "m8 4 12 8-12 8z"} fill="currentColor" /></svg>
      {playing ? site.ui.video.paused : site.ui.video.watch}<span className="video-silent">{site.ui.video.silent}</span>
    </button>
    <noscript><p className="video-noscript">{metadata.description} <a href={`/media/${name}.mp4`}>{site.ui.video.link}</a>.</p></noscript>
  </div>;
}
