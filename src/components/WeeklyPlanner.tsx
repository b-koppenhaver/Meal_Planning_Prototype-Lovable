import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Star } from "lucide-react";
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

const WeeklyPlanner = () => {
  const [weekMeals, setWeekMeals] = useState<{ [key: string]: Meal | null }>({
    monday: {
      id: "1",
      name: "Creamy Chicken Alfredo",
      cuisine: "Italian",
      rating: 4.5,
      effortLevel: 'medium',
      hasLeftovers: true,
      isNonPerishable: false,
    },
    tuesday: {
      id: "2", 
      name: "Beef Taco Tuesday",
      cuisine: "Mexican",
      rating: 4.8,
      effortLevel: 'medium',
      hasLeftovers: true,
      isNonPerishable: false,
    },
    wednesday: null,
    thursday: {
      id: "3",
      name: "Asian Fried Rice",
      cuisine: "Asian",
      rating: 4.2,
      effortLevel: 'low',
      hasLeftovers: false,
      isNonPerishable: true,
    },
    friday: null,
    saturday: null,
    sunday: null,
  });

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">This Week's Menu</h2>
          <p className="text-muted-foreground mt-1">Plan your family's meals for the week</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            3 meals planned
          </Badge>
          <Button className="bg-gradient-accent text-accent-foreground border-0 hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Suggestions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map(({ key, label }) => (
          <Card key={key} className="bg-gradient-card shadow-soft border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {weekMeals[key] ? (
                <MealCard meal={weekMeals[key]!} size="compact" />
              ) : (
                <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlanner;