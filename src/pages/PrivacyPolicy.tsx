import SectionHeader from '../data/components/SectionHeader'

export default function PrivacyPolicy() {
  return (
    <div className='page-shell'>
      <SectionHeader
        title='Privacy Policy'
        description='How AEEM collects, uses, and protects your information.'
      />
      <div className='cards-grid' style={{ marginTop: '3rem' }}>
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <span className="label-caps">Collection </span>
          <h3 className='card-title-editorial' style={{ marginTop: '0.75rem' }}>What we collect</h3>
          <p className='card-text-muted'>We may collect contact details, voluntary survey responses, and usage data to improve education pathways and community support. Data is used to make AEEM more accessible and trustworthy.</p>
        </section>
        
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <span className="label-caps">Info </span>
          <h3 className='card-title-editorial' style={{ marginTop: '0.75rem' }}>How we use information</h3>
          <p className='card-text-muted'>Information is used to communicate updates, support safe access, and refine digital experience design. Personal data is not sold or shared for advertising purposes.</p>
        </section>
        
        <section className='info-card glass-premium-card micro-glow-interaction'>
          <span className="label-caps">Protection</span>
          <h3 className='card-title-editorial' style={{ marginTop: '0.75rem' }}>Data protection</h3>
          <p className='card-text-muted'>We protect information with reasonable administrative and technical safeguards. Individuals may contact us to request corrections, access, or deletion of their data.</p>
        </section>
      </div>
    </div>
  )
}