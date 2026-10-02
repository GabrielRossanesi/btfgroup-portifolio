import { Navigation } from "@/components/navigation/Navigation";
import { CompetencyNetwork } from "@/components/presentation/CompetencyNetwork";
import { Experts } from "@/components/presentation/Experts";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { PracticeVideo } from "@/components/video-story/PracticeVideo";
import { Arrow } from "@/components/ui/Arrow";
import { Logo, Media } from "@/components/ui/Media";
import { getContactUrl, getProductUrl, getSiteUrl, site } from "@/content/site";

const lines=(copy:string[])=>copy.map(line=><span key={line}>{line}</span>);
export default function Home() {
  const contact=getContactUrl();
  const origin=getSiteUrl();
  const schema={"@context":"https://schema.org","@type":"Organization",name:site.name,url:origin,logo:`${origin}/media/btf-logo.webp`,email:site.email,telephone:site.phone,description:site.description};
  return <>
    <a className="skip-link" href="#conteudo">{site.ui.skip}</a>
    <Navigation/>
    <main id="conteudo">
      <section id="inicio" className="opening dark chapter page-gutter" aria-labelledby="opening-heading" data-chapter>
        <p className="opening-statement">{site.opening.statement}</p>
        <h1 id="opening-heading">{lines(site.opening.brand)}</h1>
        <div className="opening-bottom"><a href="#desenvolvimento" className="scroll-cue">{site.opening.cue}<Arrow/></a><span className="opening-bridge" aria-hidden="true">{site.opening.bridge}</span></div>
      </section>
      <CompetencyNetwork/>
      <section id="competencias" className="competencies chapter" aria-labelledby="competencies-heading" data-chapter>
        <div className="chapter-intro page-gutter"><p className="eyebrow">{site.chapters[2].title}</p><h2 id="competencies-heading">{site.competencies.intro}</h2></div>
        {site.competencies.acts.map((act,i)=><article key={act.title} className={`competency-act page-gutter act-${i+1}`}>
          <div className="act-main"><span className="act-index" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><h3>{act.title}</h3><p className="act-statement">{act.statement}</p></div>
          <div className="act-context"><p>{act.description}</p><ul>{act.contexts.map(c=><li key={c}>{c}</li>)}</ul></div>
        </article>)}
      </section>
      <section id="pratica" className="practice chapter" aria-labelledby="practice-heading" data-chapter>
        <div className="practice-heading page-gutter"><p className="eyebrow">{site.chapters[3].title}</p><h2 id="practice-heading">{lines(site.practice.title)}</h2><p>{site.practice.description}</p></div>
        <figure className="practice-photo"><Media name="hero" alt={site.media.hero}/><figcaption className="page-gutter">{site.practice.caption}</figcaption></figure>
        <div className="practice-film dark page-gutter"><div className="film-copy"><h3>{lines(site.practice.filmTitle)}</h3><p>{site.practice.filmDescription}</p></div><div className="film-frame"><PracticeVideo/></div></div>
      </section>
      <Experts/>
      <section id="em-acao" className="in-action chapter" aria-labelledby="action-heading" data-chapter>
        <div className="action-heading page-gutter"><p className="eyebrow">{site.chapters[5].title}</p><h2 id="action-heading">{site.action.title}</h2></div>
        <figure className="action-wide"><Media name="experience" alt={site.media.experience}/><figcaption className="page-gutter">{site.action.caption}</figcaption></figure>
        <div className="action-pause page-gutter"><p>{site.action.detail}</p><figure><Media name="action-detail" alt={site.media.detail} sizes="(max-width: 900px) 70vw, 35vw"/></figure></div>
      </section>
      <section id="empresa" className="business chapter page-gutter" aria-labelledby="business-heading" data-chapter>
        <div className="business-heading"><p className="eyebrow">{site.chapters[6].title}</p><h2 id="business-heading">{lines(site.business.title)}</h2><p>{site.business.intro}</p></div>
        <div className="business-applications">{site.business.applications.map((app,i)=><details key={app.area} className="business-application" name="business" open={i===0}><summary>{app.area}<span aria-hidden="true">+</span></summary><div className="business-relation"><p className="relation-label">{site.business.relationLabel}</p><h3>{app.competencies.map(c=><span key={c}>{c}</span>)}</h3><p>{app.context}</p></div></details>)}</div>
      </section>
      <section id="formatos" className="formats chapter dark page-gutter" aria-labelledby="formats-heading" data-chapter>
        <p className="eyebrow">{site.chapters[7].title}</p><h2 id="formats-heading">{lines(site.formats.title)}</h2><p className="formats-description">{site.formats.description}</p>
        <div className="formats-list">{site.formats.items.filter(item=>item.published).map(item=><a className="format-item" href={getProductUrl(item.title)} key={item.title} target="_blank" rel="noopener noreferrer"><span>{item.type}</span><h3>{item.title}</h3><span className="format-consult">{site.formats.consult}<Arrow diagonal/></span></a>)}</div>
      </section>
      <section id="origem" className="origin chapter page-gutter" aria-labelledby="origin-heading" data-chapter>
        <p className="eyebrow">{site.chapters[8].title}</p><div className="origin-layout"><h2 id="origin-heading">{lines(site.origin.title)}</h2><div className="origin-copy"><p>{site.origin.text}</p><p>{site.origin.connection}</p></div></div>
        <figure><Media name="origin" alt={site.media.origin} sizes="(max-width: 900px) 100vw, 65vw"/><figcaption>{site.origin.caption}</figcaption></figure>
      </section>
      <section id="conversa" className="conversation chapter page-gutter" aria-labelledby="conversation-heading" data-chapter>
        <p className="eyebrow">{site.chapters[9].title}</p><h2 id="conversation-heading">{lines(site.conversation.title)}</h2><div className="conversation-bottom"><p>{site.conversation.description}</p><div><a className="contact-link" href={contact} target="_blank" rel="noopener noreferrer">{site.conversation.whatsapp}<Arrow diagonal/></a><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a></div></div>
      </section>
    </main>
    <footer className="footer page-gutter"><a href="#inicio" aria-label={site.ui.home}><Logo/></a><p>{site.conversation.footer}</p><a href="#inicio">{site.ui.back}<Arrow diagonal/></a><span>© {new Date().getFullYear()} {site.name}</span></footer>
    <ScrollExperience/>
    {origin && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>}
  </>;
}
