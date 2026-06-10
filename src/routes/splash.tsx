import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import panda from "@/assets/panda-mascot.png";
import { supabase } from "@/integrations/supabase/client";

export const SPLASH_SEEN_KEY = "bangtan_splash_seen";

export const Route = createFileRoute("/splash")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Bangtan Shopiee" }],
  }),
  component: SplashPage,
});

type Sparkle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
  color: string;
  kind: "star" | "dot" | "sparkle";
};

function SplashPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const sparkles = useMemo<Sparkle[]>(() => {
    const colors = ["#f5b8c8", "#f7d774", "#b8d8b0", "#c9b8e8", "#f5a78a", "#a8d0e6"];
    const kinds: Sparkle["kind"][] = ["star", "dot", "sparkle"];
    return Array.from({ length: 38 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 25 + Math.random() * 55,
      delay: 0.4 + Math.random() * 2.4,
      size: 6 + Math.random() * 14,
      color: colors[i % colors.length],
      kind: kinds[i % kinds.length],
    }));
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(SPLASH_SEEN_KEY, "1"); } catch { /* ignore */ }
    const fadeT = setTimeout(() => setLeaving(true), 3300);
    const navT = setTimeout(async () => {
      const { data } = await supabase.auth.getUser();
      navigate({ to: data.user ? "/" : "/login", replace: true });
    }, 3900);
    return () => { clearTimeout(fadeT); clearTimeout(navT); };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 z-[200] overflow-hidden bg-champagne transition-opacity duration-700 ${leaving ? "opacity-0" : "opacity-100"}`}
      aria-label="Bangtan Shopiee splash"
    >
      {/* soft blurred blobs */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-blush/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-coffee/15 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-champagne-deep/60 blur-3xl" />

      {/* title */}
      <div
        className="absolute left-1/2 top-[22%] -translate-x-1/2 text-center"
        style={{ animation: "splash-title 1s ease-out 0.2s both" }}
      >
        <h1 className="font-script text-6xl text-coffee md:text-7xl drop-shadow-[0_4px_8px_rgba(80,50,30,0.15)]">
          Bangtan Shopiee
        </h1>
        <p className="mt-2 text-coffee-light">your cozy stationery corner</p>
      </div>

      {/* sparkles & stars trail */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            color: s.color,
            animation: `sparkle-pop 1.6s ease-out ${s.delay}s both`,
          }}
        >
          {s.kind === "star" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
              <path d="M12 2l2.6 6.6L22 10l-5.4 4.6L18.4 22 12 18.2 5.6 22l1.8-7.4L2 10l7.4-1.4z" />
            </svg>
          )}
          {s.kind === "sparkle" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
              <path d="M12 0l1.5 8.5L22 10l-8.5 1.5L12 20l-1.5-8.5L2 10l8.5-1.5z" />
            </svg>
          )}
          {s.kind === "dot" && (
            <span
              className="block h-full w-full rounded-full"
              style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}
            />
          )}
        </span>
      ))}

      {/* pencil rainbow trail */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[
          { c: "#f5b8c8", off: -2 },
          { c: "#f7d774", off: 0 },
          { c: "#b8d8b0", off: 2 },
          { c: "#c9b8e8", off: 4 },
        ].map((stroke, i) => (
          <path
            key={i}
            d={`M -5 ${88 + stroke.off} Q 30 ${60 + stroke.off}, 55 ${52 + stroke.off} T 110 ${18 + stroke.off}`}
            stroke={stroke.c}
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: 200,
              animation: `trail-draw 3s ease-out ${0.2 + i * 0.08}s both`,
            }}
          />
        ))}
      </svg>

      {/* panda runner */}
      <img
        src={panda}
        alt="Panda mascot running with a pencil"
        width={200}
        height={200}
        className="absolute h-[180px] w-[180px] md:h-[220px] md:w-[220px] drop-shadow-[0_14px_22px_rgba(80,50,30,0.3)]"
        style={{
          left: 0,
          top: 0,
          animation: "panda-diagonal 3.2s cubic-bezier(0.45,0.05,0.2,1) 0.2s both",
        }}
      />
    </div>
  );
}
