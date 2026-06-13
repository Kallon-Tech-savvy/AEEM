import React, { useState, useEffect, useCallback, memo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  category: string;
}

interface CustomPhoto {
  src: string;
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

// ─── Fallback data (used when Supabase is unreachable) ───────────────────────

const FALLBACK_PHOTOS: Omit<CustomPhoto, 'colSpan' | 'rowSpan'>[] = [
  { src: '/assets/gallery/AEEMTEAM_Photo.jpg',       width: 1080, height: 720,  title: 'Team AEEM',            alt: 'The core team behind the AEEM movement.',              key: '1'  },
  { src: '/assets/gallery/Activity.jpg',              width: 720,  height: 1080, title: 'Interactive Sessions', alt: 'Engaging activities during the workshop.',              key: '2'  },
  { src: '/assets/gallery/Award.jpg',                 width: 1080, height: 1440, title: 'Recognizing Excellence',alt: 'Award ceremony for outstanding participants.',          key: '3'  },
  { src: '/assets/gallery/Boys_Fram.jpg',             width: 1080, height: 1080, title: 'Youth Leaders',        alt: 'Empowered students ready to lead.',                    key: '4'  },
  { src: '/assets/gallery/Girls_Fram.jpg',            width: 1080, height: 720,  title: 'Future Leaders',       alt: 'Supporting the next generation of female leaders.',    key: '5'  },
  { src: '/assets/gallery/Group_Discussion.jpg',      width: 1080, height: 540,  title: 'Group Discussions',    alt: 'Collaborative learning in action.',                    key: '6'  },
  { src: '/assets/gallery/Mage_Award.jpg',            width: 1080, height: 1440, title: 'Celebrating Success',  alt: 'Moments of achievement.',                             key: '7'  },
  { src: '/assets/gallery/Male_Participant.jpg',      width: 720,  height: 1080, title: 'Dedicated Participants',alt: 'Focused on growth and learning.',                     key: '8'  },
  { src: '/assets/gallery/Participant_Group_Picture.jpg', width: 1080, height: 720, title: 'The AEEM Family',   alt: 'A collective effort for educational change.',          key: '9'  },
  { src: '/assets/gallery/Teacher_and_Student.jpg',   width: 1080, height: 1080, title: 'Mentorship Matters',   alt: 'Building bridges between teachers and students.',      key: '10' },
  { src: '/assets/gallery/AEEM boy.jpg',              width: 1080, height: 720,  title: 'Our Brand',            alt: 'Africa Education Empowerment Movement.',               key: '11' },
  { src: '/assets/gallery/AEEMENGAGEMENTWITHMAGE.jpg',width: 720,  height: 1080, title: 'Community Engagement', alt: 'Engagement with MAGE-SL.',                            key: '12' },
  { src: '/assets/gallery/Health.jpg',                width: 1080, height: 720,  title: 'Health Awareness',     alt: 'Health awareness programme.',                         key: '13' },
  { src: '/assets/gallery/Group_Discussion3.jpg',     width: 1080, height: 1080, title: 'Group Discussion',     alt: 'Group discussion session.',                           key: '14' },
  { src: '/assets/gallery/Group_Discussion2.jpg',     width: 1080, height: 720,  title: 'Group Discussion',     alt: 'Group discussion session.',                           key: '15' },
  { src: '/assets/gallery/AEEM volunateer.jpg',       width: 720,  height: 1080, title: 'Volunteers',           alt: 'Africa Education Empowerment Movement volunteers.',   key: '16' },
  { src: '/assets/gallery/Foods.jpg',                 width: 1080, height: 540,  title: 'Community Lunch',      alt: 'Sharing meals together.',                             key: '17' },
  { src: '/assets/gallery/Mentorship.jpg',            width: 540,  height: 720,  title: 'Mentorship',           alt: 'One-on-one mentorship in action.',                    key: '18' },
  { src: '/assets/gallery/Engadgement with RCBank.jpg',width: 1080,height: 1440, title: 'RC Bank Partnership',  alt: 'Engagement with RC Bank.',                            key: '19' },
  { src: '/assets/gallery/AEEMTEAM.jpg',              width: 720,  height: 720,  title: 'Volunteers',           alt: 'Africa Education Empowerment Movement team.',         key: '20' },
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
  // Square-ish: every 5th gets a 2×2 hero cell for visual rhythm
  return index % 5 === 0
    ? { colSpan: 2, rowSpan: 2 }
    : { colSpan: 1, rowSpan: 1 };
};

/** Convert a raw DB row to CustomPhoto */
const fromGalleryImage = (item: GalleryImage, index: number): CustomPhoto => ({
  src: item.image_url,
  width: item.width  || 1080,
  height: item.height || 720,
  title: item.title,
  alt: item.caption || item.title,
  key: item.id,
  ...calculateSpans(item.width || 1080, item.height || 720, index),
});

/** Attach computed spans to a fallback photo */
const withSpans = (
  item: Omit<CustomPhoto, 'colSpan' | 'rowSpan'>,
  index: number,
): CustomPhoto => ({
  ...item,
  ...calculateSpans(item.width, item.height, index),
});

/** Build the fallback list, honouring category + limit filters */
const buildFallback = (category?: string, limit?: number): CustomPhoto[] => {
  let items = category
    ? FALLBACK_PHOTOS.filter(p =>
        p.src.toLowerCase().includes(category.toLowerCase()),
      )
    : FALLBACK_PHOTOS;
  if (limit) items = items.slice(0, limit);
  return items.map(withSpans);
};

// ─── Memoised grid item ───────────────────────────────────────────────────────
// Extracted so React.memo can skip re-renders when photo + onClick are stable.

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
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

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

// ─── Skeleton loader ──────────────────────────────────────────────────────────

const GallerySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-dense auto-rows-[200px] gap-4 sm:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="rounded-2xl bg-aeem-charcoal/10 animate-pulse col-span-1 row-span-1"
      />
    ))}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const MosaicGallery: React.FC<MosaicGalleryProps> = ({ category, limit }) => {
  const [photos, setPhotos]           = useState<CustomPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchGallery = async () => {
      try {
        let query = supabase
          .from('gallery')
          .select('*')
          .order('display_order', { ascending: true });

        if (category) query = query.eq('category', category);
        if (limit)    query = query.limit(limit);

        const { data, error } = await query;

        // Throw so the catch block handles both DB errors and empty results
        if (error) throw error;

        if (cancelled) return;

        const processed =
          data && data.length > 0
            ? (data as GalleryImage[]).map(fromGalleryImage)
            : buildFallback(category, limit);

        setPhotos(processed);
      } catch (err) {
        // ✅ FIX: was previously just console.error — photos stayed [] → returned null.
        // Now we always populate with fallback data on any network/DB failure.
        console.warn('Gallery fetch failed; rendering offline fallback.', err);
        if (!cancelled) setPhotos(buildFallback(category, limit));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchGallery();

    // Cleanup: ignore stale async results if props change mid-flight
    return () => { cancelled = true; };
  }, [category, limit]);

  // Stable callbacks — GalleryItem memo stays effective
  const handleOpen  = useCallback((index: number) => setLightboxIndex(index), []);
  const handleClose = useCallback(() => setLightboxIndex(-1), []);

  if (loading) return <GallerySkeleton />;
  if (photos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-dense auto-rows-[200px] gap-4 sm:gap-6">
        {photos.map((photo, index) => (
          <GalleryItem
            key={photo.key}
            photo={photo}
            index={index}
            onClick={handleOpen}
          />
        ))}
      </div>

      <Lightbox
        index={lightboxIndex}
        slides={photos}
        open={lightboxIndex >= 0}
        close={handleClose}
      />
    </motion.div>
  );
};

export default MosaicGallery;