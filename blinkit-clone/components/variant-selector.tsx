"use client"

import type { ProductVariant } from "@/types"
import { Button } from "@/components/ui/button"

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariant: string | null
  onVariantChange: (variantId: string) => void
}

export function VariantSelector({ variants, selectedVariant, onVariantChange }: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">Pack Size</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            variant={selectedVariant === variant.id ? "default" : "outline"}
            size="sm"
            onClick={() => onVariantChange(variant.id)}
            className={`${
              selectedVariant === variant.id
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-gray-300 hover:border-green-500"
            }`}
          >
            {variant.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
