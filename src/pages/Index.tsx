import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ShoppingCart, Sparkles, ChefHat } from "lucide-react";
import Header from "@/components/Header";
import WeeklyPlanner from "@/components/WeeklyPlanner"; 
import GroceryList from "@/components/GroceryList";
import MealSuggestions from "@/components/MealSuggestions";
import heroImage from "@/assets/hero-meal-planning.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("planner");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
          <div className="container mx-auto px-4 h-full flex items-center relative">
            <div className="max-w-2xl text-primary-foreground">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Smart Family Meal Planning Made Simple
              </h1>
              <p className="text-lg md:text-xl mb-6 text-primary-foreground/90">
                Plan weekly menus, generate smart grocery lists, and never run out of meal ideas again.
              </p>
              <div className="flex items-center space-x-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setActiveTab("planner")}>
                  <ChefHat className="h-5 w-5 mr-2" />
                  Start Planning
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => {
                    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-card shadow-soft">
              <TabsTrigger value="planner" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Meal Planner</span>
              </TabsTrigger>
              <TabsTrigger value="grocery" className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Grocery List</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Suggestions</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="planner" className="space-y-8">
            <WeeklyPlanner />
          </TabsContent>

          <TabsContent value="grocery" className="space-y-8">
            <GroceryList />
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-8">
            <MealSuggestions />
          </TabsContent>
        </Tabs>
      </main>

      {/* Quick Stats */}
      <section className="bg-secondary/30 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Meals Planned</div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">15</div>
                <div className="text-sm text-muted-foreground">Grocery Items</div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-success mb-2">3</div>
                <div className="text-sm text-muted-foreground">Stores Needed</div>
              </CardContent>  
            </Card>
            <Card className="bg-card shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-warning mb-2">4.5</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
