import { useRef } from 'react'

type Caption = { src: string; lang: string; label?: string }

export default function VideoPlayer({
  src,
  poster,
  captions = [],
  controls = true,
  className = '',
}: {
  src: string
  poster?: string
  captions?: Caption[]
  controls?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement | null>(null)

  return (
    <div className={`video-player ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={controls}
        preload='metadata'
        tabIndex={0}
        aria-label='Video player'
      >
        {captions.map((c) => (
          <track key={c.src} src={c.src} kind='subtitles' srcLang={c.lang} label={c.label || c.lang} default={false} />
        ))}
        Your browser does not support the video element.
      </video>
    </div>
  )
}
