import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { destinations } from "@/lib/data";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  // Filter destinations based on wishlist
  const wishlistDestinations = destinations.filter((dest) =>
    wishlist.includes(String(dest.id))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold">Wishlist Saya</h1>
            </div>
            <p className="text-muted-foreground">
              Destinasi favorit yang telah Anda simpan
            </p>
          </motion.div>

          {wishlistDestinations.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {wishlistDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <DestinationCard {...destination} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <Heart className="h-24 w-24 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-2">
                Wishlist Anda masih kosong
              </h2>
              <p className="text-muted-foreground mb-8">
                Mulai tambahkan destinasi favorit Anda untuk menyimpannya di sini
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
