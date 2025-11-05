"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TestResult {
  status: number | string
  data: any
  success: boolean
  token?: string
}

interface Results {
  [key: string]: TestResult
}

export default function DebugPage() {
  const [results, setResults] = useState<Results>({})
  const [loading, setLoading] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string, name: string) => {
    setLoading(name)
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      setResults((prev: Results) => ({
        ...prev,
        [name]: {
          status: response.status,
          data: data,
          success: response.ok
        }
      }))
    } catch (error) {
      setResults((prev: Results) => ({
        ...prev,
        [name]: {
          status: 'ERROR',
          data: (error as Error).message,
          success: false
        }
      }))
    }
    setLoading(null)
  }

  const testAdminProducts = async () => {
    setLoading('admin-products')
    try {
      const token = localStorage.getItem('auth-token')
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setResults((prev: Results) => ({
        ...prev,
        'admin-products': {
          status: response.status,
          data: data,
          success: response.ok,
          token: token ? 'Present' : 'Missing'
        }
      }))
    } catch (error) {
      setResults((prev: Results) => ({
        ...prev,
        'admin-products': {
          status: 'ERROR',
          data: (error as Error).message,
          success: false
        }
      }))
    }
    setLoading(null)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">GoBazar API Debug Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button 
          onClick={() => testEndpoint('/api/test-backend', 'backend-test')}
          disabled={loading === 'backend-test'}
        >
          {loading === 'backend-test' ? 'Testing...' : 'Test Backend Connection'}
        </Button>
        
        <Button 
          onClick={() => testEndpoint('/api/categories', 'categories')}
          disabled={loading === 'categories'}
        >
          {loading === 'categories' ? 'Testing...' : 'Test Categories API'}
        </Button>
        
        <Button 
          onClick={() => testEndpoint('/api/subcategories?categoryId=cat-vegetables-fruits', 'subcategories')}
          disabled={loading === 'subcategories'}
        >
          {loading === 'subcategories' ? 'Testing...' : 'Test Subcategories API'}
        </Button>
        
        <Button 
          onClick={testAdminProducts}
          disabled={loading === 'admin-products'}
        >
          {loading === 'admin-products' ? 'Testing...' : 'Test Admin Products API'}
        </Button>
      </div>

      <div className="space-y-4">
        {Object.entries(results).map(([name, result]: [string, TestResult]) => (
          <div key={name} className="border rounded p-4">
            <h3 className="font-semibold text-lg mb-2">
              {name} - Status: {result.status} 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {result.success ? 'SUCCESS' : 'FAILED'}
              </span>
            </h3>
            {result.token && (
              <p className="text-sm text-gray-600 mb-2">Auth Token: {result.token}</p>
            )}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-64">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
