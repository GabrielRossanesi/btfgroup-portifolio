"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "../ui/Media";
import { Arrow } from "../ui/Arrow";

const links = [{ href: "#solucoes", title: "Soluções" }, { href: "#especialistas", title: "Especialistas" }, { href: "#sobre", title: "A BTF" }];

export function Navigation({ contactUrl }: { contactUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { rootMargin: "-80px 0px 0px 0px", threshold: 0 });
    observer.observe(hero);
    const close = () => { if (menu.current) menu.current.open = false; };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && menu.current?.open) { close(); menu.current.querySelector("summary")?.focus(); } };
    const resize = () => { if (window.innerWidth > 900) close(); };
    const clickOutside = (event: PointerEvent) => { if (menu.current?.open && !menu.current.contains(event.target as Node)) close(); };
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerdown", clickOutside);
    return () => { observer.disconnect(); window.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); document.removeEventListener("pointerdown", clickOutside); };
  }, []);
  const close = () => { if (menu.current) menu.current.open = false; };
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a className="brand-link" href="#inicio" aria-label="BTF Group — início" onClick={close}><Logo /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">
      {links.map(link => <a key={link.href} href={link.href}>{link.title}</a>)}
    </nav>
    <a href={contactUrl} className="header-contact" target="_blank" rel="noopener noreferrer">Vamos conversar <Arrow diagonal /></a>
    <details className="mobile-menu" ref={menu} onToggle={event => setMenuOpen(event.currentTarget.open)}>
      <summary aria-label="Menu de navegação"><span className="menu-label">Menu</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></summary>
      <motion.nav className="mobile-panel" aria-label="Navegação mobile" initial={false} animate={menuOpen && !reduced ? { opacity: [.5, 1] } : undefined} transition={{ duration: reduced ? 0 : .18 }}>
        {links.map(link => <a key={link.href} href={link.href} onClick={close}>{link.title}<Arrow /></a>)}
        <a href={contactUrl} onClick={close} target="_blank" rel="noopener noreferrer">Vamos conversar<Arrow diagonal /></a>
      </motion.nav>
    </details>
  </header>;
}
