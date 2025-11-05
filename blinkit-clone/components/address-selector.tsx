"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddressForm } from "@/components/address-form"
import { MapPin, Plus, Edit2, Trash2, Check, Home, Briefcase, LocateOffIcon as LocationIcon } from "lucide-react"
import type { Address } from "@/types"

interface AddressSelectorProps {
  addresses: Address[]
  selectedAddressId: string | null
  onAddressSelect: (addressId: string) => void
  onAddressAdd: (address: Omit<Address, "id">) => void
  onAddressEdit: (addressId: string, address: Omit<Address, "id">) => void
  onAddressDelete: (addressId: string) => void
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddressAdd,
  onAddressEdit,
  onAddressDelete,
}: AddressSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "work":
        return <Briefcase className="w-4 h-4" />
      default:
        return <LocationIcon className="w-4 h-4" />
    }
  }

  const handleAddAddress = (addressData: Omit<Address, "id">) => {
    onAddressAdd(addressData)
    setShowAddForm(false)
  }

  const handleEditAddress = (addressData: Omit<Address, "id">) => {
    if (editingAddress) {
      onAddressEdit(editingAddress.id, addressData)
      setEditingAddress(null)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-green-600" />
          Delivery Address
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-4">Add your first delivery address to continue</p>
          <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddressId === address.id
                  ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => onAddressSelect(address.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1 text-gray-600">
                      {getAddressIcon(address.type)}
                      <span className="font-medium capitalize text-gray-900">{address.type}</span>
                    </div>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        Default
                      </span>
                    )}
                    {selectedAddressId === address.id && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-800 font-medium text-sm leading-relaxed">{address.street}</p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  {address.landmark && (
                    <p className="text-gray-500 text-xs mt-1">
                      <span className="font-medium">Landmark:</span> {address.landmark}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingAddress(address)
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit address"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm("Are you sure you want to delete this address?")) {
                        onAddressDelete(address.id)
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Form */}
      <AddressForm isOpen={showAddForm} onSave={handleAddAddress} onCancel={() => setShowAddForm(false)} />

      {/* Edit Address Form */}
      <AddressForm
        isOpen={!!editingAddress}
        address={editingAddress || undefined}
        onSave={handleEditAddress}
        onCancel={() => setEditingAddress(null)}
      />
    </div>
  )
}
