import React, { useState, useEffect } from 'react';
import PhotoAlbum, { Photo } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'react-photo-album/styles.css';
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

interface MasonryGalleryProps {
  category?: string;
  limit?: number;
}

interface CustomPhoto extends Photo {
  title: string;
  alt: string;
}

const FALLBACK_PHOTOS: CustomPhoto[] = [
  { src: '/assets/gallery/AEEMTEAM_Photo.jpg', width: 1080, height: 720, title: 'Team AEEM', alt: 'The core team behind the AEEM movement.', key: '1' },
  { src: '/assets/gallery/Activity.jpg', width: 1080, height: 720, title: 'Interactive Sessions', alt: 'Engaging activities during the workshop.', key: '2' },
  { src: '/assets/gallery/Award.jpg', width: 1080, height: 1440, title: 'Recognizing Excellence', alt: 'Award ceremony for outstanding participants.', key: '3' },
  { src: '/assets/gallery/Boys_Fram.jpg', width: 1080, height: 720, title: 'Youth Leaders', alt: 'Empowered students ready to lead.', key: '4' },
  { src: '/assets/gallery/Girls_Fram.jpg', width: 1080, height: 720, title: 'Future Leaders', alt: 'Supporting the next generation of female leaders.', key: '5' },
  { src: '/assets/gallery/Group_Discussion.jpg', width: 1080, height: 720, title: 'Group Discussions', alt: 'Collaborative learning in action.', key: '6' },
  { src: '/assets/gallery/Mage_Award.jpg', width: 1080, height: 1440, title: 'Celebrating Success', alt: 'Moments of achievement.', key: '7' },
  { src: '/assets/gallery/Male_Participant.jpg', width: 1080, height: 720, title: 'Dedicated Participants', alt: 'Focused on growth and learning.', key: '8' },
  { src: '/assets/gallery/Participant_Group_Picture.jpg', width: 1080, height: 720, title: 'The AEEM Family', alt: 'A collective effort for educational change.', key: '9' },
  { src: '/assets/gallery/Teacher_and_Student.jpg', width: 1080, height: 720, title: 'Mentorship Matters', alt: 'Building bridges between teachers and students.', key: '10' },
  { src: '/assets/gallery/AEEM.jpg', width: 1080, height: 720, title: 'Our Brand', alt: 'Africa Education Empowerment Movement.', key: '11' }
];

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ category, limit }) => {
  const [photos, setPhotos] = useState<CustomPhoto[]>([]);
  const [index, setIndex] = useState(-1);
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

        if (data && data.length > 0) {
          const mappedPhotos = data.map((item: GalleryImage) => ({
            src: item.image_url,
            width: item.width || 1080,
            height: item.height || 720,
            title: item.title,
            alt: item.caption || item.title,
            key: item.id
          }));
          setPhotos(mappedPhotos);
        } else {
          // Use local fallback if database is empty or not yet set up
          setPhotos(category ? FALLBACK_PHOTOS.filter(p => p.src.includes(category)) : FALLBACK_PHOTOS);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setPhotos(FALLBACK_PHOTOS);
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
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={(containerWidth: number) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 1024) return 2;
          return 3;
        }}
        spacing={24}
        onClick={({ index }: { index: number }) => setIndex(index)}
        render={{
          image: (props, { photo }) => (
            <div
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-aeem-charcoal/5 h-full w-full"
            >
              <img
                {...props}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={(photo as CustomPhoto).alt}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                <h3 className="text-lg font-bold transform translate-y-4 group-hover:translate-y-0 text-white transition-transform duration-300">
                  {(photo as CustomPhoto).title}
                </h3>
                {(photo as CustomPhoto).alt && (
                  <p className="text-sm text-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {(photo as CustomPhoto).alt}
                  </p>
                )}
              </div>
            </div>
          )
        }}
      />

      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </motion.div>
  );
};

export default MasonryGallery;
