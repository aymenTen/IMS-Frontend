
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
  AlertTriangle,
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for defective goods
const defectiveGoodsMockData = [
  {
    id: 1,
    product_id: 1,
    product_name: "Laptop 15\" Pro",
    product_sku: "TECH-001",
    storage_id: 1,
    defective_quantity: 2,
    reason: "Screen damage",
    status: "Pending Approval",
    discount_percentage: 30,
    approved_by: null,
    created_at: "2023-04-15",
  },
  {
    id: 2,
    product_id: 2,
    product_name: "Office Chair Ergonomic",
    product_sku: "FURN-100",
    storage_id: 2,
    defective_quantity: 1,
    reason: "Broken armrest",
    status: "Approved",
    discount_percentage: 20,
    approved_by: "John Smith",
    created_at: "2023-04-10",
  },
  {
    id: 3,
    product_id: 4,
    product_name: "Wireless Mouse",
    product_sku: "TECH-002",
    storage_id: 3,
    defective_quantity: 5,
    reason: "Connection issues",
    status: "Rejected",
    discount_percentage: 0,
    approved_by: "Jane Doe",
    created_at: "2023-04-08",
  },
  {
    id: 4,
    product_id: 5,
    product_name: "External Hard Drive 1TB",
    product_sku: "TECH-003",
    storage_id: 1,
    defective_quantity: 3,
    reason: "Not detected when connected",
    status: "Pending Approval",
    discount_percentage: 50,
    approved_by: null,
    created_at: "2023-04-05",
  },
];

// Summary totals
const summaryData = {
  totalDefective: 11,
  pendingApproval: 5,
  approved: 4,
  rejected: 2,
};

export default function DefectiveGoods() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter defective goods based on search term and status filter
  const filteredDefectiveGoods = defectiveGoodsMockData.filter((item) => {
    const matchesSearch =
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge style based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending Approval":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Defective Goods</h2>
        <div className="flex items-center space-x-2">
          <Link to="/defective-goods/new">
            <Button className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Report Defective Item
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Defective</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalDefective}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.pendingApproval}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.rejected}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search defective items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-row space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending Approval">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefectiveGoods.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    No defective goods found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDefectiveGoods.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.product_sku}</TableCell>
                    <TableCell>
                      <Link to={`/products/${item.product_id}`} className="hover:text-primary hover:underline">
                        {item.product_name}
                      </Link>
                    </TableCell>
                    <TableCell>{item.defective_quantity}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.discount_percentage}%</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell className="text-right">
                      {item.status === "Pending Approval" && (
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Approve"
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Reject"
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {item.status !== "Pending Approval" && (
                        <Link to={`/defective-goods/${item.id}`} className="text-sm text-blue-600 hover:underline">
                          View
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{filteredDefectiveGoods.length}</strong> of{" "}
            <strong>{filteredDefectiveGoods.length}</strong> items
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
