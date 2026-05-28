import { useRef } from 'react'

export default function AudioPlayer({ src, controls = true, className = '' }: { src: string; controls?: boolean; className?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null)

  return (
    <div className={`audio-player ${className}`}>
      <audio ref={ref} src={src} controls={controls} preload='none' aria-label='Audio player'>
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
