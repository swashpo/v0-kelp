"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function AddressSearchForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a business address to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real application, we would validate the form and send the data to the server
      // For this demo, we'll just simulate a delay and redirect to the results page
      setTimeout(() => {
        router.push(`/recommendations?address=${encodeURIComponent(address)}`)
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Business Address</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            placeholder="123 Business St, City, State, ZIP"
            className="pl-8"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter a complete address for the most accurate energy savings recommendations.
        </p>
      </div>

      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <Building className="mr-2 h-4 w-4 animate-pulse" />
            Analyzing Building...
          </>
        ) : (
          <>
            <Building className="mr-2 h-4 w-4" />
            Get Energy Recommendations
          </>
        )}
      </Button>
    </form>
  )
}
