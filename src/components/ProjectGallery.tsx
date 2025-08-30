import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Star, ArrowLeftRight, MapPin, Calendar } from "lucide-react";
import projectKitchen from "@/assets/project-kitchen.jpg";
import projectWaterproofing from "@/assets/project-waterproofing.jpg";
import projectPainting from "@/assets/project-painting.jpg";
import projectPlumbing from "@/assets/project-plumbing.jpg";
import projectCarpentry from "@/assets/project-carpentry.jpg";
import projectArchitecture from "@/assets/project-architecture.jpg";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  beforeImage?: string; // Optional before image for renovation projects
  description: string;
  client: string;
  location: string;
  completionDate: string;
  rating: number;
  testimonial: string;
  featured: boolean;
  isRenovation?: boolean; // Flag to indicate if this is a renovation project with before/after images
}

const ProjectGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [animateCards, setAnimateCards] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Modern Kitchen Renovation",
      category: "Carpentry",
      image: projectKitchen,
      beforeImage: projectKitchen, // Using same image as placeholder
      description: "Complete kitchen makeover with custom cabinets and granite countertops",
      location: "Sector 17, Chandigarh",
      client: "Sharma Family",
      completionDate: "March 2024",
      rating: 5,
      testimonial: "The team transformed our outdated kitchen into a stunning modern space. The quality of work exceeded our expectations!",
      featured: true,
      isRenovation: true
    },
    {
      id: 2,
      title: "Bathroom Waterproofing",
      category: "Waterproofing", 
      image: projectWaterproofing,
      beforeImage: projectWaterproofing, // Using same image as placeholder
      description: "Professional waterproofing solution for master bathroom renovation",
      location: "Sector 35, Chandigarh",
      client: "Verma Residence",
      completionDate: "January 2024",
      rating: 4.5,
      testimonial: "No more leaks! Professional service and excellent attention to detail.",
      featured: true,
      isRenovation: true
    },
    {
      id: 3,
      title: "Office Interior Painting",
      category: "Painting",
      image: projectPainting,
      beforeImage: projectPainting, // Using same image as placeholder
      description: "Premium interior painting with texture work for corporate office",
      location: "IT Park, Mohali",
      client: "Singh Enterprises",
      completionDate: "November 2023",
      rating: 5,
      testimonial: "The painters were meticulous and the finish is flawless. Our office looks brand new!",
      featured: false,
      isRenovation: true
    },
    {
      id: 4,
      title: "Residential Plumbing",
      category: "Plumbing",
      image: projectPlumbing,
      description: "Complete plumbing installation for new residential construction",
      location: "Sector 22, Chandigarh",
      client: "Kumar Family",
      completionDate: "February 2024",
      rating: 4.8,
      testimonial: "The plumbing work was done efficiently with minimal disruption to our daily routine.",
      featured: false
    },
    {
      id: 5,
      title: "Custom Furniture Design",
      category: "Carpentry",
      image: projectCarpentry,
      description: "Bespoke wooden furniture and built-in storage solutions",
      location: "Panchkula",
      client: "Malhotra Residence",
      completionDate: "August 2023",
      rating: 5,
      testimonial: "The craftsmanship is exceptional. Each piece fits perfectly in our space and the attention to detail is remarkable.",
      featured: true
    },
    {
      id: 6,
      title: "Architectural Planning",
      category: "Architecture",
      image: projectArchitecture,
      description: "Complete architectural design and 3D visualization for villa project",
      location: "Zirakpur",
      client: "Kapoor Family",
      completionDate: "January 2024",
      rating: 4.7,
      testimonial: "The design maximizes space and natural light. We're extremely satisfied with the results.",
      featured: false
    }
  ];

  const categories = ["All", "Carpentry", "Waterproofing", "Painting", "Plumbing", "Architecture"];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Trigger animation when component mounts or category changes
  useEffect(() => {
    setAnimateCards(false);
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // Function to open project modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Get featured projects for carousel
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <section id="projects" className="py-16 bg-accent relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/20 to-transparent opacity-70 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/20 to-transparent opacity-70 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative inline-block">
            Our Past Projects
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8"></p>
          
          
          {/* Enhanced Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl shadow-inner max-w-4xl mx-auto">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Badge 
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 px-6 py-3 font-medium text-sm ${activeCategory === category ? 
                      'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' : 
                      'hover:border-primary/50 bg-background/80'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    {activeCategory === category && (
                      <motion.span 
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                      </motion.span>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: animateCards ? 1 : 0, 
                y: animateCards ? 0 : 20 
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96] 
              }}
              className="flex flex-col h-full"
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background to-background/90 hover:shadow-primary/10 h-full">
                <div className="relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-background/80 backdrop-blur-sm text-foreground border border-primary/20 font-medium shadow-md">
                      {project.category}
                    </Badge>
                  </div>
                  {project.isRenovation && (
                    <Badge className="absolute top-3 right-3 bg-primary/80 hover:bg-primary text-white flex items-center gap-1.5 z-10 shadow-md">
                      <ArrowLeftRight className="h-3.5 w-3.5" />
                      Before & After
                    </Badge>
                  )}
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                    <div className="flex items-center mb-3">
                      {[...Array(Math.floor(project.rating))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      {project.rating % 1 > 0 && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 opacity-50" />
                      )}
                      <span className="text-sm text-muted-foreground ml-2">{project.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                        {project.location}
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary-foreground border-primary/20">
                        {project.completionDate}
                      </Badge>
                    </div>
                    <Button 
                      variant="default" 
                      className="w-full flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group relative overflow-hidden"
                      onClick={() => openProjectModal(project)}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        View Project Details
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced Project Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {selectedProject && (
            <DialogContent className="max-w-5xl p-0 overflow-hidden bg-gradient-to-b from-background to-background/90 max-h-[90vh] overflow-y-auto">
              <div className="relative h-40 md:h-60 overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover blur-sm opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <Badge className="mb-3">{selectedProject.category}</Badge>
                  <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center gap-1 mr-4">
                      {[...Array(Math.floor(selectedProject.rating))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      {selectedProject.rating % 1 > 0 && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 opacity-50" />
                      )}
                      <span className="ml-1 text-sm font-medium">{selectedProject.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {selectedProject.location}
                      <span className="mx-2">•</span>
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {selectedProject.completionDate}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="rounded-lg overflow-hidden shadow-lg border border-border/50">
                    {selectedProject.isRenovation && selectedProject.beforeImage ? (
                      <div className="relative">
                        <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-yellow-500/80 text-white">
                          <span className="mr-1">✨</span> Before & After
                        </Badge>
                        <BeforeAfterSlider 
                          beforeImage={selectedProject.beforeImage}
                          afterImage={selectedProject.image}
                        />
                      </div>
                    ) : (
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-auto object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <Star className="h-4 w-4 text-primary" />
                      </span>
                      Client Testimonial
                    </h3>
                    <blockquote className="italic text-muted-foreground border-l-4 border-primary/30 pl-4 py-2 bg-primary/5 rounded-r-md">
                        {selectedProject.testimonial}
                        <footer className="mt-2 text-sm font-medium">— {selectedProject.client}</footer>
                      </blockquote>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div>
                     <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                     <p className="text-muted-foreground">{selectedProject.description}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                       <p>{selectedProject.client}</p>
                     </div>
                     <div>
                       <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                       <Badge>{selectedProject.category}</Badge>
                     </div>
                     <div>
                       <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                       <p>{selectedProject.location}</p>
                     </div>
                     <div>
                       <h4 className="text-sm font-medium text-muted-foreground">Completion Date</h4>
                       <p>{selectedProject.completionDate}</p>
                     </div>
                     {selectedProject.isRenovation && (
                       <div>
                         <h4 className="text-sm font-medium text-muted-foreground">Project Type</h4>
                         <Badge variant="secondary" className="bg-gradient-to-r from-primary/80 to-primary text-white">
                           <ArrowLeftRight className="h-3.5 w-3.5 mr-1" />
                           Renovation Project
                         </Badge>
                       </div>
                     )}
                   </div>
                   <div className="pt-4">
                     <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg" onClick={() => setIsModalOpen(false)}>
                       <ArrowRight className="mr-2 h-4 w-4" />
                       Book a Similar Service
                     </Button>
                   </div>
                 </div>
               </div>
             </DialogContent>
           )}
         </Dialog>

         <div className="text-center mt-12">
           <p className="text-muted-foreground mb-4">
             Interested in seeing more of our work?
           </p>
           <Badge 
             variant="outline"
             className="cursor-pointer relative overflow-hidden group px-6 py-3"
           >
            <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">View All Projects →</span>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;