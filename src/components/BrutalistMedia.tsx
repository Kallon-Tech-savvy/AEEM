import styles from '../assets/styles/BrutalistMedia.module.css';

interface BrutalistMediaProps {
  src?: string;
  alt: string;
  label: string;
  metadata?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export default function BrutalistMedia({ 
  src, 
  alt, 
  label, 
  metadata = 'SYS_IMG_DATA',
  aspectRatio = 'video' 
}: BrutalistMediaProps) {
  
  // Use a functional geometric placeholder if no source is provided
  const hasImage = Boolean(src);

  return (
    <figure className={`${styles.brutalistFrame} ${styles[aspectRatio]}`}>
      {/* Exposed structural corner accents */}
      <div className={styles.crosshairTopLeft} aria-hidden="true" />
      <div className={styles.crosshairBottomRight} aria-hidden="true" />

      {/* Functional System Label */}
      <figcaption className={styles.systemLabel}>
        <span className={styles.labelTitle}>{label}</span>
        <span className={styles.labelMeta}>{metadata}</span>
      </figcaption>

      <div className={styles.mediaContainer}>
        {hasImage ? (
          <img 
            src={src} 
            alt={alt} 
            className={styles.rawImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderGrid} aria-label="Image placeholder">
            <span className={styles.placeholderText}>AWAITING_VISUAL_DATA</span>
          </div>
        )}
      </div>
    </figure>
  );
}