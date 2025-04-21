"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle2, Clock, Lightbulb, ThermometerSun, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getPalmettoRecommendations } from "@/lib/palmetto-api"
import type { RecommendationType } from "@/lib/types"

interface RecommendationResultsProps {
  address: string
}

export default function RecommendationResults({ address }: RecommendationResultsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)
      try {
        // In a real application, we would call the Palmetto API with the actual address
        const data = await getPalmettoRecommendations(address)
        setRecommendations(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [address])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-full bg-teal-200" />
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </CardTitle>
            <CardDescription>
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-full bg-teal-200" />
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </CardTitle>
            <CardDescription>
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "HVAC":
        return <ThermometerSun className="h-5 w-5 text-teal-600" />
      case "Insulation":
        return <Wind className="h-5 w-5 text-teal-600" />
      case "Lighting":
        return <Lightbulb className="h-5 w-5 text-teal-600" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-teal-600" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Top Recommendations</h3>
        <p className="text-sm text-muted-foreground">
          Estimated Annual Savings:{" "}
          <span className="font-medium text-teal-600">
            ${recommendations.reduce((acc, rec) => acc + rec.annualSavings, 0).toLocaleString()}
          </span>
        </p>
      </div>

      {recommendations.map((recommendation, index) => (
        <Card key={index} className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIconForCategory(recommendation.category)}
              {recommendation.title}
            </CardTitle>
            <CardDescription>{recommendation.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Annual Savings</p>
                  <p className="text-2xl font-bold text-teal-600">${recommendation.annualSavings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Implementation Cost</p>
                  <p className="text-2xl font-bold">${recommendation.implementationCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payback Period</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg font-medium">{recommendation.paybackPeriod} years</p>
                  </div>
                </div>
              </div>

              {recommendation.details && recommendation.category === "Lighting" && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Energy Impact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Energy Reduction</p>
                      <p className="text-sm font-medium">
                        {recommendation.details.energySavingsPercent}% less energy used
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Annual Energy Savings</p>
                      <p className="text-sm font-medium">
                        {Math.round(recommendation.details.energySavings || 0).toLocaleString()} kWh
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">ROI Potential</span>
                  <span className="font-medium">{recommendation.roiPercentage}%</span>
                </div>
                <Progress
                  value={recommendation.roiPercentage}
                  className="h-2 bg-blue-100"
                  indicatorClassName="bg-teal-600"
                />
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="pt-4">
            <Button variant="outline" className="w-full gap-1">
              View Detailed Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
