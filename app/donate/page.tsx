"use client"

import Image from "next/image"

import { useState } from "react"
import { Plus, Check, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addFoodItem, type FoodItem } from "@/lib/food-store"

const donorTypes = [
  { value: "restaurant" as const, label: "Restaurant" },
  { value: "hostel" as const, label: "Hostel" },
  { value: "event" as const, label: "Event / Marriage Hall" },
  { value: "other" as const, label: "Other" },
]

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    donor: "",
    donorType: "restaurant" as FoodItem["donorType"],
    location: "",
    expiresInHours: "4",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const expiresAt = new Date(
      Date.now() + Number(formData.expiresInHours) * 60 * 60 * 1000
    ).toISOString()

    addFoodItem({
      name: formData.name,
      quantity: formData.quantity,
      donor: formData.donor,
      donorType: formData.donorType,
      location: formData.location,
      expiresAt,
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        quantity: "",
        donor: "",
        donorType: "restaurant",
        location: "",
        expiresInHours: "4",
      })
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Utensils className="h-7 w-7 text-primary" />
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <Image src="/images/food-wastage/1.jpg" alt="Wasted food in bin" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
          <Image src="/images/food-wastage/2.jpg" alt="Excess food discarded" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
          <Image src="/images/food-wastage/3.webp" alt="Food spoiling" width={150} height={100} className="rounded-lg object-cover h-24 w-auto shadow-sm" />
        </div>
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Donate Surplus Food
        </h1>
        <p className="mt-2 text-muted-foreground">
          Share your surplus food details so NGOs can collect it before it
          expires.
        </p>
      </div>

      {submitted ? (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2
              className="mt-4 text-xl font-bold text-foreground"
            >
              Food Posted Successfully!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              NGOs can now see your donation and arrange collection.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
            <CardDescription>
              Fill in the information about the food you want to donate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Food Name / Description</Label>
                <Input
                  id="name"
                  placeholder="e.g., Rice and Curry (50 servings)"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 50 servings, 20 kg"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="expiresInHours">
                    Edible For (hours from now)
                  </Label>
                  <Input
                    id="expiresInHours"
                    type="number"
                    min="1"
                    max="48"
                    placeholder="4"
                    value={formData.expiresInHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expiresInHours: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="donor">Donor Name / Organization</Label>
                <Input
                  id="donor"
                  placeholder="e.g., Spice Garden Restaurant"
                  value={formData.donor}
                  onChange={(e) =>
                    setFormData({ ...formData, donor: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Donor Type</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {donorTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, donorType: type.value })
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${formData.donorType === type.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                        }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., 123 Main Street, City"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" size="lg" className="mt-2 gap-2">
                <Plus className="h-4 w-4" /> Post Food Donation
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
