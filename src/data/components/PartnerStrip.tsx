import type { ReactNode } from 'react'

type Partner = { id: string; name: string }

const partners: Partner[] = [
  { id: 'rcbank', name: 'RCBANK' },
  { id: 'npha', name: 'NPHA' },
  { id: 'mage-sl', name: 'MAGE-SL' },
  { id: 'ndlea', name: 'NDLEA' },
]

function LogoTile({ name }: { name: string }) {
  return (
    <div className="partner-tile" aria-hidden>
      <svg width="120" height="48" viewBox="0 0 120 48" role="img">
        <rect width="120" height="48" rx="0" fill="var(--surface-elevated, #151C30)" stroke="var(--stark-border, rgba(243, 245, 250, 0.15))" strokeWidth="1"/>
        <text x="50%" y="50%" fill="var(--champagne-gold, #D4AF37)" fontSize="11" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.05em" textAnchor="middle" dominantBaseline="middle">
          {name}
        </text>
      </svg>
    </div>
  )
}

export default function PartnerStrip({ children }: { children?: ReactNode }) {
  const items = [...partners, ...partners]

  return (
    <div className="partner-strip-wrap">
      <div className="partner-strip" role="list" aria-label="Our partners">
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="partner-item" role="listitem">
            <LogoTile name={p.name} />
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}