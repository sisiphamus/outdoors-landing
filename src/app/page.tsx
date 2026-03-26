"use client";
import { useEffect, useState } from "react";

const css = `
:root {
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --ease: cubic-bezier(.22, 1, .36, 1);
  --max-w: 1080px;
  --nav-h: 64px;
}

[data-mode="personal"] {
  --bg: #2b2a24;
  --bg-alt: #32312a;
  --bg-surface: #3a3930;
  --text-1: #f2ede4;
  --text-2: #b5ad9e;
  --text-3: #7a7468;
  --accent: #5a7a5a;
  --accent-dim: rgba(90,122,90,0.1);
  --border: rgba(255,255,255,0.08);
  --nav-bg: rgba(43,42,36,0.92);
  --cta-bg: #5a7a5a;
  --cta-fg: #f2ede4;
}

[data-mode="enterprise"] {
  --bg: #fafaf8;
  --bg-alt: #f4f4f1;
  --bg-surface: #eeeee9;
  --text-1: #18181b;
  --text-2: #52525b;
  --text-3: #a1a1aa;
  --accent: #1e3a5f;
  --accent-dim: rgba(30,58,95,0.06);
  --border: rgba(0,0,0,0.06);
  --nav-bg: rgba(250,250,248,0.9);
  --cta-bg: #1e3a5f;
  --cta-fg: #ffffff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-1);
  -webkit-font-smoothing: antialiased;
  transition: background 0.5s var(--ease), color 0.5s var(--ease);
  overflow-x: hidden;
}

nav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--nav-h);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(16px, 4vw, 40px);
  background: var(--nav-bg);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  z-index: 100;
  border-bottom: 1px solid var(--border);
  transition: all 0.5s var(--ease);
}
.logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--text-1);
  text-decoration: none;
  transition: color 0.5s var(--ease);
}
.pill {
  display: flex; background: var(--bg-surface); border-radius: 99px;
  padding: 3px; gap: 2px;
  transition: background 0.5s var(--ease);
}
.pill button {
  padding: 6px 18px; border: none; border-radius: 99px;
  font-family: var(--font-body); font-size: 0.82rem; font-weight: 600;
  cursor: pointer; transition: all 0.3s var(--ease);
  color: var(--text-3); background: transparent;
}
.pill button.on { background: var(--cta-bg); color: var(--cta-fg); }
.nav-btn {
  padding: 8px 22px; border-radius: 99px; border: none;
  font-family: var(--font-body); font-size: 0.82rem; font-weight: 600;
  background: var(--cta-bg); color: var(--cta-fg);
  cursor: pointer; text-decoration: none;
  transition: all 0.2s var(--ease);
}
.nav-btn:hover { opacity: 0.85; transform: translateY(-1px); }

.hero {
  text-align: center;
  padding: calc(var(--nav-h) + 80px) 24px 48px;
  transition: background 0.5s var(--ease);
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6.5vw, 4.8rem);
  font-weight: 400; line-height: 1.08; letter-spacing: -0.03em;
  max-width: 720px; margin: 0 auto 24px;
  text-wrap: balance;
}
.hero h1 em { font-style: italic; color: var(--accent); transition: color 0.5s var(--ease); }
.hero-sub {
  font-size: clamp(1rem, 1.8vw, 1.15rem); color: var(--text-2);
  max-width: 480px; margin: 0 auto 36px; line-height: 1.6;
  transition: color 0.5s var(--ease);
}
.hero-ctas { display: flex; gap: 12px; justify-content: center; align-items: center; margin-bottom: 64px; }
.btn-primary {
  display: inline-flex; align-items: center; padding: 14px 32px;
  border-radius: 99px; border: none;
  font-family: var(--font-body); font-size: 0.95rem; font-weight: 600;
  background: var(--cta-bg); color: var(--cta-fg);
  cursor: pointer; text-decoration: none; transition: all 0.2s var(--ease);
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-text {
  font-size: 0.92rem; color: var(--text-2); text-decoration: none;
  border-bottom: 1px solid transparent; transition: all 0.2s var(--ease);
}
.btn-text:hover { color: var(--text-1); border-bottom-color: var(--text-3); }

.phone-wrap { display: flex; justify-content: center; }
.iphone { width: 280px; height: 606px; background: #1a1a1a; border-radius: 44px; padding: 10px; position: relative; box-shadow: 0 40px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06) inset; }
.iphone::before { content:''; position:absolute; right:-2px; top:140px; width:3px; height:52px; background:#2a2a2a; border-radius:0 2px 2px 0; }
.iphone::after { content:''; position:absolute; left:-2px; top:120px; width:3px; height:30px; background:#2a2a2a; border-radius:2px 0 0 2px; }
.iphone-screen { width:100%; height:100%; background:#F2F2F7; border-radius:36px; overflow:hidden; display:flex; flex-direction:column; position:relative; }
.di { position:absolute; top:10px; left:50%; transform:translateX(-50%); z-index:20; width:88px; height:26px; background:#000; border-radius:18px; }
.ios-bar { display:flex; justify-content:space-between; align-items:center; padding:14px 22px 0; font-size:11px; font-weight:600; color:#000; min-height:46px; position:relative; z-index:10; background:#F2F2F7; flex-shrink:0; }
.ios-time { font-size:12px; font-weight:700; }
.ios-icons { display:flex; gap:4px; align-items:center; }
.ios-sig { display:flex; gap:1.5px; align-items:flex-end; }
.ios-sig span { display:block; width:3px; border-radius:.5px; background:#000; }
.ios-sig span:nth-child(1){height:3px} .ios-sig span:nth-child(2){height:5px} .ios-sig span:nth-child(3){height:7px} .ios-sig span:nth-child(4){height:9px}
.ios-bt { display:flex; align-items:center; gap:1px; }
.ios-bt-b { width:19px; height:8.5px; border:1.2px solid rgba(0,0,0,.35); border-radius:2.5px; position:relative; overflow:hidden; }
.ios-bt-f { position:absolute; left:1px; top:1px; bottom:1px; width:65%; background:#000; border-radius:1px; }
.ios-bt-t { width:1.5px; height:4px; background:rgba(0,0,0,.35); border-radius:0 1px 1px 0; }
.msg-hdr { display:flex; flex-direction:column; align-items:center; gap:4px; padding:2px 12px 8px; background:#F2F2F7; border-bottom:0.5px solid rgba(0,0,0,.1); flex-shrink:0; position:relative; }
.msg-back { position:absolute; left:18px; color:#007AFF; font-size:17px; line-height:1; }
.msg-av { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#5AC8FA,#007AFF); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600; color:#fff; }
.msg-name { font-size:10.5px; font-weight:600; color:#000; }
.msgs { flex:1; padding:6px 12px 8px; display:flex; flex-direction:column; gap:3px; overflow-y:auto; background:#fff; scrollbar-width:none; }
.msgs::-webkit-scrollbar{display:none}
.m { max-width:78%; padding:7px 11px; border-radius:18px; font-size:12.5px; line-height:1.35; letter-spacing:-.01em; margin-bottom:1px; flex-shrink:0; opacity:0; transform:translateY(8px); }
.m.o { align-self:flex-end; background:#007AFF; color:#fff; border-radius:18px 18px 4px 18px; }
.m.i { align-self:flex-start; background:#E9E9EB; color:#000; border-radius:18px 18px 18px 4px; }
.m.v { animation: bub .3s ease forwards; }
.mt { text-align:center; font-size:9px; color:#8E8E93; padding:4px 0; flex-shrink:0; }
.md { text-align:right; font-size:9px; color:#8E8E93; padding:2px 4px 4px; flex-shrink:0; }
.msg-in { display:flex; align-items:center; gap:6px; padding:6px 10px 18px; background:#F2F2F7; border-top:0.5px solid rgba(0,0,0,.08); flex-shrink:0; }
.msg-field { flex:1; background:#fff; border-radius:18px; padding:7px 14px; font-size:12px; color:#C7C7CC; border:0.5px solid rgba(0,0,0,.1); }
.msg-send { width:24px; height:24px; border-radius:50%; background:#007AFF; display:flex; align-items:center; justify-content:center; font-size:14px; color:#fff; flex-shrink:0; }
.ios-home-i { display:flex; justify-content:center; padding:3px 0 2px; background:#F2F2F7; flex-shrink:0; }
.ios-home-bar { width:110px; height:4px; background:rgba(0,0,0,.12); border-radius:2px; }
@keyframes bub { to { opacity:1; transform:translateY(0); } }

.proof {
  text-align: center; padding: 40px 24px 0;
  color: var(--text-3); font-size: 0.82rem; letter-spacing: 0.04em;
  transition: color 0.5s var(--ease);
}

.statement { padding: 100px 24px; text-align: center; }
.statement h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.8vw, 2.6rem);
  font-weight: 400; line-height: 1.2; letter-spacing: -0.02em;
  max-width: 640px; margin: 0 auto; text-wrap: balance;
  transition: color 0.5s var(--ease);
}
.statement p {
  font-size: 1.05rem; color: var(--text-2); max-width: 520px;
  margin: 20px auto 0; line-height: 1.65; transition: color 0.5s var(--ease);
}

.steps { padding: 80px 24px; background: var(--bg-alt); transition: background 0.5s var(--ease); }
.steps-inner { max-width: var(--max-w); margin: 0 auto; }
.steps-hd { text-align: center; margin-bottom: 48px; }
.lbl { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; transition: color 0.5s var(--ease); }
.steps-hd h2 { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 400; letter-spacing: -0.02em; transition: color 0.5s var(--ease); }
.steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
.si { padding: 32px 28px; background: var(--bg-surface); transition: background 0.5s var(--ease); }
.si:first-child { border-radius: 16px 0 0 16px; }
.si:last-child { border-radius: 0 16px 16px 0; }
.si-n { font-family: var(--font-display); font-size: 2rem; color: var(--accent); opacity: 0.5; line-height: 1; margin-bottom: 16px; }
.si-t { font-weight: 700; font-size: 0.88rem; letter-spacing: 0.03em; text-transform: uppercase; color: var(--text-1); margin-bottom: 8px; transition: color 0.5s var(--ease); }
.si-d { font-size: 0.88rem; line-height: 1.55; color: var(--text-2); transition: color 0.5s var(--ease); }

.features { padding: 100px 24px; }
.features-inner { max-width: var(--max-w); margin: 0 auto; display: flex; flex-direction: column; gap: 72px; }
.feat { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.feat.flip { direction: rtl; }
.feat.flip > * { direction: ltr; }
.feat-lbl { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; transition: color 0.5s var(--ease); }
.feat h3 { font-family: var(--font-display); font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 400; letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.2; transition: color 0.5s var(--ease); }
.feat p { font-size: 0.95rem; line-height: 1.65; color: var(--text-2); transition: color 0.5s var(--ease); }
.feat-vis { aspect-ratio: 4/3; background: var(--bg-alt); border-radius: 16px; overflow: hidden; transition: background 0.5s var(--ease); }
.feat-vis img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }

.trust { padding: 56px 24px; background: var(--bg-alt); transition: background 0.5s var(--ease); }
.trust-inner { max-width: var(--max-w); margin: 0 auto; display: flex; justify-content: center; gap: clamp(32px, 6vw, 80px); flex-wrap: wrap; }
.ti { text-align: center; }
.ti strong { display: block; font-size: 0.92rem; font-weight: 700; color: var(--text-1); margin-bottom: 4px; transition: color 0.5s var(--ease); }
.ti span { font-size: 0.82rem; color: var(--text-3); transition: color 0.5s var(--ease); }

.pricing { padding: 100px 24px; }
.pricing-hd { text-align: center; margin-bottom: 48px; }
.pricing-hd h2 { font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 400; letter-spacing: -0.02em; transition: color 0.5s var(--ease); }
.pg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; max-width: 880px; margin: 0 auto; border-radius: 16px; overflow: hidden; }
.pg2 { grid-template-columns: repeat(2, 1fr); max-width: 640px; }
.pc { background: var(--bg-surface); padding: 36px 28px; display: flex; flex-direction: column; transition: background 0.5s var(--ease); }
.pc.pop { background: var(--accent-dim); }
.pc-t { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-2); margin-bottom: 12px; transition: color 0.5s var(--ease); }
.pc.pop .pc-t { color: var(--accent); }
.pc-a { font-family: var(--font-display); font-size: 2.6rem; line-height: 1; color: var(--text-1); margin-bottom: 4px; transition: color 0.5s var(--ease); }
.pc-p { font-size: 0.82rem; color: var(--text-3); margin-bottom: 24px; transition: color 0.5s var(--ease); }
.pc-l { list-style: none; flex: 1; margin-bottom: 24px; }
.pc-l li { padding: 7px 0; font-size: 0.88rem; color: var(--text-2); transition: color 0.5s var(--ease); }
.pc-l li + li { border-top: 1px solid var(--border); }
.pc-b { display: block; text-align: center; padding: 12px; border-radius: 99px; font-family: var(--font-body); font-size: 0.88rem; font-weight: 600; text-decoration: none; border: 1.5px solid var(--border); color: var(--text-1); background: transparent; cursor: pointer; margin-top: auto; transition: all 0.2s var(--ease); }
.pc-b:hover { border-color: var(--accent); color: var(--accent); }
.pc.pop .pc-b { background: var(--cta-bg); color: var(--cta-fg); border-color: var(--cta-bg); }
.pc.pop .pc-b:hover { opacity: 0.88; }

.cta-final { padding: 100px 24px; text-align: center; }
.cta-final h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 400; letter-spacing: -0.02em; margin-bottom: 16px; text-wrap: balance; }
.cta-final p { color: var(--text-2); font-size: 1.05rem; margin-bottom: 32px; transition: color 0.5s var(--ease); }
.cta-form { display: flex; gap: 10px; max-width: 420px; margin: 0 auto 12px; }
.cta-form input { flex: 1; padding: 14px 20px; border: 1px solid var(--border); border-radius: 99px; background: var(--bg-surface); color: var(--text-1); font-family: var(--font-body); font-size: 0.92rem; outline: none; transition: all 0.3s var(--ease); }
.cta-form input::placeholder { color: var(--text-3); }
.cta-form input:focus { border-color: var(--accent); }
.cta-note { font-size: 0.78rem; color: var(--text-3); transition: color 0.5s var(--ease); }
.cta-btns { display: flex; gap: 12px; justify-content: center; }

footer { padding: 32px 24px; border-top: 1px solid var(--border); transition: border-color 0.5s var(--ease); }
.fi { max-width: var(--max-w); margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.fl { display: flex; gap: 28px; list-style: none; }
.fl a { font-size: 0.82rem; color: var(--text-3); text-decoration: none; transition: color 0.2s; }
.fl a:hover { color: var(--text-1); }
.fn { font-size: 0.75rem; color: var(--text-3); transition: color 0.5s var(--ease); }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  animation: modal-bg 0.25s ease;
}
@keyframes modal-bg { from { opacity: 0; } to { opacity: 1; } }
.modal {
  background: var(--bg-surface); border-radius: 20px;
  padding: 40px 36px; max-width: 420px; width: 100%;
  text-align: center;
  animation: modal-in 0.3s var(--ease);
  border: 1px solid var(--border);
}
@keyframes modal-in { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
.modal h3 {
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 400;
  margin-bottom: 8px; color: var(--text-1);
}
.modal p {
  font-size: 0.92rem; color: var(--text-2);
  margin-bottom: 24px; line-height: 1.5;
}
.modal-form {
  display: flex; flex-direction: column; gap: 10px;
}
.modal-form input {
  padding: 14px 18px; border: 1px solid var(--border);
  border-radius: 12px; background: var(--bg-alt);
  color: var(--text-1); font-family: var(--font-body);
  font-size: 0.92rem; outline: none;
  transition: border-color 0.2s var(--ease);
}
.modal-form input::placeholder { color: var(--text-3); }
.modal-form input:focus { border-color: var(--accent); }
.modal-form button {
  padding: 14px; border-radius: 12px; border: none;
  background: var(--cta-bg); color: var(--cta-fg);
  font-family: var(--font-body); font-size: 0.95rem; font-weight: 600;
  cursor: pointer; transition: opacity 0.2s;
}
.modal-form button:hover { opacity: 0.88; }
.modal-close {
  margin-top: 16px; background: none; border: none;
  color: var(--text-3); font-size: 0.85rem; cursor: pointer;
  font-family: var(--font-body);
  transition: color 0.2s;
}
.modal-close:hover { color: var(--text-1); }
.modal-success {
  color: var(--accent); font-weight: 600; font-size: 0.95rem;
}

.rv { opacity: 0; transform: translateY(14px); transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
.rv.show { opacity: 1; transform: none; }
.hero .rv { opacity: 1; transform: none; }

/* Rotating word */
.rotate-wrap { display: inline-block; position: relative; vertical-align: bottom; }
.rotate-word {
  display: inline-block;
  animation: rotate-in 0.45s var(--ease) both;
  color: var(--accent);
  font-style: italic;
}
@keyframes rotate-in {
  from { opacity: 0; transform: translateY(14px) rotateX(-40deg); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: blur(0); }
}

/* Enterprise dashboard */
.ent-dash {
  max-width: 560px;
  margin: 0 auto;
  background: var(--bg-surface);
  border-radius: 16px;
  padding: 24px 28px;
  animation: fade-up 0.8s var(--ease) 0.4s both;
}
.ent-dash-hd {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px; padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.ent-dash-title {
  font-weight: 700; font-size: 0.88rem; color: var(--text-1);
  transition: color 0.5s var(--ease);
}
.ent-dash-badge {
  font-size: 0.72rem; font-weight: 600; padding: 3px 10px;
  border-radius: 99px; background: var(--accent-dim); color: var(--accent);
  transition: all 0.5s var(--ease);
}
.ent-rows { display: flex; flex-direction: column; gap: 10px; }
.ent-row {
  display: grid; grid-template-columns: 36px 1fr auto auto;
  gap: 12px; align-items: center;
  padding: 12px 14px; border-radius: 10px;
  background: var(--bg-alt);
  transition: background 0.5s var(--ease), transform 0.2s var(--ease);
}
.ent-row:hover { transform: translateX(2px); }
.ent-av {
  width: 36px; height: 36px; border-radius: 50%; object-fit: cover;
  background: var(--bg-surface);
}
.ent-name { font-weight: 600; font-size: 0.85rem; color: var(--text-1); transition: color 0.5s var(--ease); }
.ent-role { font-size: 0.74rem; color: var(--text-3); transition: color 0.5s var(--ease); }
.ent-task { font-size: 0.8rem; color: var(--text-2); font-style: italic; transition: color 0.5s var(--ease); }
.ent-st {
  font-size: 0.72rem; font-weight: 600; padding: 3px 9px;
  border-radius: 99px;
}
.st-done { background: rgba(76,175,80,0.1); color: #4caf50; }
.st-work { background: rgba(255,183,77,0.1); color: #ffb74d; }

/* Smooth entrance for phone */
.phone-wrap { animation: phone-in 1s var(--ease) 0.3s both; }
@keyframes phone-in { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: none; } }
.iphone { transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease); }
.iphone:hover { transform: translateY(-4px); box-shadow: 0 50px 100px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06) inset; }

/* Stagger hero text */
.hero h1 { animation: fade-up 0.7s var(--ease) both; }
.hero-sub { animation: fade-up 0.7s var(--ease) 0.1s both; }
.hero-ctas { animation: fade-up 0.7s var(--ease) 0.2s both; }
@keyframes fade-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

/* Steps hover */
.si { transition: background 0.5s var(--ease), transform 0.25s var(--ease); }
.si:hover { transform: translateY(-2px); }

/* Feature images */
.feat-vis { transition: background 0.5s var(--ease), transform 0.4s var(--ease); }
.feat-vis:hover { transform: scale(1.02); }

/* Trust items */
.ti { transition: transform 0.25s var(--ease); }
.ti:hover { transform: translateY(-2px); }

@media (max-width: 860px) {
  .hero h1 { font-size: clamp(2.2rem, 8vw, 3.2rem); }
  .steps-row { grid-template-columns: repeat(2, 1fr); }
  .si:first-child { border-radius: 16px 0 0 0; }
  .si:nth-child(2) { border-radius: 0 16px 0 0; }
  .si:nth-child(3) { border-radius: 0 0 0 16px; }
  .si:last-child { border-radius: 0 0 16px 0; }
  .feat { grid-template-columns: 1fr; gap: 32px; }
  .feat.flip { direction: ltr; }
  .pg { grid-template-columns: 1fr; max-width: 380px; border-radius: 16px; }
  .pg2 { max-width: 380px; }
  .iphone { width: 240px; height: 520px; }
}
@media (max-width: 540px) {
  .nav-btn { display: none; }
  .steps-row { grid-template-columns: 1fr; }
  .si { border-radius: 0 !important; }
  .si:first-child { border-radius: 16px 16px 0 0 !important; }
  .si:last-child { border-radius: 0 0 16px 16px !important; }
  .trust-inner { flex-direction: column; gap: 20px; }
  .cta-form { flex-direction: column; }
  .fi { flex-direction: column; gap: 16px; text-align: center; }
  .fl { flex-wrap: wrap; justify-content: center; gap: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0ms !important; animation-duration: 0ms !important; }
  .rv { opacity: 1; transform: none; }
}
`;

export default function Home() {
  const [mode, setMode] = useState<"personal" | "enterprise">("personal");
  const e = mode === "enterprise";

  const [showModal, setShowModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);

  const openDemo = (ev: React.MouseEvent) => { ev.preventDefault(); setShowModal(true); setModalDone(false); };
  const submitDemo = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const company = fd.get("company") as string;
    // Send notification email via mailto fallback + formsubmit.co
    fetch("https://formsubmit.co/ajax/at253@rice.edu", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Everest Demo Request: " + (company || name),
        name, email, company,
        message: name + " (" + email + ") from " + (company || "N/A") + " requested a demo."
      })
    }).catch(() => {});
    setModalDone(true);
    setTimeout(() => { setShowModal(false); setModalDone(false); }, 2500);
  };

  const roles = ["paralegal", "research assistant", "medical scribe", "office manager", "financial analyst"];
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (!e) return;
    const iv = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(iv);
  }, [e, roles.length]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    document.title = e ? "Everest \u2014 AI Workforce for Your Organization" : "Outdoors \u2014 AI That Actually Does the Work";
  }, [mode, e]);

  useEffect(() => {
    const onScroll = () => document.getElementById("nav")?.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-observe reveals on every mode change (new elements need observing)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((x) => { if (x.isIntersecting) x.target.classList.add("show"); }),
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mode]);

  // Chat animation — re-runs when mode switches back to personal
  useEffect(() => {
    if (e) return;
    const timer = setTimeout(() => {
      const msgs = document.getElementById("waChat");
      if (!msgs) return;
      const bubbles = msgs.querySelectorAll(".m");
      // If already animated, skip
      if (bubbles[0]?.classList.contains("v")) return;
      bubbles.forEach((b, i) => {
        setTimeout(() => { b.classList.add("v"); msgs.scrollTop = msgs.scrollHeight; }, i * 450);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [e]);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const inp = ev.currentTarget.querySelector("input") as HTMLInputElement;
    const email = inp.value;
    fetch("https://formsubmit.co/ajax/at253@rice.edu", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Outdoors Waitlist: " + email,
        email,
        message: email + " joined the Outdoors waitlist."
      })
    }).catch(() => {});
    inp.value = ""; inp.placeholder = "Thanks! We\u2019ll be in touch.";
    setTimeout(() => { inp.placeholder = "Your email"; }, 3000);
  };

  const steps = e
    ? [{ l:"Connect", d:"Link your team\u2019s email, calendar, and files." }, { l:"Assign", d:"Team members text tasks to their Everest agent." }, { l:"Execute", d:"Each agent drafts work using real files and context." }, { l:"Review", d:"Approve and send, or let routine tasks auto-complete." }]
    : [{ l:"Speak", d:"Record a voice note from your phone." }, { l:"Context", d:"Outdoors pulls your emails, files, and calendar." }, { l:"Polish", d:"Turns a rough thought into professional work." }, { l:"Send", d:"Delivered from your real accounts. Done." }];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav id="nav">
        <a href="#" className="logo">{e ? "EVEREST" : "outdoors"}</a>
        <div className="pill">
          <button className={!e ? "on" : ""} onClick={() => setMode("personal")}>Personal</button>
          <button className={e ? "on" : ""} onClick={() => setMode("enterprise")}>Enterprise</button>
        </div>
        {e ? <button className="nav-btn" onClick={openDemo}>Request Demo</button> : <a href="#cta" className="nav-btn">Join Waitlist</a>}
      </nav>

      <section className="hero">
        <h1>{e
          ? <>Another <span className="rotate-wrap"><span className="rotate-word" key={roleIdx}>{roles[roleIdx]}</span></span>. A fraction of the cost.</>
          : <>Productivity apps organize. <em>Outdoors does the work.</em></>}
        </h1>
        <p className="hero-sub">{e ? "Deploy AI agents across your team that handle email, scheduling, and documents through your existing tools." : "A textable AI agent that sends emails, manages your calendar, and drafts polished work from a voice note."}</p>
        <div className="hero-ctas">
          {e ? <button className="btn-primary" onClick={openDemo}>Request a Demo</button> : <a href="#cta" className="btn-primary">Join Waitlist</a>}
          <a href={e ? "#pricing" : "#steps"} className="btn-text">{e ? "See pricing" : "How it works"}</a>
        </div>
        {e && (
          <div className="ent-dash">
            <div className="ent-dash-hd">
              <div className="ent-dash-title">Team Activity</div>
              <div className="ent-dash-badge">3 agents active</div>
            </div>
            <div className="ent-rows">
              <div className="ent-row">
                <img className="ent-av" src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=72&h=72&fit=crop&crop=face" alt="" />
                <div><div className="ent-name">Dr. Sarah Kim</div><div className="ent-role">Dentist, Kim Family Dental</div></div>
                <div className="ent-task">Patient follow-ups</div>
                <div className="ent-st st-done">Sent</div>
              </div>
              <div className="ent-row">
                <img className="ent-av" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&crop=face" alt="" />
                <div><div className="ent-name">James Okafor</div><div className="ent-role">Paralegal, Reed & Associates</div></div>
                <div className="ent-task">Case brief draft</div>
                <div className="ent-st st-work">Working</div>
              </div>
              <div className="ent-row">
                <img className="ent-av" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=72&h=72&fit=crop&crop=face" alt="" />
                <div><div className="ent-name">Maria Reyes</div><div className="ent-role">Analyst, Vanguard Capital</div></div>
                <div className="ent-task">Quarterly report</div>
                <div className="ent-st st-done">Sent</div>
              </div>
            </div>
          </div>
        )}
        {!e && (
          <div className="phone-wrap">
            <div className="iphone"><div className="iphone-screen">
              <div className="di" />
              <div className="ios-bar"><div className="ios-time">9:15</div><div className="ios-icons"><div className="ios-sig"><span/><span/><span/><span/></div><div className="ios-bt"><div className="ios-bt-b"><div className="ios-bt-f"/></div><div className="ios-bt-t"/></div></div></div>
              <div className="msg-hdr"><span className="msg-back">&lsaquo;</span><div className="msg-av">O</div><div className="msg-name">Outdoors</div></div>
              <div className="msgs" id="waChat">
                <div className="mt">Today 9:14 AM</div>
                <div className="m o">Send an email to the team letting them know I{"'"}ll be 15 min late. Keep it casual.</div>
                <div className="md">Delivered</div>
                <div className="m i">Done. Sent from your Gmail: {"\u201c"}Hey all, running ~15 min behind. Start without me.{"\u201d"}</div>
                <div className="m o">Check if I have anything after 3pm. If clear, block it for deep work.</div>
                <div className="mt">Read 9:14 AM</div>
                <div className="m i">3 PM onward is clear. Created a Deep Work block 3:00{"\u2013"}5:30 PM. Do Not Disturb is on.</div>
                <div className="m o">Perfect. Build me a landing page.</div>
                <div className="mt">Read 9:15 AM</div>
                <div className="m i">You{"'"}re looking at it.</div>
              </div>
              <div className="msg-in"><div className="msg-field">Message</div><div className="msg-send">+</div></div>
              <div className="ios-home-i"><div className="ios-home-bar"/></div>
            </div></div>
          </div>
        )}
      </section>

      <div className="proof">Built at Rice University</div>

      <section className="statement rv">
        <h2>{e ? "Your team spends 34 hours a week on admin. Everest handles it." : "Not a chatbot. An agent that sends real emails, books real meetings, and files real documents."}</h2>
        <p>{e ? "Medical trainees, paralegals, and researchers lose more time to paperwork than their actual work. Everest gives every team member an AI that acts through their real accounts." : "Other tools draft text for you to copy-paste. Outdoors connects to your Gmail, Calendar, and Drive and takes action."}</p>
      </section>

      <section className="steps" id="steps">
        <div className="steps-inner">
          <div className="steps-hd rv"><div className="lbl">How it works</div><h2>{e ? "Deploy, assign, execute, review." : "Voice note in. Polished work out."}</h2></div>
          <div className="steps-row">
            {steps.map((s, i) => (
              <div key={s.l} className="si rv" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="si-n">0{i + 1}</div>
                <div className="si-t">{s.l}</div>
                <p className="si-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="feat rv">
            <div>
              <div className="feat-lbl">i.</div>
              <h3>{e ? "One dashboard for your whole team" : "Email that writes itself"}</h3>
              <p>{e ? "Deploy agents per seat, monitor usage, set permissions. Every employee gets a dedicated AI that knows their files and workflow." : "Describe what you need in a voice note. Outdoors reads your threads, writes a polished reply, and sends it from your Gmail."}</p>
            </div>
            <div className="feat-vis"><img src={e
              ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=450&fit=crop"
              : "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&h=450&fit=crop"
            } alt="" loading="lazy" /></div>
          </div>
          <div className="feat flip rv">
            <div>
              <div className="feat-lbl">ii.</div>
              <h3>{e ? "Works with your existing tools" : "Calendar that manages itself"}</h3>
              <p>{e ? "Gmail, Outlook, Google Drive, Slack. No migration, no new tools. Everest plugs into what your team already uses." : "Schedules meetings, blocks focus time, resolves conflicts, sends confirmations. All from a text."}</p>
            </div>
            <div className="feat-vis"><img src={e
              ? "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=450&fit=crop"
              : "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=450&fit=crop"
            } alt="" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="trust-inner">
          <div className="ti"><strong>Runs locally</strong><span>Your machine, your credentials</span></div>
          <div className="ti"><strong>Zero data retention</strong><span>Nothing stored on our servers</span></div>
          <div className="ti"><strong>End-to-end encrypted</strong><span>All communications secured</span></div>
          {e && <div className="ti"><strong>Enterprise controls</strong><span>SSO, audit logs, permissions</span></div>}
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="pricing-hd rv"><div className="lbl">Pricing</div><h2>{e ? "One agent per seat." : "Simple pricing."}</h2></div>
        {!e ? (
          <div className="pg">
            {[
              { t:"Free", a:"$0", p:"per month", pop:false, f:["Bring your own API key","Core agent","Email + calendar","Community support"], b:"Get Started" },
              { t:"Pro", a:"$30", p:"per month", pop:true, f:["No API key needed","All features","Priority execution","Email support"], b:"Join Waitlist" },
              { t:"Premium", a:"$100", p:"per month", pop:false, f:["Unlimited usage","Custom integrations","Phone support","Early access"], b:"Join Waitlist" },
            ].map(c => (
              <div key={c.t} className={`pc ${c.pop?"pop":""}`}>
                <div className="pc-t">{c.t}</div>
                <div className="pc-a">{c.a}</div>
                <div className="pc-p">{c.p}</div>
                <ul className="pc-l">{c.f.map(f => <li key={f}>{f}</li>)}</ul>
                <a href="#cta" className="pc-b">{c.b}</a>
              </div>
            ))}
          </div>
        ) : (
          <div className="pg pg2">
            <div className="pc pop">
              <div className="pc-t">Team</div><div className="pc-a">$200</div><div className="pc-p">per seat / month</div>
              <ul className="pc-l"><li>Full agent per employee</li><li>Admin dashboard</li><li>All integrations</li><li>Dedicated onboarding</li><li>Priority support</li></ul>
              <button className="pc-b" onClick={openDemo}>Request Demo</button>
            </div>
            <div className="pc">
              <div className="pc-t">Custom</div><div className="pc-a">Custom</div><div className="pc-p">tailored to you</div>
              <ul className="pc-l"><li>Everything in Team</li><li>Custom workflows</li><li>SLA guarantee</li><li>Dedicated manager</li><li>On-premise option</li></ul>
              <a href="#cta" className="pc-b">Contact Sales</a>
            </div>
          </div>
        )}
      </section>

      <section className="cta-final" id="cta">
        {!e ? (<>
          <h2 className="rv">Stop organizing. Start doing.</h2>
          <p className="rv">Join the waitlist for early access.</p>
          <form className="cta-form rv" onSubmit={onSubmit}><input type="email" placeholder="Your email" required /><button type="submit" className="btn-primary">Join Waitlist</button></form>
          <div className="cta-note rv">Free to start. No credit card.</div>
        </>) : (<>
          <h2 className="rv">Give your team superpowers.</h2>
          <p className="rv">See how Everest saves your team 30+ hours a week.</p>
          <div className="cta-btns rv"><button className="btn-primary" onClick={openDemo}>Request a Demo</button><button className="btn-text" onClick={openDemo} style={{border:"none",background:"none",cursor:"pointer"}}>Contact Sales</button></div>
        </>)}
      </section>

      <footer><div className="fi">
        <span className="logo">{e ? "EVEREST" : "outdoors"}</span>
        <ul className="fl"><li><a href="#steps">Product</a></li><li><a href="#pricing">Pricing</a></li><li><a href="mailto:at253@rice.edu?subject=Everest%20Demo%20Request">Contact</a></li></ul>
        <span className="fn">Built at Rice University</span>
      </div></footer>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(ev) => ev.stopPropagation()}>
            {!modalDone ? (<>
              <h3>Request a demo</h3>
              <p>Leave your email and we{"'"}ll reach out to schedule a walkthrough.</p>
              <form className="modal-form" onSubmit={submitDemo}>
                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Work email" required />
                <input type="text" name="company" placeholder="Company name" />
                <button type="submit">Submit</button>
              </form>
              <button className="modal-close" onClick={() => setShowModal(false)}>Maybe later</button>
            </>) : (
              <div style={{padding:"20px 0"}}>
                <div className="modal-success">Thanks! We{"'"}ll be in touch shortly.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
