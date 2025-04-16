
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

// Mock product data
const mockProduct = {
  id: 1,
  sku: "TECH-001",
  name: "Laptop 15\" Pro",
  description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
  category_id: 1,
  category: "Electronics",
  status: "Active",
  is_active: true,
  deactivation_reason: "",
  created_at: "2023-01-15",
  updated_at: "2023-03-20",
  storage: [
    { id: 1, location: "Main Warehouse", quantity: 15, low_stock_threshold: 10 },
    { id: 2, location: "Store A", quantity: 5, low_stock_threshold: 3 },
    { id: 3, location: "Store B", quantity: 4, low_stock_threshold: 3 },
  ]
};

// Mock categories
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Furniture" },
  { id: 3, name: "Stationery" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(mockProduct);
  const [isActive, setIsActive] = useState(product.is_active);
  
  // In a real app, we would fetch the product data based on the ID
  // const { data: product, isLoading, error } = useQuery(['product', id], () => fetchProduct(id));
  
  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    setProduct(prev => ({ ...prev, is_active: checked }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    const category = categories.find(c => c.id.toString() === value);
    setProduct(prev => ({ 
      ...prev, 
      category_id: Number(value),
      category: category?.name || ""
    }));
  };
  
  const handleSave = () => {
    // In a real app, we would make an API call to update the product
    console.log("Saving product:", product);
    // updateProduct(product).then(...);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Link to="/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Product Details</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input 
                      id="sku" 
                      name="sku" 
                      value={product.sku} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={product.category_id.toString()} 
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem 
                            key={category.id} 
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={product.name} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={product.description} 
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active-status" 
                    checked={isActive}
                    onCheckedChange={handleStatusChange}
                  />
                  <Label htmlFor="active-status">Active</Label>
                </div>
                
                {!isActive && (
                  <div className="space-y-2">
                    <Label htmlFor="deactivation_reason">Deactivation Reason</Label>
                    <Textarea 
                      id="deactivation_reason" 
                      name="deactivation_reason" 
                      value={product.deactivation_reason} 
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date Created</Label>
                  <div className="text-sm text-muted-foreground">{product.created_at}</div>
                </div>
                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <div className="text-sm text-muted-foreground">{product.updated_at}</div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Quantity</th>
                      <th className="text-left p-2">Low Stock Threshold</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.storage.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">{item.location}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.low_stock_threshold}</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.quantity <= item.low_stock_threshold
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {item.quantity <= item.low_stock_threshold ? "Low Stock" : "In Stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Adjust Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Main Warehouse</SelectItem>
                      <SelectItem value="2">Store A</SelectItem>
                      <SelectItem value="3">Store B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    defaultValue="0" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adjustmentType">Type</Label>
                  <Select defaultValue="add">
                    <SelectTrigger id="adjustmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add</SelectItem>
                      <SelectItem value="remove">Remove</SelectItem>
                      <SelectItem value="set">Set</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for inventory adjustment"
                  rows={3}
                />
              </div>
              <Button>Apply Adjustment</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                No transactions recorded for this product.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
