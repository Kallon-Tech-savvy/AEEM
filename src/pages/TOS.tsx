import SectionHeader from '../components/SectionHeader'

export default function TOS() {
  return (
    <div className='policy-page'>
      <SectionHeader
        title='Terms of Service'
        description='The terms that govern your use of AEEM resources and digital services.'
      />
      <div className='policy-copy'>
        <section>
          <h3>Acceptance</h3>
          <p>By using AEEM, you agree to act responsibly and respect community values, privacy, and the purpose of the platform.</p>
        </section>
        <section>
          <h3>Use of services</h3>
          <p>AEEM content is provided for informational and educational purposes. You may not misuse the site, interfere with functionality, or attempt to access restricted areas.</p>
        </section>
        <section>
          <h3>Content ownership</h3>
          <p>AEEM owns the website content, branding, and educational assets. You may share links and summaries but must not republish or alter content without permission.</p>
        </section>
        <section>
          <h3>Responsibilities</h3>
          <p>Users are expected to provide accurate information when interacting with AEEM and to communicate respectfully with other community members.</p>
        </section>
        <section>
          <h3>Limitations</h3>
          <p>AEEM does not guarantee perfect availability, suitability, or accuracy of every resource. We aim for care and reliability, but users access materials at their own discretion.</p>
        </section>
      </div>
    </div>
  )
}
