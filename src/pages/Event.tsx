import { useState, type MouseEvent, useRef } from 'react';

// Optimized spatial card for immediate tactile feedback
function PerspectiveCard({ title, date, location, seats }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`perspective(1000px) rotateX(${-(y / 20)}deg) rotateY(${x / 20}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  return (
    <div 
      ref={cardRef}
      className="premium-card micro-glow-interaction"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')}
      style={{ transform, transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      <span className="label-caps">{date}</span>
      <h3 className="card-title-editorial" style={{ margin: '1rem 0' }}>{title}</h3>
      <p className="card-text-muted" style={{ marginBottom: '2rem' }}>
        📍 {location} <br/> 
        <span className="gold-text">↳ {seats} Seats Remaining</span>
      </p>
      <button className="btn-primary" style={{ width: '100%' }}>Reserve Seat</button>
    </div>
  );
}

export default function Event() {
  return (
    <main className="page-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <span className="label-caps">AEEM Engagements</span>
          <h1 className="cinematic-headline">Action & <span className="editorial-text">Impact</span></h1>
          <p className="hero-text">Join the movement. Register for upcoming summits or explore the legacy of our on-the-ground initiatives.</p>
        </div>
      </header>

      {/* High-Conversion Upcoming Pipeline */}
      <section className="structural-alignment-zone">
        <div className="section-heading" style={{ marginBottom: '2rem' }}>
          <span className="eyebrow">Intent → Commitment</span>
          <h2>Upcoming</h2>
        </div>
        <div className="spotlight-grid">
          <PerspectiveCard 
            title="Youth Empowerment Summit" 
            date="August 12, 2026" 
            location="Freetown" 
            seats={45} 
          />
          {/* Add more upcoming events here. The grid handles the space. */}
        </div>
      </section>

      {/* Archive Pipeline */}
      <section className="structural-alignment-zone alignment-minimal">
        <div className="section-heading" style={{ marginBottom: '2rem' }}>
          <span className="eyebrow">Our Legacy</span>
          <h2>Past Initiatives</h2>
        </div>
        <div className="cards-grid">
          <article className="info-card glass-premium-card micro-glow-interaction">
            <span className="label-caps">January 2025</span>
            <h3 className="card-title-editorial">"I am Somebody" Workshop</h3>
            <p className="card-text-muted" style={{ marginTop: '0.5rem' }}>Human capacity building and youth leadership frameworks.</p>
          </article>
          
          <article className="info-card glass-premium-card micro-glow-interaction">
            <span className="label-caps">November 2025</span>
            <h3 className="card-title-editorial">Anti-Kush Campaign</h3>
            <p className="card-text-muted" style={{ marginTop: '0.5rem' }}>Public awareness and community health intervention.</p>
          </article>
        </div>
      </section>
    </main>
  );
}