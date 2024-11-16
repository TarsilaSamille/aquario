"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LogIn, LayoutDashboard, Settings, LogOut } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    router.push("/");
  };

  let navItems = [{ href: "/home", label: "Home", icon: Home },{ href: "/", label: "Login", icon: LogIn }];

  if (isAuthenticated) {
    navItems = [
      { href: "/landing-page", label: "Home", icon: Home },
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/configure-parameters", label: "Configure", icon: Settings },
    ];
  }
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
                <Link href={item.href} className="flex items-center">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </div>
            ))}
            {isAuthenticated && (
              <div
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1 ">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                pathname === item.href
                  ? "bg-primary-50 border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:bg-primary-50 hover:border-primary hover:text-primary"
              )}
            >
              <Link href={item.href} className="flex items-center">
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            </Button>
          ))}
          {isAuthenticated && (
            <div
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-muted-foreground hover:bg-primary-50 hover:border-primary hover:text-primary text-center"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
