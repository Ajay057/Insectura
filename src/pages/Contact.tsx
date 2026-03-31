import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

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
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <main className="pt-20">
      <section className="section-padding bg-primary">
        <div className="container text-center">
          <p className="text-gold font-heading text-sm tracking-widest uppercase mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Contact Us</h1>
          <div className="gold-divider" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Let's Talk Business</h2>
            <div className="gold-divider !mx-0 mb-8" />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">Head Office</h4>
                  <p className="text-sm text-muted-foreground">
                    610, 611, Shreeji Business Hub, Naroda - Dehgam Rd, opp. Hanspura Residency, Hanspura, GIDC Naroda, Ahmedabad, Gujarat 382330, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">Factory Address</h4>
                  <p className="text-sm text-muted-foreground">
                    Plot no. 272, Shinawada GIDC, Modasa Meghraj Road, Shinawad, Arvalli, 383315
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">Phone / WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+919274763965" className="hover:text-accent transition-colors">+91 92747 63965</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground">info@insectura.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Instagram size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">Instagram</h4>
                  <p className="text-sm text-muted-foreground">
                    <a href="https://instagram.com/insecturapvtltd" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@insecturapvtltd</a>
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919274763965"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-[#25D366] text-[#fff] px-6 py-3 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>

            {/* Google Maps - Head Office */}
            <div className="mt-10">
              <h4 className="font-heading font-bold text-sm mb-3">Head Office Location</h4>
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  title="Head Office - Shreeji Business Hub, Ahmedabad"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.67!3d23.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a0a0a0a0a0%3A0x0!2sShreeji+Business+Hub%2C+Naroda+Dehgam+Road%2C+Hanspura%2C+GIDC+Naroda%2C+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Google Maps - Factory */}
            <div className="mt-6">
              <h4 className="font-heading font-bold text-sm mb-3">Factory Location</h4>
              <div className="rounded-xl overflow-hidden h-64">
                <iframe
                  title="Factory - Shinawada GIDC, Arvalli"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d73.3!3d23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a0a0a0a0a0%3A0x0!2sShinawada+GIDC%2C+Modasa+Meghraj+Road%2C+Arvalli!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-card rounded-xl p-8 md:p-10 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name *" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                <input type="text" name="company" placeholder="Company Name" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                <input type="email" name="email" placeholder="Email Address *" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                <input type="tel" name="phone" placeholder="Phone Number *" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                <textarea name="message" placeholder="Your Message" rows={5} required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />

                {status === "success" && (
                  <div className="p-3 bg-green-100/20 text-green-500 border border-green-500/20 rounded-lg text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {status === "error" && (
                  <div className="p-3 bg-red-100/20 text-red-500 border border-red-500/20 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-heading font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
