import SectionHeader from '../data/components/SectionHeader'
import PhotoGallery from '../data/components/PhotoGallery'

export default function Awards() {
  return (
    <>
      <SectionHeader
        title='Our Awardees'
        description='See community recognition captured in a responsive masonry gallery with animated full-resolution viewing.'
      />
      <PhotoGallery />
    </>
  )
}
