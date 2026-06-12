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
      "AI product design, education workflows, prompt evaluation, and secure per-user API key handling.",
    cta: "Ask about the demo",
    visual: "dashboard",
  },
  {
    title: "Open Roles",
    description:
      "A project for organizing and tracking open software engineering roles with a clean, practical workflow for job search research.",
    demonstrates:
      "Product judgment, workflow design, structured role data, and practical job-search tooling.",
    cta: "View project",
    visual: "flow",
    href: "https://github.com/FrazierAndrew/open-roles",
  },
  {
    title: "PhoneAgentV2",
    description:
      "A phone-agent project focused on voice-oriented AI workflows, agent behavior, and practical interaction design.",
    demonstrates:
      "AI application design, agent workflows, product iteration, and user-facing automation.",
    cta: "View project",
    visual: "dashboard",
    href: "https://github.com/FrazierAndrew/PhoneAgentV2",
  },
];

const articles = [
  {
    title: "Designing Conservative Automated Remediation Systems",
    excerpt:
      "Why remediation tools should optimize for bounded action, explainability, and operator trust before autonomy.",
    readTime: "6 min read",
  },
  {
    title: "Rollout Metrics Matter More Than Launch Metrics",
    excerpt:
      "A practical look at detecting regressions, measuring blast radius, and deciding when a release is actually healthy.",
    readTime: "5 min read",
  },
  {
    title: "Structured Memory for LLM Applications",
    excerpt:
      "How durable memory can stay useful by preserving evidence, scope, freshness, and clear retrieval boundaries.",
    readTime: "7 min read",
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
      const requiredSectionIds = ["work", "writing", "about"];
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
          <a href="#writing">Writing</a>
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
              of students, then 5 years building cloud database infrastructure
              at Microsoft. Hoping what's next involves good people and happy
              customers.
            </p>
            <p className="supporting">
              I build systems that diagnose problems, monitor complex services,
              and turn messy operational knowledge into usable software.
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
            <h2>Public-facing project themes</h2>
            <p>
              Public projects and demos that reflect systems thinking, practical
              product tooling, and AI application work.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <VisualPlaceholder type={project.visual} />
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

        <section
          className="section writing-section section-bordered"
          id="writing"
        >
          <div className="section-heading compact">
            <p className="eyebrow">Technical Writing</p>
            <h2>Short notes on engineering judgment</h2>
          </div>

          <div className="writing-list">
            {articles.map((article) => (
              <article className="writing-card" key={article.title}>
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <span>{article.readTime}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section section-bordered" id="about">
          <div className="section-heading compact">
            <p className="eyebrow">About</p>
            <h2>Engineering close to real operational problems</h2>
          </div>
          <div className="about-copy">
            <p>
              I am a software engineer with experience building cloud database
              infrastructure, reliability tooling, telemetry systems, and AI
              workflows. I care about systems that are observable, debuggable,
              and useful under real operational pressure.
            </p>
            <p>
              I am interested in backend, product engineering, and
              forward-deployed engineering roles where engineering work connects
              closely to users, operations, or customer problems.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <strong>Andrew Frazier</strong>
          <p>
            Backend systems, reliability tooling, telemetry, and AI
            applications.
          </p>
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
          <span>{curiosity > 82 ? "!" : "?"}</span>
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

function VisualPlaceholder({ type }) {
  return (
    <div className={`visual-placeholder ${type}`} aria-hidden="true">
      <div className="visual-label">
        {type === "dashboard"
          ? "Dashboard view"
          : type === "pipeline"
            ? "Evaluation pipeline"
            : "System flow"}
      </div>
      <div className="visual-content">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default App;
