import { Button } from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { faqItems } from '../data/faq'

export default function Contact() {
  return (
    <>
      <section className='section-block'>
        <SectionHeader
          title='Contact AEEM'
          description='Have a question, want to collaborate, or need support? Use the links below to connect with our team and learn how AEEM can help your community.'
        />
        <section className='contact-panel'>
          <h3>Get in touch</h3>
          <p>Email us at <strong>africaeducationempowermentmov@gmail.com</strong> or send a request through the community support channel.</p>
          <div className='button-row'>
            <Button variant='primary' as='a' href='mailto:africaeducationempowermentmov@gmail.com'>Email AEEM</Button>
            <Button variant='secondary' as='a' href='/'>Return home</Button>
          </div>
        </section>
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