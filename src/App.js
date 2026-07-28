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
    title: "careplan-generator",
    description:
      "A FastAPI app for pharmacies that generates patient care plans. The backend separates validation, orchestration, SQLite persistence, PDF extraction, and LLM work, with duplicate-submission checks, CSV export, and unit plus API integration tests.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/careplan-generator",
    flag: "Best backend sample",
  },
  {
    title: "phone-agent",
    description:
      "A Twilio phone intake service for medical appointment scheduling. It collects patient, insurance, referral, complaint, address, and contact details; retries missing fields, validates addresses, schedules the appointment, and emails a confirmation.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/phone-agent",
  },
  {
    title: "mp3-to-claude",
    description:
      "A CLI that converts audio libraries into structured JSON and CSV for downstream analysis. It extracts tempo, key and Camelot code, loudness, dynamics, timbre, chroma, spectral shape, and rough structure, with parallel processing and optional ratings.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/mp3-to-claude",
  },
  {
    title: "stem-lab",
    description:
      "A Demucs and librosa pipeline that splits a finished track into six stems, measures BPM, key, sections, onsets, and spectral shape, then writes a machine-readable plan and step-by-step Ableton reconstruction guide.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/stem-lab",
    planHref: "/example-plan.html",
  },
  {
    title: "ll-mem",
    description:
      "A FastAPI and SQLite experiment in long-term chatbot memory. It captures signals from each conversation, clusters repeated patterns, updates a running portrait, and flags changes against the behavior established over time.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/ll-mem",
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
  { text: "Produce a song from scratch", done: false },
  { text: "Swim with a blue whale", done: false },
  { text: "Alkatraz swim", done: false },
  { text: "Gainer off a diving board", done: true },
  { text: "Go to that one lookout from Tenet in Italy", done: false },
  { text: "Touch Antarctica", done: false },
  { text: "Cage dive with sharks", done: false },
  { text: "Not have a smartphone", done: false },
  { text: "Live in California", done: true },
  { text: "Surf in Cape Town", done: false },
  { text: "Something in Dubai", done: false },
  { text: "Go to a 3 Michelin star restaurant", done: false },
  { text: "Amazon Rainforest", done: true },
  { text: "Multi-day trek in Alaska", done: false },
  { text: "Look at El Capitan for 15 mins in silence", done: true },
  { text: "Wild hyenas", done: false },
  { text: "Go viral on social media", done: true },
  { text: "Go in a hot air balloon", done: false },
  { text: "Crocodile in the wild", done: true },
  { text: "Perform at EDC Las Vegas", done: false },
  { text: "Do one of those indoor skydiving things", done: false },
  { text: "Encounter quicksand", done: false },
  { text: "Meet Jack Dorsey", done: false },
  { text: "1 impressive piano piece", done: false },
  { text: "Hold my breath for 3 minutes", done: true },
  { text: "Go to Burning Man", done: false },
  { text: "See lava", done: true },
  { text: "Run a marathon", done: false },
  { text: "Swan dive into every ocean", done: false },
  { text: "Amalfi coast", done: true },
  { text: "Sketchy Half Dome hike", done: false },
  { text: "3 days / 2 nights solo camping", done: false },
  { text: "Learn one impressive magic trick", done: false },
  { text: "Witness someone claim citizens arrest", done: false },
  {
    text: "Learn the Squirrel Suit",
    done: false,
    requiresAllOthers: true,
  },
];

function BucketListView({ onRevert }) {
  const doneCount = bucketList.filter((item) => item.done).length;
  const allOtherBucketItemsComplete = bucketList
    .filter((item) => !item.requiresAllOthers)
    .every((item) => item.done);

  return (
    <div className="bucket-view">
      <button className="revert-btn" onClick={onRevert} type="button">
        &laquo; revert
      </button>
      <h1 className="bucket-title">Andrew's Bucket List</h1>
      <p className="bucket-key">
        {doneCount} / {bucketList.length} complete · crossed out means done
      </p>
      <ol className="bucket-ol">
        {bucketList.map((item) => {
          const isLocked = item.requiresAllOthers && !allOtherBucketItemsComplete;
          const itemClassName = ["bucket-item", item.done && "done", isLocked && "locked"]
            .filter(Boolean)
            .join(" ");

          return (
            <li className={itemClassName} key={item.text}>
              <span className="bucket-text">{item.text}</span>
              {isLocked && (
                <span className="bucket-condition">
                  (only when all others are complete)
                </span>
              )}
            </li>
          );
        })}
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

function PrivacyView({ health, onClose }) {
  const [fp, setFp] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Browser and device details available to ordinary client-side code.
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
    const nav = navigator;
    const conn = nav.connection || {};
    setFp({
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
      dnt: nav.doNotTrack === "1" ? "enabled" : "not enabled",
      referrer: document.referrer || "none",
      net: conn.effectiveType
        ? `${conn.effectiveType}${
            conn.downlink ? ` · ~${conn.downlink} Mbps` : ""
          }`
        : "hidden",
      scheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark mode"
        : "light mode",
      cookies: nav.cookieEnabled ? "enabled" : "blocked",
      battery: "checking…",
    });
    if (nav.getBattery) {
      nav.getBattery().then((b) =>
        setFp((prev) => ({
          ...prev,
          battery: `${Math.round(b.level * 100)}% ${
            b.charging ? "· charging" : "· not charging"
          }`,
        })),
      );
    } else {
      setFp((prev) => ({ ...prev, battery: "hidden" }));
    }
  }, []);

  useEffect(() => {
    const permissionNames = [
      ["Location", "geolocation"],
      ["Notifications", "notifications"],
      ["Camera", "camera"],
      ["Microphone", "microphone"],
      ["Clipboard read", "clipboard-read"],
      ["Clipboard write", "clipboard-write"],
      ["Background sync", "background-sync"],
      ["Persistent storage", "persistent-storage"],
      ["MIDI devices", "midi"],
    ];

    if (!navigator.permissions || !navigator.permissions.query) {
      setPermissions(
        permissionNames.map(([label, name]) => ({
          label,
          name,
          state: "unsupported",
        })),
      );
      return;
    }

    let cancelled = false;
    const statuses = [];
    const syncStatuses = () => {
      if (!cancelled) {
        setPermissions((current) =>
          current.map((item) => {
            const status = statuses.find((s) => s.name === item.name);
            return status ? { ...item, state: status.state } : item;
          }),
        );
      }
    };

    Promise.all(
      permissionNames.map(([label, name]) =>
        navigator.permissions
          .query({ name })
          .then((status) => {
            statuses.push(status);
            if (status.addEventListener) {
              status.addEventListener("change", syncStatuses);
            }
            return { label, name, state: status.state };
          })
          .catch(() => ({ label, name, state: "unsupported" })),
      ),
    ).then((results) => {
      if (!cancelled) setPermissions(results);
    });

    return () => {
      cancelled = true;
      statuses.forEach((status) => {
        if (status.removeEventListener) {
          status.removeEventListener("change", syncStatuses);
        }
      });
    };
  }, []);

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
    ["Referrer", fp.referrer],
    ["Do Not Track", fp.dnt],
  ];

  return (
    <div className="privacy-view">
      <header className="privacy-bar">
        <div className="privacy-bar-title">
          <span className="privacy-kicker">browser privacy</span>
          <strong>What a webpage can see</strong>
        </div>
        <button className="privacy-close" onClick={onClose} type="button">
          back to site ✕
        </button>
      </header>

      <nav
        className="privacy-tabs"
        aria-label="Privacy page sections"
      >
        <button
          aria-pressed={activeTab === "overview"}
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
          type="button"
        >
          browser info
        </button>
        <button
          aria-pressed={activeTab === "tracking"}
          className={activeTab === "tracking" ? "active" : ""}
          onClick={() => setActiveTab("tracking")}
          type="button"
        >
          tracking demo
        </button>
      </nav>

      <main className="privacy-body">
        {activeTab === "overview" ? (
          <>
            <section className="privacy-intro">
              <p className="privacy-kicker">informational demo</p>
              <h1>What your browser shares with websites</h1>
              <p>
                This page shows ordinary browser and device details available
                to a webpage, along with the current state of common
                permissions. Nothing shown here is stored or sent anywhere.
              </p>
            </section>

            <aside className="privacy-note">
              <strong>Permission status is not access.</strong> This page
              checks the status reported by your browser. It does not request
              your camera, microphone, location, notifications, or clipboard.
            </aside>

            <section className="privacy-section">
              <h2>Permission status</h2>
              <div className="privacy-permissions">
                {permissions.map((permission) => (
                  <div
                    className={`privacy-permission permission-${permission.state}`}
                    key={permission.name}
                  >
                    <span className="privacy-permission-name">
                      {permission.label}
                    </span>
                    <span className="privacy-permission-state">
                      {permission.state}
                    </span>
                  </div>
                ))}
              </div>
              <p className="privacy-permission-note">
                “Prompt” means your browser would ask before granting access.
                “Unsupported” means this browser does not report that status
                here.
              </p>
            </section>

            <section className="privacy-section">
              <h2>Browser and device information</h2>
              <div className="privacy-grid">
                {knows.map(([k, v]) => (
                  <div className="privacy-fact" key={k}>
                    <span className="privacy-fact-k">{k}</span>
                    <span className="privacy-fact-v">{v ?? "…"}</span>
                  </div>
                ))}
              </div>
              <p className="privacy-explanation">
                Sites use details like these for compatibility and responsive
                layouts. When many signals are combined, they can also
                contribute to browser fingerprinting.
              </p>
            </section>

            <section className="privacy-section privacy-tips">
              <h2>Simple privacy controls</h2>
              <ul>
                <li>Review permissions before granting access to a site.</li>
                <li>
                  Use your browser’s tracking-protection and cookie controls.
                </li>
                <li>Remove saved permissions for sites you no longer use.</li>
              </ul>
            </section>
          </>
        ) : (
          <>
            <section className="privacy-intro">
              <p className="privacy-kicker">optional interactive demo</p>
              <h1>Visitor vibe check</h1>
              <p>
                The original homepage widget lives here now. It counts clicks,
                pointer movement, scrolling, and time only while this tab is
                open. Nothing is stored or sent.
              </p>
            </section>
            <section className="privacy-tracking-panel">
              <WebsiteHealthDashboard health={health} />
            </section>
          </>
        )}

        <button className="privacy-leave" onClick={onClose} type="button">
          back to the website
        </button>
      </main>
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
  const [privacyOpen, setPrivacyOpen] = useState(false);
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

  if (privacyOpen) {
    return (
      <PrivacyView
        health={health}
        onClose={() => setPrivacyOpen(false)}
      />
    );
  }

  return (
    <div className="site-shell">
      <aside className="retro-sidebar">
        <a className="sidebar-brand" href="#top" aria-label="Andrew Frazier home">
          <span>a2</span>
          <span>drew</span>
        </a>
        <nav className="sidebar-nav" aria-label="Page sections">
          <a href="#top">Home</a>
          <a href="#work">Projects</a>
          <a href="#music">Music</a>
          <a href="/Andrew_Resume.pdf">Résumé</a>
          <a href="#bottom">Contact</a>
        </nav>
        <p className="sidebar-note">a small corner of the internet</p>
        <details className="sidebar-easter-egg">
          <summary>system status</summary>
          <pre className="stack-trace">{`Exception in thread "main"
java.lang.IndexOutOfBoundsException: Index 4 out of bounds for length 4
	at java.base/jdk.internal.util.Preconditions.outOfBounds(Preconditions.java:100)
	at java.base/jdk.internal.util.Preconditions.outOfBoundsCheckIndex(Preconditions.java:106)
	at java.base/jdk.internal.util.Preconditions.checkIndex(Preconditions.java:302)
	at java.base/java.util.Objects.checkIndex(Objects.java:385)
	at java.base/java.util.ArrayList.get(ArrayList.java:427)
	at com.a2drew.site.Sidebar.render(Sidebar.java:42)
	at com.a2drew.site.HomePage.draw(HomePage.java:88)
	at com.a2drew.site.HomePage.main(HomePage.java:17)`}</pre>
        </details>
      </aside>

      <main className="retro-main" id="top">
        <a
          className="music-ad-bar"
          href="https://open.spotify.com/artist/6Jsvb6OyiHyz2kCTWmnz9O?si=rLtCJy3VQ6WRZgzg3sL9rw"
          id="music"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>advertisement</span>
          <strong>Check out my Music on Spotify</strong>
          <span aria-hidden="true">↗</span>
        </a>
        <header className="site-header">
          <div className="site-identity">
            <img className="name-photo" src="/headshot.jpg" alt="Andrew Frazier" />
            <div>
              <p className="site-kicker">a2drew.com / personal home page</p>
              <h1>Andrew Frazier</h1>
              <p className="site-location">San Francisco · software, music, small experiments</p>
            </div>
          </div>
          <div className="site-utilities">
            <NowPlaying />
            <div className="utility-buttons">
              <button
                className="utility-button privacy-btn"
                onClick={() => setPrivacyOpen(true)}
                type="button"
              >
                privacy info
              </button>
              <button
                className="utility-button bucket-btn"
                onClick={() => setBucketOpen(true)}
                type="button"
              >
                bucket list
              </button>
            </div>
          </div>
        </header>
        <nav className="site-nav" aria-label="Profile links">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
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
        </nav>
        <div className="header-rule">
          <hr />
          <span className="turtle-walker" aria-hidden="true">
            <span className="turtle">🐢</span>
          </span>
        </div>

        <div className="body-columns" id="work">
          <div className="left-col">
            <div className="block c0 hello-block">
              <p className="section-label">01 / hello, internet</p>
              <p className="intro-lede">
                I live in San Francisco, build software, and make music in Ableton.
              </p>
              <p>
                This is the part portfolio, part notebook version of me: real projects, useful Mac shortcuts, and a few experiments that are more fun than a normal résumé site would allow.
              </p>
              <p>
                Here for work? Start with the <a href="/Andrew_Resume.pdf">résumé</a>.
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
            <div className="project-heading">
              <p className="section-label">02 / selected work</p>
              <h2 className="col-title">Selected GitHub work</h2>
            </div>
            <div className="project-masonry">
              {projects.map((project, index) => (
                <div
                  className="block project-card"
                  key={project.title}
                >
                  <div className="project-card-topline">
                    <p className="project-index">
                      {String(index + 1).padStart(2, "0")} / project
                    </p>
                    {project.flag && (
                      <span className="new-flag">{project.flag}</span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
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

export default App;
