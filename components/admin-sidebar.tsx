"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Box,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Users,
  MessageSquare,
  ImageIcon,
  TicketPercent,
  Star,
  UserCog,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch user data")

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      localStorage.removeItem("token")

      toast({
        title: "Logged out successfully",
      })

      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
      active: pathname.includes("/dashboard/products"),
    },
    {
      label: "Categories",
      icon: Tag,
      href: "/dashboard/categories",
      active: pathname.includes("/dashboard/categories"),
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      active: pathname.includes("/dashboard/orders"),
    },
    {
      label: "Customers",
      icon: Users,
      href: "/dashboard/users",
      active: pathname.includes("/dashboard/users"),
    },
    {
      label: "Staff",
      icon: UserCog,
      href: "/dashboard/staff",
      active: pathname.includes("/dashboard/staff"),
    },
    {
      label: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
      active: pathname.includes("/dashboard/reviews"),
    },
    {
      label: "Coupons",
      icon: TicketPercent,
      href: "/dashboard/coupons",
      active: pathname.includes("/dashboard/coupons"),
    },
    {
      label: "Media",
      icon: ImageIcon,
      href: "/dashboard/media",
      active: pathname.includes("/dashboard/media"),
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname.includes("/dashboard/analytics"),
    },
    {
      label: "Contact",
      icon: MessageSquare,
      href: "/dashboard/contact",
      active: pathname.includes("/dashboard/contact"),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname.includes("/dashboard/settings"),
    },
  ]

  return (
    <div className="group fixed inset-y-0 z-30 hidden h-full w-72 flex-col border-r bg-background transition-all md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Box className="h-6 w-6" />
          <span>E-Commerce Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "justify-start",
                route.active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none truncate">{user?.name || "Admin User"}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user?.email || "admin@example.com"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
