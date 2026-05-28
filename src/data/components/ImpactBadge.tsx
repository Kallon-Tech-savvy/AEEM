type ImpactBadgeProps = {
  value: string;
  label: string;
};

export default function ImpactBadge({ value, label }: ImpactBadgeProps) {
  return (
    <article className='impact-badge'>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
