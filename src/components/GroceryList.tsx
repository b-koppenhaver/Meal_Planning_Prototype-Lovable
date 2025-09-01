import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Store, Plus, Share, Settings, Trash2 } from "lucide-react";

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
  const [stores, setStores] = useState<string[]>([
    "Whole Foods",
    "Costco", 
    "Target",
    "Walmart"
  ]);
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
  const [newItemStore, setNewItemStore] = useState(stores[0] || "");
  const [newStore, setNewStore] = useState("");
  const [isManageStoresOpen, setIsManageStoresOpen] = useState(false);

  const toggleItem = (id: string) => {
    setGroceryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim() && newItemStore) {
      const item: GroceryItem = {
        id: Date.now().toString(),
        name: newItem,
        quantity: "1",
        store: newItemStore,
        category: "Other",
        checked: false
      };
      setGroceryItems([...groceryItems, item]);
      setNewItem("");
    }
  };

  const addStore = () => {
    if (newStore.trim() && !stores.includes(newStore.trim())) {
      setStores([...stores, newStore.trim()]);
      setNewStore("");
    }
  };

  const removeStore = (storeToRemove: string) => {
    // Don't allow removing if items exist for this store
    const hasItems = groceryItems.some(item => item.store === storeToRemove);
    if (hasItems) {
      alert("Cannot remove store that has items. Please reassign or remove items first.");
      return;
    }
    setStores(stores.filter(store => store !== storeToRemove));
    if (newItemStore === storeToRemove && stores.length > 1) {
      setNewItemStore(stores.find(s => s !== storeToRemove) || stores[0]);
    }
  };

  const groupedByStore = groceryItems.reduce((acc, item) => {
    if (!acc[item.store]) acc[item.store] = [];
    acc[item.store].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const getStoreColor = (store: string) => {
    const colors = [
      "bg-green-100 text-green-700 border-green-200",
      "bg-blue-100 text-blue-700 border-blue-200", 
      "bg-red-100 text-red-700 border-red-200",
      "bg-yellow-100 text-yellow-700 border-yellow-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-orange-100 text-orange-700 border-orange-200",
    ];
    const storeIndex = stores.indexOf(store);
    return storeIndex >= 0 ? colors[storeIndex % colors.length] : "bg-muted text-muted-foreground";
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
          <Dialog open={isManageStoresOpen} onOpenChange={setIsManageStoresOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Stores
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Grocery Stores</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Add new store..."
                    value={newStore}
                    onChange={(e) => setNewStore(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addStore()}
                    className="flex-1"
                  />
                  <Button onClick={addStore}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Current Stores:</h4>
                  {stores.map((store) => {
                    const hasItems = groceryItems.some(item => item.store === store);
                    return (
                      <div key={store} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="flex items-center space-x-2">
                          <Store className="h-4 w-4" />
                          <span>{store}</span>
                          {hasItems && (
                            <Badge variant="secondary" className="text-xs">
                              Has items
                            </Badge>
                          )}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStore(store)}
                          disabled={hasItems}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
        <Select value={newItemStore} onValueChange={setNewItemStore}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Store" />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store} value={store}>
                {store}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addItem} disabled={!newItem.trim() || !newItemStore}>
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