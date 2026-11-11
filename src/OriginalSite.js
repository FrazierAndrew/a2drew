import { useEffect } from "react";
import App from "./App";

export default function OriginalSite() {
  useEffect(() => {
    // Honor existing bookmark links after the original site finishes loading.
    const target = document.getElementById(window.location.hash.slice(1));
    const focusTarget = target || document.getElementById("top");
    if (focusTarget) {
      focusTarget.tabIndex = -1;
      focusTarget.focus({ preventScroll: true });
    }
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  return <App />;
}
