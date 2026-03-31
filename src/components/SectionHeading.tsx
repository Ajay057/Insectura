interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, light }: Props) => (
  <div className="text-center mb-14">
    <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    <div className="gold-divider mb-4" />
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-sm leading-relaxed ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
