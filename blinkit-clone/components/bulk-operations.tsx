"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import type { Product } from "@/types"

interface BulkOperationsProps {
  selectedProducts: string[]
  products: Product[]
  onBulkUpdate: (operation: string, data: any) => void
  onClearSelection: () => void
}

export function BulkOperations({ selectedProducts, products, onBulkUpdate, onClearSelection }: BulkOperationsProps) {
  const [operation, setOperation] = useState("")
  const [bulkData, setBulkData] = useState<any>({})

  const handleBulkOperation = () => {
    if (!operation) return

    onBulkUpdate(operation, bulkData)
    setOperation("")
    setBulkData({})
    onClearSelection()
  }

  const exportSelected = () => {
    const selectedProductData = products.filter((p) => selectedProducts.includes(p.id))
    const dataStr = JSON.stringify(selectedProductData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "products.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (selectedProducts.length === 0) return null

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bulk Operations</span>
          <Badge variant="secondary">{selectedProducts.length} selected</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete Products</SelectItem>
                <SelectItem value="updateCategory">Update Category</SelectItem>
                <SelectItem value="updatePrice">Update Price</SelectItem>
                <SelectItem value="updateStock">Update Stock</SelectItem>
                <SelectItem value="addDiscount">Add Discount</SelectItem>
                <SelectItem value="toggleStatus">Toggle Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {operation === "updateCategory" && (
            <div className="flex-1 min-w-[200px]">
              <Select value={bulkData.category || ""} onValueChange={(value) => setBulkData({ category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy & Bakery</SelectItem>
                  <SelectItem value="snacks">Snacks & Beverages</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(operation === "updatePrice" || operation === "addDiscount") && (
            <div className="flex-1 min-w-[150px]">
              <Input
                type="number"
                placeholder={operation === "updatePrice" ? "New price" : "Discount %"}
                value={bulkData.value || ""}
                onChange={(e) => setBulkData({ value: Number(e.target.value) })}
              />
            </div>
          )}

          {operation === "updateStock" && (
            <div className="flex-1 min-w-[150px]">
              <Input
                type="number"
                placeholder="Stock quantity"
                value={bulkData.stock || ""}
                onChange={(e) => setBulkData({ stock: Number(e.target.value) })}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleBulkOperation} disabled={!operation}>
              Apply
            </Button>
            <Button variant="outline" onClick={exportSelected}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={onClearSelection}>
              Clear Selection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
