"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function CompetencyNetwork() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const explore = (index: number) => {
    root.current?.dispatchEvent(new CustomEvent("btf:explore"));
    setActive(index);
  };
  return <section ref={root} id="desenvolvimento" className={`network dark chapter ${ready ? "is-interactive" : ""}`} aria-labelledby="network-heading" data-chapter>
    <div className="network-frame page-gutter">
      <div className="chapter-head"><p className="eyebrow">{site.chapters[1].title}</p><p>{site.network.intro}</p></div>
      <h2 className="network-mobile-title">{site.network.title.map(line => <span key={line}>{line}</span>)}</h2>
      <div className="network-canvas">
        <svg className="network-lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
          {site.network.nodes.map(n => <path key={n.id} data-connection d={n.path} />)}
        </svg>
        <h2 id="network-heading" className="network-core">{site.network.title.map(line => <span key={line}>{line}</span>)}</h2>
        {site.network.nodes.map((node, i) => <div className={`network-node node-${node.id}`} data-node key={node.id} style={{left:`${node.x}%`,top:`${node.y}%`}}>
          <button type="button" onFocus={() => explore(i)} onClick={() => explore(i)} aria-pressed={active === i} aria-controls="network-description">{node.title}<span aria-hidden="true" /></button>
        </div>)}
      </div>
      <div className="network-caption">
        <div id="network-description" aria-live="polite" aria-atomic="true">
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
