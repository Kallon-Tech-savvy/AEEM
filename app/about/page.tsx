import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AEEM - Our Mission and Vision',
  description: 'Learn about the Africa Education Empowerment Movement, our mission, values, and commitment to educational transformation across the continent.',
}

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container-safe">
          <div className="max-w-3xl">
            <h1 className="mb-8">
              Empowering Africa Through <span className="text-aeem-gold">Education</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The Africa Education Empowerment Movement (AEEM) is a pan-African initiative dedicated to transforming the educational landscape by ensuring that every child, regardless of socioeconomic background or geographical location, has access to quality, inclusive, and equitable education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-aeem-light">
        <div className="container-safe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To pioneer inclusive, equitable, and quality education across the African continent through community-led action, innovative mentorship, and systemic empowerment, ensuring that education becomes a catalyst for sustainable development and personal transformation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                A continent where educational excellence is accessible to all, where communities are empowered to lead their own development, and where Africa's youth are equipped with the skills and knowledge to become global leaders and agents of change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container-safe">
          <h2 className="text-4xl font-black mb-16 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Clarity', desc: 'Transparent communication and honest dialogue guide our actions' },
              { title: 'Care', desc: 'Deep commitment to the wellbeing of every individual we serve' },
              { title: 'Community', desc: 'Collective action and shared responsibility for change' },
            ].map((value, i) => (
              <div key={i} className="p-8 bg-aeem-light rounded-3xl hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-aeem-gold">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-aeem-charcoal text-white">
        <div className="container-safe">
          <h2 className="text-4xl font-black mb-12">Our Story</h2>
          <div className="max-w-3xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              AEEM was born from the recognition that Africa's greatest asset is its youth. Yet, millions of young Africans lack access to quality education that would unlock their potential and enable them to contribute meaningfully to their communities and the world.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Founded on the principle that education is a fundamental human right, we have committed ourselves to dismantling systemic barriers that perpetuate educational inequality. Through strategic partnerships, innovative programs, and community engagement, we are building a movement that places education at the center of Africa's development agenda.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Today, AEEM operates across 24 countries, reaching over 150 communities and empowering thousands of young people through scholarships, mentorship, and skill development programs. But our work has only just begun.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
