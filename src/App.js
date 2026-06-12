import { useEffect, useState } from "react";
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
    title: "Intro to AI sandbox",
    description:
      "Made this for my little sister hoping she'd enjoy it. She didn't. It has simple explanations, demos, and exercises for playing with LLMs and building small projects.",
    demonstrates:
      "Flask app with chat, prompt scoring, code review, and DSA practice. You bring your own OpenAI key — the server never holds a shared one.",
    cta: "Ask about the demo",
    visual: "chat",
  },
  {
    title: "Open Roles",
    description:
      "A scanner that pulls every open Forward Deployed Engineer role in the Bay Area into one list with direct apply links. Built it because checking the same job boards every day got old.",
    demonstrates:
      "Python scraping and aggregation. A small tool that solved a real problem I had.",
    cta: "View project",
    visual: "roles",
    href: "https://github.com/FrazierAndrew/open-roles",
  },
  {
    title: "PhoneAgentV2",
    description:
      "An automated phone line for medical appointment intake. It collects patient info over a Twilio call — insurance, referral, address with validation — then schedules the appointment and emails a confirmation.",
    demonstrates:
      "Twilio voice flows wired to an LLM, plus the unglamorous parts: validation, scheduling, email.",
    cta: "View project",
    visual: "phone",
    href: "https://github.com/FrazierAndrew/PhoneAgentV2",
  },
  {
    title: "stem-lab",
    description:
      "Splits a finished track into six stems with Demucs, runs signal analysis on each one, and generates a step-by-step plan for rebuilding the song in Ableton. How I learn how my favorite tracks were made.",
    demonstrates:
      "Audio DSP with librosa — tempo and key detection, onsets, section mapping — turned into JSON plans and human-readable guides.",
    cta: "View project",
    visual: "stems",
    href: "https://github.com/FrazierAndrew/stem-lab",
  },
  {
    title: "song-recommender",
    description:
      "Ranks songs I haven't heard by how much I'll probably like them. Builds a taste profile from the audio signature of songs I already like, then scores everything else against it. Fully offline — no APIs.",
    demonstrates:
      "53-dimensional feature extraction (tempo, timbre, pitch, energy) and weighted-consensus cosine ranking in plain numpy.",
    cta: "View project",
    visual: "ranks",
    href: "https://github.com/FrazierAndrew/song-recommender",
  },
];

function App() {
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
      const requiredSectionIds = ["work", "about"];
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

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Andrew Frazier home">
          Andrew Frazier
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="/Andrew_Resume.pdf">Resume</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">
              Backend systems · Reliability tooling · AI applications
            </p>
            <h1>Andrew Frazier</h1>
            <p className="positioning">
              Spent 3 years teaching data structures and algorithms to thousands
              of students at UW, then almost 3 years building Azure Database for
              PostgreSQL at Microsoft. Hoping what's next involves good people
              and happy customers.
            </p>
            <p className="supporting">
              I like building the systems behind the scenes: incident
              diagnosis, fleet telemetry, rollout monitoring — and lately,
              making LLM products actually remember things.
            </p>
            <div className="hero-actions" aria-label="Profile links">
              {links.map((link) => (
                <a
                  className={
                    link.variant === "primary"
                      ? "button button-primary"
                      : "button"
                  }
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <WebsiteHealthDashboard health={health} />
        </section>

        <section className="section section-bordered" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
            <h2>Things I've built</h2>
            <p>
              Side projects, all real and all mine. The serious infrastructure
              work lives in my resume — this is what I build on my own time.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <ProjectVisual type={project.visual} />
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="demonstrates">
                    <span>Demonstrates:</span> {project.demonstrates}
                  </p>
                  <a
                    className="text-link"
                    style={{ fontSize: "1.5rem" }}
                    href={project.href || "#contact"}
                    target={project.href ? "_blank" : undefined}
                    rel={project.href ? "noopener noreferrer" : undefined}
                  >
                    {project.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section section-bordered" id="about">
          <div className="section-heading compact">
            <p className="eyebrow">About</p>
            <h2>The short version</h2>
          </div>
          <div className="about-copy">
            <p>
              At Microsoft I worked on Azure Database for PostgreSQL: built an
              incident diagnosis and remediation platform, caught a scaling
              flaw in Autonomous Tuning before it shipped, and built the
              telemetry that watched 100,000+ servers. Most recently I was the
              4th engineer at TrainLoop (YC W25), rebuilding an LLM product's
              memory system. Before all that, three years as a TA teaching
              data structures at UW.
            </p>
            <p>
              I'm looking for backend, product, or forward-deployed engineering
              work — ideally close enough to customers that I can see whether
              what I built actually helped.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <strong>Andrew Frazier</strong>
          <p>Backend engineer in San Francisco.</p>
        </div>
        <nav aria-label="Contact links">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}

function WebsiteHealthDashboard({ health }) {
  const [mood, setMood] = useState("curious");
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

  const curiosity = Math.min(
    99,
    36 + stats.clicks * 7 + stats.scrolls * 9 + stats.resumeHovers * 12 + stats.confetti * 6,
  );
  const buttonPokes = stats.clicks + stats.confetti;
  const wiggleLevel = Math.min(99, 18 + stats.wiggles * 3);
  const resumeTemptation = Math.min(99, 20 + stats.resumeHovers * 25);
  const moodLabel =
    curiosity > 82
      ? "invested"
      : stats.resumeHovers > 0
        ? "resume-curious"
        : stats.clicks > 2
          ? "clicky"
          : mood;
  const moodEmoji =
    {
      invested: "🤩",
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
    setStats((current) => ({
      ...current,
      confetti: current.confetti + 1,
      events: ["made the website happy", ...current.events].slice(0, 3),
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
          Make it happy
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
