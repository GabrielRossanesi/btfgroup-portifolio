"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/ui/Media";
import { site } from "@/content/site";

export function Experts() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = root.current;
    const update = (e: Event) => setActive((e as CustomEvent<number>).detail);
    element?.addEventListener("btf:expert", update);
    return () => element?.removeEventListener("btf:expert", update);
  }, []);
  const select = (index: number) => {
    const element = root.current;
    if (element?.classList.contains("is-horizontal")) element.dispatchEvent(new CustomEvent("btf:select-expert", {detail:index}));
    else element?.querySelectorAll<HTMLElement>(".expert")[index]?.scrollIntoView({block:"start",behavior:"instant"});
    setActive(index);
  };
  return <section id="especialistas" ref={root} className="experts dark chapter" aria-labelledby="experts-heading" data-chapter>
    <h2 id="experts-heading" className="sr-only">{site.chapters[4].title}</h2>
    <div className="experts-viewport">
      <div className="expert-toolbar page-gutter"><p className="eyebrow">{site.expertsIntro}</p><nav aria-label={site.ui.expertNav}>
        {site.experts.map((e,i) => <button key={e.id} type="button" onClick={()=>select(i)} aria-pressed={active===i}>{e.name.split(" ")[0]}</button>)}
      </nav></div>
      <div className="experts-track">
        {site.experts.map((expert,i)=><article className="expert page-gutter" key={expert.id} id={`especialista-${expert.id}`} tabIndex={-1}>
          <div className="expert-copy"><span className="expert-index" aria-hidden="true">{String(i+1).padStart(2,"0")} / 03</span><h3>{expert.lines.map(line=><span key={line}>{line}</span>)}</h3>
            {expert.specialty && <p>{expert.specialty}</p>}
            {expert.bio && <details className="expert-bio"><summary>{site.ui.expertAbout} {expert.name}<span aria-hidden="true">+</span></summary><p>{expert.bio}</p></details>}
          </div>
          <div className="expert-photo"><Media name={expert.image} alt={`${site.media.portraitPrefix} ${expert.name}`} sizes="(max-width: 900px) 100vw, 53vw" /></div>
        </article>)}
      </div>
    </div>
  </section>;
}
