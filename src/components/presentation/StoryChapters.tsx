"use client";
import { useEffect, useRef, useState } from "react";
import { chapterTitle, site } from "@/content/site";
import { Media } from "@/components/ui/Media";
import { PracticeVideo } from "@/components/video-story/PracticeVideo";

function useSceneChapter() {
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState({ active: 0, enhanced: false });
  useEffect(() => {
    const element = root.current;
    const update = (event: Event) => setState({ active: (event as CustomEvent<number>).detail, enhanced: !!element?.classList.contains("has-scenes") });
    element?.addEventListener("btf:scene-index", update);
    return () => element?.removeEventListener("btf:scene-index", update);
  }, []);
  const select = (index: number) => {
    const element = root.current;
    if (element?.classList.contains("has-scenes")) element.dispatchEvent(new CustomEvent("btf:select-scene", { detail: index }));
    else element?.querySelectorAll<HTMLElement>("[data-scene]")[index]?.scrollIntoView({ block: "start", behavior: "instant" });
    setState(current => ({ ...current, active: index }));
  };
  return { root, state, select };
}
const alt = (name: string) => site.media[name as keyof typeof site.media];
export function CompetencyChapter() {
  const { root, state, select } = useSceneChapter();
  return <section ref={root} id="competencias" className="competencies chapter scene-chapter" data-chapter data-scene-chapter="vertical" aria-labelledby="competencies-heading">
    <div className="scene-stage">
      <header className="scene-header page-gutter"><div><p className="eyebrow">{site.chapters[2].title}</p><h2 id="competencies-heading">{site.competencies.intro}</h2></div><nav aria-label={site.ui.competencyNav}>{site.competencies.scenes.map((scene, i) => <button type="button" key={scene.title} aria-pressed={state.active === i} onClick={() => select(i)}>{scene.title}</button>)}</nav></header>
      <div className="scene-stack">{site.competencies.scenes.map((scene, i) => <article key={scene.title} className={`editorial-scene page-gutter competency-scene scene-${i}`} data-scene data-mobile-story aria-hidden={state.enhanced && state.active !== i ? true : undefined} inert={state.enhanced && state.active !== i}>
        <h3 className="scene-title">{scene.title}</h3><div className="scene-layout"><div className="scene-copy"><p className="scene-statement">{scene.statement}</p><p>{scene.description}</p><p className="scene-context">{scene.context}</p></div><figure className={`scene-media media-${scene.media}`}><Media name={scene.media} alt={alt(scene.media)} sizes={scene.media === "action-detail" ? "(max-width: 600px) calc(100vw - 48px), 450px" : scene.media === "legal" ? "(max-width: 600px) calc(100vw - 48px), 600px" : "(max-width: 600px) calc(100vw - 48px), (max-width: 1600px) 50vw, 800px"} /></figure></div>
      </article>)}</div>
    </div><div className="chapter-handoff handoff-practice page-gutter" aria-hidden="true"><span>{site.competencies.bridge}</span><i /></div>
  </section>;
}
export function PracticeChapter() {
  const { root, state, select } = useSceneChapter();
  return <section ref={root} id="pratica" className="practice dark chapter scene-chapter" data-chapter data-scene-chapter="horizontal" aria-labelledby="practice-heading">
    <div className="scene-stage practice-stage">
      <header className="scene-header page-gutter"><div><p className="eyebrow">{site.chapters[3].title}</p><h2 id="practice-heading">{site.practice.title.join(" ")}</h2></div><nav aria-label={site.ui.practiceNav}>{site.practice.scenes.map((scene, i) => <button type="button" key={scene.title} aria-pressed={state.active === i} onClick={() => select(i)}>{scene.title}</button>)}</nav></header>
      <div className="scene-stack">{site.practice.scenes.map((scene, i) => <article className={`editorial-scene page-gutter practice-scene scene-${i}`} key={scene.title} data-scene data-mobile-story aria-hidden={state.enhanced && state.active !== i ? true : undefined} inert={state.enhanced && state.active !== i}>
        <h3 className="scene-title">{scene.title}</h3><div className="scene-layout"><div className="scene-copy"><p className="scene-statement">{scene.text}</p><p>{site.practice.description}</p></div>{scene.video ? <figure className="scene-media scene-video"><PracticeVideo name="lecture" /><figcaption>{site.videos.lecture.description}</figcaption></figure> : <figure className="scene-media"><Media name={scene.media!} alt={alt(scene.media!)} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1600px) 50vw, 800px" /><figcaption>{site.practice.caption}</figcaption></figure>}</div>
      </article>)}</div>
    </div><div className="chapter-handoff handoff-people page-gutter" aria-hidden="true"><span>{site.practice.bridge}</span><i /></div>
  </section>;
}
export function BusinessChapter() {
  const { root, state, select } = useSceneChapter();
  return <section ref={root} id="empresa" className="business chapter scene-chapter" data-chapter data-scene-chapter="business" aria-labelledby="business-heading">
    <div className="scene-stage business-stage">
      <header className="scene-header page-gutter"><div><p className="eyebrow">{chapterTitle("empresa")}</p><h2 id="business-heading">{site.business.title.join(" ")}</h2></div></header>
      <div className="business-system page-gutter">
        <div className="business-map"><svg viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">{site.business.contexts.map((c, i) => <path key={c.area} className={state.active === i ? "is-active" : ""} d={`M500 350 Q${c.x < 50 ? 150 : 850} 350 ${c.x * 10} ${c.y * 7}`} />)}</svg><p className="business-core">{site.business.core.map(line => <span key={line}>{line}</span>)}</p><nav aria-label={site.ui.businessNav}>{site.business.contexts.map((c, i) => <button key={c.area} type="button" style={{ left: `${c.x}%`, top: `${c.y}%` }} onClick={() => select(i)} aria-pressed={state.active === i}>{c.area}</button>)}</nav></div>
        <div className="business-contexts">{site.business.contexts.map((c, i) => <article key={c.area} data-scene data-mobile-story className="business-context" aria-hidden={state.enhanced && state.active !== i ? true : undefined} inert={state.enhanced && state.active !== i}>
          <h3 className="scene-title">{c.area}</h3><p className="relation-label">{site.business.relationLabel}</p><ul>{c.competencies.map(word => <li key={word}>{word}</li>)}</ul><p>{c.context}</p><p className="scene-context">{c.examples}</p>
        </article>)}</div>
      </div>
      <p className="business-note page-gutter">{site.business.intro}</p>
    </div>
  </section>;
}

export function MovementChapter() {
  const { root, state, select } = useSceneChapter();
  return <section ref={root} id="em-movimento" className="movement dark chapter scene-chapter" data-chapter data-scene-chapter="film" aria-labelledby="movement-heading">
    <div className="scene-stage movement-stage">
      <header className="scene-header page-gutter"><div><p className="eyebrow">{chapterTitle("em-movimento")}</p><h2 id="movement-heading">{site.movement.title}</h2></div><nav aria-label={site.movement.navigation}>{site.movement.scenes.map((scene, i) => <button key={scene.video} type="button" aria-pressed={state.active === i} onClick={() => select(i)}>{scene.title}</button>)}</nav></header>
      <div className="scene-stack">{site.movement.scenes.map((scene, i) => <article key={scene.video} className="editorial-scene film-scene page-gutter" data-scene data-mobile-story aria-hidden={state.enhanced && state.active !== i ? true : undefined} inert={state.enhanced && state.active !== i}>
        <div className="film-copy"><p className="film-index">{String(i+1).padStart(2,"0")} / 03</p><h3 className="scene-title">{scene.title}</h3><p className="film-statement">{scene.statement}</p><p className="film-description">{scene.description}</p></div>
        <figure className={`scene-media film-media film-${scene.video}`}><PracticeVideo name={scene.video}/><figcaption>{site.videos[scene.video].description}</figcaption></figure>
      </article>)}</div>
    </div><div className="chapter-handoff handoff-action page-gutter" aria-hidden="true"><span>{site.movement.bridge}</span><i/></div>
  </section>;
}
