"use client";

import { useState, FormEvent } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="flex flex-col items-center px-6 pt-6 sm:pt-10 pb-16 sm:pb-24">
      <div className="w-full max-w-sm">
        {status === "success" ? (
          <p className="text-center text-sm sm:text-base text-earth-brown/70 italic">
            you&apos;re in. we&apos;ll be in touch.
          </p>
        ) : (
          <>
            <p className="text-center text-[10px] sm:text-xs tracking-[0.3em] uppercase text-earth-brown/40 mb-4 sm:mb-6">
              early access
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
              <input
                type="email"
                required
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 bg-transparent border-b border-earth-brown/30 focus:border-earth-dark/60 px-1 py-2 text-sm sm:text-base text-earth-deep placeholder:text-earth-brown/30 focus:outline-none transition-colors disabled:opacity-50 italic"
              />
              <button
                type="submit"
                disabled={!email.trim() || status === "loading"}
                className="text-xs sm:text-sm tracking-[0.15em] uppercase text-earth-brown/50 hover:text-earth-dark disabled:opacity-30 transition-colors whitespace-nowrap py-2"
              >
                {status === "loading" ? "..." : "join"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-xs text-red-600/70 mt-2 text-center">
                something went wrong. try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
