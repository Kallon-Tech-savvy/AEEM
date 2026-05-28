import SectionHeader from '../data/components/SectionHeader'

export default function TOS() {
  return (
    <div className='page-shell'>
      <SectionHeader
        title='Terms of Service'
        description='The terms that govern your use of AEEM resources and digital services.'
      />
      <div className='cards-grid' style={{ marginTop: '3rem' }}>
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <h3 className='card-title-editorial'>Acceptance & Responsibilities</h3>
          <p className='card-text-muted'>By using AEEM, you agree to act responsibly and respect community values, privacy, and the purpose of the platform. Users are expected to provide accurate information when interacting with AEEM and to communicate respectfully with other community members.</p>
        </section>
        
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <h3 className='card-title-editorial'>Use of Services</h3>
          <p className='card-text-muted'>AEEM content is provided for informational and educational purposes. You may not misuse the site, interfere with functionality, or attempt to access restricted areas.</p>
        </section>
        
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <h3 className='card-title-editorial'>Content Ownership</h3>
          <p className='card-text-muted'>AEEM owns the website content, branding, and educational assets. You may share links and summaries but must not republish or alter content without permission.</p>
        </section>

        <section className='info-card glass-premium-card micro-glow-interaction'>
          <h3 className='card-title-editorial'>Limitations</h3>
          <p className='card-text-muted'>AEEM does not guarantee perfect availability, suitability, or accuracy of every resource. We aim for care and reliability, but users access materials at their own discretion.</p>
        </section>
      </div>
    </div>
  )
}