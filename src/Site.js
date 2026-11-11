import { lazy, Suspense, useEffect, useState } from "react";
import BallLanding from "./BallLanding";

// Load the original site, including its styles and audio, only on entry.
const OriginalSite = lazy(() => import("./OriginalSite"));
const isOriginalSite = () => Boolean(window.location.hash.slice(1));

export default function Site() {
  const [original, setOriginal] = useState(isOriginalSite);

  useEffect(() => {
    const onNavigate = () => setOriginal(isOriginalSite());
    window.addEventListener("hashchange", onNavigate);
    return () => window.removeEventListener("hashchange", onNavigate);
  }, []);

  return original ? (
    <Suspense fallback={<div className="site-loading" role="status">Loading…</div>}>
      <OriginalSite />
    </Suspense>
  ) : (
    <BallLanding onEnter={() => { window.location.hash = "site"; }} />
  );
}
