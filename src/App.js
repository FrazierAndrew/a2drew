import { useEffect, useState } from "react";
import NowPlaying from "./NowPlaying";
import "./App.css";

const links = [
  { label: "Résumé", href: "/Andrew_Resume.pdf", variant: "primary" },
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
      "Generates patient care plans from pharmacy records. Built with FastAPI and SQLite, with PDF import, duplicate checks, and CSV export.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/careplan-generator",
    flag: "FastAPI · SQLite",
  },
  {
    title: "phone-agent",
    description:
      "A Twilio phone service for booking medical appointments. Collects patient details, checks addresses, and emails a confirmation.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/phone-agent",
  },
  {
    title: "mp3-to-claude",
    description:
      "Analyzes an audio library and exports tempo, key, loudness, and other track data as JSON or CSV.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/mp3-to-claude",
  },
  {
    title: "stem-lab",
    description:
      "Splits a track into six stems and maps its tempo, key, and sections. Includes a guide to rebuilding the arrangement in Ableton.",
    cta: "View code",
    href: "https://github.com/FrazierAndrew/stem-lab",
    planHref: "/example-plan.html",
  },
  {
    title: "ll-mem",
    description:
      "An experiment in chatbot memory. Stores conversation details in SQLite and tracks recurring patterns over time.",
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
      { combo: ["⌘", "⇧", "T"], desc: "reopen the last closed tab" },
    ],
  },
  {
    title: "Chrome — navigation",
    keys: [
      { combo: ["⌘", "L"], desc: "jump to the address bar" },
      { combo: ["⌘", "["], desc: "back" },
      { combo: ["⌘", "]"], desc: "forward" },
    ],
  },
];

const powerTools = [
  { name: "Rectangle Pro", desc: "window snapping and saved layouts" },
  { name: "Karabiner-Elements", desc: "key remapping and custom modifier keys" },
  { name: "Alfred 5", desc: "app launcher, search, and workflows" },
  { name: "AltTab", desc: "switch between individual windows" },
  { name: "Maccy", desc: "clipboard history" },
  { name: "MTMR", desc: "custom controls for the MacBook Touch Bar" },
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
        &larr; Back
      </button>
      <h1 className="bucket-title">Bucket list</h1>
      <p className="bucket-key">
        {doneCount} / {bucketList.length} done
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
                  (after everything else)
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <button className="revert-btn revert-btn-bottom" onClick={onRevert} type="button">
        &larr; Back to site
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
  return "unknown";
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
          <strong>Browser information</strong>
        </div>
        <button className="privacy-close" onClick={onClose} type="button">
          Back to site
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
          Browser details
        </button>
        <button
          aria-pressed={activeTab === "tracking"}
          className={activeTab === "tracking" ? "active" : ""}
          onClick={() => setActiveTab("tracking")}
          type="button"
        >
          Session activity
        </button>
      </nav>

      <main className="privacy-body">
        {activeTab === "overview" ? (
          <>
            <section className="privacy-intro">
              <p className="privacy-kicker">On this device</p>
              <h1>What your browser reports</h1>
              <p>
                These details come from your browser. This page does not save
                or send them anywhere.
              </p>
            </section>

            <aside className="privacy-note">
              This checks existing permissions. It does not ask for your
              location, camera, microphone, notifications, or clipboard.
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
                “Prompt” means your browser would ask first. “Unsupported” means
                it cannot report that permission here.
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
                Websites use this information to fit your screen and support
                your browser. Combined, these details can also help identify
                a browser across visits.
              </p>
            </section>

            <section className="privacy-section privacy-tips">
              <h2>Privacy settings</h2>
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
              <p className="privacy-kicker">This visit</p>
              <h1>Session activity</h1>
              <p>
                A counter for clicks, pointer movement, scrolling, and time on
                this page. It resets when you leave. Nothing is saved or sent.
              </p>
            </section>
            <section className="privacy-tracking-panel">
              <WebsiteHealthDashboard health={health} />
            </section>
          </>
        )}

        <button className="privacy-leave" onClick={onClose} type="button">
          Back to site
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
        <p className="sidebar-note">San Francisco, CA</p>
      </aside>

      <main className="retro-main" id="top">
        <div className="page-topbar">
        <a
          className="music-ad-bar"
          href="https://open.spotify.com/artist/6Jsvb6OyiHyz2kCTWmnz9O?si=rLtCJy3VQ6WRZgzg3sL9rw"
          id="music"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Music</span>
          <strong>Listen on Spotify</strong>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
            <path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </a>
        <button className="back-to-ball" type="button" onClick={() => { window.location.hash = ""; }}>
          back to ball
        </button>
        </div>
        <header className="site-header">
          <div className="site-identity">
            <img className="name-photo" src="/headshot.jpg" alt="Andrew Frazier" />
            <div>
              <p className="site-kicker">Software &amp; music</p>
              <h1>Andrew Frazier</h1>
              <p className="site-location">San Francisco, California</p>
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
                Browser info
              </button>
              <button
                className="utility-button bucket-btn"
                onClick={() => setBucketOpen(true)}
                type="button"
              >
                Bucket list
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
                  Your name
                </label>
                <input
                  autoComplete="username"
                  autoFocus
                  id="username-input"
                  onChange={(event) => setUsernameInput(event.target.value)}
                  placeholder="Your name"
                  type="text"
                  value={usernameInput}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <button className="login-trigger" onClick={openLogin} type="button">
                {username ? username : "Your name"}
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
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </nav>
        <div className="header-rule">
          <hr />
        </div>

        <div className="body-columns" id="work">
          <div className="left-col">
            <div className="block c0 hello-block">
              <p className="section-label">About</p>
              <p className="intro-lede">
                I’m a software engineer in San Francisco. I build backend systems and make music in Ableton.
              </p>
              <p>
                For my work history, see my <a href="/Andrew_Resume.pdf">résumé</a>.
              </p>
            </div>

            <div className="block c3 resume-block">
              <h3>
                Résumé
                <a className="resume-open" href="/Andrew_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </h3>
              <p>Backend systems, reliability, and AI applications.</p>
              <details className="resume-preview">
                <summary>Preview résumé</summary>
                <object
                  aria-label="Andrew Frazier resume"
                  data="/Andrew_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                  type="application/pdf"
                >
                  <p>
                    Your browser can't show the PDF inline.{" "}
                    <a href="/Andrew_Resume.pdf">Download the résumé</a> instead.
                  </p>
                </object>
              </details>
            </div>

          </div>

          <div className="right-col">
            <div className="project-heading">
              <p className="section-label">Code</p>
              <h2 className="col-title">Projects</h2>
            </div>
            <div className="project-masonry">
              {projects.map((project, index) => (
                <div
                  className="block project-card"
                  key={project.title}
                >
                  <div className="project-card-topline">
                    <p className="project-index">
                      {String(index + 1).padStart(2, "0")}
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
                        Example plan
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="block c2 hotkeys-block">
          <p className="section-label">On my Mac</p>
          <h3>Keyboard shortcuts</h3>
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
          <p className="section-label">Daily use</p>
          <h3>Mac apps</h3>
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
          <span id="bottom">Andrew Frazier · San Francisco</span>
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
          <a className="previous-version" href="/?version=classic#site">Previous version</a>
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
      "Session started",
      "Page loaded",
      "Counters reset",
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
        events: ["Click recorded", ...current.events].slice(0, 3),
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
        events: ["Page scrolled", ...current.events].slice(0, 3),
      }));
    };

    const onResumeHover = () => {
      setStats((current) => ({
        ...current,
        resumeHovers: current.resumeHovers + 1,
        events: ["Résumé link hovered", ...current.events].slice(0, 3),
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

  const buttonPokes = stats.clicks + stats.confetti;
  const moodLabel = mood === "delighted" ? "playing" : "active";
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
      events: ["Visual effect played", ...current.events].slice(0, 3),
    }));
  };

  const actInterested = () => {
    setMood("impressed");
    setStats((current) => ({
      ...current,
      clicks: current.clicks + 1,
      events: ["Test event added", ...current.events].slice(0, 3),
    }));
  };

  return (
    <aside
      className={`hero-panel health-dashboard mood-${moodLabel}`}
      aria-label="Session activity counters"
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
        <span>Session activity</span>
        <span>{health.status === "healthy" ? moodLabel : "offline"}</span>
      </div>

      <div className="health-summary live-summary">
        <div>
          <p>Time on this page</p>
          <strong>{stats.seconds}s</strong>
          <span className="live-subtext">This visit only</span>
        </div>
        <div
          className="signal-orb"
          style={{ "--pulse": "50%" }}
          aria-hidden="true"
        >
          <span className="orb-face">•</span>
        </div>
      </div>

      <div className="health-controls" aria-label="Activity demo controls">
        <button onClick={makeItHappy} type="button">
          Play effect
        </button>
        <button onClick={actInterested} type="button">
          Add an event
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
          <span>Clicks</span>
          <strong>{buttonPokes}</strong>
        </div>
        <div className="health-check ok">
          <span>Pointer moves</span>
          <strong>{stats.wiggles}</strong>
        </div>
        <div className="health-check ok">
          <span>Résumé hovers</span>
          <strong>{stats.resumeHovers}</strong>
        </div>
        <div className="health-check ok">
          <span>Scrolls</span>
          <strong>{stats.scrolls}</strong>
        </div>
      </div>

      <div className="activity-feed">
        <span>Recent events</span>
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
