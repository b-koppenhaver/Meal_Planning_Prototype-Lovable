import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Store, Plus, Share } from "lucide-react";

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  store: string;
  category: string;
  checked: boolean;
  meal?: string;
}

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    {
      id: "1",
      name: "Chicken breast",
      quantity: "2 lbs",
      store: "Whole Foods",
      category: "Meat",
      checked: false,
      meal: "Creamy Chicken Alfredo"
    },
    {
      id: "2", 
      name: "Heavy cream",
      quantity: "1 pint",
      store: "Whole Foods",
      category: "Dairy",
      checked: false,
      meal: "Creamy Chicken Alfredo"
    },
    {
      id: "3",
      name: "Ground beef",
      quantity: "1 lb",
      store: "Costco",
      category: "Meat", 
      checked: true,
      meal: "Beef Taco Tuesday"
    },
    {
      id: "4",
      name: "Taco shells",
      quantity: "1 box",
      store: "Target",
      category: "Pantry",
      checked: false,
      meal: "Beef Taco Tuesday"
    },
    {
      id: "5",
      name: "Jasmine rice",
      quantity: "2 lbs",
      store: "Target", 
      category: "Pantry",
      checked: false,
      meal: "Asian Fried Rice"
    },
  ]);

  const [newItem, setNewItem] = useState("");

  const toggleItem = (id: string) => {
    setGroceryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      const item: GroceryItem = {
        id: Date.now().toString(),
        name: newItem,
        quantity: "1",
        store: "Target",
        category: "Other",
        checked: false
      };
      setGroceryItems([...groceryItems, item]);
      setNewItem("");
    }
  };

  const groupedByStore = groceryItems.reduce((acc, item) => {
    if (!acc[item.store]) acc[item.store] = [];
    acc[item.store].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const getStoreColor = (store: string) => {
    const colors = {
      "Whole Foods": "bg-green-100 text-green-700 border-green-200",
      "Costco": "bg-blue-100 text-blue-700 border-blue-200",
      "Target": "bg-red-100 text-red-700 border-red-200",
      "Walmart": "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return colors[store as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const completedItems = groceryItems.filter(item => item.checked).length;
  const totalItems = groceryItems.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Smart Grocery List</h2>
          <p className="text-muted-foreground mt-1">
            {completedItems} of {totalItems} items completed • {Object.keys(groupedByStore).length} stores
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <ShoppingCart className="h-3 w-3 mr-1" />
            Auto-generated
          </Badge>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share List
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add custom item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addItem()}
          className="flex-1"
        />
        <Button onClick={addItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(groupedByStore).map(([store, items]) => (
          <Card key={store} className="bg-gradient-card shadow-soft">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Store className="h-5 w-5 text-primary" />
                  <span>{store}</span>
                </div>
                <Badge className={getStoreColor(store)}>
                  {items.length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity}
                      {item.meal && (
                        <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {item.meal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroceryList;