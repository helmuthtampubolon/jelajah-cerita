import { motion } from "framer-motion";
import { MapPin, Users, Star, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { destinations } from "@/lib/data";

export default function Dashboard() {
  // Calculate dummy stats from data
  const totalDestinations = destinations.length;
  const totalReviews = destinations.reduce((acc, dest) => acc + dest.reviews, 0);
  const avgRating = (destinations.reduce((acc, dest) => acc + dest.rating, 0) / destinations.length).toFixed(1);
  const totalBookings = 156; // Dummy booking count

  const stats = [
    {
      title: "Total Destinasi",
      value: totalDestinations,
      icon: MapPin,
      description: "Destinasi terdaftar",
      color: "text-primary",
    },
    {
      title: "Total Booking",
      value: totalBookings,
      icon: Package,
      description: "Booking aktif",
      color: "text-accent",
    },
    {
      title: "Total Review",
      value: totalReviews.toLocaleString(),
      icon: Users,
      description: "Review dari user",
      color: "text-secondary",
    },
    {
      title: "Rating Rata-rata",
      value: avgRating,
      icon: Star,
      description: "Rating destinasi",
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di panel admin TravelHub
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-card-hover transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informasi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h3 className="font-semibold text-foreground">Destinasi Terpopuler</h3>
                <p className="text-sm text-muted-foreground">
                  {destinations.sort((a, b) => b.reviews - a.reviews)[0]?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {destinations.sort((a, b) => b.reviews - a.reviews)[0]?.reviews}
                </p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h3 className="font-semibold text-foreground">Rating Tertinggi</h3>
                <p className="text-sm text-muted-foreground">
                  {destinations.sort((a, b) => b.rating - a.rating)[0]?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">
                  {destinations.sort((a, b) => b.rating - a.rating)[0]?.rating}
                </p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
