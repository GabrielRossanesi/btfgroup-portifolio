"use client";
import { useEffect } from "react";

export function ScrollExperience() {
  useEffect(() => {
    let disposed = false;
    let started = false;
    let cleanup: (() => void) | undefined;
    const rule = "(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    const eligibility = window.matchMedia(rule);
    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      const removeListeners: (() => void)[] = [];
      // Responsive effects are created and reverted together in document order.
      mm.add(rule, () => {
        const modeListeners: (() => void)[] = [];
        const manifesto = document.getElementById("manifesto");
        const frame = manifesto?.querySelector<HTMLElement>(".manifesto-frame");
        const plane = manifesto?.querySelector<HTMLElement>(".word-plane");
        if (manifesto && frame && plane) {
          manifesto.classList.add("is-pinned");
          let previous = -1;
          const timeline = gsap.timeline({ scrollTrigger: { id: "btf-manifesto", trigger: manifesto, pin: frame, start: "top top", end: () => `+=${window.innerHeight * 1.6}`, scrub: .25, invalidateOnRefresh: true,
            onUpdate: self => {
              const index = Math.min(3, Math.floor(self.progress * 4));
              if (index !== previous) { previous = index; manifesto.dispatchEvent(new CustomEvent("btf:word", { detail: index })); }
            },
          } });
          for (let i = 0; i < 4; i++) timeline.fromTo(plane, { scale: .96, opacity: .8 }, { scale: 1, opacity: 1, duration: .75, ease: "none" }, i).to(plane, { scale: 1.025, opacity: .8, duration: .25, ease: "none" }, i + .75);
          const select = (event: Event) => {
            const index = (event as CustomEvent<number>).detail;
            const trigger = timeline.scrollTrigger;
            if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ((index + .4) / 4), behavior: "instant" });
          };
          manifesto.addEventListener("btf:select-word", select);
          modeListeners.push(() => manifesto.removeEventListener("btf:select-word", select));
        }
        const photo = document.querySelector(".action-primary img");
        if (photo) gsap.fromTo(photo, { y: -16 }, { y: 16, ease: "none", scrollTrigger: { trigger: ".action-primary", start: "top bottom", end: "bottom top", scrub: true } });
        const experts = document.getElementById("especialistas");
        const viewport = experts?.querySelector<HTMLElement>(".experts-viewport");
        const track = experts?.querySelector<HTMLElement>(".experts-track");
        if (experts && viewport && track) {
          experts.classList.add("is-horizontal");
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const tween = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { id: "btf-experts", trigger: viewport, pin: true, start: "top 90px", end: () => `+=${distance()}`, scrub: .5, invalidateOnRefresh: true } });
          const focus = (event: FocusEvent) => {
            const card = (event.target as Element).closest<HTMLElement>(".expert");
            const trigger = tween.scrollTrigger;
            if (!card || !trigger) return;
            const shift = Math.min(distance(), Math.max(0, card.offsetLeft - 48));
            window.scrollTo({ top: trigger.start + shift, behavior: "instant" });
          };
          track.addEventListener("focusin", focus);
          modeListeners.push(() => track.removeEventListener("focusin", focus));
        }
        const film = document.querySelector(".film-scale");
        if (film) gsap.fromTo(film, { scale: 1 }, { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".video-story", start: "top 70%", end: "bottom bottom", scrub: true } });
        return () => {
          modeListeners.forEach(fn => fn());
          manifesto?.classList.remove("is-pinned");
          experts?.classList.remove("is-horizontal");
        };
      });
      let frameId = 0;
      const refresh = () => { cancelAnimationFrame(frameId); frameId = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); }); };
      void document.fonts.ready.then(refresh);
      document.querySelectorAll("img").forEach(img => { img.addEventListener("load", refresh); removeListeners.push(() => img.removeEventListener("load", refresh)); });
      document.querySelectorAll("details").forEach(details => { details.addEventListener("toggle", refresh); removeListeners.push(() => details.removeEventListener("toggle", refresh)); });
      window.addEventListener("pageshow", refresh);
      window.addEventListener("popstate", refresh);
      refresh();
      cleanup = () => { mm.revert(); cancelAnimationFrame(frameId); removeListeners.forEach(fn => fn()); window.removeEventListener("pageshow", refresh); window.removeEventListener("popstate", refresh); };
    }
    // Deferring allows the hero to paint before loading scroll animation code.
    const activate = () => { if (!started && eligibility.matches) { started = true; void setup(); } };
    const timer = window.setTimeout(activate, 250);
    eligibility.addEventListener("change", activate);
    return () => { disposed = true; clearTimeout(timer); eligibility.removeEventListener("change", activate); cleanup?.(); };
  }, []);
  return null;
}
