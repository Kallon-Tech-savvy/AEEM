import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  category: string;
}

interface MosaicGalleryProps {
  category?: string;
  limit?: number;
}

// Ensure CustomPhoto includes our custom span properties
interface CustomPhoto {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  key: string;
  colSpan?: number;
  rowSpan?: number;
}

const FALLBACK_PHOTOS: CustomPhoto[] = [
  { src: '/assets/gallery/AEEMTEAM_Photo.jpg', width: 1080, height: 720, title: 'Team AEEM', alt: 'The core team behind the AEEM movement.', key: '1' },
  { src: '/assets/gallery/Activity.jpg', width: 720, height: 1080, title: 'Interactive Sessions', alt: 'Engaging activities during the workshop.', key: '2' }, 
  { src: '/assets/gallery/Award.jpg', width: 1080, height: 1440, title: 'Recognizing Excellence', alt: 'Award ceremony for outstanding participants.', key: '3' }, 
  { src: '/assets/gallery/Boys_Fram.jpg', width: 1080, height: 1080, title: 'Youth Leaders', alt: 'Empowered students ready to lead.', key: '4' }, 
  { src: '/assets/gallery/Girls_Fram.jpg', width: 1080, height: 720, title: 'Future Leaders', alt: 'Supporting the next generation of female leaders.', key: '5' },
  { src: '/assets/gallery/Group_Discussion.jpg', width: 1080, height: 540, title: 'Group Discussions', alt: 'Collaborative learning in action.', key: '6' }, 
  { src: '/assets/gallery/Mage_Award.jpg', width: 1080, height: 1440, title: 'Celebrating Success', alt: 'Moments of achievement.', key: '7' },
  { src: '/assets/gallery/Male_Participant.jpg', width: 720, height: 1080, title: 'Dedicated Participants', alt: 'Focused on growth and learning.', key: '8' },
  { src: '/assets/gallery/Participant_Group_Picture.jpg', width: 1080, height: 720, title: 'The AEEM Family', alt: 'A collective effort for educational change.', key: '9' },
  { src: '/assets/gallery/Teacher_and_Student.jpg', width: 1080, height: 1080, title: 'Mentorship Matters', alt: 'Building bridges between teachers and students.', key: '10' },
  { src: '/assets/gallery/AEEM boy.jpg', width: 1080, height: 720, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '11' },
  { src: '/assets/gallery/AEEMENGAGEMENTWITHMAGE.jpg', width: 720, height: 1080, title: 'Our Brand', alt: 'Engagement with mage-sl', key: '12' },
  { src: '/assets/gallery/Health.jpg', width: 1080, height: 720, title: 'Our Brand', alt: 'Health awareness.', key: '13' },
  { src: '/assets/gallery/Group_Discussion3.jpg', width: 1080, height: 1080, title: 'Our Brand', alt: 'Group discussion session.', key: '14' },
  { src: '/assets/gallery/Group_Discussion2.jpg', width: 1080, height: 720, title: 'Our Brand', alt: 'group discussion session', key: '15' },
  { src: '/assets/gallery/AEEM volunateer.jpg', width: 720, height: 1080, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '16' },
  { src: '/assets/gallery/Foods.jpg', width: 1080, height: 540, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '17' },
  { src: '/assets/gallery/Mentorship.jpg', width: 540, height: 720, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '18' },
  { src: '/assets/gallery/Engadgement with RCBank.jpg', width: 1080, height: 1440, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '19' },
  { src: '/assets/gallery/AEEMTEAM.jpg', width: 720, height: 720, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '20' },
];

/**
 * Calculates how many grid cells an image should span based on its natural dimensions.
 * This creates the "Mosaic" puzzle-piece effect.
 */
const calculateSpans = (width: number, height: number, index: number) => {
  const ratio = width / height;
  
  let colSpan = 1;
  let rowSpan = 1;

  if (ratio > 1.5) {
    // Wide Landscape
    colSpan = 2;
    rowSpan = 1;
  } else if (ratio < 0.8) {
    // Tall Portrait
    colSpan = 1;
    rowSpan = 2;
  } else {
    // Square-ish
    // We make every 5th square image large to create visual interest
    if (index % 5 === 0) {
      colSpan = 2;
      rowSpan = 2;
    } else {
      colSpan = 1;
      rowSpan = 1;
    }
  }

  return { colSpan, rowSpan };
};

const MasonryGallery: React.FC<MosaicGalleryProps> = ({ category, limit }) => {
  const [photos, setPhotos] = useState<CustomPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        let query = supabase
          .from('gallery')
          .select('*')
          .order('display_order', { ascending: true });

        if (category) {
          query = query.eq('category', category);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;

        let rawData = data && data.length > 0 ? data : FALLBACK_PHOTOS;
        if (category && rawData === FALLBACK_PHOTOS) {
            rawData = FALLBACK_PHOTOS.filter(p => p.src.includes(category));
        }

        const processedPhotos = (rawData as (GalleryImage | CustomPhoto)[]).map((item, index) => {
          const w = item.width || 1080;
          const h = item.height || 720;
          const spans = calculateSpans(w, h, index);
          
          return {
            src: 'image_url' in item ? item.image_url : item.src,
            width: w,
            height: h,
            title: item.title,
            alt: ('caption' in item ? item.caption : item.alt) || item.title,
            key: 'id' in item ? item.id : item.key,
            colSpan: spans.colSpan,
            rowSpan: spans.rowSpan
          };
        });

        setPhotos(processedPhotos);

      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [category, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aeem-gold"></div>
      </div>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* The Core Mosaic Grid
        - grid-flow-dense: Tells CSS to pack items into empty spaces
        - grid-cols-2: Mobile default (2 columns)
        - md:grid-cols-4: Tablet (4 columns)
        - lg:grid-cols-6: Desktop (6 columns)
        - auto-rows-[200px]: Defines the base height of 1 grid cell
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-flow-dense auto-rows-[200px] gap-4 sm:gap-6">
        {photos.map((photo, index) => {
          
          // Tailwind requires full classes to be present at build time, 
          // so we map our calculated spans to explicit strings.
          // Note: On mobile (2 cols), we cap col-span at 2 so it doesn't break the layout.
          const spanClasses = `
            ${photo.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
            ${photo.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}
          `;

          return (
            <div
              key={photo.key}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-aeem-charcoal/5 cursor-pointer block ${spanClasses}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                <h3 className="text-lg font-bold transform translate-y-4 group-hover:translate-y-0 text-white transition-transform duration-300">
                  {photo.title}
                </h3>
                {photo.alt && (
                  <p className="text-sm text-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                    {photo.alt}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Lightbox
        index={lightboxIndex}
        slides={photos}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
      />
    </motion.div>
  );
};

export default MasonryGallery;