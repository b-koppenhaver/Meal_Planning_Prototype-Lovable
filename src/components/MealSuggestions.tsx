import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Sparkles } from "lucide-react";
import MealCard from "./MealCard";

interface Meal {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  effortLevel: 'low' | 'medium' | 'high';
  hasLeftovers: boolean;
  isNonPerishable: boolean;
}

const MealSuggestions = () => {
  const suggestedMeals: Meal[] = [
    {
      id: "s1",
      name: "Mediterranean Quinoa Bowl",
      cuisine: "Mediterranean",
      rating: 4.3,
      effortLevel: 'medium',
      hasLeftovers: true,
      isNonPerishable: false,
    },
    {
      id: "s2",
      name: "Classic Spaghetti Bolognese",
      cuisine: "Italian",
      rating: 4.7,
      effortLevel: 'high',
      hasLeftovers: true,
      isNonPerishable: false,
    },
    {
      id: "s3",
      name: "Chicken & Rice Casserole",
      cuisine: "American",
      rating: 4.1,
      effortLevel: 'low',
      hasLeftovers: false,
      isNonPerishable: true,
    },
    {
      id: "s4",
      name: "Thai Green Curry",
      cuisine: "Asian",
      rating: 4.6,
      effortLevel: 'medium',
      hasLeftovers: true,
      isNonPerishable: false,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-hero text-primary-foreground shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span>Smart Meal Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary-foreground/90 mb-4">
            Based on your family's preferences and this week's menu, here are some personalized suggestions:
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Variety balanced
            </Badge>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              2 leftover meals included
            </Badge>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              1 pantry-friendly option
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Recommended for This Week</h3>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Get New Suggestions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestedMeals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            size="full"
            onSelect={(meal) => console.log("Selected meal:", meal)}
          />
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;