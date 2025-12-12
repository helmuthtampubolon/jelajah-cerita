import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { destinations, type Destination } from "@/lib/data";
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  ArrowLeft,
  Phone,
  Share2,
  Heart,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useWishlist } from "@/contexts/WishlistContext";
import ReviewSection from "@/components/ReviewSection";
import { WeatherWidget } from "@/components/WeatherWidget";
import { useLocale } from "@/contexts/LocaleContext";
import { useSEO } from "@/hooks/useSEO";
import ImageGallery from "@/components/ImageGallery";
import OperatingHoursDisplay from "@/components/OperatingHoursDisplay";
import LocationMap from "@/components/LocationMap";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { locale } = useLocale();
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [showFullHours, setShowFullHours] = useState(false);

  const isLiked = destination ? isInWishlist(String(destination.id)) : false;

  // SEO for this page
  useSEO({
    title: destination?.name,
    description: destination?.description,
    image: destination?.image,
    keywords: [destination?.category || "", destination?.location || "", "wisata", "travel", "indonesia"],
  });

  useEffect(() => {
    const destinationId = parseInt(id || "0");
    const found = destinations.find((d) => d.id === destinationId);

    if (!found) {
      toast.error("Destinasi tidak ditemukan");
      navigate("/destinations");
      return;
    }

    setDestination(found);
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat destinasi...</p>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link berhasil disalin!");
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan destinasi ${destination.name}. Bisa info lebih lanjut?`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(String(destination.id));
      toast.success("Dihapus dari wishlist");
    } else {
      addToWishlist(String(destination.id));
      toast.success("Ditambahkan ke wishlist");
    }
  };

  // Show only first 6 facilities, rest in collapsible
  const visibleFacilities = showAllFacilities
    ? destination.fasilitas
    : destination.fasilitas.slice(0, 6);
  const hasMoreFacilities = destination.fasilitas.length > 6;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Button */}
      <div className="pt-20 pb-4 border-b">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/destinations")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <ImageGallery images={destination.gallery} name={destination.name} />
                
                {/* Action buttons overlay */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={handleToggleWishlist}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Destination Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {destination.name}
                  </h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{destination.location}</span>
                  </div>
                </div>
                <Badge className="bg-accent hover:bg-accent text-lg px-4 py-2">
                  {destination.category}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold text-lg">{destination.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({destination.reviews} ulasan)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tentang Destinasi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.fullDescription}
                </p>
              </div>

              {/* Facilities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {visibleFacilities.map((fasilitas: string) => (
                    <div
                      key={fasilitas}
                      className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{fasilitas}</span>
                    </div>
                  ))}
                </div>
                {hasMoreFacilities && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllFacilities(!showAllFacilities)}
                    className="mt-3 gap-1"
                  >
                    {showAllFacilities ? (
                      <>
                        Tampilkan lebih sedikit
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Lihat {destination.fasilitas.length - 6} fasilitas lainnya
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Location Map */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
                <LocationMap
                  coordinates={destination.koordinat}
                  name={destination.name}
                  address={destination.alamat}
                />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weather Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WeatherWidget location={destination.location} />
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-24 shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Informasi Penting</h3>

                  {/* Info Items */}
                  <div className="space-y-5 mb-6">
                    {/* Operating Hours */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <p className="font-semibold">Jam Operasional</p>
                      </div>
                      <Collapsible open={showFullHours} onOpenChange={setShowFullHours}>
                        <div className="ml-7">
                          <OperatingHoursDisplay
                            hours={destination.operatingHours}
                            compact={!showFullHours}
                          />
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
                            >
                              {showFullHours ? "Sembunyikan jadwal" : "Lihat jadwal lengkap"}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </Collapsible>
                    </div>

                    {/* Ticket Price */}
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Harga Tiket</p>
                        <p className="text-muted-foreground">{destination.hargaTiket}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Alamat</p>
                        <p className="text-muted-foreground text-sm">
                          {destination.alamat}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Highlight */}
                  <div className="bg-gradient-hero p-4 rounded-lg mb-4">
                    <p className="text-primary-foreground/80 text-sm mb-1">
                      Paket Wisata Mulai Dari
                    </p>
                    <p className="text-primary-foreground text-3xl font-bold">
                      {destination.price}
                    </p>
                    <p className="text-primary-foreground/80 text-sm">per orang</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-hero hover:opacity-90 h-12"
                      size="lg"
                    >
                      Pesan Sekarang
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12"
                      size="lg"
                      onClick={handleWhatsApp}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Hubungi via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <ReviewSection destinationId={String(destination.id)} />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
