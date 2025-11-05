"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import type { CartItem, Product } from "@/types"
import { useAuth } from "@/contexts/auth-context"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean }

interface CartContextType extends CartState {
  addItem: (productId: string, variantId?: string) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  toggleCart: () => void
  getItemCount: () => number
  getCartTotal: (products: Product[]) => number
  syncWithBackend: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId && item.variantId === action.payload.variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
        ),
      }

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
          ),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId && item.variantId === action.payload.variantId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "LOAD_CART":
      return { ...state, items: action.payload }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    isLoading: false,
  })

  // Get token from localStorage
  const getToken = useCallback(() => {
    return localStorage.getItem('auth-token')
  }, [])

  // Sync cart with backend
  const syncWithBackend = useCallback(async () => {
    console.log('🛒 [Cart Context] Syncing with backend...')
    dispatch({ type: "SET_LOADING", payload: true })
    
    try {
      const token = getToken()
      console.log('🛒 [Cart Context] Token for sync:', !!token)
      
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      console.log('🛒 [Cart Context] Backend sync response:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('🛒 [Cart Context] Backend cart data:', data)
        const cartItems = data.data || data
        console.log('🛒 [Cart Context] Cart items from backend:', Array.isArray(cartItems) ? cartItems.length : 'not array')
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } else {
        console.error('🛒 [Cart Context] Backend sync failed:', response.status)
      }
    } catch (error) {
      console.error('💥 [Cart Context] Failed to sync cart with backend:', error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [user, getToken])

  // Load cart from localStorage or backend on mount
  useEffect(() => {
    console.log('🛒 [Cart Context] Loading cart - User:', !!user, 'Token:', !!getToken())
    const token = getToken()
    if (user && token) {
      // If user is logged in, sync with backend
      console.log('🛒 [Cart Context] User logged in, syncing with backend')
      syncWithBackend()
    } else {
      // If not logged in, load from localStorage
      console.log('🛒 [Cart Context] Guest user, loading from localStorage')
      const savedCart = localStorage.getItem("cart")
      console.log('🛒 [Cart Context] Saved cart:', savedCart)
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          console.log('🛒 [Cart Context] Loaded cart items:', cartItems.length)
          dispatch({ type: "LOAD_CART", payload: cartItems })
        } catch (error) {
          console.error("Failed to load cart from localStorage:", error)
        }
      } else {
        console.log('🛒 [Cart Context] No saved cart found')
      }
    }
  }, [user, getToken, syncWithBackend])

  // Save cart to localStorage and backend whenever it changes
  useEffect(() => {
    // Always save to localStorage for guest users
    localStorage.setItem("cart", JSON.stringify(state.items))
    
    // If user is logged in, also sync with backend
    const token = getToken()
    if (user && token && state.items.length > 0) {
      const syncCartWithBackend = async () => {
        try {
          await fetch('/api/cart/sync', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: state.items }),
          })
        } catch (error) {
          console.error('Failed to sync cart with backend:', error)
        }
      }
      syncCartWithBackend()
    }
  }, [state.items, user, getToken])

  const addItem = useCallback(async (productId: string, variantId?: string) => {
    console.log('🛒 [Cart Context] Adding item:', { productId, variantId })
    dispatch({ type: "ADD_ITEM", payload: { productId, variantId } })
    
    // If user is logged in, also update backend
    const token = getToken()
    console.log('🔑 [Cart Context] User logged in:', !!user, 'Token:', !!token)
    
    if (user && token) {
      try {
        console.log('📡 [Cart Context] Calling POST /api/cart')
        
        // Build request body - only include variantId if it exists
        const requestBody: any = {
          productId,
          quantity: 1
        }
        
        if (variantId) {
          requestBody.variantId = variantId
        }
        
        console.log('📦 [Cart Context] Request body:', JSON.stringify(requestBody, null, 2))
        
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        
        console.log('📊 [Cart Context] Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json()
          console.error('❌ [Cart Context] Backend error:', errorData)
          console.error('❌ [Cart Context] Error details:', JSON.stringify(errorData, null, 2))
        } else {
          const data = await response.json()
          console.log('✅ [Cart Context] Item added to backend:', data)
        }
      } catch (error) {
        console.error('💥 [Cart Context] Failed to add item to backend cart:', error)
      }
    } else {
      console.log('💾 [Cart Context] Guest mode - only updating localStorage')
    }
  }, [user, getToken])

  const removeItem = useCallback(async (productId: string, variantId?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } })
    
    // If user is logged in, also update backend
    const token = getToken()
    if (user && token) {
      try {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, variantId }),
        })
      } catch (error) {
        console.error('Failed to remove item from backend cart:', error)
      }
    }
  }, [user, getToken])

  const updateQuantity = useCallback(async (productId: string, quantity: number, variantId?: string) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } })
    
    // If user is logged in, also update backend
    const token = getToken()
    if (user && token) {
      try {
        await fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, variantId, quantity }),
        })
      } catch (error) {
        console.error('Failed to update item quantity in backend cart:', error)
      }
    }
  }, [user, getToken])

  const clearCart = useCallback(async () => {
    dispatch({ type: "CLEAR_CART" })
    
    // If user is logged in, also clear backend cart
    const token = getToken()
    if (user && token) {
      try {
        await fetch('/api/cart/clear', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Failed to clear backend cart:', error)
      }
    }
  }, [user, getToken])

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = (products: Product[]) => {
    return state.items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) return total

      if (item.variantId) {
        const variant = product.variants?.find((v) => v.id === item.variantId)
        return total + (variant?.price || product.price) * item.quantity
      }

      return total + product.price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        getItemCount,
        getCartTotal,
        syncWithBackend,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
