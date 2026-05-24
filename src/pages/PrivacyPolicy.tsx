import SectionHeader from '../components/SectionHeader'

export default function PrivacyPolicy() {
  return (
    <div className='policy-page'>
      <SectionHeader
        title='Privacy Policy'
        description='How AEEM collects, uses, and protects your information.'
      />
      <div className='policy-copy'>
        <p>AEEM collects only the information needed to support community access and program delivery. We aim for transparency, minimal data collection, and secure handling of personal information.</p>
        <section>
          <h3>What we collect</h3>
          <p>We may collect contact details, voluntary survey responses, and usage data to improve education pathways and community support. Data is used to make AEEM more accessible and trustworthy.</p>
        </section>
        <section>
          <h3>How we use information</h3>
          <p>Information is used to communicate updates, support safe access, and refine digital experience design. Personal data is not sold or shared for advertising purposes.</p>
        </section>
        <section>
          <h3>Data protection</h3>
          <p>We protect information with reasonable administrative and technical safeguards. Individuals may contact us to request corrections, access, or deletion of their data.</p>
        </section>
      </div>
    </div>
  )
}
