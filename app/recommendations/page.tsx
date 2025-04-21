import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecommendationResults from "@/components/recommendation-results"
import SavingsChart from "@/components/savings-chart"
import LoadingRecommendations from "@/components/loading-recommendations"

export default function RecommendationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const address = (searchParams.address as string) || "Unknown Address"

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
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Energy Savings Recommendations</h1>
          <p className="text-muted-foreground mt-2">Based on your business location</p>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Building Details</CardTitle>
                <CardDescription>Information about your business property</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                    <dd className="text-sm">{address}</dd>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Building characteristics are automatically estimated based on your address. For more accurate
                      recommendations, you can{" "}
                      <Link href="#" className="text-teal-600 hover:underline">
                        provide additional details
                      </Link>
                      .
                    </p>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-5">
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-blue-100">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="savings">Projected Savings</TabsTrigger>
              </TabsList>
              <TabsContent value="recommendations" className="mt-4">
                <Suspense fallback={<LoadingRecommendations />}>
                  <RecommendationResults address={address} />
                </Suspense>
              </TabsContent>
              <TabsContent value="savings" className="mt-4">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Projected Energy Savings</CardTitle>
                    <CardDescription>
                      Estimated annual savings based on implementing our recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <SavingsChart />
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
