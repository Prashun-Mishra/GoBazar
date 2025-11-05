"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatProductDescription, validateTextFormatting } from "@/lib/text-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Image as ImageIcon } from "lucide-react"
import type { Product, Category } from "@/types"

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    mrp: product?.mrp || 0,
    categoryId: product?.categoryId || "",
    subcategoryId: product?.subcategoryId || "",
    brand: product?.brand || "",
    unit: product?.unit || "",
    stock: product?.stock || 0,
    tags: product?.tags || [],
    images: product?.images || [],
    isFeatured: product?.isFeatured || false,
  })

  const [newTag, setNewTag] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...')
        const response = await fetch('/api/categories')
        const data = await response.json()
        console.log('Categories response:', data)
        setCategories(data.data || data || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.categoryId) {
      const fetchSubcategories = async () => {
        try {
          console.log('Fetching subcategories for categoryId:', formData.categoryId)
          const response = await fetch(`/api/subcategories?categoryId=${formData.categoryId}`)
          console.log('Subcategories API response status:', response.status)
          
          if (!response.ok) {
            console.error('Subcategories API error:', response.status, response.statusText)
            setSubcategories([])
            return
          }
          
          const data = await response.json()
          console.log('Subcategories response:', data)
          console.log('Subcategories data type:', typeof data)
          console.log('Subcategories data.data:', data.data)
          console.log('Subcategories array length:', (data.data || data || []).length)
          
          // Handle different response formats
          let subcategoriesArray = []
          if (data.success && data.data && Array.isArray(data.data)) {
            subcategoriesArray = data.data
          } else if (Array.isArray(data)) {
            subcategoriesArray = data
          } else if (data.data && Array.isArray(data.data)) {
            subcategoriesArray = data.data
          }
          
          // CRITICAL: Filter out categories (they don't have categoryId field)
          // Only keep items that have a categoryId (these are subcategories)
          const actualSubcategories = subcategoriesArray.filter((item: any) => {
            const hasCategory = item.categoryId !== undefined && item.categoryId !== null
            console.log('Item:', item.name, 'has categoryId:', hasCategory, 'value:', item.categoryId)
            return hasCategory
          })
          
          console.log('Final subcategories array (filtered):', actualSubcategories)
          console.log('First subcategory:', actualSubcategories[0])
          console.log('Total subcategories found:', actualSubcategories.length)
          
          setSubcategories(actualSubcategories)
        } catch (error) {
          console.error('Failed to fetch subcategories:', error)
          setSubcategories([])
        }
      }
      fetchSubcategories()
    } else {
      console.log('No categoryId selected, clearing subcategories')
      setSubcategories([])
    }
  }, [formData.categoryId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.brand || !formData.categoryId || !formData.unit || formData.price <= 0 || formData.mrp <= 0 || formData.stock < 0) {
      alert('Please fill in all required fields with valid values')
      return
    }

    const submitData = {
      name: formData.name.trim(),
      description: formData.description?.trim() || '',
      brand: formData.brand.trim(),
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId && formData.subcategoryId.trim() !== '' ? formData.subcategoryId : '',
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      discount: formData.mrp > formData.price ? Math.round(((formData.mrp - formData.price) / formData.mrp) * 100) : 0,
      stock: Number(formData.stock),
      unit: formData.unit.trim(),
      images: imageUrls.filter(url => url.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      isFeatured: Boolean(formData.isFeatured),
      isOrganic: false, // Add this field
    }
    
    console.log('Submitting product data:', submitData)
    
    // Ensure we don't send variants for now to avoid issues
    const { isFeatured, isOrganic, ...cleanData } = submitData
    console.log('Clean data being sent:', cleanData)
    onSubmit(cleanData)
  }

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const addImage = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls(prev => [...prev, newImageUrl])
      setNewImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-green-700">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-green-700">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="bg-white border-gray-300"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="bg-white border-gray-300 font-mono text-sm"
                placeholder="Enter detailed product description...&#10;&#10;Tips for better formatting:&#10;• Use line breaks to separate paragraphs&#10;• Keep sentences clear and concise&#10;• Include key features and benefits&#10;• Mention usage instructions if applicable"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Use line breaks to create separate paragraphs. Each line will be displayed as a separate paragraph on the product page.
              </p>
              
              {/* Description Preview */}
              {formData.description && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Preview:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {formatProductDescription(formData.description).map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {(() => {
                    const validation = validateTextFormatting(formData.description)
                    return !validation.isValid && validation.suggestions.length > 0 && (
                      <div className="mt-2 text-xs text-amber-600">
                        <p className="font-medium">Suggestions:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {validation.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Selling Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  required
                  className="bg-white border-gray-300"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="mrp">MRP (₹) *</Label>
                <Input
                  id="mrp"
                  type="number"
                  value={formData.mrp}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mrp: Number(e.target.value) }))}
                  required
                  className="bg-white border-gray-300"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                  required
                  className="bg-white border-gray-300"
                  placeholder="Brand name"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit *</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., 500g, 1kg, 1L"
                  required
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-green-700">Category & Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value, subcategoryId: "" }))}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategoryId">Subcategory</Label>
                <Select
                  value={formData.subcategoryId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, subcategoryId: value }))}
                  disabled={!formData.categoryId}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {subcategories.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500">No subcategories available</div>
                    ) : (
                      subcategories
                        .filter((sub) => sub.categoryId) // Only show items with categoryId (subcategories)
                        .map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                required
                className="bg-white border-gray-300"
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFeatured: checked as boolean }))}
              />
              <Label htmlFor="isFeatured">Featured Product</Label>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-green-700">Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="bg-white border-gray-300"
              />
              <Button type="button" onClick={addImage} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            {imageUrls.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p>No images added yet</p>
                <p className="text-sm">Add image URLs above</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-green-700">Product Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add tag (e.g., organic, fresh)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="bg-white border-gray-300"
              />
              <Button type="button" onClick={addTag} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            {product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
