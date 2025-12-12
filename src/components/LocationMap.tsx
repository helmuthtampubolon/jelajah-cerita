import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  coordinates: Coordinates;
  name: string;
  address: string;
}

export default function LocationMap({ coordinates, name, address }: LocationMapProps) {
  // Generate Google Maps embed URL
  const mapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(name)}!5e0!3m2!1sen!2sid`;

  // Google Maps links
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted">
        <iframe
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Lokasi ${name}`}
          className="absolute inset-0"
        />
      </div>

      {/* Address & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{address}</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(googleMapsUrl, "_blank")}
            className="gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            Buka Maps
          </Button>
          <Button
            size="sm"
            onClick={() => window.open(directionsUrl, "_blank")}
            className="gap-1.5"
          >
            <Navigation className="w-4 h-4" />
            Petunjuk Arah
          </Button>
        </div>
      </div>
    </div>
  );
}
