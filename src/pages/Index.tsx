import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import BookingModal from "@/components/BookingModal";
import TestimonialCard from "@/components/TestimonialCard";
import ProjectGallery from "@/components/ProjectGallery";
import heroImage from "@/assets/hero-services.jpg";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const services = [
    {
      title: "Plumbing Services",
      icon: "🔧",
      description: "Professional plumbing solutions for homes and businesses with 24/7 emergency support.",
      services: ["Pipe Installation & Repair", "Drain Cleaning", "Water Heater Services", "Emergency Repairs", "Bathroom Fitting"]
    },
    {
      title: "Painting Services", 
      icon: "🎨",
      description: "Transform your spaces with our expert interior and exterior painting services.",
      services: ["Interior Painting", "Exterior Painting", "Texture Work", "Wall Preparation", "Color Consultation"]
    },
    {
      title: "Waterproofing",
      icon: "🛡️", 
      description: "Protect your property from water damage with our advanced waterproofing solutions.",
      services: ["Roof Waterproofing", "Bathroom Waterproofing", "Basement Sealing", "Terrace Treatment", "Wall Waterproofing"]
    },
    {
      title: "Carpentry Work",
      icon: "🪚",
      description: "Custom woodwork and furniture solutions crafted by skilled carpenters.",
      services: ["Custom Furniture", "Kitchen Cabinets", "Wardrobe Design", "Door & Window Frames", "Interior Woodwork"]
    },
    {
      title: "Architectural Consultancy",
      icon: "📐",
      description: "Professional architectural design and consultation services for your dream projects.",
      services: ["Design Planning", "3D Visualization", "Structural Consultation", "Project Management", "Interior Design"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Sector 17, Chandigarh",
      rating: 5,
      comment: "Excellent plumbing work! They fixed our water heater issue quickly and professionally. Highly recommended for anyone in Chandigarh."
    },
    {
      name: "Priya Sharma",
      location: "Sector 35, Chandigarh", 
      rating: 5,
      comment: "The painting team did an amazing job on our home interior. Very clean work and completed on time. Great value for money."
    },
    {
      name: "Amit Singh",
      location: "Mohali",
      rating: 5,
      comment: "Professional waterproofing service for our terrace. No more water leakage issues. The team was knowledgeable and efficient."
    }
  ];

  const handleBookNow = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">The Client Company</div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#projects" className="text-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Button onClick={() => handleBookNow()} className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional home services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            The Client Company
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            Professional Home & Commercial Services in Chandigarh
          </p>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Expert plumbing, painting, waterproofing, carpentry, and architectural consultancy services. 
            Your trusted partner for quality workmanship.
          </p>
          <Button 
            size="lg"
            onClick={() => handleBookNow()}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Book Our Services
          </Button>
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
                onBookNow={() => handleBookNow(service.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <ProjectGallery />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                comment={testimonial.comment}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to get started? Contact us today for a free consultation and quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">info@theclientcompany.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Location</h4>
                      <p className="text-muted-foreground">Serving all sectors of Chandigarh & Mohali</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Working Hours</h4>
                      <p className="text-muted-foreground">Mon - Sat: 8:00 AM - 7:00 PM</p>
                      <p className="text-muted-foreground">Emergency: 24/7 Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <Card className="shadow-card border-0">
              <CardContent className="p-6">
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Service Areas</h4>
                    <p className="text-muted-foreground">
                      We serve all sectors of Chandigarh, Mohali, and surrounding areas.
                      <br />Google Maps integration available.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">The Client Company</h3>
              <p className="opacity-90">
                Your trusted partner for professional home and commercial services in Chandigarh.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#services" className="block opacity-90 hover:opacity-100 transition-opacity">Services</a>
                <a href="#projects" className="block opacity-90 hover:opacity-100 transition-opacity">Projects</a>
                <a href="#testimonials" className="block opacity-90 hover:opacity-100 transition-opacity">Testimonials</a>
                <a href="#contact" className="block opacity-90 hover:opacity-100 transition-opacity">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p>Plumbing Services</p>
                <p>Painting Services</p>
                <p>Waterproofing</p>
                <p>Carpentry Work</p>
                <p>Architectural Consultancy</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="opacity-75">&copy; 2024 The Client Company. All rights reserved.</p>
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