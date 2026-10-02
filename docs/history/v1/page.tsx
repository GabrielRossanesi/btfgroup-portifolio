import { Navigation } from "@/components/navigation/Navigation";
import { HeroTitle } from "@/components/hero/HeroTitle";
import { Manifesto } from "@/components/manifesto/Manifesto";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { PracticeVideo } from "@/components/video-story/PracticeVideo";
import { Arrow } from "@/components/ui/Arrow";
import { Logo, Media } from "@/components/ui/Media";
import { getContactUrl, getSiteUrl, site } from "@/content/site";

export default function Home() {
  const contact = getContactUrl();
  const origin = getSiteUrl();
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: origin, logo: `${origin}/media/btf-logo.webp`, email: site.email, telephone: site.phone, description: site.description };
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Navigation contactUrl={contact} />
    <main id="conteudo">
      <section id="inicio" className="hero" aria-label="BTF Group — educação prática em comunicação">
        <Media name="hero" alt="Pessoa fala ao microfone entre participantes em um encontro de educação" className="hero-image" priority />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content page-gutter">
          <div className="hero-intro"><span className="hero-brand">BTF Group</span><span className="intro-rule" aria-hidden="true" /><span>Educação que conecta</span></div>
          <HeroTitle lines={site.hero.title} />
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions"><a className="button button-light" href="#solucoes">Conheça as soluções<Arrow /></a><a className="text-link hero-secondary" href={contact} target="_blank" rel="noopener noreferrer">Para sua empresa<Arrow diagonal /></a></div>
        </div>
        <div className="hero-bottom page-gutter"><a href="#manifesto" className="scroll-cue"><span className="scroll-line" aria-hidden="true" />Continue a conversa</a><span className="hero-bottom-note">Da ideia à palavra.<br />Da palavra à presença.</span></div>
      </section>

      <Manifesto />

      <section id="em-acao" className="action-section section-space page-gutter" aria-labelledby="action-heading">
        <div className="action-heading"><div><p className="section-label">BTF em ação</p><h2 id="action-heading">Aprender é<br />entrar em cena.</h2></div><p className="section-description">A comunicação acontece entre pessoas.<br />O aprendizado também.</p></div>
        <div className="action-composition"><figure className="action-primary"><div className="action-image-window"><Media name="action" alt="Apresentação diante de uma turma e de uma projeção sobre oratória e redação" sizes="(max-width: 700px) 100vw, 75vw" /></div><figcaption>Ideias compartilhadas. Conhecimento em prática.</figcaption></figure><figure className="action-secondary"><Media name="action-detail" alt="Vista entre as cadeiras de uma sala durante uma apresentação" sizes="(max-width: 700px) 55vw, 28vw" /><figcaption>Estar presente faz parte.</figcaption></figure></div>
        <div className="action-after"><span className="simple-mark" aria-hidden="true">B</span><p>Escutar, experimentar, se expressar.<br />É assim que o conhecimento encontra a sua voz.</p><a className="text-link" href="#experiencia">Veja nossos encontros<Arrow /></a></div>
      </section>

      <section id="solucoes" className="solutions section-space page-gutter" aria-labelledby="solutions-heading">
        <div className="solutions-intro"><p className="section-label">Desenvolvimento profissional</p><h2 id="solutions-heading">Boas ideias merecem<br />ser bem comunicadas.</h2><p className="section-description">Da reunião ao palco. Da palavra escrita à conversa que faz a diferença.</p></div>
        <div className="solutions-layout"><div className="solutions-list">
          {site.solutions.map((solution, i) => <details className="solution" name="solutions" key={solution.title} open={i === 0}>
            <summary><span>{solution.title}</span><span className="disclosure-icon" aria-hidden="true" /></summary>
            <div className="solution-content"><p>{solution.description}</p><p className="solution-contexts">{solution.contexts}</p><a href={contact} className="text-link" target="_blank" rel="noopener noreferrer">Converse sobre esse tema<Arrow diagonal /></a></div>
          </details>)}
          <p className="editorial-note">Temas para uma conversa sobre desenvolvimento. Formatos e disponibilidade são definidos com a BTF.</p>
        </div><figure className="solutions-photo"><Media name="hero" alt="Participação ao microfone em meio ao público" sizes="(max-width: 900px) 100vw, 38vw" /><figcaption>Comunicação começa com conexão.</figcaption></figure></div>
        <div className="products-row"><p>Conheça também</p><div>{site.products.map(product => <a key={product} href={`${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${product}.`)}`} target="_blank" rel="noopener noreferrer">{product}<Arrow diagonal /></a>)}</div></div>
      </section>

      <section id="especialistas" className="experts section-space" aria-labelledby="experts-heading">
        <div className="experts-heading page-gutter"><div><p className="section-label">As pessoas por trás da BTF</p><h2 id="experts-heading">Conhecimento.<br />Com voz e presença.</h2></div><p className="section-description">Três profissionais.<br />Uma proposta de educação prática.</p></div>
        <div className="experts-viewport"><div className="experts-track">
          {site.experts.map(expert => <article className="expert" key={expert.name}>
            <div className="expert-photo"><Media name={expert.image} alt={`Retrato institucional de ${expert.name}`} sizes="(max-width: 700px) 90vw, (max-width: 1023px) 44vw, 54vw" /></div>
            <div className="expert-description"><h3>{expert.name}</h3>{expert.specialty && <p>{expert.specialty}</p>}<details className="expert-bio"><summary>Sobre {expert.name.split(" ")[0]}<span className="disclosure-icon" aria-hidden="true" /></summary><p>{expert.bio ?? "TODO — Biografia e especialidades aguardam confirmação da BTF."}</p></details></div>
          </article>)}
        </div></div>
      </section>

      <section id="experiencia" className="experience section-space" aria-labelledby="experience-heading">
        <div className="experience-heading page-gutter"><p className="section-label">Experiências que conectam</p><h2 id="experience-heading">O encontro faz<br />parte da transformação.</h2><p>Aprender com outras pessoas.<br />Experimentar novas formas de se comunicar.</p></div>
        <figure className="experience-photo"><Media name="experience" alt="Turma reunida ao final de um encontro em uma sala de formação" /><figcaption className="page-gutter"><span>Gente real. Aprendizado compartilhado.</span><span>Acervo BTF Group</span></figcaption></figure>
        {site.metrics.length > 0 && <dl className="metrics page-gutter">{site.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
      </section>

      <section className="video-story section-space page-gutter" aria-labelledby="video-heading">
        <div className="video-copy"><p className="section-label">Oratória em movimento</p><h2 id="video-heading">Comunicação<br />se aprende<br />praticando.</h2><p>Uma sala. Pessoas. Uma ideia que ganha voz.<br />A prática dá vida ao conhecimento.</p><a href={contact} className="text-link" target="_blank" rel="noopener noreferrer">Leve essa conversa à sua equipe<Arrow diagonal /></a></div>
        <div className="film-scale"><PracticeVideo /></div>
        <span className="video-backdrop-word" aria-hidden="true">Voz.</span>
      </section>

      <section id="sobre" className="about section-space page-gutter" aria-labelledby="about-heading">
        <p className="section-label">Nossa origem</p><div className="about-layout"><h2 id="about-heading">Experiência<br />transformada<br />em educação.</h2><div className="about-story"><p>{site.about}</p><p className="about-statement">O conhecimento é o ponto de partida.<br />A comunicação amplia o caminho.</p></div></div>
        <figure className="about-photo"><Media name="origin" alt="Participantes reunidos em uma sala de educação prática" sizes="(max-width: 700px) 100vw, 75vw" /><figcaption>Educação feita de encontros.</figcaption></figure>
      </section>

      <section id="contato" className="contact section-space page-gutter" aria-labelledby="contact-heading"><div className="contact-top"><p className="section-label">A próxima conversa pode ser a sua</p><span className="contact-symbol" aria-hidden="true"><Arrow diagonal /></span></div><h2 id="contact-heading">Sua equipe tem<br />conhecimento.<br />Dê voz a ele.</h2><div className="contact-bottom"><p>Vamos conversar sobre comunicação<br />e desenvolvimento na sua empresa.</p><a href={contact} className="button button-light" target="_blank" rel="noopener noreferrer">Leve a BTF para sua empresa<Arrow diagonal /></a></div><a href={`mailto:${site.email}`} className="contact-email">{site.email}</a></section>
    </main>

    <footer className="footer page-gutter"><div className="footer-top"><a href="#inicio" aria-label="BTF Group — voltar ao início"><Logo /></a><p>Conhecimento que encontra voz.</p><a href="#inicio" className="back-top">Voltar ao topo<Arrow diagonal /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BTF Group</span><nav aria-label="Navegação do rodapé"><a href="#solucoes">Soluções</a><a href="#especialistas">Especialistas</a><a href="#sobre">A BTF</a></nav><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {site.phone}</a></div></footer>
    <ScrollExperience />
    {origin && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
  </>;
}
