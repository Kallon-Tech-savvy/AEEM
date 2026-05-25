import { Button } from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import { AEEM_MISSION_TEXT } from '../constants/copy'

export default function About() {
  return (
    <>
      <section className='section-block'>
        <SectionHeader
          title='About AEEM'
          description={AEEM_MISSION_TEXT}
        />
        <Button variant='primary' as='a' href='/contact'>Reach our team</Button>
      </section>
    </>
  )
}