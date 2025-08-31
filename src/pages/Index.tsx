import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import BookingModal from "@/components/BookingModal";
import TestimonialCard from "@/components/TestimonialCard";
import ProjectGallery from "@/components/ProjectGallery";
import heroImage from "@/assets/hero-services.jpg";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Import service images
import plumbingImage from "@/assets/service-plumbing.jpg";
import paintingImage from "@/assets/service-painting.webp";
import waterproofingImage from "@/assets/service-waterproofing.jpg";
import carpentryImage from "@/assets/service-carpentry.webp";
import architecturalImage from "@/assets/service-architectural.jpg";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Plumbing Services",
      icon: "🔧",
      description: "Professional plumbing solutions for homes and businesses with 24/7 emergency support.",
      services: ["Pipe Installation & Repair", "Drain Cleaning", "Water Heater Services", "Emergency Repairs", "Bathroom Fitting"],
      image: plumbingImage
    },
    {
      title: "Painting Services", 
      icon: "🎨",
      description: "Transform your spaces with our expert interior and exterior painting services.",
      services: ["Interior Painting", "Exterior Painting", "Texture Work", "Wall Preparation", "Color Consultation"],
      image: paintingImage
    },
    {
      title: "Waterproofing",
      icon: "🛡️", 
      description: "Protect your property from water damage with our advanced waterproofing solutions.",
      services: ["Roof Waterproofing", "Bathroom Waterproofing", "Basement Sealing", "Terrace Treatment", "Wall Waterproofing"],
      image: waterproofingImage
    },
    {
      title: "Carpentry Work",
      icon: "🪚",
      description: "Custom woodwork and furniture solutions crafted by skilled carpenters.",
      services: ["Custom Furniture", "Kitchen Cabinets", "Wardrobe Design", "Door & Window Frames", "Interior Woodwork"],
      image: carpentryImage
    },
    {
      title: "Architectural Consultancy",
      icon: "📐",
      description: "Professional architectural design and consultation services for your dream projects.",
      services: ["Design Planning", "3D Visualization", "Structural Consultation", "Project Management", "Interior Design"],
      image: architecturalImage
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Sector 17, Chandigarh",
      rating: 5,
      comment: "Excellent plumbing work! They fixed our water heater issue quickly and professionally. Highly recommended for anyone in Chandigarh.",
    },
    {
      name: "Priya Sharma",
      location: "Sector 22, Chandigarh",
      rating: 5,
      comment: "The electrical team was prompt and efficient. They rewired our entire house with minimal disruption. Very professional service!",
    },
    {
      name: "Amit Patel",
      location: "Sector 35, Chandigarh",
      rating: 4,
      comment: "Good service for AC repair. The technician was knowledgeable and fixed the issue in no time. Will definitely call them again.",
    },
    {
      name: "Neha Gupta",
      location: "Sector 8, Chandigarh",
      rating: 5,
      comment: "Outstanding carpentry work! They built custom cabinets for our kitchen and the quality is exceptional. Very reasonable pricing too.",
    },
    {
      name: "Vikram Singh",
      location: "Sector 21, Chandigarh",
      rating: 4,
      comment: "Reliable plumbing service. They arrived on time and fixed the leaking pipe in our bathroom. Would recommend to others.",
    },
    {
      name: "Anjali Verma",
      location: "Sector 44, Chandigarh",
      rating: 5,
      comment: "Excellent electrical service! They installed new lighting fixtures throughout our home and the results are amazing.",
    },
  ];

  // Active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Calculate the transform value based on active index
  const getTransformStyle = (index: number) => {
    const position = index - activeIndex;
    const baseTranslateX = position * 100; // Base position
    const offset = position > 0 ? 100 : -100; // Initial offset for sliding in
    
    // For smoother animation, we'll use a CSS class instead of inline styles
    let className = 'transition-all duration-500 ease-in-out ';
    
    if (index === activeIndex) {
      className += 'translate-x-0 opacity-100 z-10';
    } else if (index < activeIndex) {
      className += '-translate-x-full opacity-0';
    } else {
      className += 'translate-x-full opacity-0';
    }
    
    return className;
  };

  // Handle manual navigation
  const goToTestimonial = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleBookNow = (serviceName?: string) => {
    setSelectedService(serviceName || "");
    setTimeout(() => {
      setIsBookingOpen(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">The Client Company</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {[
              { href: '#services', label: 'Services' },
              { href: '#projects', label: 'Projects' },
              { href: '#testimonials', label: 'Testimonials' },
              { href: '#contact', label: 'Contact' }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="relative px-4 py-2 text-foreground group overflow-hidden rounded-md"
              >
                <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-200">{item.label}</span>
                <span className="absolute inset-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-md opacity-0 group-hover:opacity-100"></span>
              </a>
            ))}
          </div>
          
          <Button 
            onClick={() => handleBookNow()} 
            className="bg-primary hover:bg-primary/90 relative overflow-hidden group"
          >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>
      </nav>

      {/* Hero Section - Simplified but Attractive Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean Background with Subtle Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Professional home services"
              className="w-full h-full object-cover filter brightness-75"
            />
          </div>
          
          {/* Simple Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/70 mix-blend-multiply"></div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-dot-pattern-small bg-[length:20px_20px] opacity-5"></div>
        </div>
        
        {/* Content Container with Clean Design */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Elegant Badge */}
          <div className="mb-8 inline-block">
            <span className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              <span className="text-secondary mr-2">★</span>
              <span className="tracking-wider">TRUSTED BY 1000+ CUSTOMERS IN CHANDIGARH</span>
              <span className="text-secondary ml-2">★</span>
            </span>
          </div>
          
          {/* Clean Headline */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="block mb-2 text-white">The</span>
              <span className="block mb-2 text-white">Client <span className="text-secondary">Company</span></span>
            </h1>
          </div>
          
          {/* Simple Subtitle */}
          <div className="mb-6">
            <p className="text-xl md:text-2xl font-light opacity-90 tracking-wide">
              Professional Home & Commercial Services
            </p>
          </div>
          
          {/* Clean Description */}
          <div className="mb-10">
            <p className="text-lg p-5 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <span className="relative z-10">We provide top-quality home and commercial services in Chandigarh with a focus on reliability, professionalism, and customer satisfaction. Our team of experts is ready to transform your space.</span>
            </p>
          </div>
          
          {/* Attractive CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleBookNow()} 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-1"
            >
              Book Our Services
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 text-primary hover:bg-primary/10 font-medium px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              onClick={() => scrollToSection('services')}
            >
              Explore Services
            </Button>
          </div>
          
          {/* Simple Statistics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">1000+</p>
              <p className="text-sm text-white/70">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-white/70">Expert Team</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10+</p>
              <p className="text-sm text-white/70">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-sm text-white/70">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Professional Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive home and commercial services across Chandigarh with skilled professionals and quality materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                description={service.description}
                services={service.services}
                image={service.image}
                onBookNow={() => handleBookNow(service.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <ProjectGallery />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/5 to-transparent rounded-full -mr-32 -mb-32 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" 
                   style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <TestimonialCard
                      name={testimonial.name}
                      location={testimonial.location}
                      rating={testimonial.rating}
                      comment={testimonial.comment}
                      active={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 px-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToTestimonial((activeIndex - 1 + testimonials.length) % testimonials.length);
                }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      index === activeIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/20 hover:bg-muted-foreground/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToTestimonial((activeIndex + 1) % testimonials.length);
                }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Testimonial stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1K+</div>
                <p className="text-muted-foreground">Projects Done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-accent/30">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/10 to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-secondary/10 to-transparent opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch With Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-muted-foreground">
              Have questions or ready to book a service? Our team is here to help you with all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1.5">Phone</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-muted-foreground text-sm mt-1">+91 98765 43211</p>
                    <a href="tel:+919876543210" className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline">
                      Call Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                      <Mail className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1.5">Email</h4>
                    <p className="text-muted-foreground">info@theclientcompany.com</p>
                    <p className="text-muted-foreground text-sm">support@theclientcompany.com</p>
                    <a href="mailto:info@theclientcompany.com" className="mt-3 inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                      Send Email
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                      <MapPin className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1.5">Location</h4>
                    <p className="text-muted-foreground">Sector 17, Chandigarh</p>
                    <p className="text-muted-foreground text-sm">Punjab, India - 160017</p>
                    <a href="#" className="mt-3 inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline">
                      View on Map
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 1 1 0 001.414 1.414 4 4 0 105.656-5.656l-3-3a4 4 0 00-5.656 0 1 1 0 101.414 1.414 2 2 0 012.828 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
                      <Clock className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1.5">Working Hours</h4>
                    <p className="text-muted-foreground text-sm">Monday - Saturday</p>
                    <p className="text-muted-foreground font-medium">8:00 AM - 7:00 PM</p>
                    <p className="text-rose-600 dark:text-rose-400 text-sm font-medium mt-1">Emergency: 24/7 Available</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border border-border/50 overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h3>
                  <p className="text-muted-foreground">Fill out the form and our team will get back to you within 24 hours</p>
                </div>
                
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1.5">Service Needed</label>
                    <select 
                      id="service" 
                      className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="plumbing">Plumbing Services</option>
                      <option value="electrical">Electrical Work</option>
                      <option value="ac">AC Repair & Service</option>
                      <option value="carpentry">Carpentry Work</option>
                      <option value="painting">Painting Services</option>
                      <option value="waterproofing">Waterproofing</option>
                      <option value="architectural">Architectural Design</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-2.5 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Service Areas */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">Our Service Areas</h3>
              <p className="text-muted-foreground">We proudly serve all sectors of Chandigarh, Mohali, and surrounding areas</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                'Sector 1-30', 'Sector 31-47', 'Sector 48-56', 'Sector 57-61',
                'Mohali', 'Panchkula', 'Zirakpur', 'Kharar'
              ].map((area, index) => (
                <div key={index} className="bg-background/50 border border-border/30 rounded-lg p-3 text-center hover:bg-primary/5 transition-colors duration-200">
                  <span className="text-sm font-medium text-foreground">{area}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">Don't see your area listed? Contact us to check availability!</p>
              <button className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors duration-200">
                Check Service Availability
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50"></div>
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-radial from-primary/5 to-transparent opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-secondary/5 to-transparent opacity-60 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="font-bold text-2xl relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">The Client Company</span>
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              </div>
              <p className="text-muted-foreground">
                Professional services for all your home and office needs in Chandigarh. Quality work, timely delivery, and customer satisfaction guaranteed.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={index}
                      href="#" 
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-background/80 text-muted-foreground hover:text-primary hover:bg-background hover:shadow-sm transition-all duration-300 group"
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-lg relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary/50 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "#", label: "Home" },
                  { href: "#services", label: "Services" },
                  { href: "#projects", label: "Projects" },
                  { href: "#testimonials", label: "Testimonials" },
                  { href: "#contact", label: "Contact" }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-lg relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary/50 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-lg relative inline-block">
                Contact Info
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary/50 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: MapPin, content: "Sector 17, Chandigarh, India" },
                  { icon: Phone, content: "+91 98765 43210" },
                  { icon: Mail, content: "info@clientcompany.com" },
                  { icon: Clock, content: "Mon-Sat: 9AM - 6PM" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center group">
                      <div className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center mr-3 group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {item.content}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} The Client Company. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-primary transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm hover:text-primary transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Index;