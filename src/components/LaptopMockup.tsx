"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";

/* one random outdoor image from the carousel set */
const OUTDOOR_IMAGES = [
  { src: "/images/20251004_144654.webp", color: "#7A8B6F" },
  { src: "/images/20251025_183812 (1).webp", color: "#8B7355" },
  { src: "/images/20251122_213844.webp", color: "#B47B56" },
  { src: "/images/20251127_083555.webp", color: "#6B7F5E" },
  { src: "/images/20251230_080722.webp", color: "#5A6B4A" },
  { src: "/images/IMG-20251228-WA0106.webp", color: "#8A6E50" },
  { src: "/images/IMG_7475 (1).webp", color: "#5B7050" },
];

const ASCII_FRAMES = [
  `  o    \n /|\\  \n / \\  \n _|_  `,
  `  o    \n /|\\  \n / \\  \n__|__ `,
  ` \\o/  \n  |   \n / \\  \n__|__ `,
  `  o/   \n /|   \n / \\  \n__|__ `,
  ` \\o   \n  |\\  \n / \\  \n__|__ `,
  `  o    \n /|\\  \n / \\  \n__|__ `,
];

type WindowId = "todo" | "readme" | "start" | null;

const ABOUT_TABS = [
  {
    id: "about",
    label: "About",
    content:
      "I keep watching people build tools that create more work than they solve. Outdoors is the opposite. It is an agent that handles everything, emails, scheduling, research, code, the stuff that eats your day so you never get to the things that actually matter. The idea is simple. Your best thinking happens when you are not drowning in tasks.",
  },
  {
    id: "mission",
    label: "Mission",
    content:
      "Most productivity tools just move the burden around. You still have to manage the tool. Outdoors does the work. You say what you need, it figures out how. No dashboards to check. No workflows to configure. The point is not optimization. The point is freedom.",
  },
  {
    id: "story",
    label: "Story",
    content:
      "We were pulling 80 hour weeks building software and realized the thing eating our time was not the hard problems. It was the coordination. The emails. The scheduling. The busywork that compounds until your entire day is someone else's agenda. So we built an agent that learns how you work and actually takes things off your hands. 23 people reached out the first day without us asking.",
  },
  {
    id: "contact",
    label: "Contact",
    content:
      "at253@rice.edu. We read every message. Whether you want early access, have a use case, or just want to talk about what it looks like when your agent handles the rest.",
  },
];

/* Live clock hook */
function useLiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setTime(`${h12}:${m} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function XpTitleBar({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#0a246a] to-[#3a6ea5] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-t-[3px]">
      <span className="text-[8px] sm:text-[10px] md:text-xs text-white font-bold truncate">
        {title}
      </span>
      <button
        onClick={onClose}
        className="w-3 h-3 sm:w-4 sm:h-4 bg-[#c75050] hover:bg-[#e06060] rounded-sm flex items-center justify-center text-white text-[8px] sm:text-[10px] leading-none border border-white/30"
      >
        x
      </button>
    </div>
  );
}

function ReadmeWindow({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-x-[5%] top-[8%] bottom-[15%] sm:inset-x-[10%] sm:top-[8%] sm:bottom-[12%] z-40 bg-[#ece9d8] border border-[#808080] rounded-t-[3px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] flex flex-col">
      <XpTitleBar title="readme.txt — Notepad" onClose={onClose} />
      <div className="flex-1 bg-white m-0.5 p-1.5 sm:p-2 md:p-3 overflow-y-auto border border-[#808080] text-[7px] sm:text-[9px] md:text-[11px] leading-relaxed text-earth-dark/80 font-mono">
        <p className="font-bold mb-1 sm:mb-2">outdoors v0.1</p>
        <p className="mb-1 sm:mb-2">
          an agent that handles everything -- emails, scheduling, research, code -- so you can go outside.
        </p>
        <p className="mb-1 sm:mb-2">
          most productivity tools just move the burden around. you still have to manage the tool. outdoors does the work. you say what you need, it figures out how.
        </p>
        <p className="mb-1 sm:mb-2">
          no dashboards. no workflows. no configuration.
        </p>
        <p className="text-earth-brown/50 italic">
          the point is not optimization. the point is freedom.
        </p>
      </div>
    </div>
  );
}

type TodoPhase = "input" | "working" | "done";

function TodoWindow({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const [phase, setPhase] = useState<TodoPhase>("input");
  const [asciiFrame, setAsciiFrame] = useState(0);
  const [resultImage] = useState(
    () => OUTDOOR_IMAGES[Math.floor(Math.random() * OUTDOOR_IMAGES.length)]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    const t = currentTask.trim();
    if (!t) return;
    setTasks((prev) => [...prev, t]);
    setCurrentTask("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  };

  const handleOutsource = () => {
    setPhase("working");
  };

  /* ASCII animation loop */
  useEffect(() => {
    if (phase !== "working") return;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setAsciiFrame(frame % ASCII_FRAMES.length);
    }, 350);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPhase("done");
    }, 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  return (
    <div className="absolute inset-x-[5%] top-[6%] bottom-[15%] sm:inset-x-[12%] sm:top-[8%] sm:bottom-[12%] z-40 bg-[#ece9d8] border border-[#808080] rounded-t-[3px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] flex flex-col">
      <XpTitleBar title="To-Do List" onClose={onClose} />
      <div className="flex-1 bg-white m-0.5 border border-[#808080] overflow-hidden flex flex-col">
        {phase === "input" && (
          <div className="flex-1 flex flex-col p-1.5 sm:p-2 md:p-3">
            {/* Task list */}
            <div className="flex-1 overflow-y-auto space-y-0.5 sm:space-y-1 mb-1 sm:mb-2">
              {tasks.length === 0 && (
                <p className="text-[7px] sm:text-[9px] md:text-[10px] text-earth-brown/40 italic">
                  add something you need done...
                </p>
              )}
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] md:text-xs text-earth-dark/80"
                >
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-earth-brown/30 rounded-sm flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
            {/* Input row */}
            <div className="flex gap-1">
              <input
                ref={inputRef}
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a task..."
                autoFocus
                className="flex-1 bg-white border border-[#7f9db9] px-1 py-0.5 sm:px-1.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs text-earth-deep focus:outline-none focus:border-[#0a246a]"
              />
              <button
                onClick={addTask}
                disabled={!currentTask.trim()}
                className="px-1 sm:px-2 py-0.5 bg-[#ece9d8] border border-[#808080] text-[7px] sm:text-[9px] md:text-[10px] hover:bg-[#d4d0c8] active:bg-[#c0c0c0] disabled:opacity-30"
                style={{
                  boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080",
                }}
              >
                add
              </button>
            </div>
            {/* Outsource button */}
            {tasks.length > 0 && (
              <button
                onClick={handleOutsource}
                className="mt-1.5 sm:mt-2 self-center px-2 sm:px-3 py-0.5 sm:py-1 bg-earth-forest/90 hover:bg-earth-forest text-white text-[8px] sm:text-[10px] md:text-[11px] tracking-wider uppercase rounded-sm transition-colors"
              >
                outsource this -&gt;
              </button>
            )}
          </div>
        )}

        {phase === "working" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2">
            <pre className="text-[6px] sm:text-[8px] md:text-[10px] text-earth-dark/70 font-mono leading-tight text-center">
              {ASCII_FRAMES[asciiFrame]}
            </pre>
            <p className="text-[7px] sm:text-[9px] md:text-[10px] text-earth-brown/60 italic animate-pulse">
              working on it...
            </p>
          </div>
        )}

        {phase === "done" && (
          <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-3">
            {/* Polaroid card */}
            <div
              className="bg-white p-1 pb-4 sm:p-1.5 sm:pb-6 shadow-md"
              style={{ borderRadius: 2, transform: "rotate(-1.5deg)" }}
            >
              <div
                className="relative w-[60px] h-[75px] sm:w-[100px] sm:h-[125px] md:w-[140px] md:h-[175px] overflow-hidden"
                style={{ backgroundColor: resultImage.color }}
              >
                <Image
                  src={resultImage.src}
                  alt="go outside"
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <p className="text-center text-[6px] sm:text-[8px] md:text-[10px] text-earth-brown/70 italic mt-1 sm:mt-1.5">
                done. go outside.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StartMenu({
  onClose,
}: {
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="absolute bottom-[28px] sm:bottom-[26px] md:bottom-[30px] lg:bottom-[36px] left-0 z-40 w-[75%] sm:w-[60%] bg-[#ece9d8] border border-[#808080] rounded-t-[3px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">
      {/* Blue header bar */}
      <div className="bg-gradient-to-r from-[#0a246a] to-[#3a6ea5] px-2 py-1 sm:py-1.5 flex items-center justify-between rounded-t-[3px]">
        <span className="text-[9px] sm:text-[11px] md:text-xs text-white font-bold">Outdoors</span>
        <button
          onClick={onClose}
          className="w-3 h-3 sm:w-4 sm:h-4 bg-[#c75050] hover:bg-[#e06060] rounded-sm flex items-center justify-center text-white text-[8px] sm:text-[10px] leading-none border border-white/30"
        >
          x
        </button>
      </div>
      {/* Tab bar */}
      <div className="flex border-b border-[#808080]/30">
        {ABOUT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1 sm:py-1.5 text-[7px] sm:text-[9px] md:text-[10px] tracking-wider uppercase transition-colors ${
              activeTab === tab.id
                ? "bg-white text-earth-dark border-b-2 border-[#0a246a]"
                : "text-earth-brown/70 hover:bg-white/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4">
        {ABOUT_TABS.map(
          (tab) =>
            activeTab === tab.id && (
              <p
                key={tab.id}
                className="text-[7px] sm:text-[9px] md:text-[11px] leading-relaxed text-earth-dark/75"
              >
                {tab.content}
              </p>
            )
        )}
      </div>
    </div>
  );
}

/* XP-style icon: simple bordered box with a text label inside */
function DesktopIcon({
  label,
  iconText,
  iconColor,
  onClick,
}: {
  label: string;
  iconText: string;
  iconColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded hover:bg-white/20 active:bg-white/30 transition-colors group min-w-[48px] sm:min-w-[64px]"
    >
      <div
        className="w-9 h-9 sm:w-11 sm:h-11 bg-earth-cream/90 rounded flex items-center justify-center shadow group-hover:shadow-lg transition-shadow border border-earth-brown/20"
      >
        <span className="text-[11px] sm:text-[13px] font-bold tracking-tight select-none" style={{ color: iconColor }}>
          {iconText}
        </span>
      </div>
      <span className="text-[8px] sm:text-[10px] text-earth-cream text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
}

export default function LaptopMockup() {
  const [activeWindow, setActiveWindow] = useState<WindowId>(null);
  const clock = useLiveClock();

  const openWindow = (id: WindowId) => {
    setActiveWindow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Laptop frame */}
      <div
        className="relative border-[8px] sm:border-[16px] md:border-[20px] lg:border-[24px] border-[#d4d0c8] w-[calc(100vw-2rem)] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[920px] sm:w-[500px] md:w-[700px] lg:w-[920px] h-[280px] sm:h-[320px] md:h-[440px] lg:h-[575px]"
        style={{
          background: "#c0c0c0",
          boxShadow:
            "inset 2px 2px 0 #fff, inset -2px -2px 0 #808080, 4px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Screen area */}
        <div className="absolute inset-0 overflow-hidden border-2 border-[#808080] shadow-inner">
          {/* XP Bliss wallpaper */}
          <div
            className="w-full h-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/xp-bliss.jpg')" }}
          >
            {/* "Outdoors" watermark */}
            <span
              className="absolute inset-0 flex items-center justify-center text-[22px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.3em] uppercase text-white font-bold select-none pointer-events-none"
              style={{
                textShadow:
                  "0 2px 16px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.6)",
                WebkitTextStroke: "0.5px rgba(255,255,255,0.8)",
              }}
            >
              Outdoors
            </span>

            {/* Desktop icons */}
            <div className="absolute top-2 left-2 sm:top-5 sm:left-5 flex flex-col gap-1 sm:gap-3 z-30">
              <DesktopIcon
                label="To-Do"
                iconText="TODO"
                iconColor="#4A5D3A"
                onClick={() => openWindow("todo")}
              />
              <DesktopIcon
                label="readme"
                iconText="TXT"
                iconColor="#8B7355"
                onClick={() => openWindow("readme")}
              />
            </div>

            {/* XP Windows */}
            {activeWindow === "todo" && (
              <TodoWindow onClose={() => setActiveWindow(null)} />
            )}
            {activeWindow === "readme" && (
              <ReadmeWindow onClose={() => setActiveWindow(null)} />
            )}
            {activeWindow === "start" && (
              <StartMenu onClose={() => setActiveWindow(null)} />
            )}

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-[28px] sm:h-[26px] md:h-[30px] lg:h-[36px] bg-gradient-to-b from-earth-tan to-earth-brown flex items-center justify-between px-1 z-50 border-t-2 border-earth-sand">
              <div className="relative">
                <button
                  onClick={() => openWindow("start")}
                  className="retro-btn flex items-center gap-1 sm:gap-1.5 h-[22px] sm:h-[22px] md:h-[24px] lg:h-[28px] text-[10px] sm:text-xs font-bold"
                >
                  <span className="text-[10px] sm:text-xs text-earth-forest font-bold">
                    =
                  </span>
                  <span>Outdoors</span>
                </button>
              </div>
              <div className="text-[10px] sm:text-xs text-earth-cream/90 px-2 sm:px-3 h-[22px] sm:h-[22px] md:h-[24px] lg:h-[28px] flex items-center border-l border-earth-brown/40 bg-earth-brown/20">
                {clock}
              </div>
            </div>
          </div>
        </div>

        {/* Power LED */}
        <div className="absolute bottom-[-10px] sm:bottom-[-14px] right-3 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
      </div>
    </div>
  );
}
