import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

const Lightbox = React.lazy(() => import('yet-another-react-lightbox'));

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomPhoto {
  src: string;
  fileName: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  key: string;
  colSpan: number;
  rowSpan: number;
}

interface MosaicGalleryProps {
  category?: string;
  limit?: number;
}

// ─── Local optimized asset data ───────────────────────

const LOCAL_PHOTOS: Omit<CustomPhoto, 'colSpan' | 'rowSpan'>[] = [
  { src: '/assets/gallery/AEEMTEAM_Photo.jpg',       fileName: 'AEEMTEAM_Photo',       width: 1080, height: 720,  title: 'Team AEEM',            alt: 'The core team behind the AEEM movement.',              key: '1'  },
  { src: '/assets/gallery/Activity.jpg',              fileName: 'Activity',              width: 720,  height: 1080, title: 'Interactive Sessions', alt: 'Engaging activities during the workshop.',              key: '2'  },
  { src: '/assets/gallery/Award.jpg',                 fileName: 'Award',                 width: 1080, height: 1440, title: 'Recognizing Excellence',alt: 'Award ceremony for outstanding participants.',          key: '3'  },
  { src: '/assets/gallery/Boys_Fram.jpg',             fileName: 'Boys_Fram',             width: 720, height: 1080, title: 'Youth Leaders',        alt: 'Empowered students ready to lead.',                    key: '4'  },
  { src: '/assets/gallery/Girls_Fram.jpg',            fileName: 'Girls_Fram',            width: 1080, height: 720,  title: 'Future Leaders',       alt: 'Supporting the next generation of female leaders.',    key: '5'  },
  { src: '/assets/gallery/Group_Discussion.jpg',      fileName: 'Group_Discussion',      width: 1080, height: 540,  title: 'Group Discussions',    alt: 'Collaborative learning in action.',                    key: '6'  },
  { src: '/assets/gallery/Mage_Award.jpg',            fileName: 'Mage_Award',            width: 1080, height: 1440, title: 'Celebrating Success',  alt: 'Moments of achievement.',                             key: '7'  },
  { src: '/assets/gallery/Male_Participant.jpg',      fileName: 'Male_Participant',      width: 720,  height: 1080, title: 'Dedicated Participants',alt: 'Focused on growth and learning.',                     key: '8'  },
  { src: '/assets/gallery/Participant_Group_Picture.jpg', fileName: 'Participant_Group_Picture', width: 1080, height: 720, title: 'The AEEM Family',   alt: 'A collective effort for educational change.',          key: '9'  },
  { src: '/assets/gallery/Teacher_and_Student.jpg',   fileName: 'Teacher_and_Student',   width: 1080, height: 1080, title: 'Mentorship Matters',   alt: 'Building bridges between teachers and students.',      key: '10' },
  { src: '/assets/gallery/AEEM boy.jpg',              fileName: 'AEEM boy',              width: 1080, height: 720,  title: 'Our Brand',            alt: 'Africa Education Empowerment Movement.',               key: '11' },
  { src: '/assets/gallery/AEEMENGAGEMENTWITHMAGE.jpg',fileName: 'AEEMENGAGEMENTWITHMAGE',width: 720,  height: 1080, title: 'Community Engagement', alt: 'Engagement with MAGE-SL.',                            key: '12' },
  { src: '/assets/gallery/Health.jpg',                fileName: 'Health',                width: 1080, height: 720,  title: 'Health Awareness',     alt: 'Health awareness programme.',                         key: '13' },
  { src: '/assets/gallery/Group_Discussion3.jpg',     fileName: 'Group_Discussion3',     width: 1080, height: 1080, title: 'Group Discussion',     alt: 'Group discussion session.',                           key: '14' },
  { src: '/assets/gallery/Group_Discussion2.jpg',     fileName: 'Group_Discussion2',     width: 1080, height: 720,  title: 'Group Discussion',     alt: 'Group discussion session.',                           key: '15' },
  { src: '/assets/gallery/AEEM volunateer.jpg',       fileName: 'AEEM volunateer',       width: 720,  height: 1080, title: 'Volunteers',           alt: 'Africa Education Empowerment Movement volunteers.',   key: '16' },
  { src: '/assets/gallery/Foods.jpg',                 fileName: 'Foods',                 width: 1080, height: 540,  title: 'Community Lunch',      alt: 'Sharing meals together.',                             key: '17' },
  { src: '/assets/gallery/Mentorship.jpg',            fileName: 'Mentorship',            width: 540,  height: 720,  title: 'Mentorship',           alt: 'One-on-one mentorship in action.',                    key: '18' },
  { src: '/assets/gallery/Engadgement with RCBank.jpg',fileName: 'Engadgement with RCBank',width: 720,height: 720, title: 'RC Bank Partnership',  alt: 'Engagement with RC Bank.',                            key: '19' },
  { src: '/assets/gallery/AEEMTEAM.jpg',              fileName: 'AEEMTEAM',              width: 720,  height: 720,  title: 'Team Collaboration',   alt: 'Africa Education Empowerment Movement team.',         key: '20' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const calculateSpans = (
  width: number,
  height: number,
  index: number,
): { colSpan: number; rowSpan: number } => {
  const ratio = width / height;

  if (ratio > 1.5) return { colSpan: 2, rowSpan: 1 };   // wide landscape
  if (ratio < 0.8)  return { colSpan: 1, rowSpan: 2 };   // tall portrait
  return index % 5 === 0
    ? { colSpan: 2, rowSpan: 2 }
    : { colSpan: 1, rowSpan: 1 };
};

const withSpans = (
  item: Omit<CustomPhoto, 'colSpan' | 'rowSpan'>,
  index: number,
): CustomPhoto => ({
  ...item,
  ...calculateSpans(item.width, item.height, index),
});

// ─── Memoised grid item ───────────────────────────────────────────────────────

interface GalleryItemProps {
  photo: CustomPhoto;
  index: number;
  onClick: (index: number) => void;
}

const GalleryItem = memo(({ photo, index, onClick }: GalleryItemProps) => {
  const spanClass = [
    photo.colSpan === 2 ? 'col-span-2' : 'col-span-1',
    photo.rowSpan === 2 ? 'row-span-2' : 'row-span-1',
  ].join(' ');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo.title}`}
      onClick={() => onClick(index)}
      onKeyDown={e => e.key === 'Enter' && onClick(index)}
      className={`group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-aeem-charcoal/5 cursor-pointer ${spanClass}`}
    >
      <picture>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </picture>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
        <h3 className="text-lg font-bold translate-y-4 group-hover:translate-y-0 text-white transition-transform duration-300">
          {photo.title}
        </h3>
        {photo.alt && (
          <p className="text-sm text-gray-200 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
            {photo.alt}
          </p>
        )}
      </div>
    </div>
  );
});

GalleryItem.displayName = 'GalleryItem';

// ─── Main component ───────────────────────────────────────────────────────────

const MosaicGallery: React.FC<MosaicGalleryProps> = ({ category, limit }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  let photos = category
    ? LOCAL_PHOTOS.filter(p => p.src.toLowerCase().includes(category.toLowerCase()))
    : LOCAL_PHOTOS;

  if (limit) photos = photos.slice(0, limit);
  const processedPhotos = photos.map(withSpans);

  const handleOpen  = useCallback((index: number) => {
    if (!document.getElementById('yalr-styles')) {
      const link = document.createElement('link')
      link.id = 'yalr-styles'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/yet-another-react-lightbox@3.32.0/dist/styles.css'
      document.head.appendChild(link)
    }
    setLightboxIndex(index)
  }, []);
  const handleClose = useCallback(() => setLightboxIndex(-1), []);

  if (processedPhotos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-dense auto-rows-[200px] gap-4 sm:gap-6">
        {processedPhotos.map((photo, index) => (
          <GalleryItem
            key={photo.key}
            photo={photo}
            index={index}
            onClick={handleOpen}
          />
        ))}
      </div>

      {lightboxIndex >= 0 && (
        <React.Suspense fallback={null}>
          <Lightbox
            index={lightboxIndex}
            slides={processedPhotos.map(p => ({ src: p.src, alt: p.alt, title: p.title }))}
            open={lightboxIndex >= 0}
            close={handleClose}
          />
        </React.Suspense>
      )}
    </motion.div>
  );
};

export default MosaicGallery;
