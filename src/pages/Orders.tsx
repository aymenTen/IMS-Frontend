
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
  ShoppingCart,
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for orders
const ordersMockData = [
  {
    id: 1,
    order_number: "ORD-2023-001",
    status: "Delivered",
    order_date: "2023-04-15",
    expected_delivery: "2023-04-20",
    type: "Purchase",
    bpartner: "ABC Corp",
  },
  {
    id: 2,
    order_number: "ORD-2023-002",
    status: "Shipped",
    order_date: "2023-04-14",
    expected_delivery: "2023-04-21",
    type: "Purchase",
    bpartner: "XYZ Inc",
  },
  {
    id: 3,
    order_number: "ORD-2023-003",
    status: "Processing",
    order_date: "2023-04-12",
    expected_delivery: "2023-04-19",
    type: "Sale",
    bpartner: "123 Company",
  },
  {
    id: 4,
    order_number: "ORD-2023-004",
    status: "Cancelled",
    order_date: "2023-04-10",
    expected_delivery: "2023-04-17",
    type: "Purchase",
    bpartner: "Tech Solutions Ltd",
  },
  {
    id: 5,
    order_number: "ORD-2023-005",
    status: "Processing",
    order_date: "2023-04-09",
    expected_delivery: "2023-04-16",
    type: "Sale",
    bpartner: "Green Office Supplies",
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Filter orders based on search term and filters
  const filteredOrders = ordersMockData.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bpartner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    
    const matchesType =
      typeFilter === "All" || order.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get the status badge style based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <Link to="/orders/new">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Order
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
                placeholder="Search orders..."
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
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Purchase">Purchase</SelectItem>
                <SelectItem value="Sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Business Partner</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link to={`/orders/${order.id}`} className="hover:text-primary hover:underline">
                        {order.order_number}
                      </Link>
                    </TableCell>
                    <TableCell>{order.order_date}</TableCell>
                    <TableCell>{order.expected_delivery}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.bpartner}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{filteredOrders.length}</strong> of{" "}
            <strong>{filteredOrders.length}</strong> orders
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
