import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { destinations, categories } from "@/lib/data";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

// Schema validasi untuk input search
const searchSchema = z.string().trim().max(100, { message: "Search term too long" });

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [validationError, setValidationError] = useState<string>("");

  // Handle search dengan validasi
  const handleSearchChange = (value: string) => {
    try {
      searchSchema.parse(value);
      setSearchQuery(value);
      setValidationError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
    }
  };

  // Filter destinasi berdasarkan search dan kategori
  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    // Filter berdasarkan kategori
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(
        (dest) => dest.category === selectedCategory
      );
    }

    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(lowerQuery) ||
          dest.location.toLowerCase().includes(lowerQuery) ||
          dest.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Jelajahi Destinasi Wisata
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Temukan destinasi wisata terbaik di seluruh Indonesia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 border-b bg-muted">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari destinasi, lokasi, atau kategori..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            {validationError && (
              <p className="text-sm text-destructive mt-2">{validationError}</p>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <Button
              variant={selectedCategory === "Semua" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("Semua")}
              className={
                selectedCategory === "Semua"
                  ? "bg-gradient-hero"
                  : ""
              }
            >
              Semua
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={
                  selectedCategory === category.name
                    ? "bg-gradient-hero"
                    : ""
                }
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Menampilkan {filteredDestinations.length} destinasi
              {selectedCategory !== "Semua" && ` di kategori ${selectedCategory}`}
              {searchQuery && ` untuk "${searchQuery}"`}
            </p>
          </div>

          {/* Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={`/destinations/${destination.id}`}>
                    <DestinationCard {...destination} />
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Destinasi Tidak Ditemukan
              </h3>
              <p className="text-muted-foreground mb-6">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
                }}
                className="bg-gradient-hero"
              >
                Reset Filter
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
