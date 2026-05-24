const mediaItems = [
  {
    title: 'Sketch notes',
    description: 'Hand-drawn systems, storyboards, and quick idea sketches that bring AEEM’s thinking to life.',
    variant: 'sketch',
  },
  {
    title: 'Geometry studies',
    description: 'Structured layout studies, angles, and forms that reflect the movement’s clean visual language.',
    variant: 'geometry',
  },
  {
    title: 'Pattern systems',
    description: 'Bold pattern textures and repeat graphics for impact screens, cards, and visual storytelling.',
    variant: 'patterns',
  },
]

function MediaArtwork({ variant }: { variant: 'sketch' | 'geometry' | 'patterns' }) {
  if (variant === 'sketch') {
    return (
      <svg viewBox='0 0 320 220' aria-hidden='true' className='media-art'>
        <rect x='12' y='12' width='296' height='196' rx='20' fill='rgba(255,255,255,0.08)' />
        <path d='M36 60c28-18 56 20 84 2 28-18 56 8 84-10' stroke='#f1c378' strokeWidth='4' fill='none' strokeLinecap='round' />
        <path d='M46 98c16-10 34 16 52 4 18-12 36 10 54-2' stroke='#d78fbf' strokeWidth='3' fill='none' strokeLinecap='round' />
        <circle cx='76' cy='150' r='18' fill='rgba(95,215,199,0.18)' />
        <path d='M116 142l32 22M132 146l-24 16' stroke='#fff' strokeWidth='3' strokeLinecap='round' />
        <path d='M220 48h56M220 70h40M220 92h24' stroke='#fff' strokeWidth='4' strokeLinecap='round' opacity='0.7' />
      </svg>
    )
  }

  if (variant === 'geometry') {
    return (
      <svg viewBox='0 0 320 220' aria-hidden='true' className='media-art'>
        <rect x='10' y='10' width='300' height='200' rx='22' fill='rgba(255,255,255,0.06)' />
        <circle cx='90' cy='80' r='36' fill='rgba(241,199,120,0.28)' />
        <rect x='180' y='44' width='84' height='84' rx='18' fill='rgba(95,215,199,0.22)' />
        <path d='M62 172l62-90 58 84' stroke='#fff' strokeWidth='5' fill='none' strokeLinecap='round' />
        <circle cx='242' cy='168' r='22' fill='rgba(215,143,191,0.22)' />
      </svg>
    )
  }

  return (
    <svg viewBox='0 0 320 220' aria-hidden='true' className='media-art'>
      <rect x='8' y='8' width='304' height='204' rx='24' fill='rgba(255,255,255,0.05)' />
      <path d='M24 64h272M24 92h272M24 120h272M24 148h272' stroke='rgba(255,255,255,0.1)' strokeWidth='4' />
      <path d='M56 46l28 28M96 46l-20 20M180 172l32-32M220 172l-24 24' stroke='rgba(241,199,120,0.7)' strokeWidth='6' strokeLinecap='round' />
      <circle cx='104' cy='154' r='12' fill='rgba(95,215,199,0.9)' />
      <circle cx='236' cy='72' r='16' fill='rgba(215,143,191,0.7)' />
      <circle cx='196' cy='108' r='10' fill='rgba(255,255,255,0.9)' />
    </svg>
  )
}

export default function MediaGallery() {
  return (
    <section className='section-block media-block'>
      <div className='section-heading'>
        <h2>Visual media, sketches, and geometry</h2>
        <p>
          Explore the expressive media elements that help AEEM communicate through pattern, form, and feel.
          These visuals support the platform’s voice while keeping the experience human-led.
        </p>
      </div>
      <div className='media-grid'>
        {mediaItems.map((item) => (
          <article key={item.title} className='media-card'>
            <MediaArtwork variant={item.variant as 'sketch' | 'geometry' | 'patterns'} />
            <div className='media-copy'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
