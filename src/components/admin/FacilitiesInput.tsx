import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FacilitiesInputProps {
  facilities: string[];
  onChange: (facilities: string[]) => void;
}

// Preset facilities for quick selection
const PRESET_FACILITIES = [
  "Parkir Gratis",
  "Toilet Umum",
  "Mushola",
  "Restoran",
  "Kafe",
  "WiFi Gratis",
  "ATM",
  "Toko Souvenir",
  "Pusat Informasi",
  "Area Bermain Anak",
  "Penyewaan Alat",
  "Pemandu Wisata",
  "P3K",
  "Aksesibilitas Difabel",
  "Gazebo",
  "Camping Ground",
  "Kolam Renang",
  "Penginapan",
  "Locker",
  "Shower",
];

export default function FacilitiesInput({ facilities, onChange }: FacilitiesInputProps) {
  const [customFacility, setCustomFacility] = useState("");

  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      onChange(facilities.filter((f) => f !== facility));
    } else {
      onChange([...facilities, facility]);
    }
  };

  const handleAddCustom = () => {
    if (customFacility.trim() && !facilities.includes(customFacility.trim())) {
      onChange([...facilities, customFacility.trim()]);
      setCustomFacility("");
    }
  };

  const handleRemoveFacility = (facility: string) => {
    onChange(facilities.filter((f) => f !== facility));
  };

  return (
    <div className="space-y-3">
      <Label>Fasilitas</Label>

      {/* Selected facilities */}
      {facilities.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border border-border">
          {facilities.map((facility) => (
            <Badge
              key={facility}
              variant="secondary"
              className="gap-1 pr-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => handleRemoveFacility(facility)}
            >
              {facility}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Preset facilities */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Pilih fasilitas:</Label>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-background border border-border rounded-lg">
          {PRESET_FACILITIES.map((facility) => {
            const isSelected = facilities.includes(facility);
            return (
              <button
                key={facility}
                type="button"
                onClick={() => toggleFacility(facility)}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }
                `}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {facility}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom facility input */}
      <div className="flex gap-2">
        <Input
          value={customFacility}
          onChange={(e) => setCustomFacility(e.target.value)}
          placeholder="Tambah fasilitas kustom..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustom())}
        />
        <Button type="button" variant="outline" onClick={handleAddCustom} className="gap-1">
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Klik pada fasilitas untuk menambah/menghapus, atau tambahkan fasilitas kustom.
      </p>
    </div>
  );
}
