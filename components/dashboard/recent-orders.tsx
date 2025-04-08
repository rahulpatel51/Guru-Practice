"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EyeIcon } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    status: "Processing",
    date: "2023-04-01",
    total: "$129.99",
  },
  {
    id: "ORD-002",
    customer: "Alice Smith",
    status: "Shipped",
    date: "2023-04-02",
    total: "$79.99",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    status: "Delivered",
    date: "2023-04-03",
    total: "$249.99",
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    status: "Processing",
    date: "2023-04-04",
    total: "$189.99",
  },
  {
    id: "ORD-005",
    customer: "William Davis",
    status: "Cancelled",
    date: "2023-04-05",
    total: "$99.99",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "Delivered"
                    ? "success"
                    : order.status === "Shipped"
                      ? "default"
                      : order.status === "Processing"
                        ? "secondary"
                        : "destructive"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell className="text-right">{order.total}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">View order {order.id}</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
