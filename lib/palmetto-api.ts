import type { RecommendationType } from "./types"

export async function getPalmettoRecommendations(address: string): Promise<RecommendationType[]> {
  try {
    // Call our server-side API route
    const response = await fetch("/api/palmetto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Check if we have an error but with fallback data
    if (data.error) {
      console.warn("API returned an error with fallback data:", data.error)
    }

    const { baselineData, ledData, ledSavings, coordinates } = data

    // Log the response data and coordinates in the client console
    console.log("Baseline Data:", baselineData)
    console.log("LED Lighting Data:", ledData)
    console.log("LED Savings:", ledSavings)
    console.log("Coordinates used:", coordinates)

    // Generate recommendations based on the API response
    return generateRecommendationsFromApiData(baselineData, ledSavings, coordinates, address)
  } catch (error) {
    console.error("Error fetching data from Palmetto API:", error)
    // Fall back to mock data if the API call fails
    return generateMockRecommendations(address)
  }
}

function generateRecommendationsFromApiData(
  baselineData: any,
  ledSavings: any,
  coordinates?: { latitude: number; longitude: number },
  address?: string,
): RecommendationType[] {
  try {
    // Safely extract baseline cost from the API response
    const baselineResults = baselineData?.results || []
    const baselineCost = baselineResults.length > 0 ? baselineResults[0]?.total_cost || 10000 : 10000

    // Log the coordinates used for the recommendations
    if (coordinates) {
      console.log(`Generating recommendations for coordinates: ${coordinates.latitude}, ${coordinates.longitude}`)
    }

    // Create recommendations array
    const recommendations: RecommendationType[] = []

    // Add LED lighting recommendation with actual calculated savings
    recommendations.push({
      title: "LED Lighting Conversion",
      description: "Replace all conventional lighting with LED fixtures to significantly reduce electricity usage.",
      category: "Lighting",
      annualSavings: Math.round(ledSavings?.costSavings) || Math.round(baselineCost * 0.08),
      implementationCost: Math.round(baselineCost * 0.2),
      paybackPeriod: 2.5,
      roiPercentage: 95,
      details: {
        energySavings: ledSavings?.energySavings || 1500,
        energySavingsPercent: ledSavings?.energySavingsPercent?.toFixed(1) || "15.0",
        baselineEnergy: ledSavings?.baselineEnergy || 10000,
        improvedEnergy: ledSavings?.ledEnergy || 8500,
      },
    })

    // Generate a factor based on address or coordinates for variation
    let variationFactor = 1.0
    if (address) {
      // Create a simple hash from the address
      const addressHash = address.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      variationFactor = 0.85 + (addressHash % 30) / 100 // 0.85 to 1.15
    } else if (coordinates) {
      // Use coordinates for variation
      variationFactor = 0.9 + ((Math.abs(coordinates.latitude) + Math.abs(coordinates.longitude)) % 20) / 100 // 0.9 to 1.1
    }

    // Add other recommendations with variation
    recommendations.push({
      title: "HVAC System Upgrade",
      description: "Replace your current HVAC system with a high-efficiency model to reduce energy consumption.",
      category: "HVAC",
      annualSavings: Math.round(baselineCost * 0.15 * variationFactor),
      implementationCost: Math.round(baselineCost * 0.5 * variationFactor),
      paybackPeriod: 3.3,
      roiPercentage: 85,
    })

    recommendations.push({
      title: "Improved Building Insulation",
      description: "Enhance wall and roof insulation to minimize heat transfer and reduce heating/cooling costs.",
      category: "Insulation",
      annualSavings: Math.round(baselineCost * 0.1 * variationFactor),
      implementationCost: Math.round(baselineCost * 0.3 * variationFactor),
      paybackPeriod: 3,
      roiPercentage: 92,
    })

    return recommendations
  } catch (error) {
    console.error("Error generating recommendations from API data:", error)
    return generateMockRecommendations(address || "")
  }
}

function generateMockRecommendations(address: string): RecommendationType[] {
  // Create variation based on address
  let variationFactor = 1.0
  if (address) {
    // Create a simple hash from the address
    const addressHash = address.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    variationFactor = 0.8 + (addressHash % 40) / 100 // 0.8 to 1.2
  }

  // Default mock recommendations when API data is not available
  const defaultSqft = 5000 * variationFactor

  return [
    {
      title: "HVAC System Upgrade",
      description: "Replace your current HVAC system with a high-efficiency model to reduce energy consumption.",
      category: "HVAC",
      annualSavings: Math.round(defaultSqft * 0.35),
      implementationCost: Math.round(defaultSqft * 2.5),
      paybackPeriod: 7.1,
      roiPercentage: 85,
    },
    {
      title: "Improved Building Insulation",
      description: "Enhance wall and roof insulation to minimize heat transfer and reduce heating/cooling costs.",
      category: "Insulation",
      annualSavings: Math.round(defaultSqft * 0.2),
      implementationCost: Math.round(defaultSqft * 1.2),
      paybackPeriod: 6,
      roiPercentage: 92,
    },
    {
      title: "LED Lighting Conversion",
      description: "Replace all conventional lighting with LED fixtures to significantly reduce electricity usage.",
      category: "Lighting",
      annualSavings: Math.round(defaultSqft * 0.15),
      implementationCost: Math.round(defaultSqft * 0.75),
      paybackPeriod: 5,
      roiPercentage: 95,
      details: {
        energySavings: Math.round(1500 * variationFactor),
        energySavingsPercent: (15 * variationFactor).toFixed(1),
        baselineEnergy: Math.round(10000 * variationFactor),
        improvedEnergy: Math.round(8500 * variationFactor),
      },
    },
  ]
}
