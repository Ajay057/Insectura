import { Link } from "react-router-dom";
import {
  Leaf, Droplets, Factory, FlaskConical, Award, Truck, ShieldCheck,
  Sprout, Users, Store, Building2, Wheat, Pill, Sparkles, Heart, Wrench,
  TreePine, Filter, TestTube2, Package, Send, Beaker, Cog
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import neemOil5L from "@/assets/neem-oil-5l-can.png";
import neemOil20L from "@/assets/neem-oil-20l-bucket.png";
import neemOil200L from "@/assets/neem-oil-200l-drum.png";
import productRangeHero from "@/assets/product-range-hero.png";
import neemCakeImg from "@/assets/neem-cake.png";

const customerTypes = [
  { icon: Sprout, title: "Farmers", desc: "High-quality neem solutions for crop protection and soil health." },
  { icon: Store, title: "Dealers", desc: "Competitive margins with reliable supply chain support." },
  { icon: Users, title: "Distributors", desc: "Bulk supply with consistent quality for regional distribution." },
  { icon: Building2, title: "Wholesalers", desc: "Best market pricing for large-volume procurement." },
  { icon: Factory, title: "Industrial Buyers", desc: "Technical grade neem oil for manufacturing processes." },
];

const products = [
  { title: "Raw Neem Oil", desc: "Pure cold-pressed neem oil retaining all active compounds.", img: neemOil20L, moq: "MOQ: 5 Litres" },
  { title: "Neem Oil Formulation", desc: "Standardized azadirachtin formulations in 300–50,000 PPM.", img: neemOil5L, moq: "MOQ: 5 Litres" },
  { title: "Neem Cake", desc: "Organic fertilizer for soil enrichment and natural pest deterrent.", img: neemCakeImg, moq: "MOQ: 50 Kg" },
];

const industries = [
  { icon: Wheat, title: "Agriculture" },
  { icon: Leaf, title: "Bio-pesticides" },
  { icon: Pill, title: "Pharmaceuticals" },
  { icon: Sparkles, title: "Cosmetics" },
  
  { icon: Wrench, title: "Manufacturing" },
];

const whyUs = [
  { icon: Award, title: "Premium Quality", desc: "Rigorous quality control at every stage." },
  { icon: Droplets, title: "Best Price in Market", desc: "Competitive pricing without compromising quality." },
  { icon: Truck, title: "Domestic & Export Supply", desc: "Serving markets across India and globally." },
  { icon: FlaskConical, title: "In-house Lab & Technician", desc: "Every batch tested in our own lab." },
  { icon: Cog, title: "Advanced Machinery", desc: "State-of-the-art extraction and processing equipment." },
  { icon: ShieldCheck, title: "Reliable Delivery", desc: "On-time dispatch with proper documentation." },
];

const processSteps = [
  { icon: TreePine, title: "Seed Sourcing", desc: "Ethically sourced premium neem seeds." },
  { icon: Factory, title: "Cold Pressing", desc: "Advanced machinery for cold press extraction." },
  { icon: Filter, title: "Filtration", desc: "Multi-stage filtration for purity." },
  { icon: Beaker, title: "Emulsification", desc: "Neem oil emulsification for formulations." },
  { icon: TestTube2, title: "Lab Testing", desc: "In-house lab analysis for quality assurance." },
  { icon: Package, title: "Packaging", desc: "Secure packaging in varied sizes." },
  { icon: Send, title: "Dispatch", desc: "Timely delivery to your doorstep." },
];

const Index = () => {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] pt-28 pb-20">
          <div className="animate-fade-up">
            <p className="text-gold font-heading text-sm tracking-widest uppercase mb-4">Insectura Pvt. Ltd.</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Premium Neem Oil Solutions for Agriculture & Industry
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              High-quality neem oil, formulations & neem cake with consistent performance and reliable supply for global markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quote" className="bg-gold text-charcoal px-7 py-3 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
                Get Quote
              </Link>
              <Link to="/products" className="border border-primary-foreground/30 text-primary-foreground px-7 py-3 rounded-full font-heading font-semibold text-sm hover:bg-primary-foreground/10 transition-colors">
                View Products
              </Link>
              <Link to="/dealer" className="border border-gold/40 text-gold px-7 py-3 rounded-full font-heading font-semibold text-sm hover:bg-gold/10 transition-colors">
                Become a Dealer
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in flex items-center justify-center" style={{ animationDelay: "0.3s" }}>
            <img src={productRangeHero} alt="Premium Neem Oil Products by Insectura" className="max-h-[500px] object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* CUSTOMER TYPES */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading title="Who We Serve" subtitle="Tailored neem oil solutions for every segment of the value chain." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {customerTypes.map((c) => (
              <div key={c.title} className="bg-card rounded-xl p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <c.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="section-padding bg-primary/5">
        <div className="container">
          <SectionHeading title="Our Products" subtitle="Premium neem products for diverse industry applications." />
          <p className="text-center text-gold font-heading font-semibold text-sm mb-8 -mt-4">✦ Low Minimum Order Quantity — Start Small, Scale Big ✦</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.title} className="bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow group">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-muted/30 p-4">
                  <img src={p.img} alt={p.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-sm mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{p.desc}</p>
                  <p className="text-[11px] font-heading font-semibold text-gold mb-3">{p.moq}</p>
                  <Link to="/products" className="text-xs font-heading font-semibold text-accent hover:underline">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading title="Industries We Serve" subtitle="Delivering neem-based solutions across diverse industry verticals." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-card rounded-xl p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <ind.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xs">{ind.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-primary">
        <div className="container">
          <SectionHeading title="Why Choose Insectura" subtitle="What makes us the preferred neem oil partner for businesses worldwide." light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <w.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading font-bold text-sm text-primary-foreground mb-2">{w.title}</h3>
                <p className="text-xs text-primary-foreground/70 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading title="Our Process" subtitle="From seed to supply — a transparent, quality-driven process." />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                  <step.icon size={24} className="text-gold" />
                </div>
                <span className="text-[10px] font-heading font-bold text-gold tracking-widest">STEP {i + 1}</span>
                <h3 className="font-heading font-bold text-sm mt-1 mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE CTA */}
      <section className="section-padding bg-primary/5" id="quote">
        <div className="container max-w-2xl text-center">
          <SectionHeading title="Request a Quote" subtitle="Tell us about your requirements — add multiple products and quantities in one request." />
          <Link to="/quote" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
            <Send size={18} /> Get Your Custom Quote
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
