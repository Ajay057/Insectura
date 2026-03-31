import { Eye, Target, Heart, Lightbulb, ShieldCheck, Handshake } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import factoryImg from "@/assets/factory.jpg";
import labImg from "@/assets/lab-testing.jpg";

const values = [
  { icon: ShieldCheck, title: "Quality", desc: "Uncompromising standards in every batch." },
  { icon: Handshake, title: "Reliability", desc: "Consistent supply you can count on." },
  { icon: Eye, title: "Transparency", desc: "Open processes and honest partnerships." },
  { icon: Lightbulb, title: "Innovation", desc: "Continuous improvement in formulations and processes." },
];

const About = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding bg-primary">
      <div className="container text-center">
        <p className="text-gold font-heading text-sm tracking-widest uppercase mb-4">About Us</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Rooted in Nature. Built for Industry.
        </h1>
        <div className="gold-divider mb-6" />
        <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Insectura Pvt. Ltd. is a premium manufacturer and supplier of high-quality neem oil and neem-based formulations,
          serving agriculture, pharmaceutical, cosmetic, and industrial sectors globally.
        </p>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-card rounded-xl p-10 shadow-[var(--shadow-card)]">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Eye size={24} className="text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
          <div className="gold-divider !mx-0 mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            To become a globally recognized leader in neem-based solutions, setting benchmarks in quality,
            sustainability, and innovation across industries.
          </p>
        </div>
        <div className="bg-card rounded-xl p-10 shadow-[var(--shadow-card)]">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Target size={24} className="text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
          <div className="gold-divider !mx-0 mb-4" />
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <li>• Manufacture high-quality neem oil with consistent active ingredient levels</li>
            <li>• Ensure batch-to-batch consistency for industrial clients</li>
            <li>• Serve domestic and global markets with reliable supply chains</li>
            <li>• Build long-term relationships based on trust and transparency</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-primary/5">
      <div className="container">
        <SectionHeading title="Our Values" subtitle="The principles that drive everything we do." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-xl p-8 text-center shadow-[var(--shadow-card)]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <v.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-sm mb-2">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Infrastructure */}
    <section className="section-padding">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-gold font-heading text-sm tracking-widest uppercase mb-3">Infrastructure</p>
          <h2 className="font-display text-3xl font-bold mb-4">State-of-the-Art Facility</h2>
          <div className="gold-divider !mx-0 mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
           Our modern manufacturing facility is equipped with advanced machinery for cold-press extraction, 
            neem oil emulsification, multi-stage filtration, and an in-house laboratory with qualified lab technicians 
            to ensure every batch meets the highest quality standards.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            From raw neem seed processing to final product packaging, every step is carefully controlled and documented
            for complete traceability.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={factoryImg} alt="Manufacturing facility" className="rounded-xl w-full h-48 object-cover" loading="lazy" />
          <img src={labImg} alt="Lab testing" className="rounded-xl w-full h-48 object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  </main>
);

export default About;
