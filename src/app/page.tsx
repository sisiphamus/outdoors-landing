"use client";
import { useEffect, useRef, useState } from "react";

const css = `
:root {
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
  --transition-mode: 500ms ease;
  --transition-fast: 200ms ease;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 100px;
  --max-w: 1140px;
  --nav-h: 68px;
}
[data-mode="personal"] {
  --bg: #141413; --bg-surface: #1E1E1B; --bg-surface-2: #282824;
  --text-primary: #F5F0E8; --text-secondary: #A89F91; --text-muted: #6B6560;
  --accent: #C8A45E; --accent-hover: #D4B76A; --accent-subtle: rgba(200,164,94,0.1);
  --border: #2A2A26; --border-hover: #3A3A35;
  --card-bg: #1A1A17; --card-hover: #222220;
  --nav-bg: rgba(20,20,19,0.85);
  --cta-bg: #C8A45E; --cta-text: #141413; --cta-hover: #D4B76A;
  --pill-bg: #1E1E1B; --pill-active-bg: #C8A45E; --pill-active-text: #141413; --pill-inactive-text: #A89F91;
  --section-alt-bg: #1A1917; --pricing-recommended: #C8A45E;
  --hero-gradient: linear-gradient(180deg, #141413 0%, #1A1917 100%);
  --final-cta-bg: #1E1B14;
}
[data-mode="enterprise"] {
  --bg: #FAFAF8; --bg-surface: #F2F2EF; --bg-surface-2: #E8E8E4;
  --text-primary: #1A1A1F; --text-secondary: #55555D; --text-muted: #8E8E96;
  --accent: #2C3E6B; --accent-hover: #3A4F80; --accent-subtle: rgba(44,62,107,0.08);
  --border: #DDDDD8; --border-hover: #C8C8C2;
  --card-bg: #FFFFFF; --card-hover: #F8F8F6;
  --nav-bg: rgba(250,250,248,0.88);
  --cta-bg: #2C3E6B; --cta-text: #FFFFFF; --cta-hover: #3A4F80;
  --pill-bg: #F0F0EE; --pill-active-bg: #2C3E6B; --pill-active-text: #FFFFFF; --pill-inactive-text: #6B6B73;
  --section-alt-bg: #F5F5F2; --pricing-recommended: #2C3E6B;
  --hero-gradient: linear-gradient(180deg, #FAFAF8 0%, #F5F5F2 100%);
  --final-cta-bg: #F0EFE8;
}
body { font-family: var(--font-sans); background: var(--bg); color: var(--text-primary); transition: background var(--transition-mode), color var(--transition-mode); overflow-x: hidden; line-height: 1.6; }
h1, h2, h3 { font-family: var(--font-serif); font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; }
h1 { font-size: clamp(2.4rem, 5vw, 4rem); }
h2 { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
h3 { font-size: clamp(1.25rem, 2vw, 1.6rem); }
p { font-size: 1.06rem; color: var(--text-secondary); transition: color var(--transition-mode); }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
section { padding: 72px 0; transition: background var(--transition-mode); }
.section-alt { background: var(--section-alt-bg); }
.section-label { font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; transition: color var(--transition-mode); }
.section-heading { margin-bottom: 20px; transition: color var(--transition-mode); }
.section-sub { max-width: 560px; margin-bottom: 32px; font-size: 1.12rem; line-height: 1.7; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 32px; border-radius: var(--radius-pill); font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: all var(--transition-fast); }
.btn-primary { background: var(--cta-bg); color: var(--cta-text); }
.btn-primary:hover { background: var(--cta-hover); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.btn-ghost { background: transparent; color: var(--text-secondary); padding: 14px 16px; }
.btn-ghost:hover { color: var(--text-primary); }
.btn-outline { background: transparent; color: var(--accent); border: 1.5px solid var(--border); transition: all var(--transition-fast); }
.btn-outline:hover { border-color: var(--accent); background: var(--accent-subtle); }
nav { position: fixed; top: 0; left: 0; right: 0; height: var(--nav-h); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; z-index: 100; background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid transparent; transition: all var(--transition-mode); }
nav.scrolled { border-bottom-color: var(--border); }
nav::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0; transition: opacity var(--transition-mode); }
nav.scrolled::after { opacity: 0.3; }
.nav-logo { font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); text-decoration: none; transition: color var(--transition-mode); }
.mode-toggle { display: flex; background: var(--pill-bg); border-radius: var(--radius-pill); padding: 4px; gap: 2px; transition: background var(--transition-mode); }
.mode-toggle button { padding: 8px 20px; border: none; border-radius: var(--radius-pill); font-family: var(--font-sans); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 300ms ease; color: var(--pill-inactive-text); background: transparent; }
.mode-toggle button.active { background: var(--pill-active-bg); color: var(--pill-active-text); }
.nav-cta { font-size: 0.88rem; padding: 10px 24px; }
.hero { display: flex; align-items: center; padding-top: calc(var(--nav-h) + 64px); padding-bottom: 64px; background: var(--hero-gradient); transition: background var(--transition-mode); }
.hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.hero-text { max-width: 540px; }
.hero-overline { font-family: var(--font-sans); font-size: 0.82rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; transition: color var(--transition-mode); }
.hero h1 { margin-bottom: 24px; transition: color var(--transition-mode); }
.hero h1 em { font-style: italic; color: var(--accent); transition: color var(--transition-mode); }
.hero-subtitle { font-size: 1.12rem; line-height: 1.7; margin-bottom: 40px; max-width: 460px; }
.hero-actions { display: flex; align-items: center; gap: 8px; }
.hero-visual { display: flex; justify-content: center; align-items: center; }
.phone-mockup { width: 300px; background: #000; border-radius: 36px; padding: 12px; box-shadow: 0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05); position: relative; transition: box-shadow var(--transition-fast); }
.phone-mockup:hover { box-shadow: 0 40px 80px rgba(0,0,0,0.4), 0 0 40px rgba(200,164,94,0.08); }
[data-mode="enterprise"] .phone-mockup { box-shadow: 0 40px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06); }
.phone-screen { background: #0B141B; border-radius: 26px; overflow: hidden; min-height: 520px; }
.phone-header { background: #1F2C33; padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
.phone-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 0.85rem; color: #000; font-weight: 700; }
.phone-header-text { font-size: 0.9rem; color: #E9EDEF; font-weight: 500; }
.phone-header-sub { font-size: 0.7rem; color: #8696A0; }
.chat-messages { padding: 16px 12px; display: flex; flex-direction: column; gap: 8px; }
.chat-bubble { max-width: 82%; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; line-height: 1.5; opacity: 0; transform: translateY(10px); }
.chat-bubble.visible { opacity: 1; transform: translateY(0); transition: all 400ms ease; }
.chat-user { align-self: flex-end; background: #005C4B; color: #E9EDEF; border-bottom-right-radius: 2px; }
.chat-agent { align-self: flex-start; background: #1F2C33; color: #E9EDEF; border-bottom-left-radius: 2px; }
.chat-voice { display: flex; align-items: center; gap: 8px; }
.voice-waves { display: flex; gap: 2px; align-items: center; }
.voice-wave { width: 3px; border-radius: 2px; background: #8696A0; }
.chat-time { font-size: 0.65rem; color: rgba(233,237,239,0.5); text-align: right; margin-top: 2px; }
.enterprise-visual { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.06); transition: all var(--transition-mode); }
.enterprise-visual:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.1); border-color: var(--border-hover); }
.dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.dashboard-title { font-family: var(--font-sans); font-weight: 700; font-size: 1rem; color: var(--text-primary); }
.dashboard-badge { font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: var(--radius-pill); background: var(--accent-subtle); color: var(--accent); }
.dashboard-rows { display: flex; flex-direction: column; gap: 16px; }
.dashboard-row { display: grid; grid-template-columns: 40px 1fr auto auto; gap: 14px; align-items: center; padding: 16px 18px; border-radius: var(--radius-md); background: var(--bg-surface); transition: background var(--transition-mode); }
.dash-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.dash-name { font-weight: 600; font-size: 0.9rem; color: var(--text-primary); }
.dash-role { font-size: 0.78rem; color: var(--text-muted); }
.dash-task { font-size: 0.82rem; color: var(--text-secondary); font-style: italic; }
.dash-status { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: var(--radius-pill); }
.status-done { background: rgba(76,175,80,0.12); color: #4CAF50; }
.status-working { background: rgba(255,183,77,0.12); color: #FFB74D; }
.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.step { position: relative; }
.step-number { font-family: var(--font-serif); font-size: 3.2rem; color: var(--accent); opacity: 0.3; line-height: 1; margin-bottom: 16px; transition: color var(--transition-mode); }
.step-label { font-family: var(--font-sans); font-weight: 700; font-size: 1rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-primary); margin-bottom: 10px; transition: color var(--transition-mode); }
.step-desc { font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); }
.features-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 20px; }
.feature-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px 36px; transition: all var(--transition-fast), background var(--transition-mode), border-color var(--transition-mode); cursor: default; }
.feature-card:hover { border-color: var(--border-hover); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
.feature-card.featured { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.feature-number { font-family: var(--font-serif); font-size: 1rem; color: var(--accent); margin-bottom: 20px; transition: color var(--transition-mode); }
.feature-card h3 { margin-bottom: 12px; transition: color var(--transition-mode); }
.feature-card p { font-size: 0.95rem; line-height: 1.65; }
.feature-visual { height: 200px; border-radius: var(--radius-md); background: var(--bg-surface); overflow: hidden; transition: background var(--transition-mode); }
.feature-visual img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
.security-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.security-grid.four-col { grid-template-columns: repeat(4, 1fr); }
.security-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px 28px; transition: all var(--transition-mode); }
.security-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--accent-subtle); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: background var(--transition-mode); }
.security-icon svg { width: 22px; height: 22px; stroke: var(--accent); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: stroke var(--transition-mode); }
.security-card h3 { font-family: var(--font-sans); font-size: 1rem; font-weight: 700; margin-bottom: 8px; transition: color var(--transition-mode); }
.security-card p { font-size: 0.9rem; line-height: 1.55; }
/* enterprise-only handled by React conditional rendering */
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
.pricing-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 40px 32px; text-align: center; transition: all var(--transition-mode); position: relative; display: flex; flex-direction: column; }
.pricing-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
.pricing-card.recommended { border-color: var(--pricing-recommended); box-shadow: 0 0 0 1px var(--pricing-recommended); }
.pricing-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--pricing-recommended); color: var(--cta-text); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 16px; border-radius: var(--radius-pill); white-space: nowrap; }
.pricing-tier { font-family: var(--font-sans); font-weight: 700; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 16px; transition: color var(--transition-mode); }
.pricing-amount { font-family: var(--font-serif); font-size: 3.2rem; color: var(--text-primary); line-height: 1; margin-bottom: 6px; transition: color var(--transition-mode); }
.pricing-period { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 28px; transition: color var(--transition-mode); }
.pricing-features { list-style: none; text-align: left; margin-bottom: 32px; flex: 1; }
.pricing-features li { padding: 10px 0; font-size: 0.92rem; color: var(--text-primary); border-bottom: 1px solid var(--border); transition: color var(--transition-mode), border-color var(--transition-mode); }
.pricing-features li:last-child { border-bottom: none; }
.pricing-card .btn { width: 100%; margin-top: auto; }
.pricing-enterprise { grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 760px; margin: 0 auto; align-items: stretch; }
.final-cta { background: var(--final-cta-bg); text-align: center; transition: background var(--transition-mode); }
.final-cta h2 { margin-bottom: 16px; }
.final-cta p { max-width: 440px; margin: 0 auto 40px; font-size: 1.1rem; }
.waitlist-form { display: flex; gap: 12px; justify-content: center; max-width: 440px; margin: 0 auto 16px; }
.waitlist-form input { flex: 1; padding: 14px 20px; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-surface); color: var(--text-primary); font-family: var(--font-sans); font-size: 0.95rem; outline: none; transition: all var(--transition-mode); }
.waitlist-form input::placeholder { color: var(--text-muted); }
.waitlist-form input:focus { border-color: var(--accent); }
.final-cta .note { font-size: 0.82rem; color: var(--text-muted); }
/* CTA sections handled by React conditional rendering */
footer { padding: 40px 0; border-top: 1px solid var(--border); transition: border-color var(--transition-mode); }
.footer-inner { display: flex; justify-content: space-between; align-items: center; }
.footer-logo { font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); transition: color var(--transition-mode); }
.footer-links { display: flex; gap: 32px; list-style: none; }
.footer-links a { font-size: 0.85rem; color: var(--text-muted); text-decoration: none; transition: color var(--transition-fast); }
.footer-links a:hover { color: var(--text-primary); }
.footer-legal { font-size: 0.78rem; color: var(--text-muted); transition: color var(--transition-mode); }
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 350ms ease, transform 350ms ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 50ms; }
.reveal-delay-2 { transition-delay: 100ms; }
.reveal-delay-3 { transition-delay: 150ms; }
.hero .reveal { opacity: 1; transform: none; }
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
  .hero-text { max-width: 100%; }
  .hero-subtitle { max-width: 100%; margin-left: auto; margin-right: auto; }
  .hero-actions { justify-content: center; }
  .hero-visual { order: -1; }
  .phone-mockup { width: 260px; }
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: 1fr; }
  .feature-card.featured { grid-column: span 1; grid-template-columns: 1fr; }
  .security-grid { grid-template-columns: repeat(2, 1fr); }
  .security-grid.four-col { grid-template-columns: repeat(2, 1fr); }
  .pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .pricing-enterprise { grid-template-columns: 1fr; max-width: 400px; }
  section { padding: 56px 0; }
}
@media (max-width: 600px) {
  nav { padding: 0 16px; }
  .nav-cta { display: none; }
  .mode-toggle button { padding: 8px 14px; font-size: 0.78rem; }
  .container { padding: 0 16px; }
  .steps-grid { grid-template-columns: 1fr; }
  .security-grid { grid-template-columns: 1fr; }
  .security-grid.four-col { grid-template-columns: 1fr; }
  .waitlist-form { flex-direction: column; }
  .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
  .footer-links { flex-wrap: wrap; justify-content: center; }
  section { padding: 48px 0; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  .reveal { opacity: 1; transform: none; }
  .chat-bubble { opacity: 1; transform: none; }
}
`;

export default function Home() {
  const [mode, setMode] = useState<"personal" | "enterprise">("personal");

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    document.title = mode === "enterprise"
      ? "Everest — AI Workforce for Your Organization"
      : "Outdoors — AI That Actually Does the Work";
  }, [mode]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0, rootMargin: "0px 0px 200px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const onScroll = () => {
      document.getElementById("nav")?.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Chat animation
    const chatObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".chat-bubble").forEach((bubble, i) => {
            setTimeout(() => bubble.classList.add("visible"), 600 + i * 700);
          });
          chatObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const hero = document.querySelector(".hero");
    if (hero) chatObserver.observe(hero);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
    input.value = "";
    input.placeholder = "Thanks! We'll be in touch.";
    setTimeout(() => { input.placeholder = "Your email address"; }, 3000);
  };

  const isEnterprise = mode === "enterprise";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav id="nav">
        <a href="#" className="nav-logo">
          {isEnterprise ? "EVEREST" : "outdoors"}
        </a>
        <div className="mode-toggle">
          <button className={mode === "personal" ? "active" : ""} onClick={() => setMode("personal")}>Personal</button>
          <button className={mode === "enterprise" ? "active" : ""} onClick={() => setMode("enterprise")}>Enterprise</button>
        </div>
        <a href="#final-cta" className="btn btn-primary nav-cta">
          {isEnterprise ? "Request Demo" : "Join Waitlist"}
        </a>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-overline reveal">
                {isEnterprise ? "AI workforce for your organization" : "Your AI that actually works"}
              </div>
              <h1 className="reveal reveal-delay-1">
                {isEnterprise
                  ? <>Not just an assistant. Another <em>employee.</em> A fraction of the cost.</>
                  : <>Tired of productivity apps that organize but <em>don{"'"}t do work?</em></>}
              </h1>
              <p className="hero-subtitle reveal reveal-delay-2">
                {isEnterprise
                  ? "Everest deploys AI agents across your team that handle admin work through your existing tools. Email, scheduling, documents, done."
                  : "Outdoors is a textable AI agent that sends emails, manages your calendar, and drafts polished work from a voice note."}
              </p>
              <div className="hero-actions reveal reveal-delay-3">
                <a href="#final-cta" className="btn btn-primary">{isEnterprise ? "Request a Demo" : "Join Waitlist"}</a>
                <a href={isEnterprise ? "#pricing" : "#how-it-works"} className="btn btn-ghost">{isEnterprise ? "See pricing" : "See how it works"}</a>
              </div>
            </div>
            <div className="hero-visual reveal reveal-delay-2">
              {!isEnterprise && (
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <div className="phone-header">
                      <div className="phone-avatar">O</div>
                      <div>
                        <div className="phone-header-text">Outdoors</div>
                        <div className="phone-header-sub">online</div>
                      </div>
                    </div>
                    <div className="chat-messages">
                      <div className="chat-bubble chat-user">
                        <div className="chat-voice">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
                          <div className="voice-waves">
                            {[8,14,6,18,10,15,7,12,5].map((h,i) => (
                              <div key={i} className="voice-wave" style={{height: h}} />
                            ))}
                          </div>
                          <span style={{fontSize:"0.72rem",color:"#8696A0"}}>0:12</span>
                        </div>
                        <div className="chat-time">9:41 AM</div>
                      </div>
                      <div className="chat-bubble chat-agent">
                        Email sent to Dr. Chen referencing her CRISPR gene therapy paper. Mentioned your interest in summer research positions. Follow-up reminder set for Thursday.
                        <div className="chat-time">9:42 AM</div>
                      </div>
                      <div className="chat-bubble chat-user">
                        What do I have tomorrow?
                        <div className="chat-time">9:42 AM</div>
                      </div>
                      <div className="chat-bubble chat-agent">
                        Tomorrow you have:<br/>
                        9:00 AM - Organic Chemistry<br/>
                        1:00 PM - Clinical shadowing<br/>
                        7:00 PM - Study group<br/><br/>
                        I blocked 5:00-6:30 PM for MCAT prep.
                        <div className="chat-time">9:42 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isEnterprise && (
                <div className="enterprise-visual">
                  <div className="dashboard-header">
                    <div className="dashboard-title">Team Activity</div>
                    <div className="dashboard-badge">3 agents active</div>
                  </div>
                  <div className="dashboard-rows">
                    {[
                      {img:"photo-1559839734-2b71ea197ec2",name:"Dr. Sarah Kim",role:"Research Fellow",task:"Grant proposal draft",status:"Sent",cls:"status-done"},
                      {img:"photo-1612349317150-e413f6a5b16d",name:"James Okafor",role:"Medical Trainee",task:"PI outreach emails",status:"Working",cls:"status-working"},
                      {img:"photo-1580489944761-15a19d654956",name:"Maria Reyes",role:"Paralegal",task:"Case brief summary",status:"Sent",cls:"status-done"},
                    ].map((r,i) => (
                      <div key={i} className="dashboard-row">
                        <img className="dash-avatar" src={`https://images.unsplash.com/${r.img}?w=72&h=72&fit=crop&crop=face`} alt="" />
                        <div><div className="dash-name">{r.name}</div><div className="dash-role">{r.role}</div></div>
                        <div className="dash-task">{r.task}</div>
                        <div className={`dash-status ${r.cls}`}>{r.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-alt">
        <div className="container">
          <div className="section-label reveal">How it works</div>
          <h2 className="section-heading reveal reveal-delay-1">
            {isEnterprise ? "Deploy, assign, execute, review." : "Voice note in. Polished work out."}
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            {isEnterprise
              ? "Give every team member an AI agent that works through their existing tools."
              : "Four steps between a thought and a sent email. No laptop required."}
          </p>
          <div className="steps-grid">
            {(isEnterprise
              ? [{n:"01",l:"Connect",d:"Link your team's existing email, calendar, and file systems in minutes."},
                 {n:"02",l:"Assign",d:"Team members text or voice-note tasks to their Everest agent."},
                 {n:"03",l:"Execute",d:"Each agent drafts work using the employee's real context and files."},
                 {n:"04",l:"Review",d:"Approve and send, or let routine tasks flow automatically."}]
              : [{n:"01",l:"Speak",d:"Record a 30-second voice note from your phone between meetings or patients."},
                 {n:"02",l:"Context",d:"Outdoors pulls from your laptop: email threads, files, calendar, research papers."},
                 {n:"03",l:"Polish",d:"Turns your rough thought into professional, ready-to-send work that sounds like you."},
                 {n:"04",l:"Send",d:"Delivered from your real accounts. Not a draft. Done. You never opened a laptop."}]
            ).map((s, i) => (
              <div key={s.n} className={`step reveal ${i > 0 ? `reveal-delay-${i}` : ""}`}>
                <div className="step-number">{s.n}</div>
                <div className="step-label">{s.l}</div>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="section-label reveal">Capabilities</div>
          <h2 className="section-heading reveal reveal-delay-1">
            {isEnterprise ? "Built for teams that can't afford to wait." : "Your work, handled."}
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            {isEnterprise
              ? "Every seat gets a dedicated agent with full access to their workflow."
              : "Not another organizer. An agent that takes real action through your real accounts."}
          </p>
          <div className="features-grid">
            <div className="feature-card featured reveal">
              <div>
                <div className="feature-number">i.</div>
                <h3>{isEnterprise ? "Team-wide deployment" : "Email on autopilot"}</h3>
                <p>{isEnterprise
                  ? "One admin dashboard to deploy, monitor, and manage agents for every team member. Per-seat billing, usage analytics, and granular permissions built in."
                  : "Describe what you need in a voice note. Outdoors reads your email threads, drafts a polished response, and sends it from your Gmail. Personalized, contextual, done."}</p>
              </div>
              <div className="feature-visual">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop" alt="Professional at work" loading="lazy" />
              </div>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-number">ii.</div>
              <h3>{isEnterprise ? "Context-aware agents" : "Calendar intelligence"}</h3>
              <p>{isEnterprise
                ? "Each agent knows the employee's files, email history, calendar, and workflow. No onboarding lag. Productive from day one."
                : "Manages scheduling, blocks focus time, resolves conflicts, and sends meeting confirmations. All from a text message."}</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-number">iii.</div>
              <h3>{isEnterprise ? "Integration ready" : "Research assistant"}</h3>
              <p>{isEnterprise
                ? "Works with Gmail, Outlook, Google Drive, Slack, and your existing infrastructure. No migration. No new tools to learn."
                : "Finds papers, drafts applications, writes grant proposals, and personalizes outreach to professors and PIs using their published work."}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="section-alt">
        <div className="container">
          <div className="section-label reveal">Security</div>
          <h2 className="section-heading reveal reveal-delay-1">Your data stays yours.</h2>
          <p className="section-sub reveal reveal-delay-2">Built with privacy as the foundation, not an afterthought.</p>
          <div className={`security-grid ${isEnterprise ? "four-col" : ""}`}>
            <div className="security-card reveal">
              <div className="security-icon"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <h3>Runs locally</h3>
              <p>Your agent operates on your machine. We never see your passwords or credentials.</p>
            </div>
            <div className="security-card reveal reveal-delay-1">
              <div className="security-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>No data storage</h3>
              <p>Conversations and actions aren{"'"}t stored on our servers. Zero data retention by design.</p>
            </div>
            <div className="security-card reveal reveal-delay-2">
              <div className="security-icon"><svg viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg></div>
              <h3>Encrypted</h3>
              <p>All communication between your phone, laptop, and AI uses end-to-end encryption.</p>
            </div>
            {isEnterprise && (
              <div className="security-card reveal reveal-delay-3">
                <div className="security-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                <h3>Enterprise controls</h3>
                <p>Admin permissions, audit logs, and SSO integration for full organizational oversight.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="section-label reveal">Pricing</div>
          <h2 className="section-heading reveal reveal-delay-1">
            {isEnterprise ? "One agent per seat. One price." : "Simple, transparent pricing."}
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            {isEnterprise
              ? "Deploy across your team with full admin controls and support."
              : "Start free with your own API key, or let us handle everything."}
          </p>
          {!isEnterprise && (
            <div className="pricing-grid pricing-personal reveal">
              {[
                {tier:"Free",amount:"$0",period:"per month",features:["Bring your own API key","Core agent capabilities","Email and calendar","Community support"],btn:"Get Started",cls:"btn-outline",rec:false},
                {tier:"Pro",amount:"$30",period:"per month",features:["Everything included, no key needed","All features and integrations","Priority task execution","Email support"],btn:"Join Waitlist",cls:"btn-primary",rec:true},
                {tier:"Premium",amount:"$100",period:"per month",features:["Unlimited usage","Custom integrations","Phone support","Early access to new features"],btn:"Join Waitlist",cls:"btn-outline",rec:false},
              ].map((p) => (
                <div key={p.tier} className={`pricing-card ${p.rec ? "recommended" : ""}`}>
                  {p.rec && <div className="pricing-badge">Recommended</div>}
                  <div className="pricing-tier">{p.tier}</div>
                  <div className="pricing-amount">{p.amount}</div>
                  <div className="pricing-period">{p.period}</div>
                  <ul className="pricing-features">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <a href="#final-cta" className={`btn ${p.cls}`}>{p.btn}</a>
                </div>
              ))}
            </div>
          )}
          {isEnterprise && (
            <div className="pricing-grid pricing-enterprise reveal">
              <div className="pricing-card recommended">
                <div className="pricing-badge">Most popular</div>
                <div className="pricing-tier">Team</div>
                <div className="pricing-amount">$200</div>
                <div className="pricing-period">per seat / month</div>
                <ul className="pricing-features">
                  <li>Full agent per employee</li><li>Admin dashboard and analytics</li><li>All integrations included</li><li>Dedicated onboarding</li><li>Priority support</li>
                </ul>
                <a href="#final-cta" className="btn btn-primary">Request Demo</a>
              </div>
              <div className="pricing-card">
                <div className="pricing-tier">Custom</div>
                <div className="pricing-amount">Custom</div>
                <div className="pricing-period">tailored to your needs</div>
                <ul className="pricing-features">
                  <li>Everything in Team</li><li>Custom AI workflows</li><li>SLA guarantee</li><li>Dedicated account manager</li><li>On-premise option available</li>
                </ul>
                <a href="#final-cta" className="btn btn-outline">Contact Sales</a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="final-cta" className="final-cta">
        <div className="container">
          {!isEnterprise ? (
            <div>
              <h2 className="reveal">Stop organizing. Start doing.</h2>
              <p className="reveal reveal-delay-1">Join the waitlist for early access to Outdoors.</p>
              <form className="waitlist-form reveal reveal-delay-2" onSubmit={handleWaitlist}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Join Waitlist</button>
              </form>
              <div className="note reveal reveal-delay-3">Free to start. No credit card required.</div>
            </div>
          ) : (
            <div>
              <h2 className="reveal">Give your team superpowers.</h2>
              <p className="reveal reveal-delay-1">See how Everest can save your team 30+ hours a week.</p>
              <div className="reveal reveal-delay-2" style={{display:"flex",gap:12,justifyContent:"center"}}>
                <a href="mailto:adam@outdoors.dev" className="btn btn-primary">Request a Demo</a>
                <a href="mailto:adam@outdoors.dev" className="btn btn-outline">Contact Sales</a>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">{isEnterprise ? "EVEREST" : "outdoors"}</div>
            <ul className="footer-links">
              <li><a href="#how-it-works">Product</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="mailto:adam@outdoors.dev">Contact</a></li>
            </ul>
            <div className="footer-legal">Built at Rice University</div>
          </div>
        </div>
      </footer>
    </>
  );
}
