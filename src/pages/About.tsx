import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Star, MapPin, Shield, Zap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Search,
      title: "Pencarian Mudah",
      description: "Temukan destinasi wisata impian dengan fitur pencarian dan filter yang canggih.",
    },
    {
      icon: MapPin,
      title: "Informasi Lengkap",
      description: "Detail lokasi, jam operasional, harga tiket, dan peta interaktif untuk setiap destinasi.",
    },
    {
      icon: Star,
      title: "Review & Rating",
      description: "Baca pengalaman wisatawan lain dan bagikan pengalaman Anda sendiri.",
    },
    {
      icon: Heart,
      title: "Wishlist Favorit",
      description: "Simpan destinasi favorit untuk referensi perjalanan Anda selanjutnya.",
    },
    {
      icon: Shield,
      title: "Informasi Terpercaya",
      description: "Data destinasi yang akurat dan selalu diperbarui untuk kenyamanan Anda.",
    },
    {
      icon: Zap,
      title: "Akses Cepat",
      description: "Interface yang responsif dan cepat, dapat diakses dari berbagai perangkat.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang <span className="text-primary">TravelHub</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Platform informasi wisata yang membantu Anda menemukan dan mengeksplorasi 
              destinasi wisata terbaik di Indonesia dengan mudah dan menyenangkan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Apa itu TravelHub?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  TravelHub adalah platform digital yang dirancang khusus untuk memudahkan 
                  wisatawan dalam merencanakan perjalanan mereka. Kami menyediakan informasi 
                  lengkap tentang berbagai destinasi wisata, mulai dari pantai yang memukau, 
                  gunung yang menantang, hingga destinasi budaya dan kuliner yang menarik.
                </p>
                <p>
                  Dengan TravelHub, Anda dapat mengeksplorasi ratusan destinasi wisata, 
                  membaca review dari wisatawan lain, melihat lokasi di peta interaktif, 
                  dan menyimpan destinasi favorit Anda untuk referensi di masa mendatang.
                </p>
                <p>
                  Misi kami adalah membuat perencanaan liburan menjadi lebih mudah, 
                  menyenangkan, dan efisien, sehingga Anda dapat fokus pada yang terpenting: 
                  menikmati perjalanan Anda!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="py-12">
                <h3 className="text-2xl font-bold mb-4">
                  Siap Memulai Petualangan Anda?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Jelajahi ratusan destinasi wisata menarik di Indonesia dan 
                  rencanakan perjalanan impian Anda bersama TravelHub.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
