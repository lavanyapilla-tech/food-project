"use client"

import Image from "next/image"

import { useEffect, useState, useCallback } from "react"
import {
  Clock,
  MapPin,
  User,
  Check,
  AlertTriangle,
  Building2,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  getAvailableItems,
  acceptFoodItem,
  seedDemoData,
  type FoodItem,
} from "@/lib/food-store"

function getTimeRemaining(expiresAt: string): {
  text: string
  urgency: "critical" | "warning" | "normal"
} {
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (diff <= 0) return { text: "Expired", urgency: "critical" }
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (hours < 2) return { text: `${hours}h ${minutes}m left`, urgency: "critical" }
  if (hours < 5) return { text: `${hours}h ${minutes}m left`, urgency: "warning" }
  return { text: `${hours}h ${minutes}m left`, urgency: "normal" }
}

const donorTypeLabels: Record<string, string> = {
  restaurant: "Restaurant",
  hostel: "Hostel",
  event: "Event",
  other: "Other",
}

function FoodCard({
  item,
  onAccept,
}: {
  item: FoodItem
  onAccept: (id: string) => void
}) {
  const [ngoName, setNgoName] = useState("")
  const [showAcceptForm, setShowAcceptForm] = useState(false)
  const time = getTimeRemaining(item.expiresAt)

  function handleAccept() {
    if (!ngoName.trim()) return
    onAccept(item.id)
    acceptFoodItem(item.id, ngoName.trim())
  }

  return (
    <Card
      className={`transition-all ${time.urgency === "critical"
          ? "border-destructive/40 bg-destructive/5"
          : time.urgency === "warning"
            ? "border-accent/40 bg-accent/5"
            : ""
        }`}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.quantity}
            </p>
          </div>
          <Badge
            variant={time.urgency === "critical" ? "destructive" : "secondary"}
            className={
              time.urgency === "warning"
                ? "border-accent bg-accent/20 text-accent-foreground"
                : ""
            }
          >
            {time.urgency === "critical" && (
              <AlertTriangle className="mr-1 h-3 w-3" />
            )}
            <Clock className="mr-1 h-3 w-3" />
            {time.text}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {item.donor}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" /> {donorTypeLabels[item.donorType]}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {item.location}
          </span>
        </div>

        {showAcceptForm ? (
          <div className="flex gap-2">
            <Input
              placeholder="Your NGO / Organization name"
              value={ngoName}
              onChange={(e) => setNgoName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAccept} disabled={!ngoName.trim()} className="gap-1">
              <Check className="h-4 w-4" /> Confirm
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowAcceptForm(true)}
            variant="outline"
            className="gap-2"
          >
            Accept This Food
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function NGOPage() {
  const [items, setItems] = useState<FoodItem[]>([])
  const [search, setSearch] = useState("")
  const [mounted, setMounted] = useState(false)

  const loadItems = useCallback(() => {
    setItems(getAvailableItems())
  }, [])

  useEffect(() => {
    seedDemoData()
    setMounted(true)
    loadItems()

    const handler = () => loadItems()
    window.addEventListener("foodbridge-update", handler)
    const interval = setInterval(loadItems, 30000) // refresh every 30s
    return () => {
      window.removeEventListener("foodbridge-update", handler)
      clearInterval(interval)
    }
  }, [loadItems])

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.donor.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  )

  function handleAccept(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  if (!mounted) return null

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Building2 className="h-7 w-7 text-primary" />
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <Image src="/images/food-donation/1.jpg" alt="Donating fresh vegetables" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
          <Image src="/images/food-donation/3.jpg" alt="Community food drive" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
          <Image src="/images/food-donation/7.avif" alt="Food packages prepared for delivery" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
        </div>
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Available Food
        </h1>
        <p className="mt-2 text-muted-foreground">
          Food nearing expiry is shown first. Accept food to arrange
          collection.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food, donor, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary" className="shrink-0 px-3 py-1.5 text-sm">
          {filteredItems.length} available
        </Badge>
      </div>

      {filteredItems.length === 0 ? (
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle>No Food Available</CardTitle>
            <CardDescription>
              {search
                ? "No results match your search. Try different keywords."
                : "There are no food items currently available. Check back later."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} onAccept={handleAccept} />
          ))}
        </div>
      )}
    </div>
  )
}
