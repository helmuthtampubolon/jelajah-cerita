import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  destinationId: string;
}

const ReviewSection = ({ destinationId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const REVIEWS_KEY = `reviews_${destinationId}`;

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(REVIEWS_KEY);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [destinationId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk memberikan review.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating diperlukan",
        description: "Silakan pilih rating bintang.",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim().length === 0) {
      toast({
        title: "Komentar diperlukan",
        description: "Silakan tulis komentar Anda.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));

    // Reset form
    setRating(0);
    setComment("");
    setIsSubmitting(false);

    toast({
      title: "Review berhasil ditambahkan!",
      description: "Terima kasih atas review Anda.",
    });
  };

  const renderStars = (currentRating: number, isInteractive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (isInteractive ? (hoveredRating || rating) : currentRating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${isInteractive ? "cursor-pointer" : ""}`}
            onClick={() => isInteractive && setRating(star)}
            onMouseEnter={() => isInteractive && setHoveredRating(star)}
            onMouseLeave={() => isInteractive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <Card>
        <CardHeader>
          <CardTitle>Berikan Review Anda</CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStars(rating, true)}
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Komentar
                </label>
                <Textarea
                  id="comment"
                  placeholder="Ceritakan pengalaman Anda..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim Review"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Silakan login untuk memberikan review
              </p>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div>
        <h3 className="text-2xl font-bold mb-6">
          Review Pengunjung ({reviews.length})
        </h3>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.userName}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                        <div className="mb-3">{renderStars(review.rating)}</div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Belum ada review. Jadilah yang pertama memberikan review!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
