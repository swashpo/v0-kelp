export interface RecommendationType {
  title: string
  description: string
  category: string
  annualSavings: number
  implementationCost: number
  paybackPeriod: number
  roiPercentage: number
  details?: {
    energySavings?: number
    energySavingsPercent?: string
    baselineEnergy?: number
    improvedEnergy?: number
  }
}
