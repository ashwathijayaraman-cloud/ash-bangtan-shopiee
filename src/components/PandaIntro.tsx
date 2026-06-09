import { useEffect, useState } from "react";
import panda from "@/assets/panda-mascot.png";

const SEEN_KEY = "bangtan_intro_seen";

export function PandaIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setShow(false);
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-champagne"
      style={{ animation: "intro-fade-out 0.5s ease-in 2.1s forwards" }}
    >
      <div
        className="absolute top-1/3 text-center animate-fade-up"
        style={{ animationDelay: "1.6s", animationFillMode: "both", opacity: 0 }}
      >
        <h1 className="font-script text-6xl md:text-7xl text-coffee">Bangtan Shopiee</h1>
        <p className="mt-2 text-coffee-light">your cozy stationery corner</p>
      </div>
      <img
        src={panda}
        alt="Panda mascot running in"
        width={220}
        height={220}
        className="animate-panda-run mb-[10vh] drop-shadow-[0_10px_20px_rgba(80,50,30,0.25)]"
      />
    </div>
  );
}
