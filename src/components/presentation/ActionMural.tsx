import { site } from "@/content/site";
import { Media } from "@/components/ui/Media";
import { PracticeVideo } from "@/components/video-story/PracticeVideo";

export function ActionMural() {
  return <section id="em-acao" className="in-action chapter" data-chapter aria-labelledby="action-heading">
    <header className="action-heading page-gutter"><p className="eyebrow">{site.chapters[5].title}</p><h2 id="action-heading">{site.action.title}</h2></header>
    <div className="action-canvas">
      <figure className="mural-figure mural-book" data-drift=".85" data-mobile-story><Media name="book" alt={site.media.book} sizes="(max-width: 600px) 65vw, 360px" /><figcaption>{site.action.bookCaption}</figcaption></figure>
      <figure className="mural-figure mural-legal" data-drift="1" data-mobile-story><Media name="legal" alt={site.media.legal} sizes="(max-width: 600px) calc(100vw - 48px), 480px" /></figure>
      <p className="mural-type" aria-hidden="true">{site.action.people}</p>
      <figure className="mural-figure mural-microphone" data-drift="1.08" data-mobile-story><Media name="microphone" alt={site.media.microphone} sizes="(max-width: 600px) 62vw, 280px" /><figcaption>{site.action.microphoneCaption}</figcaption></figure>
      <figure className="mural-figure mural-video" data-mobile-story><PracticeVideo /><figcaption>{site.action.videoCaption}</figcaption></figure>
      <figure className="mural-figure mural-detail" data-mobile-story><Media name="action-detail" alt={site.media.detail} sizes="(max-width: 600px) 70vw, 360px" /></figure>
      <figure className="mural-figure mural-collective" data-drift=".85" data-mobile-story><Media name="experience" alt={site.media.experience} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1500px) 53vw, 800px" /><figcaption>{site.action.caption}</figcaption></figure>
    </div>
    <div className="chapter-handoff handoff-company page-gutter"><p>{site.action.detail}</p><span aria-hidden="true">{site.action.bridge}</span><svg viewBox="0 0 700 150" aria-hidden="true"><path d="M0 25 Q500 -20 500 85 T700 125" /></svg></div>
  </section>;
}
