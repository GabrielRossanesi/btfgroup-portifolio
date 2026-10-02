import { Navigation } from "@/components/navigation/Navigation";
import { CompetencyNetwork } from "@/components/presentation/CompetencyNetwork";
import { Experts } from "@/components/presentation/Experts";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { CompetencyChapter, PracticeChapter, BusinessChapter } from "@/components/presentation/StoryChapters";
import { ActionMural } from "@/components/presentation/ActionMural";
import { MobileNarrative } from "@/components/motion/MobileNarrative";
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
      <CompetencyChapter/>
      <PracticeChapter/>
      <Experts/>
      <ActionMural/>
      <BusinessChapter/>
      <section id="formatos" className="formats chapter dark page-gutter" aria-labelledby="formats-heading" data-chapter>
        <p className="eyebrow">{site.chapters[7].title}</p><h2 id="formats-heading">{lines(site.formats.title)}</h2><p className="formats-description">{site.formats.description}</p>
        <div className="formats-list">{site.formats.items.filter(item=>item.published).map(item=><a className="format-item" href={getProductUrl(item.title)} key={item.title} target="_blank" rel="noopener noreferrer"><span>{item.type}</span><h3>{item.title}</h3><span className="format-consult">{site.formats.consult}<Arrow diagonal/></span></a>)}</div>
      </section>
      <section id="origem" className="origin chapter page-gutter" aria-labelledby="origin-heading" data-chapter>
        <p className="eyebrow">{site.chapters[8].title}</p><div className="origin-layout"><h2 id="origin-heading">{lines(site.origin.title)}</h2><div className="origin-copy"><p>{site.origin.text}</p><p>{site.origin.connection}</p></div></div>
        <figure><Media name="origin" alt={site.media.origin} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1023px) 75vw, 800px"/><figcaption>{site.origin.caption}</figcaption></figure>
      </section>
      <section id="conversa" className="conversation chapter page-gutter" aria-labelledby="conversation-heading" data-chapter>
        <p className="eyebrow">{site.chapters[9].title}</p><h2 id="conversation-heading">{lines(site.conversation.title)}</h2><div className="conversation-bottom"><p>{site.conversation.description}</p><div><a className="contact-link" href={contact} target="_blank" rel="noopener noreferrer">{site.conversation.whatsapp}<Arrow diagonal/></a><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a></div></div>
      </section>
    </main>
    <footer className="footer page-gutter"><a href="#inicio" aria-label={site.ui.home}><Logo/></a><p>{site.conversation.footer}</p><a href="#inicio">{site.ui.back}<Arrow diagonal/></a><span>© {new Date().getFullYear()} {site.name}</span></footer>
    <ScrollExperience/>
    <MobileNarrative/>
    {origin && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>}
  </>;
}
