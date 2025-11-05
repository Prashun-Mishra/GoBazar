"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { User, MapPin, CreditCard, Bell, HelpCircle, LogOut, Edit, Package, ShoppingBag } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    savedAddresses: 0
  })
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to sign in to view your profile.</p>
            <Link href="/auth/login?redirect=/profile">
              <Button className="bg-green-600 hover:bg-green-700">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      })
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      // Fetch user statistics
      const [ordersRes, addressesRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/addresses')
      ])
      
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        const orders = ordersData.data || ordersData
        const totalSpent = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
        setUserStats(prev => ({ 
          ...prev, 
          totalOrders: orders.length,
          totalSpent 
        }))
      }
      
      if (addressesRes.ok) {
        const addressesData = await addressesRes.json()
        const addresses = addressesData.data || addressesData
        setUserStats(prev => ({ 
          ...prev, 
          savedAddresses: addresses.length 
        }))
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        setIsEditing(false)
        // Update user context if needed
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  const menuItems = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "addresses", label: "Saved Addresses", icon: MapPin, link: "/profile/addresses" },
    { id: "orders", label: "My Orders", icon: Package, link: "/orders" },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  
                  if (item.link) {
                    return (
                      <Link key={item.id} href={item.link}>
                        <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-50 cursor-pointer">
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}

                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.email}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.phone}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="p-3 bg-gray-50 rounded-lg">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <Link href="/profile/addresses">
                      <Button variant="outline" size="sm">
                        Manage Addresses
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center py-8">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Manage your delivery addresses</p>
                    <Link href="/profile/addresses">
                      <Button className="bg-green-600 hover:bg-green-700">
                        View All Addresses
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">My Orders</h2>
                    <Link href="/orders">
                      <Button variant="outline" size="sm">
                        View All Orders
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{userStats.totalOrders}</div>
                      <div className="text-sm text-blue-600">Total Orders</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">₹{userStats.totalSpent}</div>
                      <div className="text-sm text-green-600">Total Spent</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{userStats.savedAddresses}</div>
                      <div className="text-sm text-purple-600">Saved Addresses</div>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">View and track all your orders</p>
                    <Link href="/orders">
                      <Button className="bg-green-600 hover:bg-green-700">
                        View Order History
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                  </div>
                  <div className="text-center py-8">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No payment methods saved yet</p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Notification Settings</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-gray-600">Get notified about order status changes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Promotional Offers</h3>
                        <p className="text-sm text-gray-600">Receive updates about deals and offers</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "help" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Help & Support</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Contact Support</h3>
                      <p className="text-gray-600 text-sm mb-3">Get help with your orders and account</p>
                      <Button variant="outline">Contact Us</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">FAQ</h3>
                      <p className="text-gray-600 text-sm mb-3">Find answers to common questions</p>
                      <Button variant="outline">View FAQ</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
