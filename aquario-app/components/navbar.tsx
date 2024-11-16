'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, LogIn, LayoutDashboard, Settings } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/configure-parameters", label: "Configure", icon: Settings },
    { href: "/login", label: "Login", icon: LogIn },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">AquaTrack</span>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary hover:border-primary"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium w-full justify-start",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
            >
              <Link href={item.href}>
                <item.icon className="w-4 h-4 mr-2 inline" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}