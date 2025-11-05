// Serviceability check utilities and API functions

export interface ServiceableArea {
  pincode: string
  city: string
  state: string
  deliveryTime: string
  isActive: boolean
  deliveryFee: number
  minimumOrder: number
  surgeMultiplier?: number
  restrictions?: string[]
}

export interface ServiceabilityResult {
  isServiceable: boolean
  deliveryTime?: string
  deliveryFee?: number
  minimumOrder?: number
  message: string
  suggestedAreas?: ServiceableArea[]
}

// Mock serviceability data - in production, this would come from a database/API
const serviceableAreas: ServiceableArea[] = [
  {
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi",
    deliveryTime: "8-15 mins",
    isActive: true,
    deliveryFee: 0,
    minimumOrder: 199,
  },
  {
    pincode: "110002",
    city: "New Delhi",
    state: "Delhi",
    deliveryTime: "10-20 mins",
    isActive: true,
    deliveryFee: 25,
    minimumOrder: 149,
  },
  {
    pincode: "110003",
    city: "New Delhi",
    state: "Delhi",
    deliveryTime: "12-18 mins",
    isActive: true,
    deliveryFee: 0,
    minimumOrder: 199,
  },
  {
    pincode: "122001",
    city: "Gurgaon",
    state: "Haryana",
    deliveryTime: "15-25 mins",
    isActive: true,
    deliveryFee: 35,
    minimumOrder: 249,
  },
  {
    pincode: "122002",
    city: "Gurgaon",
    state: "Haryana",
    deliveryTime: "12-18 mins",
    isActive: true,
    deliveryFee: 25,
    minimumOrder: 199,
  },
  {
    pincode: "201301",
    city: "Noida",
    state: "Uttar Pradesh",
    deliveryTime: "10-20 mins",
    isActive: true,
    deliveryFee: 30,
    minimumOrder: 199,
  },
  {
    pincode: "201302",
    city: "Noida",
    state: "Uttar Pradesh",
    deliveryTime: "15-25 mins",
    isActive: true,
    deliveryFee: 40,
    minimumOrder: 299,
  },
  {
    pincode: "400001",
    city: "Mumbai",
    state: "Maharashtra",
    deliveryTime: "8-15 mins",
    isActive: true,
    deliveryFee: 0,
    minimumOrder: 199,
  },
  {
    pincode: "400002",
    city: "Mumbai",
    state: "Maharashtra",
    deliveryTime: "10-18 mins",
    isActive: true,
    deliveryFee: 25,
    minimumOrder: 199,
  },
  {
    pincode: "560001",
    city: "Bangalore",
    state: "Karnataka",
    deliveryTime: "10-18 mins",
    isActive: true,
    deliveryFee: 0,
    minimumOrder: 199,
  },
  {
    pincode: "560002",
    city: "Bangalore",
    state: "Karnataka",
    deliveryTime: "12-20 mins",
    isActive: true,
    deliveryFee: 30,
    minimumOrder: 249,
  },
  {
    pincode: "700001",
    city: "Kolkata",
    state: "West Bengal",
    deliveryTime: "15-25 mins",
    isActive: true,
    deliveryFee: 35,
    minimumOrder: 299,
  },
  {
    pincode: "481990",
    city: "Shahpura",
    state: "Madhya Pradesh",
    deliveryTime: "8-15 mins",
    isActive: true,
    deliveryFee: 25,
    minimumOrder: 199,
  },
]

export async function checkServiceability(pincode: string): Promise<ServiceabilityResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const area = serviceableAreas.find((area) => area.pincode === pincode && area.isActive)

  if (area) {
    return {
      isServiceable: true,
      deliveryTime: area.deliveryTime,
      deliveryFee: area.deliveryFee,
      minimumOrder: area.minimumOrder,
      message: `Great! We deliver to ${area.city} in ${area.deliveryTime}.`,
    }
  }

  // Find nearby serviceable areas
  const nearbyAreas = findNearbyServiceableAreas(pincode)

  return {
    isServiceable: false,
    message: "Sorry, we don't deliver to this area yet.",
    suggestedAreas: nearbyAreas.slice(0, 3), // Show top 3 suggestions
  }
}

function findNearbyServiceableAreas(pincode: string): ServiceableArea[] {
  // Simple logic to find nearby areas based on pincode similarity
  const pincodeNum = Number.parseInt(pincode)

  return serviceableAreas
    .filter((area) => area.isActive)
    .map((area) => ({
      ...area,
      distance: Math.abs(Number.parseInt(area.pincode) - pincodeNum),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)
}

export function calculateDeliveryCharges(
  pincode: string,
  orderValue: number,
): {
  deliveryFee: number
  isFreeDelivery: boolean
  minimumForFree: number
} {
  const area = serviceableAreas.find((area) => area.pincode === pincode && area.isActive)

  if (!area) {
    return { deliveryFee: 50, isFreeDelivery: false, minimumForFree: 299 }
  }

  const isFreeDelivery = orderValue >= area.minimumOrder

  return {
    deliveryFee: isFreeDelivery ? 0 : area.deliveryFee,
    isFreeDelivery,
    minimumForFree: area.minimumOrder,
  }
}

export function getDeliveryTimeEstimate(pincode: string): string {
  const area = serviceableAreas.find((area) => area.pincode === pincode && area.isActive)
  return area?.deliveryTime || "Not available"
}

export function getAllServiceableAreas(): ServiceableArea[] {
  return serviceableAreas.filter((area) => area.isActive)
}

export function isValidPincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode)
}
