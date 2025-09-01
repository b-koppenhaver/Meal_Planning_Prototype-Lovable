import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Meal {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  prepTime: number;
  hasLeftovers: boolean;
  isNonPerishable: boolean;
}

interface MealCardProps {
  meal: Meal;
  size?: "compact" | "full";
  onSelect?: (meal: Meal) => void;
  onRate?: (mealId: string, rating: number) => void;
}

const MealCard = ({ meal, size = "full", onSelect, onRate }: MealCardProps) => {
  const getCuisineColor = (cuisine: string) => {
    const colors = {
      Italian: "bg-red-100 text-red-700 border-red-200",
      Mexican: "bg-orange-100 text-orange-700 border-orange-200", 
      Asian: "bg-yellow-100 text-yellow-700 border-yellow-200",
      American: "bg-blue-100 text-blue-700 border-blue-200",
      Mediterranean: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[cuisine as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-3 w-3",
          i < Math.floor(rating) 
            ? "text-accent fill-accent" 
            : i < rating 
            ? "text-accent fill-accent/50" 
            : "text-muted-foreground"
        )}
      />
    ));
  };

  if (size === "compact") {
    return (
      <Card className="bg-card hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={() => onSelect?.(meal)}>
        <CardContent className="p-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-foreground line-clamp-2">{meal.name}</h4>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={cn("text-xs", getCuisineColor(meal.cuisine))}>
                {meal.cuisine}
              </Badge>
              <div className="flex items-center space-x-1">
                {renderStars(meal.rating)}
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{meal.prepTime}m</span>
              </div>
              {meal.hasLeftovers && (
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Leftovers</span>
                </div>
              )}
              {meal.isNonPerishable && (
                <div className="flex items-center space-x-1">
                  <Package className="h-3 w-3" />
                  <span>Pantry</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{meal.name}</h3>
              <Badge className={cn("w-fit", getCuisineColor(meal.cuisine))}>
                {meal.cuisine}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(meal.rating)}
              <span className="text-sm text-muted-foreground ml-1">({meal.rating})</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{meal.prepTime} minutes</span>
            </div>
            {meal.hasLeftovers && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Great for leftovers</span>
              </div>
            )}
            {meal.isNonPerishable && (
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Pantry-friendly</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm">
              View Recipe
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-accent text-accent-foreground border-0 hover:opacity-90"
              onClick={() => onSelect?.(meal)}
            >
              Add to Week
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;