export interface FoodItem {
  id: string
  name: string
  quantity: string
  donor: string
  donorType: 'restaurant' | 'hostel' | 'event' | 'other'
  location: string
  expiresAt: string // ISO string
  createdAt: string // ISO string
  status: 'available' | 'accepted'
  acceptedBy?: string
  acceptedAt?: string
}

const STORAGE_KEY = 'foodbridge_items'

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function getItems(): FoodItem[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveItems(items: FoodItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addFoodItem(
  item: Omit<FoodItem, 'id' | 'createdAt' | 'status'>
): FoodItem {
  const items = getItems()
  const newItem: FoodItem = {
    ...item,
    id: generateUUID(),
    createdAt: new Date().toISOString(),
    status: 'available',
  }
  items.push(newItem)
  saveItems(items)
  window.dispatchEvent(new Event('foodbridge-update'))
  return newItem
}

export function getAvailableItems(): FoodItem[] {
  return getItems()
    .filter((item) => item.status === 'available')
    .sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    )
}

export function getAllItems(): FoodItem[] {
  return getItems().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function acceptFoodItem(id: string, ngoName: string): FoodItem | null {
  const items = getItems()
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return null
  items[index].status = 'accepted'
  items[index].acceptedBy = ngoName
  items[index].acceptedAt = new Date().toISOString()
  saveItems(items)
  window.dispatchEvent(new Event('foodbridge-update'))
  return items[index]
}

export function getImpactStats() {
  const items = getItems()
  const accepted = items.filter((item) => item.status === 'accepted')
  const totalDonations = items.length
  const totalAccepted = accepted.length
  // Estimate: each food item serves ~20 meals on average
  const mealsProvided = totalAccepted * 20
  // Estimate: each meal is ~0.4kg of food saved
  const foodSavedKg = mealsProvided * 0.4

  const donorTypes = items.reduce(
    (acc, item) => {
      acc[item.donorType] = (acc[item.donorType] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const uniqueDonors = new Set(items.map((item) => item.donor)).size
  const uniqueNGOs = new Set(
    accepted.map((item) => item.acceptedBy).filter(Boolean)
  ).size

  return {
    totalDonations,
    totalAccepted,
    mealsProvided,
    foodSavedKg,
    donorTypes,
    uniqueDonors,
    uniqueNGOs,
  }
}

export function seedDemoData(): void {
  const items = getItems()
  if (items.length > 0) return

  const now = new Date()
  const demoItems: FoodItem[] = [
    {
      id: generateUUID(),
      name: 'Rice and Curry (50 servings)',
      quantity: '50 servings',
      donor: 'Spice Garden Restaurant',
      donorType: 'restaurant',
      location: '123 Main Street',
      expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      status: 'available',
    },
    {
      id: generateUUID(),
      name: 'Bread and Sandwiches (30 pcs)',
      quantity: '30 pieces',
      donor: 'City Hostel Cafeteria',
      donorType: 'hostel',
      location: '456 College Road',
      expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      status: 'available',
    },
    {
      id: generateUUID(),
      name: 'Wedding Feast Leftovers (200 servings)',
      quantity: '200 servings',
      donor: 'Grand Palace Hall',
      donorType: 'event',
      location: '789 Palace Avenue',
      expiresAt: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'accepted',
      acceptedBy: 'Helping Hands NGO',
      acceptedAt: new Date(now.getTime() - 1.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Fresh Fruit Platter (20 kg)',
      quantity: '20 kg',
      donor: 'Green Valley Farm',
      donorType: 'other',
      location: '321 Farm Lane',
      expiresAt: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      status: 'available',
    },
    {
      id: generateUUID(),
      name: 'Biryani (100 servings)',
      quantity: '100 servings',
      donor: 'Royal Caterers',
      donorType: 'event',
      location: '555 Event Center Road',
      expiresAt: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      status: 'accepted',
      acceptedBy: 'Feed the Future Foundation',
      acceptedAt: new Date(now.getTime() - 20 * 60 * 1000).toISOString(),
    },
  ]

  saveItems(demoItems)
  window.dispatchEvent(new Event('foodbridge-update'))
}
