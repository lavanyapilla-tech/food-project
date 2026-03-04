import { Leaf } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            FoodBridge
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Connecting surplus food with those who need it most. Built with empathy, powered by community.
        </p>
        <p className="text-xs text-muted-foreground">
          Innovation Project - Design Thinking
        </p>
      </div>
    </footer>
  )
}
