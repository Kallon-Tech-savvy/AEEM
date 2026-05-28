import { useEffect } from 'react'
import { type GalleryImage } from '../Images'

import '../../assets/styles/lightbox.css'

type LightboxProps = {
  image: GalleryImage
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

export default function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && hasPrev) onPrev()
      if (event.key === 'ArrowRight' && hasNext) onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div className='lightbox-overlay' role='dialog' aria-modal='true' onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className='lightbox-frame'>
        <button type='button' className='lightbox-close' onClick={onClose} aria-label='Close full resolution view'>×</button>
        <div className='lightbox-content'>
          <img className='lightbox-image' src={image.src} alt={image.alt} loading='eager' />
          <div className='lightbox-copy'>
            <h3>{image.alt}</h3>
            <p>Tap the arrows or press the arrow keys to move through full-resolution award images.</p>
          </div>
        </div>
        <div className='lightbox-controls'>
          <button type='button' className='lightbox-action' onClick={onPrev} disabled={!hasPrev} aria-label='Previous image'>← Previous</button>
          <button type='button' className='lightbox-action' onClick={onNext} disabled={!hasNext} aria-label='Next image'>Next →</button>
        </div>
      </div>
    </div>
  )
}
