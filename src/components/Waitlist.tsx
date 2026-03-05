"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "jumping" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("jumping");
    await new Promise((r) => setTimeout(r, 800));

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      if (!res.ok) throw new Error("API error");

      setStatus("success");
      setMessage("Sent. We'll find you.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="w-full max-w-[340px]">
      <p className="text-[10px] tracking-[0.25em] uppercase text-earth-brown/40 mb-5">
        Early Access
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm text-earth-dark/60 italic">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={
                status === "jumping"
                  ? {
                      y: [0, -14, 0, -8, 0, -3, -180],
                      x: [0, 0, 0, 0, 0, 0, 120],
                      rotate: [0, -2, 0, 1, 0, 0, -12],
                      opacity: [1, 1, 1, 1, 1, 1, 0],
                    }
                  : {}
              }
              transition={
                status === "jumping"
                  ? {
                      duration: 0.75,
                      ease: "easeOut",
                      times: [0, 0.15, 0.3, 0.42, 0.52, 0.65, 1],
                    }
                  : {}
              }
            >
              <input
                type="email"
                required
                placeholder="your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "jumping"}
                className="w-full bg-transparent px-0 py-2 text-base text-earth-deep
                  placeholder:text-earth-brown/25 border-0 border-b-2 border-earth-tan
                  focus:outline-none focus:border-earth-clay
                  disabled:opacity-40 transition-colors"
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontStyle: "italic",
                }}
              />
            </motion.div>

            <AnimatePresence>
              {status !== "jumping" && (
                <motion.button
                  type="submit"
                  disabled={!email.trim()}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 text-[11px] tracking-[0.2em] uppercase text-earth-brown/40
                    hover:text-earth-dark transition-colors duration-300
                    disabled:opacity-20 disabled:cursor-default
                    border-b border-transparent hover:border-earth-brown/20
                    pb-[1px]"
                >
                  request access
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] text-red-700/50 mt-2"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
