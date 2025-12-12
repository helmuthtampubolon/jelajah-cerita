import { useState } from "react";
import { Plus, X, Image as ImageIcon, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageGalleryInputProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageGalleryInput({ images, onChange }: ImageGalleryInputProps) {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onChange([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    onChange(updated);
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <Label>Galeri Gambar</Label>
      
      {/* Existing images */}
      <div className="space-y-2">
        {images.map((url, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border"
          >
            {/* Drag handle */}
            <div className="flex flex-col gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-6 p-0"
                onClick={() => moveImage(index, index - 1)}
                disabled={index === 0}
              >
                ▲
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-6 p-0"
                onClick={() => moveImage(index, index + 1)}
                disabled={index === images.length - 1}
              >
                ▼
              </Button>
            </div>

            {/* Image preview */}
            <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
              {url ? (
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* URL input */}
            <Input
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="URL gambar"
              className="flex-1"
            />

            {/* Badge for primary */}
            {index === 0 && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full whitespace-nowrap">
                Utama
              </span>
            )}

            {/* Remove button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveImage(index)}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add new image */}
      <div className="flex gap-2">
        <Input
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Masukkan URL gambar baru..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddImage())}
        />
        <Button type="button" variant="outline" onClick={handleAddImage} className="gap-1">
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Gambar pertama akan menjadi gambar utama. Gunakan tombol panah untuk mengubah urutan.
      </p>
    </div>
  );
}
