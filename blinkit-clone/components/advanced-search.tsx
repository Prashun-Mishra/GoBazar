"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X, SlidersHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Category, SubCategory } from "@/types"

interface SearchFilters {
  query: string
  categoryId: string
  subcategoryId: string
  minPrice: string
  maxPrice: string
  rating: string
  sortBy: string
  sortOrder: string
  inStock: boolean
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  initialFilters?: Partial<SearchFilters>
  className?: string
}

export function AdvancedSearch({ onSearch, initialFilters, className }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<SubCategory[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialFilters?.query || '',
    categoryId: initialFilters?.categoryId || '',
    subcategoryId: initialFilters?.subcategoryId || '',
    minPrice: initialFilters?.minPrice || '',
    maxPrice: initialFilters?.maxPrice || '',
    rating: initialFilters?.rating || '',
    sortBy: initialFilters?.sortBy || 'relevance',
    sortOrder: initialFilters?.sortOrder || 'desc',
    inStock: initialFilters?.inStock ?? true,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (filters.categoryId) {
      fetchSubcategories(filters.categoryId)
    } else {
      setSubcategories([])
      setFilters(prev => ({ ...prev, subcategoryId: '' }))
    }
  }, [filters.categoryId])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.data || data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/subcategories?categoryId=${categoryId}`)
      if (response.ok) {
        const data = await response.json()
        setSubcategories(data.data || data)
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    }
  }

  const handleSearch = () => {
    onSearch(filters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      query: '',
      categoryId: '',
      subcategoryId: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'relevance',
      sortOrder: 'desc',
      inStock: true,
    }
    setFilters(resetFilters)
    onSearch(resetFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categoryId) count++
    if (filters.subcategoryId) count++
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.rating) count++
    if (filters.sortBy !== 'relevance') count++
    if (!filters.inStock) count++
    return count
  }

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
    { value: 'name', label: 'Name' },
    { value: 'createdAt', label: 'Newest First' },
  ]

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 pr-4"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>

        <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
          Search
        </Button>
      </div>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center space-x-2 mt-3 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          
          {filters.categoryId && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>Category: {categories.find(c => c.id === filters.categoryId)?.name}</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setFilters(prev => ({ ...prev, categoryId: '', subcategoryId: '' }))}
              />
            </Badge>
          )}
          
          {filters.subcategoryId && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>Subcategory: {subcategories.find(s => s.id === filters.subcategoryId)?.name}</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setFilters(prev => ({ ...prev, subcategoryId: '' }))}
              />
            </Badge>
          )}
          
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>
                Price: ₹{filters.minPrice || '0'} - ₹{filters.maxPrice || '∞'}
              </span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }))}
              />
            </Badge>
          )}
          
          {filters.rating && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>{filters.rating}+ Stars</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setFilters(prev => ({ ...prev, rating: '' }))}
              />
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-red-600">
            Clear All
          </Button>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg p-6 z-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.categoryId}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                value={filters.subcategoryId}
                onChange={(e) => setFilters(prev => ({ ...prev, subcategoryId: e.target.value }))}
                disabled={!filters.categoryId}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">All Subcategories</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="flex space-x-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>
              </div>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="inStock" className="text-sm text-gray-700">
                  In Stock Only
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              Reset All
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
