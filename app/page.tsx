'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Service {
  id: number;
  name: string;
  image: string;
}

interface Treatment {
  id: number;
  name: string;
}

interface Settings {
  id: number;
  hospital_name: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  working_hours: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      const { data: treatmentsData } = await supabase
        .from('treatments')
        .select('*')
        .order('created_at', { ascending: true });

      const { data: settingsData } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .single();

      if (servicesData) setServices(servicesData);
      if (treatmentsData) setTreatments(treatmentsData);
      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            read: false
          }
        ]);

      if (error) throw error;

      alert('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      
      {/* Modern Elegant Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div className="bg-gradient-to-r from-green-50/95 via-emerald-50/95 to-green-50/95 backdrop-blur-2xl shadow-lg border-b-2 border-green-200">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo Section */}
              <a href="#home" className="flex items-center gap-2 sm:gap-4 group">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform duration-300">
                  <Image src="/logo2.png" alt="Logo" width={56} height={56} className="object-contain" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {settings?.hospital_name || 'Sanjeevani'}
                  </h1>
                  <p className="text-xs sm:text-sm text-green-600 font-medium hidden sm:block">Ayurvedic Hospital & Wellness Center</p>
                </div>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-2">
                {['About', 'Services', 'Treatments', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 rounded-xl hover:bg-green-50 relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 rounded-full group-hover:w-8 transition-all duration-300"></span>
                  </a>
                ))}
                <div className="ml-4 flex items-center gap-3">
                  <a 
                    href={`tel:${settings?.contact_phone}`}
                    className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-600 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="hidden xl:inline">{settings?.contact_phone || 'Call Us'}</span>
                  </a>
                </div>
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="lg:hidden p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden bg-gradient-to-br from-green-50/98 to-emerald-50/98 backdrop-blur-2xl border-t-2 border-green-200 shadow-2xl transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-6 py-6">
            <div className="space-y-2">
              {['About', 'Services', 'Treatments', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMenuOpen(false)} 
                  className="block px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl font-semibold transition-all duration-300"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-green-100">
                <a 
                  href={`tel:${settings?.contact_phone}`}
                  className="flex items-center gap-3 px-5 py-3 text-green-700 hover:bg-green-50 rounded-xl font-medium transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{settings?.contact_phone || 'Call Us'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Ayurvedic Aesthetic with Organic Shapes */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 pt-20">
        
        {/* Organic Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 right-0 w-1/2 h-full opacity-10" viewBox="0 0 400 400">
            <path d="M200,50 Q300,100 350,200 T300,350 Q200,400 100,350 T50,200 Q100,100 200,50" fill="url(#greenGradient)" />
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating Ayurvedic Elements */}
          <div className="absolute top-1/4 left-1/4 text-6xl opacity-10 animate-float">🌿</div>
          <div className="absolute top-1/3 right-1/3 text-5xl opacity-10 animate-float" style={{animationDelay: '1s'}}>🍃</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-10 animate-float" style={{animationDelay: '2s'}}>🌺</div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-green-200">
                <span className="text-xl sm:text-2xl">🌿</span>
                <span className="text-green-700 font-semibold text-xs sm:text-sm">Natural Healing & Wellness</span>
              </div>
              
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Ayurveda
                  </span>
                  <br />
                  <span className="text-gray-800">The Science of Life</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Experience authentic Ayurvedic healing rooted in 5000 years of wisdom. Balance your body, restore harmony, and embrace holistic wellness.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href="#contact" className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center gap-2 text-sm sm:text-base">
                  Book Consultation
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#about" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:shadow-xl border-2 border-green-200 hover:border-green-400 transition-all text-sm sm:text-base">
                  Learn More
                </a>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">20+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="w-px h-8 sm:h-10 md:h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">5000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="w-px h-8 sm:h-10 md:h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">15+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Expert Vaidyas</div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-[3rem] blur-2xl opacity-20"></div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80" alt="Ayurvedic Healing" className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm sm:text-base">Certified Ayurvedic Center</div>
                      <div className="text-xs sm:text-sm text-green-700">Traditional Excellence Since 2004</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:flex absolute -top-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-xl items-center justify-center text-4xl sm:text-5xl animate-float border-2 border-green-200">
                🌿
              </div>
              <div className="hidden sm:flex absolute -bottom-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-xl items-center justify-center text-4xl sm:text-5xl animate-float border-2 border-green-200" style={{animationDelay: '1s'}}>
                🧘
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About - Dosha Inspired Design */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-100 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 bg-green-50 rounded-full border border-green-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Image src="/logo2.png" alt="Logo" width={20} height={20} className="brightness-0 invert" />
                </div>
                <span className="text-green-700 font-semibold text-xs sm:text-sm">About Our Practice</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Rooted in </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Ancient Wisdom</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Personalized Ayurvedic treatments for holistic healing and wellness
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              { 
                icon: '🔥', 
                dosha: 'Pitta', 
                title: 'Authentic Treatments',
                desc: 'Traditional Panchakarma and therapeutic procedures passed through generations',
                color: 'from-orange-400 to-red-500'
              },
              { 
                icon: '💨', 
                dosha: 'Vata', 
                title: 'Natural Remedies',
                desc: 'Pure herbal formulations and Ayurvedic medicines for holistic healing',
                color: 'from-blue-400 to-purple-500'
              },
              { 
                icon: '💧', 
                dosha: 'Kapha', 
                title: 'Expert Vaidyas',
                desc: 'Experienced Ayurvedic physicians dedicated to your wellness journey',
                color: 'from-green-400 to-emerald-500'
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-green-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-green-600 mb-2">{item.dosha} Balance</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <p className="text-2xl leading-relaxed mb-8">
                Sanjeevani Ayurvedic Hospital combines <span className="font-bold text-green-100">5000 years of Ayurvedic wisdom</span> with modern healthcare standards. Our experienced Vaidyas provide personalized treatments to restore your natural balance and vitality.
              </p>
              
              <div className="flex justify-center gap-12">
                {[
                  { icon: '🌿', label: 'Organic Herbs' },
                  { icon: '🧘', label: 'Yoga Therapy' },
                  { icon: '💆', label: 'Panchakarma' },
                  { icon: '🍵', label: 'Herbal Teas' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-sm font-medium text-green-100">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Organic Card Layout */}
      <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-100 via-emerald-100 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,5 Q15,10 10,15 Q5,10 10,5" fill="currentColor" className="text-green-600" />
            </pattern>
            <rect width="100" height="100" fill="url(#leaf-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 bg-white rounded-full border border-green-200 shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Image src="/logo2.png" alt="Logo" width={20} height={20} className="brightness-0 invert" />
                </div>
                <span className="text-green-700 font-semibold text-xs sm:text-sm">Our Services</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Holistic Healing</span>
              <span className="text-gray-800"> Therapies</span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading services...</span>
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-lg border-2 border-green-200">
              <div className="text-7xl mb-4">🌿</div>
              <p className="text-gray-700 text-lg font-medium">Services will appear here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div key={service.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200">
                    <div className="relative h-64 overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>
                      
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🌿</span>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-green-50/50 to-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">{service.name}</h3>
                      <a href="#contact" className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                        <span>Book Now</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Treatments - Mandala Inspired Grid */}
      <section id="treatments" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-green-100 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-5 py-2 bg-green-50 rounded-full border border-green-200">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Image src="/logo2.png" alt="Logo" width={20} height={20} className="brightness-0 invert" />
                </div>
                <span className="text-green-700 font-semibold text-sm">Specialized Treatments</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Traditional </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Ayurvedic Care</span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading treatments...</span>
              </div>
            </div>
          ) : treatments.length === 0 ? (
            <div className="text-center py-20 bg-green-50 rounded-3xl">
              <div className="text-7xl mb-4">💊</div>
              <p className="text-gray-600 text-lg">Treatments will appear here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {treatments.map((treatment, idx) => (
                <div key={treatment.id} className="group relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                        {treatment.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact - Two Box Design */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-5 py-2 bg-white rounded-full border-2 border-green-200 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Image src="/logo2.png" alt="Logo" width={20} height={20} className="brightness-0 invert" />
                </div>
                <span className="text-green-700 font-semibold text-sm">Connect With Us</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">We're here to help you on your wellness journey</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Contact Information Box */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Contact Information</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                    <p className="text-green-100 leading-relaxed">{settings?.contact_address || 'Loading...'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-green-100">{settings?.contact_phone || 'Loading...'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-green-100">{settings?.contact_email || 'Loading...'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    🕐
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                    <p className="text-green-100">{settings?.working_hours || 'Loading...'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {['🌿', '🧘', '🌺', '💚'].map((icon, idx) => (
                    <div key={idx} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer hover:scale-110 transform">
                      <span className="text-2xl">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-green-200">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Fill out the form and we'll get back to you soon</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-green-50/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-green-50/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-green-50/50"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none bg-green-50/50"
                    placeholder="Tell us about your health concerns..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Natural & Organic */}
      <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="footer-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#footer-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14">
                  <Image src="/logo2.png" alt="Logo" width={56} height={56} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{settings?.hospital_name || 'Sanjeevani'}</h3>
                  <p className="text-green-300 text-sm">Ayurvedic Hospital</p>
                </div>
              </div>
              <p className="text-green-100 mb-6 leading-relaxed">
                Experience authentic Ayurvedic healing rooted in ancient wisdom. Your journey to natural health and wellness begins here.
              </p>
              <div className="flex gap-3">
                {['🌿', '🧘', '🌺', '💚'].map((icon, idx) => (
                  <div key={idx} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                    <span className="text-xl">{icon}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About', 'Services', 'Treatments', 'Contact'].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="block text-green-200 hover:text-white transition-colors hover:pl-2 duration-300">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Info</h4>
              <div className="space-y-3 text-green-200 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-lg">📞</span>
                  <span>{settings?.contact_phone || 'Loading...'}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-lg">✉️</span>
                  <span>{settings?.contact_email || 'Loading...'}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-lg">🕐</span>
                  <span>{settings?.working_hours || 'Loading...'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-green-200">
              © 2024 {settings?.hospital_name || 'Sanjeevani Ayurvedic Hospital'}. All rights reserved.
            </p>
            <p className="text-green-300 text-sm mt-2">
              🌿 Crafted with care for your wellness journey
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
