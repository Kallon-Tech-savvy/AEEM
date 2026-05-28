import SectionHeader from '../data/components/SectionHeader'

export default function TOC() {
  return (
    <div className='policy-page'>
      <SectionHeader
        eyebrow='Theory of Change'
        title='Our plan for meaningful education access'
        description='The Theory of Change behind AEEM explains how layered community work creates lasting educational opportunity.'
      />
      <div className='policy-copy'>
        <section>
          <h3>Inputs</h3>
          <p>AEEM blends youth leadership, community insight, digital tools, and trusted partner networks to make education information more visible and reliable.</p>
        </section>
        <section>
          <h3>Activities</h3>
          <p>We co-design pathways, publish accessible learning resources, and support secure information sharing for families, schools, and local organizations.</p>
        </section>
        <section>
          <h3>Outputs</h3>
          <p>The result is clearer program guidance, faster access to support, and navigable resources that reduce confusion for learners and caregivers.</p>
        </section>
        <section>
          <h3>Outcomes</h3>
          <p>Communities gain confidence, decision-makers build trust, and more children can connect with education through informed, safe digital interactions.</p>
        </section>
        <section>
          <h3>Impact</h3>
          <p>AEEM helps create a future where every child has equitable learning opportunities and communities can navigate education systems with dignity, transparency, and care.</p>
        </section>
      </div>
    </div>
  )
}
