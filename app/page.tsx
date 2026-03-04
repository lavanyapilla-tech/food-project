import Link from "next/link"
import Image from "next/image"
import { ArrowRight, HandHeart, Building2, BarChart3, Clock, Users, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: HandHeart,
    title: "Easy Donation",
    description:
      "Donors can quickly post surplus food details with just a few clicks. No complex forms or processes.",
  },
  {
    icon: Building2,
    title: "NGO Dashboard",
    description:
      "NGOs can view available food in real-time and accept donations with urgency-based priority.",
  },
  {
    icon: Clock,
    title: "Expiry Priority",
    description:
      "Food nearing expiry is automatically prioritized so nothing goes to waste unnecessarily.",
  },
  {
    icon: BarChart3,
    title: "Impact Tracking",
    description:
      "See the real difference being made: meals provided, food saved, and communities supported.",
  },
]

const steps = [
  {
    step: "01",
    title: "Donor Posts Food",
    description:
      "Restaurants, hostels, and event organizers add surplus food details including quantity and expiry time.",
  },
  {
    step: "02",
    title: "NGO Discovers Food",
    description:
      "NGOs and volunteers browse available food, sorted by urgency. Food expiring soon appears first.",
  },
  {
    step: "03",
    title: "Food Gets Collected",
    description:
      "NGOs accept and collect the food, ensuring it reaches those in need before it expires.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Utensils className="h-3.5 w-3.5" />
              <span>Reducing food waste, one meal at a time</span>
            </div>
            <h1
              className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl animate-fade-in-up"
            >
              Surplus Food Deserves a{" "}
              <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Second Chance</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              FoodBridge connects food donors with NGOs and volunteers to ensure
              edible surplus food reaches those who need it most, before it goes
              to waste.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/donate">
                  Donate Food <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/ngo">
                  <Building2 className="h-4 w-4" /> I{"'"}m an NGO
                </Link>
              </Button>
            </div>
            <div className="mt-12 w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-xl shadow-primary/5 border border-primary/10">
              <Image
                src="/images/food-wastage/4.jpeg"
                alt="Food wastage that can be prevented"
                width={800}
                height={400}
                className="w-full h-auto object-cover max-h-[400px] transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b bg-card py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {[
            { value: "1.3B", label: "Tons wasted yearly", sub: "globally" },
            { value: "828M", label: "People go hungry", sub: "worldwide" },
            { value: "40%", label: "Food is wasted", sub: "in developing nations" },
            { value: "1/3", label: "Of all food produced", sub: "is never eaten" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Simple, Fast, Effective
            </h2>
            <p className="mt-3 text-muted-foreground">
              Technology should support people, not complicate the process.
              FoodBridge is designed for ease.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <Card key={feature.title} className={`border-none bg-secondary/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to turn surplus into sustenance.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.step} className="relative animate-fade-in-up transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 150}ms` }}>
                <span className="text-5xl font-bold text-primary/15">
                  {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary px-8 py-12 text-center">
            <Users className="mx-auto h-10 w-10 text-primary-foreground/80" />
            <h2
              className="mt-4 text-2xl font-bold text-primary-foreground md:text-3xl"
            >
              Join the Movement
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              Whether you{"'"}re a donor with surplus food or an NGO looking to
              serve your community, FoodBridge makes it easy to make a
              difference.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/food-donation/4.jpg"
                  alt="People receiving food donations"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/food-donation/6.jpg"
                  alt="Volunteers organizing food"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                <Link href="/donate">
                  Start Donating <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/impact">View Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
