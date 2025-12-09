"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle, Play } from "lucide-react"
import { CreateEventDialog } from "@/components/create-event-dialog"

function DashboardPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events")
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Create a slido</h1>
          <p className="text-foreground/70 mt-2">Get started with interactive meetings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Create Card */}
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Create a slido</h3>
                <p className="text-sm text-foreground/70">Run polls and Q&A in your browser.</p>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  // Open create dialog
                  const element = document.querySelector('[data-create-dialog-trigger]') as HTMLElement
                  element?.click()
                }}
              >
                Start now
              </Button>
            </CardContent>
          </Card>

          {/* Integrations Card */}
          <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Set up slido in your tools</h3>
                <p className="text-sm text-foreground/70">Get started in integrations.</p>
              </div>
              <Button variant="outline" className="w-full">
                Explore integrations
              </Button>
            </CardContent>
          </Card>
        </div>

        <CreateEventDialog
          onEventCreated={(event) => {
            setEvents([event, ...events])
          }}
        />

        <div className="text-center">
          <Link href="#how-it-works">
            <Button variant="outline">See how Slido works</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My slidos</h1>
        <p className="text-foreground/70 mt-2">Manage your interactive meetings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold line-clamp-2">{event.title || "Untitled Slido"}</h3>
                <p className="text-sm text-foreground/60">{event.participant_count || 0} participants</p>
                <Button size="sm" className="w-full">
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage

