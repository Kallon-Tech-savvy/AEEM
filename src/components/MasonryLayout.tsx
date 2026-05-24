import '../assets/styles/MasonryLayout.css';

import {Image} from'../data/Images';

const MasonryLayout = () => {

  
  return (
    <div className="brutalist-wrapper">
      <div className="brutalist-container">
       
        <main className="masonry-grid">
          {Image.map((img) => (
            <div key={img.id} className="masonry-item">
             
              {/* Image wrapper handles the brutalist borders and structural micro-interactions */}
              <div
                className="masonry-image-wrapper"
                style={{ aspectRatio: img.ratio }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="masonry-image"
                  loading="lazy"
                />
                
              </div>
              {/* Tag handles a physics-based spring slide-up micro-interaction */}
              <div className="masonry-label">
                {img.alt}
              </div>
             
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};
export default MasonryLayout;
