"use client"

import Image from "next/image"

import { useEffect, useState, useCallback } from "react"
import {
  Utensils,
  Scale,
  HandHeart,
  Building2,
  Users,
  TrendingUp,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getAllItems, getImpactStats, seedDemoData, type FoodItem } from "@/lib/food-store"

const donorTypeLabels: Record<string, string> = {
  restaurant: "Restaurant",
  hostel: "Hostel",
  event: "Event",
  other: "Other",
}

function StatCard({
  icon: Icon,
  value,
  label,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string | number
  label: string
  description?: string
}) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 pt-0">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p
            className="text-2xl font-bold text-foreground"
          >
            {value}
          </p>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentActivity({ items }: { items: FoodItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest food donations and acceptances</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No activity yet. Donate food or check back later.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border bg-secondary/30 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    by {item.donor}
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === "accepted" ? "default" : "secondary"
                  }
                >
                  {item.status === "accepted" ? "Collected" : "Available"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ImpactPage() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAccepted: 0,
    mealsProvided: 0,
    foodSavedKg: 0,
    donorTypes: {} as Record<string, number>,
    uniqueDonors: 0,
    uniqueNGOs: 0,
  })
  const [items, setItems] = useState<FoodItem[]>([])
  const [mounted, setMounted] = useState(false)

  const loadData = useCallback(() => {
    setStats(getImpactStats())
    setItems(getAllItems())
  }, [])

  useEffect(() => {
    seedDemoData()
    setMounted(true)
    loadData()

    const handler = () => loadData()
    window.addEventListener("foodbridge-update", handler)
    return () => window.removeEventListener("foodbridge-update", handler)
  }, [loadData])

  if (!mounted) return null

  const acceptanceRate =
    stats.totalDonations > 0
      ? Math.round((stats.totalAccepted / stats.totalDonations) * 100)
      : 0

  return (
    <div className="relative min-h-screen">
      {/* Background Images Overlay */}
      <div className="fixed inset-0 z-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 opacity-15 pointer-events-none overflow-hidden">
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/1.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/2.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/3.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/4.jpeg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/5.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/6.webp" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/7.avif" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/8.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/9.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/1.jpg" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-donation/2.png" alt="" fill className="object-cover" /></div>
        <div className="w-full h-full relative min-h-[200px]"><Image src="/images/food-wastage/3.webp" alt="" fill className="object-cover" /></div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            Our Impact
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tracking the difference we{"'"}re making together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={HandHeart}
            value={stats.totalDonations}
            label="Total Donations"
            description="Food items posted by donors"
          />
          <StatCard
            icon={Building2}
            value={stats.totalAccepted}
            label="Food Collected"
            description="Successfully picked up by NGOs"
          />
          <StatCard
            icon={Utensils}
            value={stats.mealsProvided.toLocaleString()}
            label="Meals Provided"
            description="Estimated meals served"
          />
          <StatCard
            icon={Scale}
            value={`${stats.foodSavedKg.toLocaleString()} kg`}
            label="Food Saved"
            description="Estimated food rescued"
          />
          <StatCard
            icon={Users}
            value={stats.uniqueDonors}
            label="Unique Donors"
            description="Organizations contributing"
          />
          <StatCard
            icon={Building2}
            value={stats.uniqueNGOs}
            label="Active NGOs"
            description="Organizations collecting"
          />
        </div>

        {/* Acceptance Rate */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Acceptance Rate</CardTitle>
            <CardDescription>
              {acceptanceRate}% of donated food has been collected by NGOs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={acceptanceRate} className="h-3" />
            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>{stats.totalAccepted} collected</span>
              <span>{stats.totalDonations - stats.totalAccepted} still available</span>
            </div>
          </CardContent>
        </Card>

        {/* Donor breakdown */}
        {Object.keys(stats.donorTypes).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Donations by Source</CardTitle>
              <CardDescription>
                Breakdown of food sources contributing to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(stats.donorTypes).map(([type, count]) => {
                  const percentage = Math.round(
                    (count / stats.totalDonations) * 100
                  )
                  return (
                    <div key={type} className="rounded-lg border bg-secondary/30 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {donorTypeLabels[type] || type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="mt-2 h-1.5" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <div className="mt-8">
          <RecentActivity items={items} />
        </div>
      </div>
    </div>
  )
}
