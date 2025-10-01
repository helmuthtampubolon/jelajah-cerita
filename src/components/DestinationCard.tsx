import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  price: string;
}

export const DestinationCard = ({
  name,
  location,
  image,
  rating,
  reviews,
  category,
  price,
}: DestinationCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-accent hover:bg-accent">
          {category}
        </Badge>
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-sm text-white/80">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Mulai dari</p>
            <p className="font-bold text-primary text-lg">{price}</p>
          </div>
          <button className="px-4 py-2 bg-gradient-hero text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            Lihat Detail
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
