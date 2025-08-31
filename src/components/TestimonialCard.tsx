import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  active?: boolean;
  service?: string;
}

const TestimonialCard = ({ name, location, rating, comment, avatar, active = false, service }: TestimonialCardProps) => {
  const serviceImages: Record<string, string> = {
    plumbing: 'https://images.unsplash.com/photo-1631549916768-411a9d3cbb0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    electrical: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80',
    carpentry: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    ac: 'https://images.unsplash.com/photo-1606811856013-55dbea03c0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    painting: 'https://images.unsplash.com/photo-1617802690992-7935dff2acf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    waterproofing: 'https://images.unsplash.com/photo-1595245376862-3a4f1d9a7a0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    architectural: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    electricals: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80',
    default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  };

  const serviceTitles: Record<string, string> = {
    plumbing: 'Plumbing Services',
    electrical: 'Electrical Work',
    electricals: 'Electrical Work',
    carpentry: 'Carpentry Services',
    ac: 'AC Repair & Service',
    painting: 'Painting Services',
    waterproofing: 'Waterproofing',
    architectural: 'Architectural Design',
    default: 'Service'
  };
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-muted'}`}>
        ★
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get service data with fallbacks
  const currentService = service?.toLowerCase() || '';
  const serviceImage = serviceImages[currentService] || serviceImages['default'];
  const serviceTitle = serviceTitles[currentService] || serviceTitles['default'];

  return (
    <Card className={`h-full shadow-card hover:shadow-card-hover transition-all duration-300 border-0 ${active ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-6">
        {service && (
          <div className="relative h-40 w-full mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-full h-full">
              <img 
                src={serviceImage}
                alt={serviceTitle}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  // Fallback to default image if the service image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = serviceImages['default'];
                  target.alt = serviceTitles['default'];
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6">
              <span className="text-white text-sm font-semibold drop-shadow-md">{serviceTitle}</span>
            </div>
          </div>
        )}
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {renderStars(rating)}
        </div>
        
        <p className="text-muted-foreground italic">
          "{comment}"
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;