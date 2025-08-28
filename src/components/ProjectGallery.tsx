import { Card } from "@/components/ui/card";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const ProjectGallery = () => {
  // Placeholder projects - these would be dynamic in a real application
  const projects: Project[] = [
    {
      id: 1,
      title: "Modern Kitchen Renovation",
      category: "Carpentry",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Bathroom Waterproofing",
      category: "Waterproofing",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Office Interior Painting",
      category: "Painting",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Residential Plumbing",
      category: "Plumbing",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Custom Furniture Design",
      category: "Carpentry",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Architectural Planning",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Past Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a look at some of the quality work we've completed for our satisfied clients across Chandigarh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;