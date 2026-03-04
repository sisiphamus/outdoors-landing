"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Intersection Observer hook ─────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll(".reveal, .line-grow, .img-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── Hero letters with stagger ──────────────────────────────── */
function HeroTitle() {
  const word = "OUTDOORS";
  return (
    <h1
      className="font-display tracking-[0.12em] leading-[0.85]"
      style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
    >
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{ animationDelay: `${0.08 + i * 0.07}s` }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}

/* ── Step component ─────────────────────────────────────────── */
function Step({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div className={`step-group reveal ${delay} flex items-start gap-8 md:gap-12 py-10 md:py-14`}>
      <span className="step-number font-display select-none">{number}</span>
      <div className="pt-3 md:pt-5">
        <h3 className="font-display text-2xl md:text-3xl mb-3">{title}</h3>
        <p className="font-body text-lg md:text-xl leading-relaxed opacity-60 max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── Image carousel ────────────────────────────────────────── */
const CAROUSEL_IMAGES = [
  { src: "/20251004_144654.jpg", alt: "October 4 outdoors" },
  { src: "/20251010_230345.jpg", alt: "October 10 outdoors" },
  { src: "/20251015_205903.jpg", alt: "October 15 outdoors" },
  { src: "/20251025_183812 (1).jpg", alt: "October 25 outdoors" },
  { src: "/20251026_022124.jpg", alt: "October 26 outdoors" },
  { src: "/20251122_213844.jpg", alt: "November 22 outdoors" },
  { src: "/20251127_083555.jpg", alt: "November 27 outdoors" },
  { src: "/20251214_163214.jpg", alt: "December 14 outdoors" },
  { src: "/20251230_080722.jpg", alt: "December 30 outdoors" },
  { src: "/20260206_180352 (1).jpg", alt: "February 6 outdoors" },
  { src: "/IMG_7475 (1).jpg", alt: "Outdoors moment" },
  { src: "/IMG1186621390301352295.jpg", alt: "Outdoors moment" },
  { src: "/IMG-20251018-WA0062.jpg", alt: "October 18 outdoors" },
  { src: "/IMG-20251228-WA0106.jpg", alt: "December 28 outdoors" },
  { src: "/IMG2068871883117059041 (1).jpg", alt: "Outdoors moment" },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = CAROUSEL_IMAGES.length;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % total) + total) % total);
    },
    [total]
  );

  /* auto-advance every 4s, pause on hover */
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4000);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % total),
      4000
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    pause();
    startTimer();
  };

  return (
    <div
      className="carousel-wrap img-reveal"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="carousel-track">
        {CAROUSEL_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="carousel-slide"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {/* nav arrows */}
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={() => { pause(); goTo(current - 1); resume(); }}
        aria-label="Previous image"
      >
        &#8592;
      </button>
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={() => { pause(); goTo(current + 1); resume(); }}
        aria-label="Next image"
      >
        &#8594;
      </button>

      {/* dots */}
      <div className="carousel-dots">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => { pause(); goTo(i); resume(); }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────── */
export default function Home() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>
      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="min-h-svh flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">
        <div className="max-w-[1400px]">
          <HeroTitle />
          <p
            className="font-body text-xl md:text-2xl mt-8 opacity-0 max-w-lg leading-relaxed"
            style={{
              color: "#5A5347",
              animation: "letterIn 0.8s 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            Your AI, unboxed from the browser.
          </p>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-float">
          <div
            className="w-px h-12"
            style={{ backgroundColor: "#C4856A", opacity: 0.5 }}
          />
        </div>
      </section>

      {/* ━━━ IMAGE CAROUSEL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-16 lg:px-24 py-8">
        <Carousel />
      </section>

      {/* ━━━ MANIFESTO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-40">
        <div className="max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* left: statement */}
          <div className="md:col-span-5">
            <h2
              className="font-display reveal leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Stop working.
            </h2>
            <h2
              className="font-display reveal reveal-delay-1 leading-[1.05] mt-2"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#3D5A3E",
              }}
            >
              Start living.
            </h2>
          </div>

          {/* right: explanation */}
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p className="reveal reveal-delay-2 font-body text-lg md:text-xl leading-[1.75] opacity-70 max-w-xl">
              Outdoors takes everything Pepper knows and moves it off the
              browser, off the cloud, onto your machine. It runs in the
              background. It reads your messages. It does the work. You do
              the living. One install, then forget it exists.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ DIVIDER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="px-8 md:px-16 lg:px-24">
        <div className="line-grow h-px" style={{ backgroundColor: "#D4C9BA" }} />
      </div>

      {/* ━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-[900px]">
          <p
            className="reveal font-body text-sm tracking-[0.2em] uppercase mb-16"
            style={{ color: "#9A8E7F" }}
          >
            How it works
          </p>

          <Step
            number="01"
            title="Install once"
            description="Download the app. Run the setup wizard. It handles dependencies, authentication, and your Telegram bot in under two minutes."
            delay="reveal-delay-1"
          />

          <div className="line-grow h-px" style={{ backgroundColor: "#E8E0D4" }} />

          <Step
            number="02"
            title="Message naturally"
            description="Send a text from Telegram, anywhere. Your request enters a multi-model pipeline that plans, researches, decides, and executes."
            delay="reveal-delay-1"
          />

          <div className="line-grow h-px" style={{ backgroundColor: "#E8E0D4" }} />

          <Step
            number="03"
            title="Live your life"
            description="Outdoors works while you don't. It opens your browser, writes your code, sends your emails, and learns from every interaction."
            delay="reveal-delay-1"
          />
        </div>
      </section>

      {/* ━━━ PULL QUOTE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-16 lg:px-24 py-20 md:py-32">
        <div className="max-w-[1100px] mx-auto text-center">
          <blockquote
            className="reveal font-display italic leading-[1.3]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              color: "#3D5A3E",
            }}
          >
            &ldquo;The best interface is the one you never have to open.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="px-8 md:px-16 lg:px-24 py-28 md:py-40"
        style={{ backgroundColor: "#3D5A3E" }}
      >
        <div className="max-w-[1400px]">
          <h2
            className="reveal font-display leading-[1.1]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              color: "#FAF6F1",
            }}
          >
            Ready to step outside?
          </h2>

          <div className="reveal reveal-delay-2 mt-12 flex flex-col sm:flex-row items-start gap-6">
            <a
              href="#"
              className="cta-btn inline-block border-2 px-10 py-4 text-lg tracking-wider font-body"
              style={{
                borderColor: "#FAF6F1",
                color: "#FAF6F1",
              }}
            >
              <span>Download for Windows</span>
            </a>
          </div>

          <p
            className="reveal reveal-delay-3 font-body text-sm mt-8 tracking-wide"
            style={{ color: "#A8C1A9" }}
          >
            Windows only. Free. No account needed.
          </p>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ color: "#9A8E7F" }}
      >
        <p className="font-body text-sm">Outdoors</p>
        <p className="font-body text-sm">by Adam Towne</p>
      </footer>
    </div>
  );
}
