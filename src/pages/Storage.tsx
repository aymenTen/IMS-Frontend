
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  Search,
  PlusCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for storage
const storageMockData = [
  {
    id: 1,
    product_id: 1,
    product_name: "Laptop 15\" Pro",
    product_sku: "TECH-001",
    quantity: 24,
    low_stock_threshold: 10,
    status: "In Stock",
  },
  {
    id: 2,
    product_id: 2,
    product_name: "Office Chair Ergonomic",
    product_sku: "FURN-100",
    quantity: 15,
    low_stock_threshold: 8,
    status: "In Stock",
  },
  {
    id: 3,
    product_id: 3,
    product_name: "Premium Notebook Pack",
    product_sku: "STAT-200",
    quantity: 5,
    low_stock_threshold: 20,
    status: "Low Stock",
  },
  {
    id: 4,
    product_id: 4,
    product_name: "Wireless Mouse",
    product_sku: "TECH-002",
    quantity: 45,
    low_stock_threshold: 15,
    status: "In Stock",
  },
  {
    id: 5,
    product_id: 5,
    product_name: "External Hard Drive 1TB",
    product_sku: "TECH-003",
    quantity: 3,
    low_stock_threshold: 10,
    status: "Low Stock",
  },
];

export default function Storage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Filter storage items based on search term and filters
  const filteredStorage = storageMockData.filter((item) => {
    const matchesSearch =
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort storage items
  const sortedStorage = [...filteredStorage].sort((a, b) => {
    if (sortBy === "name") {
      return a.product_name.localeCompare(b.product_name);
    } else if (sortBy === "sku") {
      return a.product_sku.localeCompare(b.product_sku);
    } else if (sortBy === "quantity-asc") {
      return a.quantity - b.quantity;
    } else if (sortBy === "quantity-desc") {
      return b.quantity - a.quantity;
    }
    return 0;
  });

  // Calculate stock percentage for progress bar
  const calculateStockPercentage = (quantity: number, threshold: number) => {
    // Set the top limit at 3x the threshold for visual purposes
    const topLimit = threshold * 3;
    const percentage = Math.min((quantity / topLimit) * 100, 100);
    return percentage;
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Storage</h2>
        <div className="flex items-center space-x-2">
          <Link to="/storage/new-adjustment">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adjust Stock
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products in storage..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-row space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="sku">SKU</SelectItem>
                <SelectItem value="quantity-asc">Quantity (Low to High)</SelectItem>
                <SelectItem value="quantity-desc">Quantity (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStorage.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    <Store className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    No storage items found
                  </TableCell>
                </TableRow>
              ) : (
                sortedStorage.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.product_sku}</TableCell>
                    <TableCell>
                      <Link to={`/products/${item.product_id}`} className="hover:text-primary hover:underline">
                        {item.product_name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="w-full md:w-36">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.quantity}</span>
                        </div>
                        <Progress 
                          value={calculateStockPercentage(item.quantity, item.low_stock_threshold)}
                          className={`h-2 ${
                            item.quantity <= item.low_stock_threshold
                              ? "bg-red-200 [&>div]:bg-red-500"
                              : "bg-blue-200 [&>div]:bg-blue-500"
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{item.low_stock_threshold}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Adjust Stock"
                        >
                          Adjust
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Edit Threshold"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {item.quantity <= item.low_stock_threshold && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Low Stock Warning"
                            className="text-yellow-600"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{sortedStorage.length}</strong> of{" "}
            <strong>{sortedStorage.length}</strong> items
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="font-medium">
              1
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
