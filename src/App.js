import { useEffect, useMemo, useState } from 'react';
import './App.css';

const links = [
  { label: 'Resume', href: '/Andrew_Resume.pdf', variant: 'primary' },
  { label: 'GitHub', href: 'https://github.com/FrazierAndrew' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-frazier-0219a716a/' },
  { label: 'Email', href: 'mailto:a2drewfrazier@gmail.com' },
];

const projects = [
  {
    title: 'Rule-Based Incident Diagnosis Engine for Cloud Databases',
    description:
      'A diagnostic model for mapping operational symptoms to likely causes, next checks, and conservative remediation paths.',
    demonstrates: 'Reliability judgment, incident workflows, and explainable automation.',
    cta: 'View writeup',
    visual: 'flow',
  },
  {
    title: 'Synthetic Fleet Health & Regression Monitoring Dashboard',
    description:
      'A monitoring concept for detecting fleet-wide regressions using synthetic signals, service health views, and rollout-aware comparisons.',
    demonstrates: 'Telemetry design, operational visibility, and regression analysis.',
    cta: 'View writeup',
    visual: 'dashboard',
  },
  {
    title: 'LLM Memory Extraction and Evaluation Pipeline',
    description:
      'A workflow for extracting durable facts from long-running interactions, evaluating usefulness, and keeping memory grounded in evidence.',
    demonstrates: 'AI application design, evaluation discipline, and practical product sense.',
    cta: 'View repo',
    visual: 'pipeline',
  },
];

const articles = [
  {
    title: 'Designing Conservative Automated Remediation Systems',
    excerpt:
      'Why remediation tools should optimize for bounded action, explainability, and operator trust before autonomy.',
    readTime: '6 min read',
  },
  {
    title: 'Rollout Metrics Matter More Than Launch Metrics',
    excerpt:
      'A practical look at detecting regressions, measuring blast radius, and deciding when a release is actually healthy.',
    readTime: '5 min read',
  },
  {
    title: 'Structured Memory for LLM Applications',
    excerpt:
      'How durable memory can stay useful by preserving evidence, scope, freshness, and clear retrieval boundaries.',
    readTime: '7 min read',
  },
];

function App() {
  const [health, setHealth] = useState({
    status: 'checking',
    loadTime: '--',
    sections: '--',
    resume: 'checking',
    contactLinks: '--',
    lastChecked: '--',
  });

  useEffect(() => {
    const updateHealth = () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation
        ? Math.max(1, Math.round(navigation.loadEventEnd || navigation.domContentLoadedEventEnd))
        : Math.max(1, Math.round(performance.now()));
      const requiredSectionIds = ['work', 'writing', 'about'];
      const readySections = requiredSectionIds.filter((id) => document.getElementById(id)).length;
      const contactLinks = document.querySelectorAll('.footer a, .hero-actions a').length;
      const resumeLink = document.querySelector('a[href="/Andrew_Resume.pdf"]');

      setHealth({
        status: navigator.onLine ? 'healthy' : 'offline',
        loadTime: `${loadTime}ms`,
        sections: `${readySections}/${requiredSectionIds.length}`,
        resume: resumeLink ? 'ready' : 'missing',
        contactLinks: `${contactLinks}/8`,
        lastChecked: new Intl.DateTimeFormat(undefined, {
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      });
    };

    updateHealth();
    window.addEventListener('online', updateHealth);
    window.addEventListener('offline', updateHealth);

    return () => {
      window.removeEventListener('online', updateHealth);
      window.removeEventListener('offline', updateHealth);
    };
  }, []);

  const healthScore = useMemo(() => {
    const checks = [
      health.status === 'healthy',
      health.sections === '3/3',
      health.resume === 'ready',
      health.contactLinks === '8/8',
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [health]);

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
            <p className="eyebrow">Backend systems · Reliability tooling · AI applications</p>
            <h1>Andrew Frazier</h1>
            <p className="positioning">
              ex-Microsoft software engineer focused on backend systems, reliability tooling,
              telemetry, and AI applications.
            </p>
            <p className="supporting">
              I build systems that diagnose problems, monitor complex services, and turn messy
              operational knowledge into usable software.
            </p>
            <div className="hero-actions" aria-label="Profile links">
              {links.map((link) => (
                <a
                  className={link.variant === 'primary' ? 'button button-primary' : 'button'}
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <WebsiteHealthDashboard health={health} score={healthScore} />
        </section>

        <section className="section section-bordered" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
            <h2>Public-facing project themes</h2>
            <p>
              Generalized project concepts that reflect systems, reliability, telemetry, and AI
              application work without exposing confidential employer details.
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
                  <a className="text-link" href="#contact">
                    {project.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section writing-section section-bordered" id="writing">
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
              I am a software engineer with experience building cloud database infrastructure,
              reliability tooling, telemetry systems, and AI workflows. I care about systems that
              are observable, debuggable, and useful under real operational pressure.
            </p>
            <p>
              I am interested in backend, product engineering, and forward-deployed engineering
              roles where engineering work connects closely to users, operations, or customer
              problems.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <strong>Andrew Frazier</strong>
          <p>Backend systems, reliability tooling, telemetry, and AI applications.</p>
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

function WebsiteHealthDashboard({ health, score }) {
  const checks = [
    { label: 'Homepage', value: health.status, state: health.status === 'healthy' ? 'ok' : 'warn' },
    { label: 'Load time', value: health.loadTime, state: 'ok' },
    { label: 'Sections', value: health.sections, state: health.sections === '3/3' ? 'ok' : 'warn' },
    { label: 'Resume', value: health.resume, state: health.resume === 'ready' ? 'ok' : 'warn' },
    {
      label: 'Contact links',
      value: health.contactLinks,
      state: health.contactLinks === '8/8' ? 'ok' : 'warn',
    },
    { label: 'Last check', value: health.lastChecked, state: 'neutral' },
  ];

  return (
    <aside className="hero-panel health-dashboard" aria-label="Website health dashboard">
      <div className="panel-header">
        <span>website health</span>
        <span>{health.status === 'healthy' ? 'live' : 'check'}</span>
      </div>

      <div className="health-summary">
        <div>
          <p>Overall health</p>
          <strong>{score}%</strong>
        </div>
        <div className="health-ring" style={{ '--score': `${score * 3.6}deg` }} aria-hidden="true">
          <span>{score}</span>
        </div>
      </div>

      <div className="uptime-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="health-grid">
        {checks.map((check) => (
          <div className={`health-check ${check.state}`} key={check.label}>
            <span>{check.label}</span>
            <strong>{check.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}

function VisualPlaceholder({ type }) {
  return (
    <div className={`visual-placeholder ${type}`} aria-hidden="true">
      <div className="visual-label">
        {type === 'dashboard' ? 'Dashboard view' : type === 'pipeline' ? 'Evaluation pipeline' : 'System flow'}
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
