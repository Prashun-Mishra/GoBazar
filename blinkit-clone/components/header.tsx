"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, ShoppingCart, User, Menu, X, LogOut, Package, Heart, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { LocationDisplay } from "@/components/location/location-display"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { getItemCount, toggleCart } = useCart()
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/images/gobazaar-CQUww9iQ.jpg" 
              alt="Gobazar Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Location Selector */}
          <div className="hidden md:block">
            <LocationDisplay />
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* User Account */}
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">Account</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center space-x-2">
                        <Package className="w-4 h-4" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    {(user.role === "ADMIN" || user.role === "admin") && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center space-x-2 text-green-600">
                            <span>Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center space-x-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </Button>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">{getItemCount()} items</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </form>

            <div className="flex items-center space-x-2 text-sm mb-4">
              <MapPin className="w-4 h-4 text-gray-600" />
              <div>
                <div className="font-medium">Delivery in 8 minutes</div>
                <div className="text-gray-600">New Delhi, India</div>
              </div>
            </div>

            {user ? (
              <div className="space-y-2">
                <div className="font-medium">{user.name}</div>
                <div className="space-y-1">
                  <Link href="/profile" className="block py-2 text-gray-600 hover:text-gray-900">
                    Profile
                  </Link>
                  <Link href="/orders" className="block py-2 text-gray-600 hover:text-gray-900">
                    Orders
                  </Link>
                  <Link href="/wishlist" className="block py-2 text-gray-600 hover:text-gray-900">
                    Wishlist
                  </Link>
                  {(user.role === "ADMIN" || user.role === "admin") && (
                    <Link href="/admin" className="block py-2 text-green-600 hover:text-green-700">
                      Admin Dashboard
                    </Link>
                  )}
                </div>
                <button onClick={logout} className="text-red-600 hover:text-red-700 py-2">
                  Logout
                </button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full bg-transparent"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          // Check if user is admin and redirect to admin dashboard
          const savedUser = localStorage.getItem("user")
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser)
              if (parsedUser?.role === "ADMIN" || parsedUser?.role === "admin") {
                window.location.href = "/admin"
              } else {
                window.location.reload()
              }
            } catch (error) {
              window.location.reload()
            }
          } else {
            window.location.reload()
          }
        }}
      />
    </header>
  )
}
