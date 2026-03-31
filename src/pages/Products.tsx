import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import neemOil5L from "@/assets/neem-oil-5l-can.png";
import neemOil20L from "@/assets/neem-oil-20l-bucket.png";
import neemOil200L from "@/assets/neem-oil-200l-drum.png";
import neemCakeImg from "@/assets/neem-cake.png";
import labImg from "@/assets/lab-testing.jpg";

const products = [
  {
    title: "Raw Neem Oil",
    desc: "100% pure cold-pressed neem oil retaining maximum azadirachtin and other active compounds. Ideal for organic farming, bio-pesticide formulations, and industrial use.",
    applications: ["Organic farming", "Bio-pesticides", "Cosmetics", "Pharmaceuticals"],
    sizes: ["1L", "5L", "20L", "50L", "200L"],
    moq: "5 Litres",
    img: neemOil20L,
  },
  {
    title: "Neem Oil Formulation",
    desc: "Neem oil formulations with standardized azadirachtin content available in various PPM concentrations — 300, 1500, 3000, 10,000 and 50,000 PPM. Ready for agricultural and industrial applications.",
    applications: ["Crop protection", "Bio-pesticide manufacturing", "Agricultural sprays", "Stored grain protection"],
    sizes: ["5L", "20L", "50L", "200L"],
    moq: "5 Litres",
    img: neemOil5L,
    ppmInfo: [
      { ppm: "300 PPM", desc: "Preventive systemic & contact insecticide. Ideal for regular prophylactic sprays." },
      { ppm: "1500 PPM", desc: "Moderate concentration for thrips, aphids, whiteflies, and mites." },
      { ppm: "3000 PPM", desc: "High potency for stubborn sucking pests and larval pests." },
      { ppm: "10,000 PPM", desc: "Technical-grade broad-spectrum for heavy infestations." },
      { ppm: "50,000 PPM", desc: "Extremely concentrated for intensive agricultural use." },
    ],
  },
  {
    title: "Neem Cake",
    desc: "Premium organic neem cake fertilizer — natural & organic soil enricher. NPK 100% organic. Excellent for improving soil health and acting as a natural pest deterrent.",
    applications: ["Organic farming", "Soil enrichment", "Pest deterrent", "Horticulture"],
    sizes: ["50 Kg Bag"],
    moq: "50 Kg",
    img: neemCakeImg,
  },
];

const Products = () => {
  const navigate = useNavigate();
  return (
    <main className="pt-20">
      <section className="section-padding bg-primary">
        <div className="container text-center">
          <p className="text-gold font-heading text-sm tracking-widest uppercase mb-4">Our Products</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Premium Neem Products
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Explore our range of high-quality neem oil, neem oil formulations, and neem cake designed for diverse agricultural and industrial applications.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container space-y-10">
          {products.map((p, i) => (
            <div key={p.title} className={`bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <div className="h-64 md:h-auto flex items-center justify-center bg-muted/30 p-6">
                <img src={p.img} alt={p.title} className="max-w-full max-h-80 object-contain" loading="lazy" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center" style={{ direction: "ltr" }}>
                <h2 className="font-display text-2xl font-bold mb-3">{p.title}</h2>
                <div className="gold-divider !mx-0 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>

                {/* PPM Info for formulation */}
                {p.ppmInfo && (
                  <div className="mb-4">
                    <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-accent mb-2">PPM Concentrations</h4>
                    <div className="space-y-2">
                      {p.ppmInfo.map((ppm) => (
                        <div key={ppm.ppm} className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">{ppm.ppm}:</span> {ppm.desc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-accent mb-2">Applications</h4>
                  <div className="flex flex-wrap gap-2">
                    {p.applications.map((a) => (
                      <span key={a} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-heading font-semibold text-xs tracking-wider uppercase text-accent mb-2">Packaging</h4>
                  <p className="text-sm text-muted-foreground">{p.sizes.join(" | ")}</p>
                </div>

                <p className="text-xs text-muted-foreground mb-5">MOQ: {p.moq}</p>

                <button
                  onClick={() => navigate("/quote", { state: { products: [{ product: p.title, packaging: "", quantity: "" }] } })}
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity w-fit"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-primary/5">
        <div className="container">
          <SectionHeading title="Our Process" subtitle="From neem seed to finished product — quality at every step." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {[
              { step: "Seed Sourcing", desc: "Ethically sourced premium neem seeds." },
              { step: "Cold Pressing", desc: "State-of-the-art cold press extraction." },
              { step: "Filtration", desc: "Multi-stage filtration for purity." },
              { step: "Emulsification", desc: "Neem oil emulsification for formulations." },
              { step: "Lab Testing", desc: "In-house lab with qualified technicians." },
              { step: "Packaging & Dispatch", desc: "Secure packaging and timely delivery." },
            ].map((s, i) => (
              <div key={s.step}>
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-gold font-heading font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-sm mb-1">{s.step}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
