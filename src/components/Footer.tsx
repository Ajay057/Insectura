import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <img src={logo} alt="Insectura" className="h-16 w-auto mb-4 brightness-200" />
          <p className="text-sm opacity-80 leading-relaxed">
            Premium manufacturer and supplier of high-quality neem oil, neem oil formulations, and neem cake for global markets.
          </p>
          <a
            href="https://instagram.com/insecturapvtltd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <Instagram size={16} /> @insecturapvtltd
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-6 text-gold">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Products", to: "/products" },
              { label: "Shop Now", to: "/shop" },
              { label: "Contact Us", to: "/contact" },
              { label: "Become a Dealer", to: "/dealer" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-6 text-gold">Products</h4>
          <ul className="space-y-3">
            {["Raw Neem Oil", "Neem Oil Formulation", "Neem Cake"].map((p) => (
              <li key={p}>
                <Link to="/products" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{p}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-sm tracking-wider uppercase mb-6 text-gold">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm opacity-80">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block">Head Office:</span>
                610, 611, Shreeji Business Hub, Naroda - Dehgam Rd, opp. Hanspura Residency, Hanspura, GIDC Naroda, Ahmedabad, Gujarat 382330, India
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm opacity-80">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block">Factory:</span>
                Plot no. 272, Shinawada GIDC, Modasa Meghraj Road, Shinawad, Arvalli, 383315
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm opacity-80">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+919274763965">+91 92747 63965</a>
            </li>
            <li className="flex items-center gap-3 text-sm opacity-80">
              <Mail size={16} className="shrink-0" />
              <span>info@insectura.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-60">
        <p>© {new Date().getFullYear()} Insectura Pvt. Ltd. All rights reserved. | <Link to="/admin/login" className="hover:text-gold transition-colors">Admin Portal</Link></p>
        <p>Pure Neem. Proven Performance.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
