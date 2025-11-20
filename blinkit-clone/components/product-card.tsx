"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { getFirstParagraph, truncateText } from "@/lib/text-utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart()
  const { user, openLoginModal } = useAuth()

  const cartItem = items.find((item) => item.productId === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      openLoginModal()
      return
    }
    if (quantity === 0) {
      addItem(product.id)
    } else {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1)
    }
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 p-3 h-full flex flex-col relative group">
        {/* Product Image */}
        <div className="aspect-square relative mb-2 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=120&width=120"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.discountPercent > 0 && (
            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-medium">
              {product.discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
            {product.description && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {truncateText(getFirstParagraph(product.description), 80)}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-1 mt-1">
            <span className="font-bold text-sm text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-2">
            {quantity === 0 ? (
              <Button
                onClick={handleAdd}
                size="sm"
                className="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium text-xs py-1.5 h-8"
              >
                ADD
              </Button>
            ) : (
              <div
                className="flex items-center justify-between bg-green-600 text-white rounded px-2 py-1"
                onClick={(e) => e.preventDefault()}
              >
                <Button
                  onClick={handleRemove}
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 text-white hover:bg-green-700"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-medium text-sm px-2">{quantity}</span>
                <Button
                  onClick={handleAdd}
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 text-white hover:bg-green-700"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
