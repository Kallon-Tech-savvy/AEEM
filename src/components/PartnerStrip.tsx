import type { ReactNode } from 'react'

type Partner = { id: string; name: string }

const partners: Partner[] = [
  { id: 'rcbank', name: 'RCBANK' },
  { id: 'npha', name: 'NPHA' },
  { id: 'Mage-SL', name: 'MAGE_SL' },
]

function LogoTile({ name }: { name: string }) {
  return (
    <div className="partner-tile" aria-hidden>
      <svg width="120" height="48" viewBox="0 0 120 48" role="img">
        <rect width="120" height="48" rx="4" fill="#111" />
        <text x="50%" y="50%" fill="#d4af37" fontSize="10" fontFamily="sans-serif" fontWeight="700" textAnchor="middle" dominantBaseline="middle">{name}</text>
      </svg>
    </div>
  )
}

export default function PartnerStrip({ children }: { children?: ReactNode }) {
  // Duplicate the set to create a seamless looping effect via CSS animation
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
