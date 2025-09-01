import { ShoppingCart, Calendar, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">PantryPal Weekly</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Meal Planner
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Grocery Lists
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Family
            </Button>
            <Button size="sm" className="bg-gradient-accent text-accent-foreground border-0 hover:opacity-90">
              Add Meal
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;