import { useEffect, useRef, useState } from 'react'

export default function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(true)
      })
    }, options)

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref.current])

  return { ref, inView }
}
