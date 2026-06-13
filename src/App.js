import { useEffect, useRef, useState } from "react";
import "./App.css";

const links = [
  { label: "Resume", href: "/Andrew_Resume.pdf", variant: "primary" },
  { label: "GitHub", href: "https://github.com/FrazierAndrew" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrew-frazier-0219a716a/",
  },
  { label: "Email", href: "mailto:a2drewfrazier@gmail.com" },
];

const projects = [
  {
    title: "stem-lab",
    description:"Built to learn how songs are made. It splits an mp3 audio track into six stems, then after some magic, generates a step-by-step how to rebuild the song in Ableton. Plans are far from perfect, but ramp up production knowledge quicker than anything else I've come across",
    cta: "View project",
    visual: "stems",
    href: "https://github.com/FrazierAndrew/stem-lab",
    planHref: "/example-plan.html",
    flag: "Personal favorite",
  },
  {
    title: "PhoneAgentV2",
    description:
      "An automated phone line for medical appointment intake. It collects patient info over a Twilio call — insurance, referral, address with validation — then schedules the appointment and emails a confirmation.",
    cta: "View project",
    visual: "phone",
    href: "https://github.com/FrazierAndrew/PhoneAgentV2",
  },
  {
    title: "Intro to AI sandbox",
    description:
      "Spent a good amount of time making my little sister an intro to AI kit (she never opened it) ",
    cta: "View project",
    visual: "chat",
    href: "https://frazierandrew.github.io/ai-sandbox-demo/",
  },
  {
    title: "Open Roles",
    description: "Crawler for SWE and FDE jobs in the bay ares. Use to figure out what tech stacks and skills are in demand.",
    cta: "View project",
    visual: "roles",
    href: "https://github.com/FrazierAndrew/open-roles",
  },
  {
    title: "song-recommender",
    description:
      "Ranks songs I haven't heard by how much I'll probably like them. Builds a taste profile from the audio signature of songs I already like, then scores everything else against it. Fully offline — no APIs.",
    cta: "View project",
    visual: "ranks",
    href: "https://github.com/FrazierAndrew/song-recommender",
  },
];

const hotkeyGroups = [
  {
    title: "macOS — apps & windows",
    keys: [
      { combo: ["⌘", "Tab"], desc: "switch between recently used apps" },
      { combo: ["⌘", "H"], desc: "hide the current app" },
      { combo: ["⌘", "W"], desc: "close current tab / window" },
      { combo: ["⌘", "Q"], desc: "quit the app entirely" },
      { combo: ["⌘", "`"], desc: "cycle windows of the same app" },
    ],
  },
  {
    title: "Chrome — tabs",
    keys: [
      { combo: ["⌘", "T"], desc: "open a new tab" },
      { combo: ["Ctrl", "Tab"], desc: "next tab" },
      { combo: ["Ctrl", "⇧", "Tab"], desc: "previous tab" },
      { combo: ["⌘", "⇧", "T"], desc: "reopen last closed tab (lifesaver)" },
    ],
  },
  {
    title: "Chrome — getting around)",
    keys: [
      { combo: ["⌘", "L"], desc: "jump to the address bar" },
      { combo: ["⌘", "["], desc: "back" },
      { combo: ["⌘", "]"], desc: "forward" },
    ],
  },
];

const nowPlaying = {
  title: "The Color of Nothing",
  artist: "ford.",
  art: "/now-playing.jpg",
  audio: "/now-playing.mp3",
  href: "https://open.spotify.com/track/7AxFLOKzAkxhkWKXZC7WVM",
};

function NowPlaying() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`winamp${isPlaying ? " playing" : ""}`}>
      <div className="winamp-titlebar">
        <span>NOW PLAYING</span>
        <span className="winamp-buttons">_ □ ✕</span>
      </div>
      <div className="winamp-body">
        <a
          className="winamp-art"
          href={nowPlaying.href}
          target="_blank"
          rel="noopener noreferrer"
          title="open in Spotify"
        >
          <img src={nowPlaying.art} alt={`${nowPlaying.title} cover`} />
        </a>
        <div className="winamp-info">
          <div className="winamp-lcd">
            <span className="winamp-scroll">
              ► {nowPlaying.artist} — {nowPlaying.title} &nbsp;&nbsp;&nbsp; ►{" "}
              {nowPlaying.artist} — {nowPlaying.title}
            </span>
          </div>
          <div className="winamp-progress">
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="winamp-controls">
            <button
              className="winamp-play"
              onClick={toggle}
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "►"}
            </button>
            <span className="winamp-eq" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="winamp-kbps"></span>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={nowPlaying.audio}
        preload="metadata"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
      />
      <div className="np-callout" aria-hidden="true">
        <span className="np-note">
         My most played song on Spotify ---> 
        </span>
        <span className="np-arrow">→</span>
      </div>
    </div>
  );
}

const powerTools = [
  { name: "Rectangle Pro", desc: "keyboard-driven window snapping & saved layouts" },
  { name: "Karabiner-Elements", desc: "remap keys and build custom modifier layers" },
  { name: "Alfred 5", desc: "Spotlight on steroids — launch, search, run workflows" },
  { name: "AltTab", desc: "real Windows-style Alt-Tab to switch windows, not just apps" },
  { name: "Maccy", desc: "clipboard history — paste anything you copied earlier" },
  { name: "MTMR", desc: "My TouchBar My Rules: if youve still got a touch bar - fully customize it" },
];

const bucketList = [
  { text: "See a penguin in the wild", done: true },
  { text: "Standing backflip", done: true },
  { text: "Produce an EDM song from scratch", done: false },
  { text: "Swim with a blue whale", done: false },
  { text: "Gainer off a diving board", done: true },
  { text: "Go to that one lookout from Tenet in Italy", done: false },
  { text: "Touch Antarctica", done: false },
  { text: "Cage dive with sharks", done: false },
  { text: "Not have a smartphone", done: false },
  { text: "Live in California", done: true },
  { text: "Surf in Cape Town", done: false },
  { text: "Get wine drunk in Mumbai", done: false },
  { text: "Go to a 3 Michelin star restaurant", done: false },
  { text: "Amazon Rainforest", done: true },
  { text: "Multi-day trek in Alaska", done: false },
  { text: "Look at El Capitan for 15 mins in silence", done: true },
  { text: "See hyenas in the wild", done: false },
  { text: "Salt flats in Utah", done: false },
  { text: "Go in a hot air balloon", done: false },
  { text: "Crocodile in the wild", done: false },
  { text: "Perform at EDC Las Vegas", done: false },
  { text: "Do one of those indoor skydiving things", done: false },
  { text: "Almost get trapped in quicksand", done: false },
  { text: "Do a silent meditation retreat (10 days, no talking)", done: false },
  { text: "Learn one song on piano well enough to play it at a bar", done: false },
  { text: "Rent a car with no GPS in a foreign country and just drive for a week", done: false },
  { text: "Go to Burning Man", done: false },
  { text: "See lava", done: true },
  { text: "Run a marathon", done: false },
  { text: "Swan dive into every ocean", done: false },
  { text: "Amalfi coast", done: true },
  { text: "Sketchy Half Dome hike", done: false },
  { text: "3 days / 2 nights solo camping", done: false },
  { text: "Learn one impressive magic trick", done: false },
  { text: "Witness someone claim citizens arrest", done: false },
];

function BucketListView({ onRevert }) {
  const doneCount = bucketList.filter((item) => item.done).length;
  return (
    <div className="bucket-view">
      <button className="revert-btn" onClick={onRevert} type="button">
        &laquo; revert
      </button>
      <h1 className="bucket-title">
        <span className="blinky">Andrew's Bucket List</span>
      </h1>
      <p className="bucket-key">
        {doneCount} / {bucketList.length} done · items stamped{" "}
        <span className="done-stamp">DID IT!</span> are in the can
      </p>
      <ol className="bucket-ol">
        {bucketList.map((item) => (
          <li className={item.done ? "done" : ""} key={item.text}>
            <span className="bucket-text">{item.text}</span>
            {item.done && <span className="done-stamp">DID IT!</span>}
          </li>
        ))}
      </ol>
      <button className="revert-btn revert-btn-bottom" onClick={onRevert} type="button">
        &laquo; back to the website
      </button>
    </div>
  );
}

function detectBrowser(ua) {
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  return "some browser";
}

function FacebookView({ onClose }) {
  const [fp, setFp] = useState({});
  const [live, setLive] = useState({
    mouseDist: 0,
    clicks: 0,
    scrollDepth: 0,
    idle: 0,
    seconds: 0,
    blurs: 0,
    copies: 0,
    keys: 0,
    selection: "",
    events: ["you opened this page", "we started watching immediately"],
  });

  // --- the silent fingerprint: everything the browser hands over, no prompt ---
  useEffect(() => {
    const gpu = (() => {
      try {
        const c = document.createElement("canvas");
        const g =
          c.getContext("webgl") || c.getContext("experimental-webgl");
        const dbg = g && g.getExtension("WEBGL_debug_renderer_info");
        return dbg
          ? g.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
          : "hidden";
      } catch (e) {
        return "hidden";
      }
    })();
    const canvasId = (() => {
      try {
        const c = document.createElement("canvas");
        const x = c.getContext("2d");
        x.textBaseline = "top";
        x.font = "14px Arial";
        x.fillStyle = "#f60";
        x.fillRect(2, 2, 120, 20);
        x.fillStyle = "#069";
        x.fillText("a2drew.com 😈", 4, 4);
        const data = c.toDataURL();
        let h = 0;
        for (let i = 0; i < data.length; i++) {
          h = (h * 31 + data.charCodeAt(i)) >>> 0;
        }
        return h.toString(16).padStart(8, "0");
      } catch (e) {
        return "blocked";
      }
    })();
    const nav = navigator;
    const conn = nav.connection || {};
    setFp({
      canvasId,
      os: nav.platform || "unknown",
      browser: detectBrowser(nav.userAgent),
      cores: nav.hardwareConcurrency || "?",
      mem: nav.deviceMemory ? `${nav.deviceMemory} GB` : "hidden",
      gpu,
      screen: `${window.screen.width} × ${window.screen.height}`,
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      depth: `${window.screen.colorDepth}-bit color`,
      dpr: `${window.devicePixelRatio}×`,
      lang: (nav.languages || [nav.language]).join(", "),
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localtime: new Date().toLocaleTimeString(),
      touch: "ontouchstart" in window ? "touchscreen" : "mouse & keyboard",
      dnt:
        nav.doNotTrack === "1"
          ? "ON — and we ignored it 😈"
          : "not set",
      referrer: document.referrer || "typed us in directly",
      net: conn.effectiveType
        ? `${conn.effectiveType}${
            conn.downlink ? ` · ~${conn.downlink} Mbps` : ""
          }`
        : "hidden",
      scheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark mode"
        : "light mode",
      cookies: nav.cookieEnabled ? "enabled" : "blocked",
      battery: "reading…",
    });
    if (nav.getBattery) {
      nav.getBattery().then((b) =>
        setFp((prev) => ({
          ...prev,
          battery: `${Math.round(b.level * 100)}% ${
            b.charging ? "⚡ charging" : "🔋 unplugged"
          }`,
        })),
      );
    } else {
      setFp((prev) => ({ ...prev, battery: "hidden" }));
    }
  }, []);

  // --- live behavioral surveillance ---
  useEffect(() => {
    let lastX = null;
    let lastY = null;
    const log = (msg) =>
      setLive((s) => ({ ...s, events: [msg, ...s.events].slice(0, 7) }));

    const onMove = (e) => {
      if (lastX !== null) {
        const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        setLive((s) => ({ ...s, mouseDist: s.mouseDist + d, idle: 0 }));
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onClick = (e) => {
      setLive((s) => ({ ...s, clicks: s.clicks + 1, idle: 0 }));
      log(`🖱 click at (${e.clientX}, ${e.clientY})`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      setLive((s) => ({ ...s, scrollDepth: Math.max(s.scrollDepth, pct), idle: 0 }));
    };
    const onBlur = () => {
      setLive((s) => ({ ...s, blurs: s.blurs + 1 }));
      log("👁 you switched tabs — where'd you go?");
    };
    const onCopy = () => {
      setLive((s) => ({ ...s, copies: s.copies + 1 }));
      log("📋 you copied something");
    };
    const onKey = () => setLive((s) => ({ ...s, keys: s.keys + 1, idle: 0 }));
    const onSelect = () => {
      const t = (window.getSelection() || "").toString().trim().slice(0, 48);
      if (t) setLive((s) => ({ ...s, selection: t }));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", onBlur);
    document.addEventListener("copy", onCopy);
    window.addEventListener("keydown", onKey);
    document.addEventListener("selectionchange", onSelect);
    const timer = window.setInterval(
      () => setLive((s) => ({ ...s, seconds: s.seconds + 1, idle: s.idle + 1 })),
      1000,
    );

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("selectionchange", onSelect);
      window.clearInterval(timer);
    };
  }, []);

  const harvestedBytes =
    1024 +
    live.seconds * 137 +
    Math.round(live.mouseDist) * 3 +
    live.clicks * 512 +
    live.keys * 88 +
    live.scrollDepth * 64 +
    live.blurs * 256 +
    live.copies * 400;
  const harvested =
    harvestedBytes > 1024 * 1024
      ? `${(harvestedBytes / 1024 / 1024).toFixed(2)} MB`
      : `${(harvestedBytes / 1024).toFixed(1)} KB`;

  const knows = [
    ["Device", fp.os],
    ["Browser", fp.browser],
    ["CPU cores", fp.cores],
    ["RAM", fp.mem],
    ["Graphics card", fp.gpu],
    ["Screen", fp.screen],
    ["Window size", fp.viewport],
    ["Pixel density", fp.dpr],
    ["Color depth", fp.depth],
    ["Battery", fp.battery],
    ["Languages", fp.lang],
    ["Timezone", fp.tz],
    ["Your local time", fp.localtime],
    ["Input", fp.touch],
    ["Connection", fp.net],
    ["Theme", fp.scheme],
    ["Cookies", fp.cookies],
    ["Came from", fp.referrer],
    ["Do Not Track", fp.dnt],
    ["Canvas fingerprint", fp.canvasId ? `#${fp.canvasId} (unique to you)` : "…"],
  ];

  return (
    <div className="fb-view">
      <header className="fb-bar">
        <span className="fb-logo">facebook</span>
        <button className="fb-close" onClick={onClose} type="button">
          delete my data ✕
        </button>
      </header>

      <div className="fb-body">
        <p className="fb-disclaimer" style={{ margin: "0 0 14px" }}>
          Relax, none of this is stored. Was curious to see what websites can
          track without having to ask permission... this is what I've found so
          far. Need to understand cookies (i'm sure that will be horrifying)
        </p>
        <h2 className="fb-greet">
          Hi 👋 — here's what we picked up.
          <br />
          <span className="fb-sub">
            We didn't ask. We never do. The scary part is none of this needed a
            permission popup.
          </span>
        </h2>

        <div className="fb-counter">
          <div className="fb-counter-num">{harvested}</div>
          <div className="fb-counter-label">
            data harvested this session &middot; growing every second you stay
          </div>
        </div>

        <section className="fb-section">
          <h3 className="fb-h3">📇 What your browser told us (no consent required)</h3>
          <div className="fb-grid">
            {knows.map(([k, v]) => (
              <div className="fb-fact" key={k}>
                <span className="fb-fact-k">{k}</span>
                <span className="fb-fact-v">{v ?? "…"}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fb-section">
          <h3 className="fb-h3">👁 Live — we are watching you right now</h3>
          <div className="fb-live-grid">
            <div className="fb-stat">
              <strong>{Math.round(live.mouseDist).toLocaleString()} px</strong>
              <span>mouse travelled</span>
            </div>
            <div className="fb-stat">
              <strong>{live.clicks}</strong>
              <span>clicks logged</span>
            </div>
            <div className="fb-stat">
              <strong>{live.keys}</strong>
              <span>keys pressed</span>
            </div>
            <div className="fb-stat">
              <strong>{live.scrollDepth}%</strong>
              <span>max scroll depth</span>
            </div>
            <div className="fb-stat">
              <strong>{live.blurs}</strong>
              <span>times you looked away</span>
            </div>
            <div className="fb-stat">
              <strong>{live.seconds}s</strong>
              <span>time on page</span>
            </div>
            <div className="fb-stat">
              <strong>{live.idle}s</strong>
              <span>idle right now</span>
            </div>
            <div className="fb-stat">
              <strong>{live.copies}</strong>
              <span>things you copied</span>
            </div>
          </div>
          {live.selection && (
            <p className="fb-selection">
              📝 we even saw what you highlighted: &ldquo;{live.selection}&rdquo;
            </p>
          )}
          <div className="fb-feed">
            <span className="fb-feed-title">live activity log</span>
            {live.events.map((ev, i) => (
              <p key={`${ev}-${i}`}>
                <i />
                {ev}
              </p>
            ))}
          </div>
        </section>

        <p className="fb-disclaimer">
          Relax — this is a joke. It is 100% client-side: nothing here is
          stored, sent, or kept. That's the whole point. A real tracker would
          have shipped every line above to its servers before you finished
          reading this sentence.{" "}
          <button className="fb-leave" onClick={onClose} type="button">
            get me out of here
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("site-theme") || "light";
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [bucketOpen, setBucketOpen] = useState(false);
  const [facebookOpen, setFacebookOpen] = useState(false);
  const [username, setUsername] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("site-username") || "";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [health, setHealth] = useState({
    status: "checking",
    loadTime: "--",
    sections: "--",
    resume: "checking",
    contactLinks: "--",
    lastChecked: "--",
  });

  useEffect(() => {
    const updateHealth = () => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const loadTime = navigation
        ? Math.max(
            1,
            Math.round(
              navigation.loadEventEnd || navigation.domContentLoadedEventEnd,
            ),
          )
        : Math.max(1, Math.round(performance.now()));
      const requiredSectionIds = ["work"];
      const readySections = requiredSectionIds.filter((id) =>
        document.getElementById(id),
      ).length;
      const contactLinks = document.querySelectorAll(
        ".footer a, .hero-actions a",
      ).length;
      const resumeLink = document.querySelector('a[href="/Andrew_Resume.pdf"]');

      setHealth({
        status: navigator.onLine ? "healthy" : "offline",
        loadTime: `${loadTime}ms`,
        sections: `${readySections}/${requiredSectionIds.length}`,
        resume: resumeLink ? "ready" : "missing",
        contactLinks: `${contactLinks}/8`,
        lastChecked: new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      });
    };

    updateHealth();
    window.addEventListener("online", updateHealth);
    window.addEventListener("offline", updateHealth);

    return () => {
      window.removeEventListener("online", updateHealth);
      window.removeEventListener("offline", updateHealth);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const openLogin = () => {
    setUsernameInput(username);
    setIsLoginOpen(true);
  };
  const logUsername = (event) => {
    event.preventDefault();
    const nextUsername = usernameInput.trim();
    if (!nextUsername) return;

    setUsername(nextUsername);
    setIsLoginOpen(false);
    window.localStorage.setItem("site-username", nextUsername);
    console.info("a2drew.com login username:", nextUsername);
  };

  if (bucketOpen) {
    return <BucketListView onRevert={() => setBucketOpen(false)} />;
  }

  if (facebookOpen) {
    return <FacebookView onClose={() => setFacebookOpen(false)} />;
  }

  return (
    <div className="site-shell">
      <aside className="retro-sidebar">
        <a href="#top">Page top</a>
        <a href="#work">Projects</a>
        <a href="/Andrew_Resume.pdf">Resume</a>
        <a href="#bottom">Page bottom</a>
        <div></div>
        <h1></h1>
        <h1></h1>
        <h1></h1>

        <div className="vertical-name" aria-hidden="true">
          {"nostalgic exception:".split("").map((ch, i) => (
            <span
              key={i}
              style={{
                transform: `translateX(${Math.sin(i * 0.8) * 5}px) rotate(${
                  Math.sin(i * 0.8) * 8
                }deg)`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <pre className="stack-trace" aria-hidden="true">{`Exception in thread "main"
java.lang.IndexOutOfBoundsException: Index 4 out of bounds for length 4
\tat java.base/jdk.internal.util.Preconditions.outOfBounds(Preconditions.java:100)
\tat java.base/jdk.internal.util.Preconditions.outOfBoundsCheckIndex(Preconditions.java:106)
\tat java.base/jdk.internal.util.Preconditions.checkIndex(Preconditions.java:302)
\tat java.base/java.util.Objects.checkIndex(Objects.java:385)
\tat java.base/java.util.ArrayList.get(ArrayList.java:427)
\tat com.a2drew.site.Sidebar.render(Sidebar.java:42)
\tat com.a2drew.site.HomePage.draw(HomePage.java:88)
\tat com.a2drew.site.HomePage.main(HomePage.java:17)`}</pre>
      </aside>

      <main className="retro-main" id="top">
        <div className="corner-photos">
          <NowPlaying />
          <button
            className="fb-btn"
            onClick={() => setFacebookOpen(true)}
            type="button"
          >
            Facebook
          </button>
          <button
            className="bucket-btn"
            onClick={() => setBucketOpen(true)}
            type="button"
          >
            bucket&nbsp;list
          </button>
        </div>
        <div className="name-row">
          <img className="name-photo" src="/headshot.jpg" alt="Andrew Frazier" />
          <h1>Andrew Frazier's Home Page</h1>
        </div>
        <p className="hero-actions" aria-label="Profile links">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              [{link.label}]
            </a>
          ))}
          <span className="login-shell">
            {isLoginOpen ? (
              <form className="login-form" onSubmit={logUsername}>
                <label className="sr-only" htmlFor="username-input">
                  Username
                </label>
                <input
                  autoComplete="username"
                  autoFocus
                  id="username-input"
                  onChange={(event) => setUsernameInput(event.target.value)}
                  placeholder="username"
                  type="text"
                  value={usernameInput}
                />
                <button type="submit">Log</button>
              </form>
            ) : (
              <button className="login-trigger" onClick={openLogin} type="button">
                {username ? username : "Login"}
              </button>
            )}
          </span>
          <button
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
            className="theme-switch"
            onClick={toggleTheme}
            type="button"
          >
            <span className="theme-switch-track">
              <span className="theme-switch-thumb" />
            </span>
            <span className="theme-switch-text">
              {isDark ? "lights on" : "lights off"}
            </span>
          </button>
          <a
            className="spotify-square"
            href="https://open.spotify.com/user/jyx13p87vxwwgqnmwn5fzmrd7?si=3093f4e0743849f2"
            target="_blank"
            rel="noopener noreferrer"
            title="Andrew on Spotify"
          >
            spotify
          </a>
        </p>
        <div className="header-rule">
          <hr />
          <span className="turtle-walker" aria-hidden="true">
            <span className="turtle">🐢</span>
          </span>
        </div>

        <div className="body-columns" id="work">
          <div className="left-col">
            <div className="block c0 hello-block">
              <h3>Welcome!</h3>
              <p>
              </p>
              <p>
                As of June 2026, I'm now living in San Francisco, for fun I'm attempting to learn how to produce music in Ableton, though most of my time is spent figuring out how to navigate life with my new partner, Claude Opus 4.8.
              </p>
              <p>
                For employment purposes, see the{" "}
                <a href="/Andrew_Resume.pdf">RESUME</a> below. Scroll further for life alterting Mac shortcuts and apps. 
              </p>
            </div>

            <div className="block c3 resume-block">
              <h3>
                Resume
                <a className="resume-open" href="/Andrew_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  open full page
                </a>
              </h3>
              <object
                aria-label="Andrew Frazier resume"
                data="/Andrew_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                type="application/pdf"
              >
                <p>
                  Your browser can't show the PDF inline.{" "}
                  <a href="/Andrew_Resume.pdf">Download the resume</a> instead.
                </p>
              </object>
            </div>

          </div>

          <div className="right-col">
            <h2 className="col-title">Projects</h2>
            <div className="project-masonry">
              {projects.map((project, index) => (
                <div
                  className={`block c${(index % 5) + 1}`}
                  key={project.title}
                >
                  <h3>
                    {project.title}
                    {project.flag && (
                      <span className="new-flag">{project.flag}</span>
                    )}
                  </h3>
                  <ProjectVisual type={project.visual} />
                  <p>{project.description}</p>
                  <p className="cta-row">
                    <a
                      className="cta-button"
                      href={project.href || "#contact"}
                      target={project.href ? "_blank" : undefined}
                      rel={project.href ? "noopener noreferrer" : undefined}
                    >
                      {project.cta}
                    </a>
                    {project.planHref && (
                      <a
                        className="cta-button plan-button"
                        href={project.planHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="plan-star" aria-hidden="true">★</span>
                        example plan
                        <span className="plan-star" aria-hidden="true">★</span>
                      </a>
                    )}
                  </p>
                </div>
              ))}

              <WebsiteHealthDashboard health={health} />
            </div>
          </div>
        </div>

        <div className="block c2 hotkeys-block">
          <h3>
            
            <h3>Life Changing Shortcuts</h3>
            <p className="hotkeys-intro">
            :0
          </p>
          </h3>
          <p className="hotkeys-intro">
          </p>
          <div className="hotkeys-cols">
            {hotkeyGroups.map((group) => (
              <div className="hotkey-group" key={group.title}>
                <h4>{group.title}</h4>
                <ul>
                  {group.keys.map((k) => (
                    <li key={k.desc}>
                      <span className="combo">
                        {k.combo.map((part, i) => (
                          <span key={i}>
                            {i > 0 && <span className="plus">+</span>}
                            <kbd>{part}</kbd>
                          </span>
                        ))}
                      </span>
                      <span className="hotkey-desc">{k.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="block c5 tools-block">
          <h3>Life changing Apps</h3>
          <p className="hotkeys-intro">
            :0
          </p>
          <ul className="tools-list">
            {powerTools.map((tool) => (
              <li key={tool.name}>
                <b>{tool.name}</b> &mdash; {tool.desc}
              </li>
            ))}
          </ul>
        </div>

        <hr />
        <p className="footer" id="contact">
          <span id="bottom">Andrew Frazier · San Francisco · </span>
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              [{link.label}]
            </a>
          ))}
          <br />
          <i>Yes, it is supposed to look like this.</i>
        </p>
      </main>
    </div>
  );
}

function WebsiteHealthDashboard({ health }) {
  const [mood, setMood] = useState("curious");
  const [megaSurprise, setMegaSurprise] = useState(false);
  const [stats, setStats] = useState({
    seconds: 0,
    clicks: 0,
    wiggles: 0,
    scrolls: 0,
    resumeHovers: 0,
    confetti: 0,
    events: [
      "visitor arrived",
      "page is trying to look professional",
      "resume button is waiting patiently",
    ],
  });

  useEffect(() => {
    let lastMove = 0;
    let lastScroll = 0;
    const onClick = (event) => {
      if (event.target.closest(".health-controls")) return;
      setStats((current) => ({
        ...current,
        clicks: current.clicks + 1,
        events: ["clicked around", ...current.events].slice(0, 3),
      }));
    };

    const onMove = () => {
      const now = Date.now();
      if (now - lastMove < 700) return;
      lastMove = now;
      setStats((current) => ({ ...current, wiggles: current.wiggles + 1 }));
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScroll < 900) return;
      lastScroll = now;
      setStats((current) => ({
        ...current,
        scrolls: current.scrolls + 1,
        events: ["went exploring", ...current.events].slice(0, 3),
      }));
    };

    const onResumeHover = () => {
      setStats((current) => ({
        ...current,
        resumeHovers: current.resumeHovers + 1,
        events: ["peeked at resume button", ...current.events].slice(0, 3),
      }));
    };

    const resumeLinks = Array.from(document.querySelectorAll('a[href="/Andrew_Resume.pdf"]'));
    resumeLinks.forEach((link) => link.addEventListener("mouseenter", onResumeHover));
    window.addEventListener("click", onClick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const interval = window.setInterval(() => {
      setStats((current) => ({
        ...current,
        seconds: current.seconds + 1,
      }));
    }, 1000);

    return () => {
      resumeLinks.forEach((link) => link.removeEventListener("mouseenter", onResumeHover));
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!megaSurprise) return undefined;

    document.body.classList.add("mega-surprise-active");
    const timeout = window.setTimeout(() => {
      setMegaSurprise(false);
    }, 5000);

    return () => {
      document.body.classList.remove("mega-surprise-active");
      window.clearTimeout(timeout);
    };
  }, [megaSurprise]);

  const curiosity = Math.min(
    99,
    11 + stats.clicks * 3 + stats.scrolls * 4 + stats.resumeHovers * 10 + stats.confetti * 8,
  );
  const buttonPokes = stats.clicks + stats.confetti;
  const wiggleLevel = Math.min(99, 18 + stats.wiggles * 3);
  const resumeTemptation = Math.min(99, 20 + stats.resumeHovers * 25);
  const moodLabel =
    curiosity > 82
      ? "interactive"
      : stats.resumeHovers > 0
        ? "resume-curious"
        : stats.clicks > 2
          ? "clicky"
          : mood;
  const moodEmoji =
    {
      interactive: "🤩",
      "resume-curious": "👀",
      clicky: "⚡",
      delighted: "😄",
      impressed: "😎",
      curious: "🤔",
    }[moodLabel] || "🤔";
  const confettiColors = ["#1f5c6d", "#c2562f", "#e3b341", "#7fb069"];
  const sparkleBars = Array.from({ length: 10 }, (_, index) => {
    const base = 24 + ((stats.seconds + index * 13 + stats.clicks * 7) % 58);
    return Math.min(94, base + stats.confetti * 4);
  });

  const makeItHappy = () => {
    setMood("delighted");
    setMegaSurprise(true);
    setStats((current) => ({
      ...current,
      confetti: current.confetti + 1,
      events: ["detonated mega-suprise", ...current.events].slice(0, 3),
    }));
  };

  const actInterested = () => {
    setMood("impressed");
    setStats((current) => ({
      ...current,
      clicks: current.clicks + 1,
      events: ["pressed the important-looking button", ...current.events].slice(0, 3),
    }));
  };

  return (
    <aside
      className={`hero-panel health-dashboard mood-${moodLabel}`}
      aria-label="Interactive website mood dashboard"
    >
      {megaSurprise && (
        <div className="mega-surprise" aria-hidden="true">
          <svg className="mega-warp-filter" focusable="false">
            <filter id="mega-warp-filter" x="-18%" y="-18%" width="136%" height="136%">
              <feTurbulence
                baseFrequency="0.012 0.018"
                numOctaves="2"
                result="noise"
                seed={stats.confetti + 7}
                type="fractalNoise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="5s"
                  fill="freeze"
                  values="0.012 0.018;0.052 0.078;0.027 0.044;0.006 0.011"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  attributeName="scale"
                  dur="5s"
                  fill="freeze"
                  values="0;52;84;38;0"
                />
              </feDisplacementMap>
            </filter>
          </svg>
          <div className="mega-warp-vignette" />
          <div className="mega-warp-iris" />
          <div className="mega-warp-tunnel">
            {Array.from({ length: 11 }, (_, i) => (
              <span
                key={`fold-${stats.confetti}-${i}`}
                style={{
                  "--size": `${115 - i * 9}vmax`,
                  "--radius": `${34 + i * 8}px`,
                  "--alpha": 0.54 - i * 0.025,
                  "--start-rotate": `${i * 7}deg`,
                  "--start-scale": 1 - i * 0.035,
                  "--open-scale": 1.18 - i * 0.03,
                  "--open-rotate": `${i * -10}deg`,
                  "--open-tight-scale": 0.9 - i * 0.028,
                  "--mid-rotate": `${190 - i * 15}deg`,
                  "--mid-scale": 0.34 - i * 0.012,
                  "--mid-opacity": 0.9 - i * 0.035,
                  "--end-rotate": `${320 - i * 12}deg`,
                  "--end-scale": 0.82 - i * 0.018,
                }}
              />
            ))}
          </div>
          {Array.from({ length: 9 }, (_, i) => (
            <span
              className="mega-warp-ribbon"
              key={`ribbon-${stats.confetti}-${i}`}
              style={{
                "--i": i,
                "--turn": `${i * 19 - 76}deg`,
                "--ribbon-opacity": 0.82 - i * 0.055,
                "--ribbon-mid-opacity": 0.9 - i * 0.06,
                "--ribbon-stretch": 0.6 + i * 0.025,
              }}
            />
          ))}
          <div className="mega-warp-lens" />
        </div>
      )}
      {stats.confetti > 0 && (
        <div className="confetti" key={stats.confetti} aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 13 + 4) % 100}%`,
                background: confettiColors[i % confettiColors.length],
                animationDelay: `${(i % 6) * 0.07}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="panel-header">
        <span>visitor vibe check</span>
        <span>{health.status === "healthy" ? moodLabel : "offline"}</span>
      </div>

      <div className="health-summary live-summary">
        <div>
          <p>Curiosity meter</p>
          <strong>{curiosity}%</strong>
          <span className="live-subtext">goes up when you poke around</span>
        </div>
        <div
          className="signal-orb"
          style={{ "--pulse": `${curiosity}%` }}
          aria-hidden="true"
        >
          <span className="orb-face">{moodEmoji}</span>
        </div>
      </div>

      <div className="health-controls" aria-label="Playful dashboard controls">
        <button onClick={makeItHappy} type="button">
          mega-suprise
        </button>
        <button onClick={actInterested} type="button">
          Act interested
        </button>
      </div>

      <div className="live-bars" aria-hidden="true">
        {sparkleBars.map((height, index) => (
          <span
            key={`${index}-${stats.seconds}-${stats.confetti}`}
            style={{
              height: `${height}%`,
              opacity: 0.42 + height / 170,
            }}
          />
        ))}
      </div>

      <div className="health-grid">
        <div className="health-check ok">
          <span>Buttons poked</span>
          <strong>{buttonPokes}</strong>
        </div>
        <div className="health-check ok">
          <span>Mouse wiggles</span>
          <strong>{wiggleLevel}%</strong>
        </div>
        <div className="health-check ok">
          <span>Resume temptation</span>
          <strong>{resumeTemptation}%</strong>
        </div>
        <div className="health-check ok">
          <span>Time here</span>
          <strong>{stats.seconds}s</strong>
        </div>
      </div>

      <div className="activity-feed">
        <span>what the site noticed</span>
        {stats.events.map((event, index) => (
          <p key={`${event}-${index}`}>
            <i />
            {event}
          </p>
        ))}
      </div>
    </aside>
  );
}

function ProjectVisual({ type }) {
  if (type === "chat") {
    return (
      <div className="visual chat" aria-hidden="true">
        <div className="chat-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="bubble user">explain APIs like I'm 12</div>
        <div className="bubble ai">
          ok — imagine a restaurant where the waiter is the API…
        </div>
        <div className="chat-input">
          <span className="caret" />
          type a prompt
        </div>
      </div>
    );
  }

  if (type === "roles") {
    return (
      <div className="visual roles" aria-hidden="true">
        <div className="role-row">
          <span className="role-dot" />
          <span className="role-title">Forward Deployed Eng</span>
          <span className="role-apply">↗</span>
        </div>
        <div className="role-row">
          <span className="role-dot" />
          <span className="role-title">FDE · AI Platform</span>
          <span className="role-apply">↗</span>
        </div>
        <div className="role-row faded">
          <span className="role-dot" />
          <span className="role-title">Solutions Engineer</span>
          <span className="role-apply">↗</span>
        </div>
      </div>
    );
  }

  if (type === "stems") {
    const wave = [38, 62, 88, 54, 72, 95, 60, 80, 46, 68, 90, 52];
    return (
      <div className="visual stems" aria-hidden="true">
        <div className="stem-row full">
          <span className="stem-label">track</span>
          <div className="stem-wave">
            {wave.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="stem-arrow">↓ demucs</div>
        {[
          { name: "drums", cls: "drums", bars: [80, 30, 85, 25, 90, 35] },
          { name: "bass", cls: "bass", bars: [55, 70, 60, 75, 50, 65] },
          { name: "vocals", cls: "vocals", bars: [20, 60, 90, 70, 40, 25] },
        ].map((s) => (
          <div className={`stem-row ${s.cls}`} key={s.name}>
            <span className="stem-label">{s.name}</span>
            <div className="stem-wave">
              {s.bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "ranks") {
    return (
      <div className="visual ranks" aria-hidden="true">
        {[
          { name: "unheard_07.mp3", score: 0.93 },
          { name: "unheard_19.mp3", score: 0.88 },
          { name: "unheard_02.mp3", score: 0.61 },
        ].map((t) => (
          <div className="rank-row" key={t.name}>
            <span className="rank-name">{t.name}</span>
            <span className="rank-bar">
              <i style={{ width: `${t.score * 100}%` }} />
            </span>
            <span className="rank-score">{t.score.toFixed(2)}</span>
          </div>
        ))}
        <div className="rank-caption">ranked by taste-profile similarity</div>
      </div>
    );
  }

  return (
    <div className="visual phone" aria-hidden="true">
      <div className="call-pill">
        <span className="call-dot" />
        incoming call
      </div>
      <div className="waveform">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="call-steps">✓ name ✓ insurance ✓ address · scheduling…</div>
    </div>
  );
}

export default App;
