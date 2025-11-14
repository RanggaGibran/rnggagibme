import type { ReactNode } from "react";
import { profile } from "./data/profile";
import { useGithubRepos } from "./hooks/useGithubRepos";
import "./styles/global.css";

const navLinks = [
  { label: "Impact", href: "#highlights" },
  { label: "Focus", href: "#specialties" },
  { label: "Process", href: "#workflow" },
  { label: "Experience", href: "#experience" },
  { label: "Open Work", href: "#repos" },
  { label: "Contact", href: "#contact" },
];

const heroHighlights = [
  { label: "Origin", value: profile.location },
  { label: "Now", value: "Building resilient platforms" },
  { label: "Stacks", value: "React · Node · Flutter" },
];

const heroPillars = [
  {
    title: "DX-first delivery",
    detail: "Opinionated tooling, typed contracts, and live design systems keep teams aligned.",
  },
  {
    title: "Ops-ready launches",
    detail: "Infra, observability, and runbooks land with the feature so releases stay calm.",
  },
  {
    title: "Research to production",
    detail: "Rapid spikes turn into hardened platforms without rewriting the roadmap mid-flight.",
  },
];

const workflow = [
  {
    phase: "Discovery",
    detail: "Align outcomes, map constraints, and pick the fastest experiments to validate the thesis.",
    duration: "Week 1",
  },
  {
    phase: "Architecture",
    detail: "Encode decisions into diagrams, tickets, and guardrails to keep teams shipping in parallel.",
    duration: "Week 2",
  },
  {
    phase: "Delivery",
    detail: "Pair with engineering, unblock daily, and ensure code, infra, and DX all land together.",
    duration: "Week 3-6",
  },
  {
    phase: "Stability",
    detail: "Automate reviews, observability, and playbooks so the platform stays boring and reliable.",
    duration: "Week 6+",
  },
];

const formatDate = (isoDate: string) => {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  });
  return formatter.format(new Date(isoDate));
};

const Section = ({
  id,
  kicker,
  title,
  description,
  children,
}: {
  id: string;
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <section id={id} className="section">
    <header className="section__header">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <div>
        <h2>{title}</h2>
        {description && <p className="section__description">{description}</p>}
      </div>
    </header>
    {children}
  </section>
);

function App() {
  const { repos, status, error, refresh } = useGithubRepos(profile.github.username);
  const featuredRepo = repos[0];
  const supportingRepos = repos.slice(1, 4);

  return (
    <div className="page">
      <nav className="top-nav">
        <a className="top-nav__brand" href="#home">
          <span className="top-nav__badge">RG</span>
          <div>
            <p className="top-nav__title">{profile.name}</p>
            <p className="top-nav__subtitle">{profile.tagline}</p>
          </div>
        </a>
        <div className="top-nav__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="button button--ghost top-nav__cta" href={`mailto:${profile.contact.email}`}>
            Book Rangga
          </a>
        </div>
      </nav>

      <main>
        <header className="hero" id="home">
          <div className="hero__headline">
            <div className="hero__intro">
              <p className="hero__tag">From {profile.location}</p>
              <h1>
                {profile.name}
                <span>{profile.tagline}</span>
              </h1>
              <p className="hero__summary">{profile.summary}</p>
              <p className="hero__body">{profile.bio}</p>
              <div className="hero__actions">
                <a className="button button--primary" href={`mailto:${profile.contact.email}`}>
                  Work with Rangga
                </a>
                <a
                  className="button button--ghost"
                  href={profile.github.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub activity
                </a>
              </div>
            </div>
            <div className="hero__signals">
              {heroHighlights.map((stat) => (
                <article key={stat.label}>
                  <p>{stat.label}</p>
                  <strong>{stat.value}</strong>
                </article>
              ))}
              <article className="hero__availability">
                <p className="eyebrow">Availability</p>
                <div>
                  <strong>{profile.contact.status}</strong>
                  <span>{profile.contact.schedule}</span>
                </div>
              </article>
            </div>
          </div>
          <div className="hero__workspace">
            <div className="hero__workspace-metrics">
              {profile.metrics.map((metric) => (
                <article key={metric.label}>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span>{metric.caption}</span>
                </article>
              ))}
            </div>
            <aside className="hero__workspace-repo">
              <header>
                <p className="eyebrow">Live repo</p>
                <span className="hero__repo-language">{featuredRepo?.language ?? "Multi"}</span>
              </header>
              {featuredRepo ? (
                <>
                  <h3>{featuredRepo.name}</h3>
                  <p>{featuredRepo.description}</p>
                  <div className="hero__repo-stats">
                    <span>⭐ {featuredRepo.stargazers_count}</span>
                    <span>🍴 {featuredRepo.forks_count}</span>
                    <span>Updated {formatDate(featuredRepo.updated_at)}</span>
                  </div>
                  <div className="hero__repo-actions">
                    <a className="button button--primary" href={featuredRepo.html_url} target="_blank" rel="noreferrer">
                      Open repository
                    </a>
                    {featuredRepo.homepage && (
                      <a className="button button--ghost" href={featuredRepo.homepage} target="_blank" rel="noreferrer">
                        Live site
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <p className="muted">Public repositories will render here automatically.</p>
              )}
            </aside>
          </div>
        </header>

        <Section
          id="highlights"
          kicker="Impact at a glance"
          title="A track record of durable delivery"
          description="I steer products from zero-to-one, unblock teams, and keep systems resilient once they scale."
        >
          <div className="metric-grid">
            {profile.metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <p className="metric-card__value">{metric.value}</p>
                <p className="metric-card__label">{metric.label}</p>
                <p className="metric-card__caption">{metric.caption}</p>
              </article>
            ))}
          </div>
        </Section>

        <div className="hero__pillars">
          {heroPillars.map((pillar) => (
            <article key={pillar.title} className="hero__pillar">
              <p className="hero__pillar-label">{pillar.title}</p>
              <p className="hero__pillar-detail">{pillar.detail}</p>
            </article>
          ))}
        </div>

        <Section
          id="specialties"
          kicker="Craft"
          title="Full-stack range across platforms"
          description="From design systems to distributed systems, I bring a pragmatic toolkit that keeps user experience and reliability balanced."
        >
          <div className="card-grid">
            {profile.specialties.map((specialty) => (
              <article key={specialty.title} className="card">
                <header>
                  <h3>{specialty.title}</h3>
                  <p>{specialty.detail}</p>
                </header>
                <div className="chip-row">
                  {specialty.stack.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="card-grid__footer">
            <p>{profile.contact.status}</p>
            <a className="button button--ghost" href={`mailto:${profile.contact.email}`}>
              Book a strategy call
            </a>
          </div>
        </Section>

        <Section
          id="workflow"
          kicker="Working model"
          title="Structured delivery across every phase"
          description="I stay close to shipping while guarding strategy, so product leaders don&apos;t have to choose between pace and quality."
        >
          <div className="workflow-grid">
            {workflow.map((step) => (
              <article key={step.phase} className="workflow-card">
                <div className="workflow-card__header">
                  <p className="eyebrow">{step.duration}</p>
                  <h3>{step.phase}</h3>
                </div>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          kicker="Experience"
          title="Hands-on leadership and delivery"
          description="I love collaborating closely with designers, PMs, and infra partners to turn tough constraints into elegant shipping plans."
        >
          <ol className="timeline">
            {profile.experiences.map((experience) => (
              <li key={`${experience.company}-${experience.period}`} className="timeline__item">
                <div className="timeline__badge" aria-hidden>
                  <span />
                </div>
                <article className="timeline__card">
                  <header>
                    <p className="eyebrow">{experience.period}</p>
                    <div>
                      <h3>
                        {experience.role} · <span>{experience.company}</span>
                      </h3>
                      <p className="timeline__location">{experience.location}</p>
                    </div>
                  </header>
                  <ul>
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="skills"
          kicker="Toolbox"
          title="Tech I reach for often"
          description="Opinionated about developer experience, automated quality gates, and scalable architectures."
        >
          <div className="chip-cloud">
            {profile.skillTags.map((skill) => (
              <span key={skill} className="chip chip--ghost">
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section
          id="repos"
          kicker="Live from GitHub"
          title="Shipped work in the open"
          description="Repos are pulled straight from the GitHub API so this list always reflects what I&apos;m maintaining."
        >
          {status === "error" && (
            <div className="callout callout--error">
              <p>Couldn&apos;t load repositories: {error}</p>
              <button className="button button--ghost" onClick={refresh}>
                Try again
              </button>
            </div>
          )}
          {status === "loading" && <p className="muted">Fetching repositories...</p>}
          {status === "success" && repos.length === 0 && (
            <p className="muted">No public repositories found just yet.</p>
          )}
          {supportingRepos.length > 0 && (
            <div className="repo-spotlight">
              {supportingRepos.map((repo) => (
                <article key={repo.id}>
                  <div>
                    <p className="eyebrow">{repo.language ?? "Multi"}</p>
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                  </div>
                  <div className="repo-spotlight__meta">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                  <a className="button button--text" href={repo.html_url} target="_blank" rel="noreferrer">
                    View repository
                  </a>
                </article>
              ))}
            </div>
          )}
          <div className="repo-grid">
            {repos.map((repo) => (
              <article key={repo.id} className="repo-card">
                <header>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    <h3>{repo.name}</h3>
                  </a>
                  {repo.language && <span className="repo-card__language">{repo.language}</span>}
                </header>
                <p>{repo.description}</p>
                <div className="repo-card__meta">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
                <div className="repo-card__actions">
                  <a className="button button--text" href={repo.html_url} target="_blank" rel="noreferrer">
                    Open repo
                  </a>
                  {repo.homepage && (
                    <a className="button button--text" href={repo.homepage} target="_blank" rel="noreferrer">
                      Live site
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          kicker="Let&apos;s build"
          title="Available for collaborations"
          description={profile.contact.status}
        >
          <div className="contact-card">
            <div>
              <p>{profile.contact.schedule}</p>
              <p className="muted">Direct email: {profile.contact.email}</p>
            </div>
            <div className="contact-card__actions">
              <a className="button button--primary" href={`mailto:${profile.contact.email}`}>
                Email Rangga
              </a>
              <a className="button button--ghost" href={profile.github.profileUrl} target="_blank" rel="noreferrer">
                Follow on GitHub
              </a>
            </div>
          </div>
        </Section>

        <footer className="footer">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <a href={profile.github.profileUrl} target="_blank" rel="noreferrer">
            Follow on GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
