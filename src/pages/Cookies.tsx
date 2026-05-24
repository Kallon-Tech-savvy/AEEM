import SectionHeader from '../components/SectionHeader'

export default function Cookies() {
  return (
    <div className='policy-page'>
      <SectionHeader
        title='Cookies Policy'
        description='How AEEM uses cookies and similar technologies to improve your experience.'
      />
      <div className='policy-copy'>
        <section>
          <h3>What are cookies?</h3>
          <p>Cookies are small files stored on your device that help the site remember preferences and support basic functionality.</p>
        </section>
        <section>
          <h3>How we use cookies</h3>
          <p>AEEM uses cookies to keep sessions secure, improve navigation, and understand how visitors interact with the site so we can make it easier to use.</p>
        </section>
        <section>
          <h3>Manage your settings</h3>
          <p>You can manage or disable cookies through your browser settings. Disabling cookies may affect how some parts of AEEM work.</p>
        </section>
      </div>
    </div>
  )
}
