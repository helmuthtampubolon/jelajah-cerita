import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { destinations as initialDestinations, categories, type OperatingHours } from "@/lib/data";
import { toast } from "sonner";
import OperatingHoursInput, { getDefaultOperatingHours } from "@/components/admin/OperatingHoursInput";
import ImageGalleryInput from "@/components/admin/ImageGalleryInput";
import FacilitiesInput from "@/components/admin/FacilitiesInput";
import LocationPicker from "@/components/admin/LocationPicker";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  operatingHours: OperatingHours;
  facilities: string[];
  coordinates: Coordinates;
  address: string;
}

interface FormData {
  name: string;
  location: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  operatingHours: OperatingHours;
  facilities: string[];
  coordinates: Coordinates;
  address: string;
}

const getInitialFormData = (): FormData => ({
  name: "",
  location: "",
  category: "",
  price: "",
  description: "",
  images: [],
  operatingHours: getDefaultOperatingHours(),
  facilities: [],
  coordinates: { lat: -8.4095, lng: 115.1889 },
  address: "",
});

export default function Destinasi() {
  const [destinations, setDestinations] = useState<Destination[]>(
    initialDestinations.map((dest) => ({
      id: dest.id,
      name: dest.name,
      location: dest.location,
      category: dest.category,
      price: dest.price,
      description: dest.description,
      images: dest.gallery || [dest.image],
      operatingHours: getDefaultOperatingHours(),
      facilities: dest.fasilitas || [],
      coordinates: dest.koordinat || { lat: -8.4095, lng: 115.1889 },
      address: dest.alamat || "",
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    basic: true,
    images: false,
    hours: false,
    facilities: false,
    location: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter destinations berdasarkan search
  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.category || !formData.price) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    if (editingDestination) {
      setDestinations(
        destinations.map((dest) =>
          dest.id === editingDestination.id ? { ...dest, ...formData } : dest
        )
      );
      toast.success("Destinasi berhasil diperbarui");
    } else {
      const newDestination: Destination = {
        id: Date.now(),
        ...formData,
      };
      setDestinations([...destinations, newDestination]);
      toast.success("Destinasi berhasil ditambahkan");
    }

    resetForm();
  };

  // Reset form and close dialog
  const resetForm = () => {
    setFormData(getInitialFormData());
    setEditingDestination(null);
    setIsDialogOpen(false);
    setOpenSections({
      basic: true,
      images: false,
      hours: false,
      facilities: false,
      location: false,
    });
  };

  // Open edit dialog
  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      location: destination.location,
      category: destination.category,
      price: destination.price,
      description: destination.description,
      images: destination.images,
      operatingHours: destination.operatingHours,
      facilities: destination.facilities,
      coordinates: destination.coordinates,
      address: destination.address,
    });
    setIsDialogOpen(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (deletingId) {
      setDestinations(destinations.filter((dest) => dest.id !== deletingId));
      toast.success("Destinasi berhasil dihapus");
    }
    setDeletingId(null);
    setIsDeleteDialogOpen(false);
  };

  const SectionHeader = ({
    title,
    section,
    badge,
  }: {
    title: string;
    section: keyof typeof openSections;
    badge?: string;
  }) => (
    <CollapsibleTrigger
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">{title}</span>
        {badge && (
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
            {badge}
          </span>
        )}
      </div>
      {openSections[section] ? (
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </CollapsibleTrigger>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelola Destinasi</h1>
          <p className="text-muted-foreground mt-1">
            Tambah, edit, atau hapus destinasi wisata
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Destinasi
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari destinasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border rounded-lg bg-card"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Fasilitas</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDestinations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Tidak ada destinasi ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredDestinations.map((destination, index) => (
                <motion.tr
                  key={destination.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                      {destination.images[0] ? (
                        <img
                          src={destination.images[0]}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{destination.name}</TableCell>
                  <TableCell>{destination.category}</TableCell>
                  <TableCell>{destination.location}</TableCell>
                  <TableCell>{destination.price}</TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {destination.facilities.length} fasilitas
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(destination)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(destination.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>
              {editingDestination ? "Edit Destinasi" : "Tambah Destinasi Baru"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi form di bawah untuk {editingDestination ? "mengubah" : "menambah"}{" "}
              destinasi
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] px-6">
            <div className="space-y-4 py-4">
              {/* Basic Info Section */}
              <Collapsible open={openSections.basic}>
                <SectionHeader title="Informasi Dasar" section="basic" badge="Wajib" />
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Destinasi *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Pantai Kuta"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Lokasi *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Contoh: Bali, Indonesia"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Harga *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Contoh: Rp 150.000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Deskripsi destinasi..."
                      rows={3}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Images Section */}
              <Collapsible open={openSections.images}>
                <SectionHeader
                  title="Galeri Gambar"
                  section="images"
                  badge={formData.images.length > 0 ? `${formData.images.length} gambar` : undefined}
                />
                <CollapsibleContent className="pt-4">
                  <ImageGalleryInput
                    images={formData.images}
                    onChange={(images) => setFormData({ ...formData, images })}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Operating Hours Section */}
              <Collapsible open={openSections.hours}>
                <SectionHeader title="Jam Operasional" section="hours" />
                <CollapsibleContent className="pt-4">
                  <OperatingHoursInput
                    value={formData.operatingHours}
                    onChange={(operatingHours) => setFormData({ ...formData, operatingHours })}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Facilities Section */}
              <Collapsible open={openSections.facilities}>
                <SectionHeader
                  title="Fasilitas"
                  section="facilities"
                  badge={
                    formData.facilities.length > 0
                      ? `${formData.facilities.length} dipilih`
                      : undefined
                  }
                />
                <CollapsibleContent className="pt-4">
                  <FacilitiesInput
                    facilities={formData.facilities}
                    onChange={(facilities) => setFormData({ ...formData, facilities })}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Location/Map Section */}
              <Collapsible open={openSections.location}>
                <SectionHeader title="Lokasi di Peta" section="location" />
                <CollapsibleContent className="pt-4">
                  <LocationPicker
                    value={formData.coordinates}
                    onChange={(coordinates) => setFormData({ ...formData, coordinates })}
                    address={formData.address}
                    onAddressChange={(address) => setFormData({ ...formData, address })}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 pt-4 border-t">
            <Button variant="outline" onClick={resetForm}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editingDestination ? "Simpan Perubahan" : "Tambah Destinasi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Destinasi?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Destinasi akan dihapus secara permanen
              dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingId(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
