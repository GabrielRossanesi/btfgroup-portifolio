"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function CompetencyNetwork() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const element = root.current;
    const update = (event: Event) => setActive((event as CustomEvent<number | null>).detail);
    element?.addEventListener("btf:network-active", update);
    return () => { element?.removeEventListener("btf:network-active", update); };
  }, []);
  const explore = (index: number) => {
    root.current?.dispatchEvent(new CustomEvent("btf:explore"));
    setActive(index);
  };
  return <section ref={root} id="desenvolvimento" className="network dark chapter" aria-labelledby="network-heading" data-chapter>
    <div className="network-frame page-gutter">
      <div className="chapter-head"><p className="eyebrow">{site.chapters[1].title}</p><p>{site.network.intro}</p></div>
      <h2 className="network-mobile-title">{site.network.title.map(line => <span key={line}>{line}</span>)}</h2>
      <div className="network-canvas">
        <svg className="network-lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
          {site.network.nodes.map((n, i) => <path key={n.id} className={active === i ? "is-active" : ""} data-connection d={n.path} />)}
        </svg>
        <h2 id="network-heading" className="network-core">{site.network.title.map(line => <span key={line}>{line}</span>)}</h2>
        {site.network.nodes.map((node, i) => <div className={`network-node node-${node.id}`} data-node key={node.id} style={{left:`${node.x}%`,top:`${node.y}%`}}>
          <button type="button" onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="network-description">{node.title}<span aria-hidden="true" /></button>
        </div>)}
      </div>
      <div className="network-caption">
        <div id="network-description">
          <p className="caption-title">{active === null ? site.network.instruction : site.network.nodes[active].title}</p>
          <p>{active === null ? site.network.description : site.network.nodes[active].description}</p>
        </div>
        <button type="button" className="explore-network" onClick={() => explore(0)}>{site.network.explore}<span aria-hidden="true">↗</span></button>
      </div>
      <div className="network-explanations">
        {site.network.nodes.map(node => <details className="competency-detail" key={node.id}><summary>{node.title}<span aria-hidden="true">+</span></summary><p>{node.description}</p></details>)}
      </div>
    </div>
  </section>;
}
