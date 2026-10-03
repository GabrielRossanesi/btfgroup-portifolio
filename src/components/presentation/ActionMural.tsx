import { chapterTitle, site } from "@/content/site";
import { Media } from "@/components/ui/Media";

export function ActionMural() {
  return <section id="em-acao" className="in-action chapter" data-chapter aria-labelledby="action-heading">
    <header className="action-heading page-gutter"><p className="eyebrow">{chapterTitle("em-acao")}</p><h2 id="action-heading">{site.action.title}</h2></header>
    <div className="action-evidence page-gutter">
      <div className="action-moment" data-mobile-story><div className="action-context"><p className="evidence-index">01</p><h3>{site.action.people}</h3><p>{site.action.detail}</p></div><figure data-drift=".85"><Media name="experience" alt={site.media.experience} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1500px) 53vw, 800px"/><figcaption>{site.action.caption}</figcaption></figure></div>
      <div className="action-moment action-environment" data-mobile-story><figure data-drift="1"><Media name="origin" alt={site.media.origin} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1500px) 53vw, 800px"/><figcaption>{site.origin.caption}</figcaption></figure><div className="action-context"><p className="evidence-index">02</p><h3>{site.action.environment}</h3><p>{site.action.environmentText}</p></div></div>
    </div>
    <div className="chapter-handoff handoff-company page-gutter"><span aria-hidden="true">{site.action.bridge}</span><svg viewBox="0 0 700 150" aria-hidden="true"><path d="M0 25 Q500 -20 500 85 T700 125" /></svg></div>
  </section>;
}
