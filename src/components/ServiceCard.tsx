import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  services: string[];
  onBookNow: () => void;
}

const ServiceCard = ({ title, icon, description, services, onBookNow }: ServiceCardProps) => {
  return (
    <Card className="group h-full shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 flex-grow">
          {description}
        </p>
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-sm text-foreground">Services Include:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {services.map((service, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></span>
                {service}
              </li>
            ))}
          </ul>
        </div>
        <Button 
          onClick={onBookNow}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;