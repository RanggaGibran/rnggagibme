import { useEffect, useState } from "react";
import { profile } from "./data/profile";
import { useGithubRepos } from "./hooks/useGithubRepos";
import { CustomCursor } from "./components/CustomCursor";
import { FloatingShapes } from "./components/FloatingShapes";
import "./styles/global.css";

type PortfolioItem = typeof profile.portfolio[0];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Karya", href: "#karya" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const { repos, status, error, refresh } = useGithubRepos(profile.github.username);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: PortfolioItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page">
      <CustomCursor />
      <FloatingShapes />

      {/* Full-screen animated hero */}
      <section className="hero-landing">
        <div className="hero-landing__content">
          <h1 className="hero-landing__name">
            <span className="hero-landing__name-line">Rangga</span>
            <span className="hero-landing__name-line">Gibran</span>
          </h1>
          <p className="hero-landing__tagline">{profile.tagline}</p>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-indicator__wheel" />
        </div>
      </section>

      {/* Navbar - Separated Pills */}
      <nav className="top-nav">
        <div className="top-nav__left">
          <a className="nav-pill nav-pill--brand" href="#home">
            <span className="nav-pill__badge">RG</span>
            <span className="nav-pill__name">{profile.name}</span>
          </a>
        </div>
        <div className="top-nav__center">
          <div className="nav-pill nav-pill--links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="top-nav__right">
          <a className="nav-pill nav-pill--cta" href={`mailto:${profile.contact.email}`}>
            Let's Talk
          </a>
        </div>
      </nav>

      <main>
      {/* Full-page photo section */}
      <section className="photo-section">
        <div className="photo-section__container reveal-on-scroll">
          <div className="photo-section__frame">
            <div className="photo-section__image" />
            {/* Animated decorative badges */}
            <div className="photo-badge photo-badge--1">
              <span className="photo-badge__icon">💼</span>
              <span className="photo-badge__text">{profile.metrics[0].value}</span>
            </div>
            <div className="photo-badge photo-badge--2">
              <span className="photo-badge__icon">🚀</span>
              <span className="photo-badge__text">{profile.metrics[1].value}</span>
            </div>
            <div className="photo-badge photo-badge--3">
              <span className="photo-badge__icon">⭐</span>
              <span className="photo-badge__text">{profile.metrics[2].value}</span>
            </div>
            {/* Decorative text labels */}
            <div className="photo-label photo-label--left">
              <span className="photo-label__title">Full Stack</span>
              <span className="photo-label__subtitle">Developer</span>
            </div>
            <div className="photo-label photo-label--right">
              <span className="photo-label__title">UI/UX</span>
              <span className="photo-label__subtitle">Designer</span>
            </div>
          </div>
        </div>
        <div className="photo-section__location reveal-on-scroll">
          <span className="photo-section__location-icon">📍</span>
          From {profile.location}
        </div>
      </section>        {/* About section with scroll reveal */}
        <section id="about" className="about-section reveal-on-scroll">
          <div className="about-section__content">
            <h2 className="about-section__title">Building Digital Experiences</h2>
            <p className="about-section__summary">{profile.summary}</p>
            <p className="about-section__bio">{profile.bio}</p>
            <div className="about-section__stats">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="stat-card">
                  <span className="stat-card__value">{metric.value}</span>
                  <span className="stat-card__label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="work" className="work-section reveal-on-scroll">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {profile.experiences.map((experience) => (
              <div key={`${experience.company}-${experience.period}`} className="timeline-item">
                <div className="timeline-item__period">{experience.period}</div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__role">{experience.role}</h3>
                  <p className="timeline-item__company">{experience.company} · {experience.location}</p>
                  <ul className="timeline-item__bullets">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="skills-section reveal-on-scroll">
          <h2 className="section-title">Tech Stack</h2>
          <div className="skills-grid">
            {profile.specialties.map((specialty) => (
              <div key={specialty.title} className="skill-category">
                <h3 className="skill-category__title">{specialty.title}</h3>
                <p className="skill-category__detail">{specialty.detail}</p>
                <div className="skill-category__tags">
                  {specialty.stack.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Animated Tech Stack Marquee */}
          <div className="tech-marquee">
            <div className="tech-marquee__track">
              {profile.specialties.flatMap(s => s.stack).map((tech, index) => (
                <span key={`tech-1-${index}`} className="tech-marquee__item">{tech}</span>
              ))}
              {profile.specialties.flatMap(s => s.stack).map((tech, index) => (
                <span key={`tech-2-${index}`} className="tech-marquee__item">{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Karya Section */}
        <section id="karya" className="karya-section">
          <div className="karya-section__header reveal-on-scroll">
            <span className="karya-section__label">Portfolio</span>
            <h2 className="section-title">Karya Saya</h2>
            <p className="karya-section__subtitle">Koleksi proyek yang telah saya kerjakan dengan dedikasi penuh</p>
          </div>
          <div className="karya-grid">
            {profile.portfolio.map((item, index) => (
              <div key={item.title} className={`karya-card reveal-on-scroll`} style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="karya-card__image-wrapper">
                  <div className="karya-card__image" style={{ backgroundImage: `url(${item.image})` }}>
                    <div className="karya-card__overlay">
                      <button className="karya-card__view-btn" onClick={() => openModal(item)}>
                        <span>View Details</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="karya-card__category-badge">{item.category}</div>
                </div>
                <div className="karya-card__content">
                  <h3 className="karya-card__title">{item.title}</h3>
                  <p className="karya-card__description">{item.description}</p>
                  <div className="karya-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="karya-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Modal */}
        <div className={`modal-overlay ${isModalOpen ? 'modal-overlay--active' : ''}`} onClick={closeModal}>
          <div className={`modal ${isModalOpen ? 'modal--active' : ''}`} onClick={(e) => e.stopPropagation()}>
            {selectedProject && (
              <>
                <button className="modal__close" onClick={closeModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
                
                <div className="modal__image-container">
                  <div className="modal__image" style={{ backgroundImage: `url(${selectedProject.image})` }}>
                    <div className="modal__image-overlay"></div>
                  </div>
                  <div className="modal__category">{selectedProject.category}</div>
                </div>
                
                <div className="modal__content">
                  <div className="modal__header">
                    <h2 className="modal__title">{selectedProject.title}</h2>
                    <div className="modal__status">
                      <span className="modal__status-dot"></span>
                      <span>Project Completed</span>
                    </div>
                  </div>
                  
                  <p className="modal__description">{selectedProject.description}</p>
                  
                  <div className="modal__section">
                    <h4 className="modal__section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      Tech Stack
                    </h4>
                    <div className="modal__tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="modal__tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal__section">
                    <h4 className="modal__section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      Project Highlights
                    </h4>
                    <ul className="modal__highlights">
                      <li>Fully responsive design for all devices</li>
                      <li>Modern UI/UX with smooth animations</li>
                      <li>Optimized performance & fast loading</li>
                      <li>Clean and maintainable codebase</li>
                    </ul>
                  </div>
                  
                  <div className="modal__actions">
                    <button className="modal__btn modal__btn--primary" onClick={closeModal}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      Got It
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects/Repos */}
        <section id="projects" className="projects-section reveal-on-scroll">
          <div className="projects-section__header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-status">
              <span className="status-dot"></span>
              <span>Live from GitHub</span>
            </div>
          </div>
          {status === "error" && (
            <div className="error-message">
              <p>Couldn't load repositories: {error}</p>
              <button className="button button--ghost" onClick={refresh}>
                Try again
              </button>
            </div>
          )}
          {status === "loading" && <p className="loading-text">Fetching projects...</p>}
          <div className="projects-grid">
            {repos.map((repo) => (
              <div key={repo.id} className="project-card">
                <div className="project-card__header">
                  <h3 className="project-card__title">{repo.name}</h3>
                  <a className="project-card__link" href={repo.html_url} target="_blank" rel="noreferrer">
                    ↗
                  </a>
                </div>
                <p className="project-card__description">{repo.description || "No description available"}</p>
                <div className="project-card__footer">
                  {repo.language && (
                    <div className="project-card__language">
                      <span className="language-dot"></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="project-card__stars">⭐ {repo.stargazers_count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-section reveal-on-scroll">
          <div className="contact-content">
            <h2 className="contact-content__title">Let's Work Together</h2>
            <p className="contact-content__status">{profile.contact.status}</p>
            <p className="contact-content__schedule">{profile.contact.schedule}</p>
            <div className="contact-content__actions">
              <a className="button button--primary" href={`mailto:${profile.contact.email}`}>
                Send Email
              </a>
              <a className="button button--ghost" href={profile.github.profileUrl} target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
          <a href={profile.github.profileUrl} target="_blank" rel="noreferrer">
            Follow on GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
