import { useState, useEffect, useRef } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  value: Coordinates;
  onChange: (coords: Coordinates) => void;
  address: string;
  onAddressChange: (address: string) => void;
}

export default function LocationPicker({
  value,
  onChange,
  address,
  onAddressChange,
}: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Mock location search - in production, replace with real geocoding API
  const handleSearch = () => {
    // Simulate geocoding search
    const mockLocations: Record<string, { coords: Coordinates; address: string }> = {
      "bali": { coords: { lat: -8.4095, lng: 115.1889 }, address: "Bali, Indonesia" },
      "jakarta": { coords: { lat: -6.2088, lng: 106.8456 }, address: "Jakarta, Indonesia" },
      "yogyakarta": { coords: { lat: -7.7956, lng: 110.3695 }, address: "Yogyakarta, Indonesia" },
      "lombok": { coords: { lat: -8.6500, lng: 116.3249 }, address: "Lombok, NTB, Indonesia" },
      "malang": { coords: { lat: -7.9666, lng: 112.6326 }, address: "Malang, Jawa Timur, Indonesia" },
      "bandung": { coords: { lat: -6.9175, lng: 107.6191 }, address: "Bandung, Jawa Barat, Indonesia" },
    };

    const key = searchQuery.toLowerCase();
    const found = Object.keys(mockLocations).find((k) => key.includes(k));
    
    if (found) {
      onChange(mockLocations[found].coords);
      onAddressChange(mockLocations[found].address);
    } else {
      // Random location if not found
      const randomLat = -6 - Math.random() * 4;
      const randomLng = 106 + Math.random() * 15;
      onChange({ lat: randomLat, lng: randomLng });
      onAddressChange(searchQuery);
    }
  };

  // Handle map click to set marker
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click position to lat/lng (simplified calculation)
    // This is a mock - in real implementation, use actual map library
    const lat = -6 - (y / rect.height) * 6;
    const lng = 105 + (x / rect.width) * 20;
    
    onChange({ lat, lng });
  };

  // Calculate marker position on mock map
  const getMarkerPosition = () => {
    // Convert lat/lng to percentage position
    const x = ((value.lng - 105) / 20) * 100;
    const y = ((value.lat + 6) / -6) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const markerPos = getMarkerPosition();

  return (
    <div className="space-y-3">
      <Label>Lokasi di Peta</Label>
      
      {/* Search */}
      <div className="flex gap-2">
        <Input
          placeholder="Cari lokasi (misal: Bali, Jakarta...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button type="button" variant="outline" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Mock Map */}
      <div
        ref={mapRef}
        onClick={handleMapClick}
        className="relative w-full h-48 bg-muted rounded-lg border border-border overflow-hidden cursor-crosshair"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {/* Map overlay with Indonesia shape hint */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        
        {/* Grid labels */}
        <div className="absolute top-2 left-2 text-xs text-muted-foreground">Indonesia Map (Click to set location)</div>
        
        {/* Marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200"
          style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
        >
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-destructive drop-shadow-lg" fill="hsl(var(--destructive))" />
            <div className="w-2 h-2 bg-destructive/50 rounded-full mt-[-4px]" />
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-mono">
          {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
        </div>
      </div>

      {/* Manual coordinates input */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Latitude</Label>
          <Input
            type="number"
            step="0.0001"
            value={value.lat}
            onChange={(e) => onChange({ ...value, lat: parseFloat(e.target.value) || 0 })}
            placeholder="-8.4095"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Longitude</Label>
          <Input
            type="number"
            step="0.0001"
            value={value.lng}
            onChange={(e) => onChange({ ...value, lng: parseFloat(e.target.value) || 0 })}
            placeholder="115.1889"
          />
        </div>
      </div>

      {/* Address field */}
      <div>
        <Label className="text-xs text-muted-foreground">Alamat Lengkap</Label>
        <Input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Jl. Raya Kuta No. 123, Bali"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Klik pada peta atau gunakan pencarian untuk menentukan lokasi. Integrasikan dengan Mapbox/Google Maps untuk peta real.
      </p>
    </div>
  );
}
