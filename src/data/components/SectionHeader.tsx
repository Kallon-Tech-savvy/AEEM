type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description: string
  center?: boolean
}

export default function SectionHeader({ eyebrow, title, description, center = false }: SectionHeaderProps) {
  return (
    <div className={`section-heading ${center ? 'section-heading--center' : ''}`}>
      {eyebrow ? <p className='eyebrow'>{eyebrow}</p> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
