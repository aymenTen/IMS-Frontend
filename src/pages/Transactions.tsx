
import { useState } from "react";
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
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock data for transactions
const transactionsMockData = [
  {
    id: 1,
    type: "Stock Increase",
    quantity: 10,
    timestamp: "2023-04-15 09:15:22",
    reason: "Purchase Order Received",
    user: "John Smith",
    product: "Laptop 15\" Pro",
    product_id: 1,
    order_line_id: 101,
  },
  {
    id: 2,
    type: "Stock Decrease",
    quantity: 2,
    timestamp: "2023-04-14 14:30:45",
    reason: "Customer Order Fulfillment",
    user: "Jane Doe",
    product: "Laptop 15\" Pro", 
    product_id: 1,
    order_line_id: 102,
  },
  {
    id: 3,
    type: "Stock Decrease",
    quantity: 5,
    timestamp: "2023-04-12 11:05:17",
    reason: "Customer Order Fulfillment",
    user: "Mark Johnson",
    product: "Office Chair Ergonomic",
    product_id: 2,
    order_line_id: 103,
  },
  {
    id: 4,
    type: "Stock Adjustment",
    quantity: -1,
    timestamp: "2023-04-10 16:22:08",
    reason: "Damaged Item",
    user: "John Smith",
    product: "Wireless Mouse",
    product_id: 4,
    order_line_id: null,
  },
  {
    id: 5,
    type: "Stock Increase",
    quantity: 20,
    timestamp: "2023-04-09 10:45:55",
    reason: "Purchase Order Received",
    user: "Jane Doe",
    product: "Premium Notebook Pack",
    product_id: 3,
    order_line_id: 104,
  },
];

// Mock summary data
const summaryData = {
  totalTransactions: 127,
  stockIncreases: 45,
  stockDecreases: 72,
  adjustments: 10,
};

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [userFilter, setUserFilter] = useState("All Users");

  // Filter transactions based on search term and filters
  const filteredTransactions = transactionsMockData.filter((transaction) => {
    const matchesSearch =
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType =
      typeFilter === "All" || transaction.type === typeFilter;
    
    // In a real app, date filtering would be implemented here
    
    const matchesUser =
      userFilter === "All Users" || transaction.user === userFilter;
    
    return matchesSearch && matchesType && matchesUser;
  });

  // Unique users for filter dropdown
  const users = Array.from(new Set(transactionsMockData.map(t => t.user)));

  // Helper function to get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Stock Increase":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "Stock Decrease":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowDown className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalTransactions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Increases</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.stockIncreases}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Decreases</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.stockDecreases}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.adjustments}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-row space-x-2 flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Stock Increase">Stock Increase</SelectItem>
                <SelectItem value="Stock Decrease">Stock Decrease</SelectItem>
                <SelectItem value="Stock Adjustment">Stock Adjustment</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time">All Time</SelectItem>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="Custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Users">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    <FileText className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span>{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link to={`/products/${transaction.product_id}`} className="hover:text-primary hover:underline">
                        {transaction.product}
                      </Link>
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.timestamp}</TableCell>
                    <TableCell>{transaction.reason}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{filteredTransactions.length}</strong> of{" "}
            <strong>{filteredTransactions.length}</strong> transactions
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
