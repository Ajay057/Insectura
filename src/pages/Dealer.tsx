import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

const dealerTypes = ["Dealer", "Distributor", "Wholesaler", "Industrial Buyer"];

const productInterests = [
  "Raw Neem Oil",
  "Neem Oil Formulation (300 PPM)",
  "Neem Oil Formulation (1500 PPM)",
  "Neem Oil Formulation (3000 PPM)",
  "Neem Oil Formulation (10,000 PPM)",
  "Neem Oil Formulation (50,000 PPM)",
  "Neem Cake",
];

const Dealer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [dealerType, setDealerType] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !dealerType || !location) {
      toast.error("Please fill in your name, phone number, location, and select a dealer type.");
      return;
    }

    setStatus("submitting");

    const fullMessage = `Dealer Type: ${dealerType}\nLocation: ${location}\n\nProducts Interested In:\n${selectedProducts.join(", ") || "Not specified"}\n\nWhy I want to become a dealer:\n${reason}`;

    const data = {
      name,
      company,
      email,
      phone,
      message: fullMessage,
      subject: `New Dealer Application from ${name}`
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
        toast.success("Application sent successfully!");
        // Reset form
        setName("");
        setPhone("");
        setCompany("");
        setEmail("");
        setDealerType("");
        setLocation("");
        setSelectedProducts([]);
        setReason("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage("Failed to send application. Please try again.");
        toast.error("Failed to send application.");
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
            Become a Dealer
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
            Partner with Insectura and grow your business with premium neem products. Fill out the form below and our team will reach out within 24 hours.
          </p>
        </div>
      </section>

      <div className="container max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Details */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} required />
              <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              <input type="text" placeholder="Location / City *" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} required />
              <select value={dealerType} onChange={(e) => setDealerType(e.target.value)} className={selectClass} required>
                <option value="">Dealer Type *</option>
                {dealerTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Interest */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Products Interested In</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productInterests.map((product) => (
                <label
                  key={product}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProducts.includes(product) ? "bg-primary/10 border-primary" : "bg-card border-border hover:bg-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product)}
                    onChange={() => toggleProduct(product)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{product}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4">Why do you want to become a dealer?</h2>
            <textarea
              placeholder="Tell us about your business, experience, target market, and why you'd like to partner with Insectura..."
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={inputClass}
            />
          </div>

          {status === "success" && (
            <div className="p-4 bg-green-100/20 text-green-500 border border-green-500/20 rounded-lg text-sm">
              Thank you! Your dealer application has been sent successfully. Our team will contact you shortly.
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
              <>Sending Application...</>
            ) : (
              <>
                <Send size={18} /> Submit Dealer Application
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dealer;
