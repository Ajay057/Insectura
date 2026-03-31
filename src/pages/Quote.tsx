import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

const productCategories = [
  "Raw Neem Oil",
  "Neem Oil Formulation",
  "Neem Cake",
];

const ppmConcentrations = [
  "300 PPM (0.03% Azadirachtin)",
  "1500 PPM (0.15% Azadirachtin)",
  "3000 PPM (0.3% Azadirachtin)",
  "10,000 PPM (1.0% Azadirachtin)",
  "50,000 PPM (5.0% Azadirachtin)",
];

const rawNeemOilSizes = ["1L", "5L", "20L", "50L", "200L"];
const formulationSizes = ["5L", "20L", "50L", "200L"];
const neemCakeSizes = ["50 Kg Bag"];

const customerTypes = [
  "Farmer",
  "Dealer",
  "Distributor",
  "Wholesaler",
  "Industrial Buyer",
  "Pharmaceutical",
  "Cosmetics",
  "Other",
];

interface ProductLine {
  id: string;
  product: string;
  quality: string;
  packaging: string;
  quantity: string;
}

const generateId = () => Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

const emptyLine = (): ProductLine => ({
  id: generateId(),
  product: "",
  quality: "",
  packaging: "",
  quantity: "",
});

const getPackagingSizes = (product: string) => {
  if (product === "Raw Neem Oil") return rawNeemOilSizes;
  if (product === "Neem Oil Formulation") return formulationSizes;
  if (product === "Neem Cake") return neemCakeSizes;
  return rawNeemOilSizes;
};

const Quote = () => {
  const routerLocation = useLocation();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [lines, setLines] = useState<ProductLine[]>([emptyLine()]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const state = routerLocation.state as { products?: { product: string; packaging: string; quantity: string }[] } | null;
    if (state?.products?.length) {
      setLines(
        state.products.map((p) => ({
          id: generateId(),
          product: productCategories.find((cat) => p.product.includes(cat) || cat.includes(p.product)) || p.product,
          quality: "",
          packaging: p.packaging || "",
          quantity: p.quantity,
        }))
      );
    }
  }, [routerLocation.state]);

  const addLine = () => setLines((prev) => [...prev, emptyLine()]);

  const removeLine = (id: string) => {
    if (lines.length === 1) return;
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id: string, field: keyof ProductLine, value: string) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const updated = { ...l, [field]: value };
        // Reset quality and packaging when product changes
        if (field === "product") {
          updated.quality = "";
          updated.packaging = "";
        }
        return updated;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filledLines = lines.filter((l) => l.product && l.quantity);
    if (!name || !phone || !location || !address || filledLines.length === 0) {
      toast.error("Please fill in your name, phone number, location, address, and at least one product with quantity.");
      return;
    }

    setStatus("submitting");

    const productDetails = filledLines
      .map(
        (l, i) =>
          `Product ${i + 1}: ${l.product}${l.quality ? ` (${l.quality})` : ""} | Packing: ${l.packaging || "Not specified"} | Qty: ${l.quantity}`
      )
      .join("\n");

    const fullMessage = `Customer Type: ${customerType}\nLocation: ${location}\nAddress: ${address}\n\n--- Products ---\n${productDetails}\n\nAdditional Details:\n${message}`;

    const data = {
      name,
      company,
      email,
      phone,
      message: fullMessage,
      subject: `New Quote Request from ${name}`
    };

    try {
      const response = await fetch("https://mail-api-khaki.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        toast.success("Quote request sent successfully!");
        // Reset form
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setCustomerType("");
        setLocation("");
        setAddress("");
        setMessage("");
        setLines([emptyLine()]);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage("Failed to send quote request. Please try again.");
        toast.error("Failed to send quote request.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
      toast.error("Network error. Please check your connection.");
    }
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 text-foreground placeholder:text-muted-foreground";

  const selectClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 text-muted-foreground";

  return (
    <main className="pt-24 pb-20">
      <section className="bg-primary py-16 mb-12">
        <div className="container text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Request a Quote
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
            Tell us about your neem oil requirements. Add multiple products, specify quantities, and we'll get back within 24 hours.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Details */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
              <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} required />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              <select value={customerType} onChange={(e) => setCustomerType(e.target.value)} className={selectClass}>
                <option value="">Customer Type</option>
                {customerTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <input type="text" placeholder="Location / City *" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} required />
            </div>
            <div className="mt-5">
              <textarea placeholder="Full Address *" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} required />
            </div>
          </div>

          {/* Product Lines */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-lg">Products Required</h2>
              <button type="button" onClick={addLine} className="flex items-center gap-1.5 text-xs font-heading font-semibold text-accent hover:text-accent/80 transition-colors">
                <Plus size={16} /> Add Product
              </button>
            </div>

            <div className="space-y-4">
              {lines.map((line, idx) => (
                <div key={line.id} className="bg-card border border-border rounded-xl p-4 md:p-5 relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-heading font-bold text-accent tracking-widest uppercase">Product {idx + 1}</span>
                    {lines.length > 1 && (
                      <button type="button" onClick={() => removeLine(line.id)} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove product">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <select value={line.product} onChange={(e) => updateLine(line.id, "product", e.target.value)} className={selectClass}>
                      <option value="">Product Name *</option>
                      {productCategories.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {/* Quality / PPM (only for Formulation) */}
                    {line.product === "Neem Oil Formulation" ? (
                      <select value={line.quality} onChange={(e) => updateLine(line.id, "quality", e.target.value)} className={selectClass}>
                        <option value="">PPM Concentration *</option>
                        {ppmConcentrations.map((ppm) => (
                          <option key={ppm} value={ppm}>{ppm}</option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" placeholder="Quality / Grade" value={line.quality} onChange={(e) => updateLine(line.id, "quality", e.target.value)} className={inputClass} />
                    )}

                    {/* Packing Size */}
                    <select value={line.packaging} onChange={(e) => updateLine(line.id, "packaging", e.target.value)} className={selectClass}>
                      <option value="">Packing Size</option>
                      {getPackagingSizes(line.product).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* Quantity */}
                    <input type="text" placeholder="Quantity (e.g. 500L, 10 Bags) *" value={line.quantity} onChange={(e) => updateLine(line.id, "quantity", e.target.value)} className={inputClass} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Additional Details</h2>
            <textarea placeholder="Any specific requirements, application details, or questions..." rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} />
          </div>

          {status === "success" && (
            <div className="p-4 bg-green-100/20 text-green-500 border border-green-500/20 rounded-lg text-sm">
              Thank you! Your quote request has been sent successfully. We will get back to you within 24 hours.
            </div>
          )}
          {status === "error" && (
            <div className="p-4 bg-red-100/20 text-red-500 border border-red-500/20 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              <>Sending Request...</>
            ) : (
              <>
                <Send size={18} /> Submit Quote Request
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Quote;
