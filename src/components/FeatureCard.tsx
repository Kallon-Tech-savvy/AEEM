type FeatureCardProps = {
  title: string;
  description: string;
  accent?: 'gold' | 'jade' | 'berry';
};

const accentClasses = {
  gold: 'feature-card--gold',
  jade: 'feature-card--jade',
  berry: 'feature-card--berry',
};

export default function FeatureCard({ title, description, accent = 'gold' }: FeatureCardProps) {
  return (
    <article className={`feature-card ${accentClasses[accent]}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
