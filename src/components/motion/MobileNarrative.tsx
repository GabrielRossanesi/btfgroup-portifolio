"use client";
import { useEffect } from "react";

export function MobileNarrative() {
  useEffect(() => {
    const mode = window.matchMedia("(max-width: 1023px) and (prefers-reduced-motion: no-preference)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-mobile-story], .competency-detail")];
    const progress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const network = document.getElementById("desenvolvimento");
        if (!network || !mode.matches) return;
        const box = network.getBoundingClientRect();
        network.style.setProperty("--reading-progress", String(Math.max(0, Math.min(1, (innerHeight * .75 - box.top) / box.height))));
      });
    };
    const configure = () => {
      observer?.disconnect();
      document.documentElement.classList.toggle("mobile-enhanced", mode.matches);
      if (!mode.matches) { targets.forEach(el => el.classList.remove("is-in-view")); document.getElementById("desenvolvimento")?.style.removeProperty("--reading-progress"); return; }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle("is-in-view", entry.isIntersecting));
        const chapters = new Set(entries.map(entry => entry.target.closest<HTMLElement>("[data-scene-chapter]")).filter(Boolean));
        chapters.forEach(chapter => {
          if (!chapter) return;
          const scenes = [...chapter.querySelectorAll<HTMLElement>("[data-scene]")];
          const visible = scenes.filter(scene => { const r = scene.getBoundingClientRect(); return r.bottom > 120 && r.top < innerHeight * .8; });
          visible.sort((a, b) => Math.abs(a.getBoundingClientRect().top - 160) - Math.abs(b.getBoundingClientRect().top - 160));
          if (visible[0]) chapter.dispatchEvent(new CustomEvent("btf:scene-index", { detail: scenes.indexOf(visible[0]) }));
        });
      }, { threshold: .12 });
      targets.forEach(el => observer!.observe(el)); progress();
    };
    configure(); mode.addEventListener("change", configure); window.addEventListener("scroll", progress, { passive: true });
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); mode.removeEventListener("change", configure); window.removeEventListener("scroll", progress); document.documentElement.classList.remove("mobile-enhanced"); targets.forEach(el => el.classList.remove("is-in-view")); document.getElementById("desenvolvimento")?.style.removeProperty("--reading-progress"); };
  }, []);
  return null;
}
