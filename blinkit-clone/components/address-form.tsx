"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, MapPin, User, Phone, Map } from "lucide-react"
import type { Address } from "@/types"

interface AddressFormProps {
  address?: Address
  onSave: (address: Omit<Address, "id">) => void
  onCancel: () => void
  isOpen: boolean
}

export function AddressForm({ address, onSave, onCancel, isOpen }: AddressFormProps) {
  const [formData, setFormData] = useState({
    type: address?.type || "home",
    flatNumber: "",
    floor: "",
    area: address?.street?.split(",")[0] || "",
    landmark: address?.landmark || "",
    userName: "",
    phone: "",
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    pincode: address?.pincode || "",
    isDefault: address?.isDefault || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  // Removed map picker state

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.flatNumber.trim()) newErrors.flatNumber = "Flat/House number is required"
    if (!formData.area.trim()) newErrors.area = "Area/Locality is required"
    if (!formData.userName.trim()) newErrors.userName = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required"
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number"
    }
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const fullStreet = `${formData.flatNumber}${formData.floor ? `, Floor ${formData.floor}` : ""}, ${formData.area}`
      console.log('🏠 [Address Form] Saving address:', {
        type: formData.type,
        street: fullStreet,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
        isDefault: formData.isDefault,
      });

      onSave({
        type: formData.type as "home" | "work" | "other",
        street: fullStreet,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark || '',
        isDefault: formData.isDefault,
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{address ? "Edit Address" : "Add New Address"}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
            <div className="flex space-x-3">
              {["home", "work", "other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInputChange("type", type)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${formData.type === type
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Flat/House Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flat/House/Building No. *</label>
            <input
              type="text"
              value={formData.flatNumber}
              onChange={(e) => handleInputChange("flatNumber", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.flatNumber ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g., 123, A-4, Building Name"
            />
            {errors.flatNumber && <p className="text-red-500 text-xs mt-1">{errors.flatNumber}</p>}
          </div>

          {/* Floor (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Floor (Optional)</label>
            <input
              type="text"
              value={formData.floor}
              onChange={(e) => handleInputChange("floor", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Ground, 1st, 2nd"
            />
          </div>

          {/* Area/Locality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area / Sector / Locality *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.area ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Search or enter area name"
              />
            </div>
            {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Landmark (Optional)</label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) => handleInputChange("landmark", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Near Metro Station, Opposite Mall"
            />
          </div>

          {/* User Details */}
          <div className="border-t pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Contact Details</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => handleInputChange("userName", e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.userName ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="State"
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="6-digit pincode"
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>

          {/* Default Address */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Make this my default address
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Save Address
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
