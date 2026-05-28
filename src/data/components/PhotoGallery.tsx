import { useState } from 'react'
import Lightbox from './Lightbox'
import { Image } from '../Images'
import SectionHeader from './SectionHeader'
import '../../assets/styles/Gallery.css'

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedImage = selectedIndex !== null ? Image[selectedIndex] : null

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => setSelectedIndex(null)
  const showNext = () => setSelectedIndex((current) => (current === null ? null : (current + 1) % Image.length))
  const showPrev = () => setSelectedIndex((current) => (current === null ? null : (current - 1 + Image.length) % Image.length))

  return (
    <>
      <SectionHeader title='Gallery' description='' />

      <section className='section-block gallery-block'>
        <div className='gallery-grid'>
          {Image.map((item, index) => (
            <button
              type='button'
              key={item.id}
              className='gallery-item'
              style={{ aspectRatio: item.ratio }}
              onClick={() => openLightbox(index)}
              aria-label={`View full resolution image of ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className='gallery-thumb'
                loading='lazy'
              />
              <span className='gallery-label'>{item.alt}</span>
            </button>
          ))}
        </div>

        {selectedImage ? (
          <Lightbox
            image={selectedImage}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
            hasPrev={Image.length > 1}
            hasNext={Image.length > 1}
          />
        ) : null}
      </section>
    </>
  )
}
