import { Button } from '../data/components/Button'
import SectionHeader from '../data/components/SectionHeader'
import ValidatedContactForm from '../data/components/ValidatedContactForm'
import { faqItems } from '../data/faq'

export default function Contact() {
  return (
    <>
      <section className='section-block'>
        <SectionHeader
          title='Contact AEEM'
          description='Have a question, want to collaborate, or need support? Use the contact form below for immediate input validation and a clear next step.'
        />
        <section className='contact-panel'>
          <h3>Get in touch</h3>
          <p>
            Email us at <strong>africaeducationempowermentmov@gmail.com</strong> or describe your request below.
            We read every message and respond with relevant next steps.
          </p>
          <div className='button-row'>
            <Button variant='primary' as='a' href='mailto:africaeducationempowermentmov@gmail.com'>Email AEEM</Button>
            <Button variant='secondary' as='a' href='/'>Return home</Button>
          </div>
        </section>
      </section>

      <section className='section-block'>
        <ValidatedContactForm />
      </section>

      <section className='section-block'>
        <SectionHeader
          title='Common questions'
          description='Find quick answers to common questions about AEEM, how to access programs, and how to partner with the movement.'
        />
        <div className='faq-grid'>
          {faqItems.map((item) => (
            <article key={item.id} className='faq-item'>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
