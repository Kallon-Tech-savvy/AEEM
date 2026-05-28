import { useState } from 'react';
import type { FormEvent } from 'react';

export default function GetInvolve() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('success');
  };

  return (
    <main className="page-shell">
      <header className="hero-panel section-heading--center">
        <h1 className="cinematic-headline">Become a <span className="editorial-text">Catalyst</span></h1>
        <p className="hero-text" style={{ margin: '1.5rem auto 0' }}>
          Step up as a noble member of our family, or align as an institutional partner to deploy large-scale frameworks.
        </p>
      </header>

      {/* Split Grid: Individual vs. Institutional */}
      <div className="premium-editorial-grid structural-alignment-zone" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        
        {/* The Lead Gen Form */}
        <section className="contact-panel">
          <div className="section-heading" style={{ marginBottom: '1.5rem' }}>
            <span className="label-caps">01 // Individuals</span>
            <h2>Join the Family</h2>
          </div>
          
          <form className="volunteer-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-field__label" htmlFor="name">System Designation (Name)</label>
              <input type="text" id="name" className="form-input" required placeholder="Jane Doe" />
            </div>
            
            <div className="form-field" style={{ marginTop: '1rem' }}>
              <label className="form-field__label" htmlFor="email">Comms Link (Email)</label>
              <input type="email" id="email" className="form-input" required placeholder="jane@example.com" />
            </div>
            
            <div className="form-field" style={{ marginTop: '1rem' }}>
              <label className="form-field__label" htmlFor="focus">Primary Focus</label>
              <select id="focus" className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="capacity">Capacity Building</option>
                <option value="advocacy">Public Health Advocacy</option>
                <option value="tech">Tech & Design</option>
              </select>
            </div>

            <div className="volunteer-actions" style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn-primary">Initiate Sequence</button>
              {status === 'success' && <span className="form-status--success label-caps">↳ Received</span>}
            </div>
          </form>
        </section>

        {/* Institutional Contact */}
        <section className="contact-panel">
          <div className="section-heading" style={{ marginBottom: '1.5rem' }}>
            <span className="label-caps">02 // Organizations</span>
            <h2>Institutional Partners</h2>
          </div>

          <div className="info-card glass-premium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p className="card-text-muted" style={{ marginBottom: '2rem' }}>
                For NGOs, government agencies, and corporate sponsors looking to co-author our next intervention campaign. Excellence through transparency.
              </p>
              <ul className="card-text-muted" style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
                <li style={{ borderBottom: '1px solid var(--stark-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>✓ Policy Reform Collaboration</li>
                <li style={{ borderBottom: '1px solid var(--stark-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>✓ Resource Allocation frameworks</li>
                <li>✓ Direct implementing partnerships</li>
              </ul>
            </div>
            
            <a href="mailto:partnerships@aeem.org" className="button button-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Open Dialogue
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}