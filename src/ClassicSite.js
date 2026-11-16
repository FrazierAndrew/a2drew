import { useEffect } from "react";
import App from "./classic/App";

// The pre-polish site is intentionally kept as a separate, unchanged bundle.
export default function ClassicSite() {
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  return <App />;
}
