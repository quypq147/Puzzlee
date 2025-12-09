"use client"

import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ParticipantJoinBar } from "@/components/participant-join-bar"
import { ArrowRight, MessageSquare, Users, Zap, BarChart3, PlusCircle } from "lucide-react"

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-16 md:py-32">
          <div className="flex flex-col items-center gap-12">
            {/* Join Bar */}
            <ParticipantJoinBar />

            {/* Main Headline */}
            <div className="text-center max-w-3xl space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                The easiest way to make your meetings interactive
              </h1>

              <p className="text-lg text-foreground/70">
                Engage your participants with live polls, Q&A, quizzes and word clouds — whether you meet in the office, online or in-between.
              </p>

              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get started for free
                </Button>
              </Link>
            </div>

            {/* Mock Demo */}
            <div className="w-full max-w-2xl">
              <Card className="border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg p-8 h-64 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">Live Q&A Demo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Powerful features designed for every meeting scenario</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<MessageSquare className="h-6 w-6" />} title="Q&A" description="Let participants ask and discuss in real-time" />
            <FeatureCard icon={<Users className="h-6 w-6" />} title="Live Polls" description="Instantly gauge audience sentiment and opinions" />
            <FeatureCard icon={<Zap className="h-6 w-6" />} title="Quizzes" description="Test knowledge and engage with interactive questions" />
            <FeatureCard icon={<BarChart3 className="h-6 w-6" />} title="Analytics" description="Measure engagement and get actionable insights" />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-16 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
            <p className="text-lg text-foreground/70">Join thousands of presenters creating engaging meetings</p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard(props: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="h-full border bg-card hover:bg-card/80 transition-colors">
      <CardContent className="p-6 space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {props.icon}
        </div>
        <div>
          <h3 className="font-semibold mb-2">{props.title}</h3>
          <p className="text-sm text-foreground/70">{props.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LandingPage