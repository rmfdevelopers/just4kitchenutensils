'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: oversized

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Truck, 
  Gift, 
  Sparkles, 
  UtensilsCrossed, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Menu, 
  X, 
  Heart, 
  Home
} from 'lucide-react';

const BRAND = {
  name: "Just4KitchenUtensils",
  tagline: "Elevating Every Kitchen",
  description: "Lagos' premier destination for high-end kitchenware, bespoke home accessories, and curated party souvenirs, serving the culinary heart of Ajah from our flagship showroom.",
  industry: "services",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1673407599187-3cd4e340a3c5?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1586854675665-6a575419579d?q=80&w=1080",
    "https://images.unsplash.com/photo-1721831144525-4e2fb1be2665?q=80&w=1080",
    "https://images.unsplash.com/photo-1588914683503-9a08bd7f840b?q=80&w=1080",
    "https://images.unsplash.com/photo-1631417087094-0169d994dd83?q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1622989702723-2aa7d33414f6?q=80&w=1080",
    "https://images.unsplash.com/photo-1672504015233-5397043d90dd?q=80&w=1080",
    "https://images.unsplash.com/photo-1596002937504-1246a49fba48?q=80&w=1080",
    "https://images.unsplash.com/photo-1644002868978-8a7df0545737?q=80&w=1080",
    "https://images.unsplash.com/photo-1576006209516-dfacc5c40a0f?q=80&w=1080"
  ]
};

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter text-white">
          JUST<span className="text-accent">4</span>KITCHEN
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {['Essentials', 'Showroom', 'Our Hub'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-all">
            Order Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-primary z-50 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-2xl font-black text-white">JUST<span className="text-accent">4</span>KITCHEN</span>
            <button onClick={() => setMobileOpen(false)}><X className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Essentials', 'Showroom', 'Our Hub'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)} className="text-4xl font-black text-white uppercase tracking-tighter">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-8 bg-accent text-primary p-5 rounded-2xl font-black text-center text-xl">
              Order Hub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Sections ---

const Hero = () => {
  const typedText = useTypewriter(BRAND.tagline);
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center bg-primary px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
        <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter">
          {typedText}<span className="text-accent animate-pulse">_</span>
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10">
          <div className="max-w-md">
            <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4">Ikota Shopping Complex • Ajah</p>
            <p className="text-white/45 text-lg md:text-xl leading-relaxed">
              Discover premium tools and timeless home souvenirs at Lagos&apos; most sophisticated kitchenware retail destination in Ikota.
            </p>
          </div>
          <a href="#products" className="bg-accent text-primary px-12 py-5 font-black text-lg
            shadow-[8px_8px_0px_rgba(255,255,255,0.1)]
            hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(255,255,255,0.1)]
            transition-all duration-200 shrink-0">
            Shop Essentials
          </a>
        </div>
      </div>
    </section>
  );
};

const StatsDivider = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: '5,000+', label: 'Kitchens Elevated' },
    { number: '200+', label: 'Bespoke Souvenirs' },
    { number: 'Ajah', label: 'Flagship Showroom' }
  ];

  return (
    <div ref={ref} className="bg-accent py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/20 text-center">
        {stats.map((s, i) => (
          <div key={i} className={`px-8 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <p className="text-5xl font-black text-primary tracking-tighter">{s.number}</p>
            <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Lagos-Wide Delivery", description: "Swift and secure shipping from Ajah to your doorstep across the state.", icon: Truck },
    { title: "Curated Sourcing", description: "We hand-select every piece for its aesthetic value and kitchen performance.", icon: Sparkles },
    { title: "Bespoke Gifting", description: "Customized souvenir packages designed to make your event unforgettable.", icon: Gift }
  ];

  return (
    <section ref={ref} id="essentials" className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-6xl font-black text-white leading-none mb-6">The Just4Kitchen Standard</h2>
            <p className="text-white/40 text-lg">Sharp delivery, nationwide. Why homeowners and event planners trust our curated collection.</p>
          </div>
          <div className="w-24 h-px bg-accent/40 mb-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className={`p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <f.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-white/45 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "Chef’s Selection 12-Piece Set", price: "₦85,000", desc: "Premium non-stick granite cookware designed for durability.", img: IMAGES.products[0] },
    { name: "Nordic Marble Serving Tray", price: "₦24,500", desc: "Genuine marble with gold-finish handles, perfect for hosting.", img: IMAGES.products[1] },
    { name: "Signature Hostess Souvenir Box", price: "₦15,000", desc: "Hand-picked culinary tools packaged for premium event gifting.", img: IMAGES.products[2] },
    { name: "Cast Iron Grill Pan", price: "₦32,000", desc: "Heavy-duty pre-seasoned cast iron for the perfect sear.", img: IMAGES.products[3] }
  ];

  return (
    <section ref={ref} id="products" className="py-28 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-6">The Collection</h2>
          <p className="text-white/40">Explore Kitchen Essentials, Home Accessories, and Party Souvenirs curated for modern living.</p>
        </div>

        {products.map((p, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] relative rounded-[40px] overflow-hidden shadow-2xl group border border-white/10">
                <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-accent/5 rounded-full blur-3xl -z-10`} />
            </div>
            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
              <span className="font-mono text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Featured Item 0{i + 1}</span>
              <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6">{p.name}</h3>
              <p className="text-white/50 text-xl leading-relaxed mb-8">{p.desc}</p>
              <div className={`flex flex-col gap-8 ${i % 2 !== 0 && 'md:items-end'}`}>
                <span className="text-4xl font-black text-white">{p.price}</span>
                <a href="#contact" className="bg-white text-primary px-10 py-4 rounded-full font-black w-fit hover:bg-accent hover:scale-105 transition-all">
                  Order from Hub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="showroom" className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-black text-white mb-4">Inside the Showroom</h2>
          <p className="text-white/30 tracking-widest uppercase text-xs">Ikota Shopping Complex • Visual Inspiration</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={src} alt={`Gallery ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-primary relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-square rounded-[60px] overflow-hidden border-8 border-white/5">
            <SafeImage src={IMAGES.hero} alt="About us" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-6xl font-black text-white leading-none mb-8">Our Ikota Heritage</h2>
          <div className="space-y-6 text-white/50 text-xl leading-relaxed">
            <p>Located in the vibrant Ikota Shopping Complex, Just4KitchenUtensils is more than a store. We are a hub for culinary enthusiasts who believe that the right tools transform cooking into an art form.</p>
            <p>From daily essentials to luxury souvenirs, our mission is to bring editorial-style design into Nigerian homes. We curate every item with an eye for durability, aesthetics, and function.</p>
          </div>
          <div className="mt-12 flex gap-12">
            <div>
              <p className="text-4xl font-black text-accent">5k+</p>
              <p className="text-white/30 uppercase text-xs font-bold tracking-widest mt-1">Kitchens Elevated</p>
            </div>
            <div>
              <p className="text-4xl font-black text-accent">200+</p>
              <p className="text-white/30 uppercase text-xs font-bold tracking-widest mt-1">Bespoke Souvenirs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Amaka O.", text: "The quality of the granite set I bought is unmatched. My kitchen in Lekki looks like a magazine spread!", role: "Home Chef" },
    { name: "Tunde Adeyemi", text: "Sourced my wedding souvenirs here. Every guest was asking where I got such elegant gift sets.", role: "Event Planner" }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-black text-white mb-20">Hostess Reviews</h2>
        <div className="space-y-12">
          {items.map((t, i) => (
            <div key={i} className={`relative py-12 px-10 rounded-[40px] border border-white/10 bg-primary/50 backdrop-blur-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-primary text-2xl font-black leading-none">&ldquo;</span>
              </div>
              <p className="text-white/80 text-2xl italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black text-xl border border-accent/20">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-accent/60 text-sm font-mono uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactHub = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="our-hub" ref={ref} className="py-32 px-6 bg-accent overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-[12vw] md:text-[7vw] font-black text-primary leading-[0.85] mb-12">
            The Order Hub
          </h2>
          <div className="space-y-8 border-l-4 border-primary/20 pl-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                <Phone className="text-primary group-hover:text-accent" size={20} />
              </div>
              <p className="text-primary font-black text-xl md:text-2xl">wa.link/7buhw1</p>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                <Instagram className="text-primary group-hover:text-accent" size={20} />
              </div>
              <p className="text-primary font-black text-xl md:text-2xl">@just4kitchenutensils</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={20} />
              </div>
              <p className="text-primary font-black text-lg md:text-xl">Ikota Shopping Complex, Ajah, Lagos</p>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-primary rounded-[50px] shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 shadow-xl">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent</h3>
              <p className="text-white/60 max-w-sm text-lg">Thank you. Our order hub will review your inquiry and reach out via WhatsApp shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-primary p-8 md:p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <h3 className="font-heading text-3xl font-black text-white mb-10">Send an Inquiry</h3>
                <div className="space-y-4">
                  {[
                    { id: 'name', type: 'text', placeholder: 'Your Full Name' },
                    { id: 'email', type: 'email', placeholder: 'Email Address' },
                    { id: 'phone', type: 'text', placeholder: 'WhatsApp Number' }
                  ].map(field => (
                    <input
                      key={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.id]}
                      onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none focus:border-accent transition-all duration-300"
                    />
                  ))}
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none focus:border-accent transition-all duration-300 resize-none"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-10 bg-accent text-primary py-6 rounded-2xl font-black text-lg hover:brightness-110 shadow-xl transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>Submit to Hub <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <p className="text-3xl font-black text-white mb-6 tracking-tighter">
            JUST<span className="text-accent">4</span>KITCHEN
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-8">{BRAND.description}</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all"><Mail size={18} /></a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 w-full md:w-auto">
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#products" className="hover:text-accent transition-colors">Essentials</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Accessories</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Souvenirs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#showroom" className="hover:text-accent transition-colors">Showroom</a></li>
              <li><a href="#home" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Order Hub</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Location</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              Ikota Shopping Complex,<br />
              Ajah, Lagos State,<br />
              Nigeria.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-xs font-mono tracking-widest">© {new Date().getFullYear()} JUST4KITCHENUTENSILS. ALL RIGHTS RESERVED.</p>
        <p className="text-white/20 text-xs font-mono tracking-widest">DESIGNED FOR CULINARY EXCELLENCE</p>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="bg-primary">
      <Navbar />
      <Hero />
      <StatsDivider />
      <Features />
      <Products />
      <Gallery />
      <About />
      <Testimonials />
      <ContactHub />
      <Footer />
    </main>
  );
}