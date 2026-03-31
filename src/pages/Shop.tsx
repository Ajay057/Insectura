import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import neemOil5L from "@/assets/neem-oil-5l-can.png";
import neemOil20L from "@/assets/neem-oil-20l-bucket.png";
import neemOil20LTin from "@/assets/neem-oil-20l-tin.png";
import neemOil200L from "@/assets/neem-oil-200l-drum.png";
import neemCakeImg from "@/assets/neem-cake.png";
import labImg from "@/assets/lab-testing.jpg";

const allProducts = [
  { id: 1, title: "Raw Neem Oil – 1L", category: "Raw Neem Oil", size: "1L", img: neemOil5L, price: "Contact for Price" },
  { id: 2, title: "Raw Neem Oil – 5L", category: "Raw Neem Oil", size: "5L", img: neemOil5L, price: "Contact for Price" },
  { id: 3, title: "Raw Neem Oil – 20L", category: "Raw Neem Oil", size: "20L", img: neemOil20L, price: "Contact for Price" },
  { id: 4, title: "Raw Neem Oil – 50L", category: "Raw Neem Oil", size: "50L", img: neemOil20LTin, price: "Contact for Price" },
  { id: 5, title: "Raw Neem Oil – 200L", category: "Raw Neem Oil", size: "200L", img: neemOil200L, price: "Contact for Price" },
  { id: 6, title: "Neem Oil Formulation – 5L", category: "Formulation", size: "5L", img: neemOil5L, price: "Contact for Price" },
  { id: 7, title: "Neem Oil Formulation – 20L", category: "Formulation", size: "20L", img: neemOil20L, price: "Contact for Price" },
  { id: 8, title: "Neem Oil Formulation – 50L", category: "Formulation", size: "50L", img: neemOil20LTin, price: "Contact for Price" },
  { id: 9, title: "Neem Oil Formulation – 200L", category: "Formulation", size: "200L", img: neemOil200L, price: "Contact for Price" },
  { id: 10, title: "Neem Cake – 50 Kg Bag", category: "Neem Cake", size: "50 Kg", img: neemCakeImg, price: "Contact for Price" },
];

const categories = ["All", "Raw Neem Oil", "Formulation", "Neem Cake"];
const sizes = ["All", "1L", "5L", "20L", "50L", "200L", "50 Kg"];

const Shop = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");

  const filtered = allProducts.filter(
    (p) => (category === "All" || p.category === category) && (size === "All" || p.size === size)
  );

  return (
    <main className="pt-20">
      <section className="section-padding bg-primary">
        <div className="container text-center">
          <p className="text-gold font-heading text-sm tracking-widest uppercase mb-4">Shop</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Shop Neem Products</h1>
          <div className="gold-divider" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div>
              <label className="text-xs font-heading font-semibold tracking-wider uppercase text-muted-foreground block mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-colors ${
                      category === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-heading font-semibold tracking-wider uppercase text-muted-foreground block mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-colors ${
                      size === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow group">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-muted/30 p-4">
                  <img src={p.img} alt={p.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-accent">{p.category}</span>
                  <h3 className="font-heading font-bold text-sm mt-1 mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{p.price}</p>
                  <button
                    onClick={() => {
                      const productName = p.category === "Formulation" ? "Neem Oil Formulation" : p.category === "Neem Cake" ? "Neem Cake" : "Raw Neem Oil";
                      navigate("/quote", { state: { products: [{ product: productName, packaging: p.size, quantity: "" }] } });
                    }}
                    className="w-full text-center bg-primary text-primary-foreground py-2.5 rounded-full text-xs font-heading font-semibold hover:opacity-90 transition-opacity"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
          )}

          {/* Bulk CTA */}
          <div className="mt-16 bg-primary rounded-xl p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">Need Bulk Supply?</h3>
            <p className="text-sm text-primary-foreground/80 mb-6">Get competitive pricing for large volume orders. Custom packaging available.</p>
            <Link to="/quote" className="inline-block bg-gold text-charcoal px-8 py-3 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity">
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
