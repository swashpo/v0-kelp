import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Leaf, LightbulbOff, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AddressSearchForm from "@/components/address-search-form"
import LoadingRecommendations from "@/components/loading-recommendations"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-blue-50/95 backdrop-blur supports-[backdrop-filter]:bg-blue-50/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-lg font-bold">
            <Leaf className="h-5 w-5 text-teal-600" />
            <span>Kelp</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Button size="sm">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Discover Your Business&apos;s Energy Saving Potential
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get personalized recommendations to reduce energy costs and improve sustainability for your business
                    location.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
                    <Link href="#address-form">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 flex items-center justify-center">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    alt="Energy efficient building"
                    className="aspect-video object-cover w-full max-w-[600px]"
                    height="400"
                    src="/placeholder.svg?height=400&width=600"
                    width="600"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50" id="address-form">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Your Energy Savings</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Enter your business address to get started with personalized energy saving recommendations.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1">
              <Card className="mx-auto w-full max-w-3xl bg-white">
                <CardHeader>
                  <CardTitle>Business Address</CardTitle>
                  <CardDescription>
                    We&apos;ll use this information to analyze your building&apos;s energy profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<LoadingRecommendations />}>
                    <AddressSearchForm />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-100 dark:bg-blue-900/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Kelp?</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides accurate, data-driven recommendations to help your business save energy and reduce
                costs.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Building2 className="h-8 w-8 text-teal-600" />
                  <div className="grid gap-1">
                    <CardTitle>Building Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms analyze your building&apos;s characteristics to identify energy-saving
                    opportunities.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center gap-4">
                  <LightbulbOff className="h-8 w-8 text-teal-600" />
                  <div className="grid gap-1">
                    <CardTitle>Smart Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations for insulation, HVAC upgrades, and building material improvements.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Zap className="h-8 w-8 text-teal-600" />
                  <div className="grid gap-1">
                    <CardTitle>ROI Calculator</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    See the potential return on investment for each energy-saving recommendation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0 bg-blue-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kelp. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
