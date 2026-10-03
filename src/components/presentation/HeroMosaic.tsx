import { Media } from "@/components/ui/Media";

// Nine real records, positioned on a twelve-column cover. Narrative images with
// descriptions appear in later chapters; the cover layer is decorative.
const frames = [
  { name: "hero", width: 500, priority: true, eager: true, drift: -32 },
  { name: "action", width: 480, eager: true, drift: 28 },
  { name: "francisco", width: 235, drift: 22 },
  { name: "claudia", width: 245, drift: -24 },
  { name: "book", width: 230, drift: -36 },
  { name: "legal", width: 380, drift: 30 },
  { name: "luis", width: 240, drift: -20 },
  { name: "microphone", width: 190, drift: 26 },
  { name: "action-detail", width: 290, drift: -40 },
];

export function HeroMosaic() {
  return <div className="hero-mosaic" aria-hidden="true">
    {frames.map(frame => <figure key={frame.name} className={`mosaic-frame mosaic-${frame.name}`} data-mosaic-drift={frame.drift}>
      <Media name={frame.name} alt="" priority={frame.priority} eager={frame.eager}
        sizes={`(max-width: 600px) 44vw, (max-width: 1023px) 32vw, ${Math.ceil(frame.width * 1.04)}px`} />
    </figure>)}
  </div>;
}
