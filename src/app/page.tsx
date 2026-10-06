import ResolveHeroBackground from "@/components/ResolveHeroBackground";
import ShinyButton from "@/components/ShinyButton";

const teams = [
  ["Ruling Party", "35 Seats", "Present and defend the Digital Youth Protection Bill, with the objective of getting the bill passed.", "🏛️"],
  ["Opposition Party", "30 Seats", "Challenge and oppose the bill, with the objective of preventing it from being passed.", "⚖️"],
  ["Independent Candidates", "25 Seats", "Present alternative viewpoints, solutions and amendments to the proposed bill.", "🕊️"],
];

const sessions = [
  ["Session 1", "9:00 AM – 10:30 AM", "Access, Age Limits & Platform Regulation"],
  ["Session 2", "11:00 AM – 12:30 PM", "Harmful Content, Deepfakes & Misinformation"],
  ["Session 3", "1:00 PM – 2:30 PM", "Freedom of Expression, Economy & The Way Forward"],
];

export default function Home() {
  return (
    <main className="parliament-page">
      <ResolveHeroBackground />
      <nav className="parliament-nav">
        <a href="#home" className="event-brand">
          <img src="/nss.svg" alt="Vignan NSS Unit" />
          <span>VIGNAN NSS</span>
        </a>
      </nav>

      <section className="parliament-hero" id="home">
        <div className="hero-kicker">Vignan institute of technology and science 
           NSS Unit presents</div>
        <img className="hero-logo" src="/par.webp" alt="Parliament 2K26" fetchPriority="high" />
        <p className="hero-tagline">Debate <i>|</i> Discuss <i>|</i> Decide</p>
        <p className="hero-intro">Your voice. Your argument. Your decision.</p>
        <div className="hero-actions">
          <ShinyButton href="/register">Register now <span>→</span></ShinyButton>
        </div>
        <div className="event-marquee" aria-label="Parliament event highlights">
          <div className="event-marquee-track">
            <span>Digital Youth Protection Bill</span><b>★</b>
            <span>Debate</span><b>★</b>
            <span>Discuss</span><b>★</b>
            <span>Decide</span><b>★</b>
            <span>Vignan NSS Unit</span><b>★</b>
            <span>Digital Youth Protection Bill</span><b>★</b>
            <span>Debate</span><b>★</b>
            <span>Discuss</span><b>★</b>
            <span>Decide</span><b>★</b>
            <span>Vignan NSS Unit</span><b>★</b>
          </div>
        </div>
      </section>

      <section className="content-section theme-section" id="theme">
        <h2>Freedom to Scroll<br /><em>or Right to be Protected?</em></h2>
        <div className="motion-card">
          <span className="motion-label">Motion</span>
          <h3>“The Digital Youth Protection Bill, 2026”</h3>
          <p>Should India introduce stricter age-based regulation of social media platforms while preserving freedom of expression and digital rights?</p>
        </div>
        <div className="details-row">
          <div className="detail-card">
            <img src="/calendar-animation.svg" alt="" />
            <span>Date</span>
            <strong>TBA</strong>
          </div>
          <div className="detail-card">
            <img src="/location-pin.svg" alt="" />
            <span>Venue</span>
            <strong>TBA</strong>
          </div>
          <div className="detail-card">
            <img src="/users.svg" alt="" />
            <span>Participants</span>
            <strong>90</strong>
          </div>
        </div>
      </section>

      <section className="content-section" id="teams">
        <p className="section-label">Choose your side</p>
        <h2>Three voices. <em>One house.</em></h2>
        <div className="teams-grid">
          {teams.map(([title, seats, description, icon]) => (
            <article className="team-card" key={title}>
              <span className="team-icon">{icon}</span>
              <span className="team-seats">{seats}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section sessions-section" id="sessions">
        <p className="section-label">The day in session</p>
        <h2>Three rounds of <em>serious debate.</em></h2>
        <img className="session-image" src="/session.webp" alt="Parliament session schedule" loading="lazy" />
      </section>

      <section className="score-section">
        <div>
          <p className="section-label">How it works</p>
          <h2>Every argument<br /><em>counts.</em></h2>
          <p>Every participant contributes to the overall score through their individual performance.</p>
        </div>
        <div className="score-card">
          <img className="scoreboard-image" src="/scoreboard.webp" alt="Participant and judge scoreboard breakdown" loading="lazy" />
        </div>
      </section>

      <section className="outcomes-section">
        <h2>Recognition <em>&amp; Results</em></h2>
        <img className="plaques-image" src="/plaques.webp" alt="Final outcomes plaques" loading="lazy" />
      </section>

      <section className="prize-section" id="contact">
        <div className="prize-images">
          <img src="/cash-prize.webp" alt="₹5,000 cash prize" loading="lazy" />
        </div>
        <div className="prize-copy">
          <p className="prize-win-title">Win up to</p>
          <div className="prize-copy-details">
            <p className="section-label">Make your argument count</p>
            <h2>Step up.<br /><em>Speak out.</em></h2>
            <p>Bring your perspective to the house. Make your argument count and stand a chance to win the cash prize.</p>
          </div>
        </div>
      </section>

      <footer className="parliament-footer">
        <ResolveHeroBackground />
        <div className="footer-topline">
          <span>VIGNAN NSS</span>
          <span>PARLIAMENT <b>2K26</b></span>
        </div>
        <div className="footer-main">
          <div className="footer-identity">
            <div className="footer-logos">
              <img className="college-logo" src="/college-logo.webp" alt="Vignan Institute of Technology and Science" loading="lazy" />
              <img className="nss-footer-logo" src="/nss.svg" alt="Vignan NSS Unit" />
            </div>
            <h2>Vignan Institute of<br /><em>Technology and Science.</em></h2>
            <p>Debate. Discuss. Decide.</p>
          </div>
          <div className="footer-contacts">
            <span>Coordinator contacts</span>
            <a href="tel:9063939760"><b>01</b><span>Sai Teja</span><strong>90639 39760</strong><i>↗</i></a>
            <a href="tel:+917386716391"><b>02</b><span>Venu</span><strong>+91 73867 16391</strong><i>↗</i></a>
            <a href="tel:+917702227879"><b>03</b><span>Sanjana</span><strong>+91 77022 27879</strong><i>↗</i></a>
          </div>
        </div>
        <div className="footer-bottomline"><span>Vignan NSS Unit presents</span><span>© 2026</span></div>
        <small className="footer-credit">Designed and developed by <a href="https://shubhamgundu.in" target="_blank" rel="noreferrer">shubhamgundu.in</a></small>
      </footer>
    </main>
  );
}
