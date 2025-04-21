"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export default function SavingsChart() {
  const data = [
    {
      name: "Current",
      energy: 120000,
      cost: 24000,
    },
    {
      name: "After LED Lighting",
      energy: 102000,
      cost: 20400,
    },
    {
      name: "After Insulation",
      energy: 91800,
      cost: 18360,
    },
    {
      name: "After HVAC Upgrades",
      energy: 85374,
      cost: 17075,
    },
    {
      name: "All Improvements",
      energy: 78000,
      cost: 15600,
    },
  ]

  return (
    <ChartContainer
      config={{
        energy: {
          label: "Energy Usage (kWh)",
          color: "hsl(var(--chart-1))",
        },
        cost: {
          label: "Annual Cost ($)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="var(--color-energy)" />
          <YAxis yAxisId="right" orientation="right" stroke="var(--color-cost)" />
          <Tooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `${value} Scenario`}
                formatter={(value, name) => {
                  if (name === "energy") {
                    return [`${value.toLocaleString()} kWh`, "Energy Usage"]
                  }
                  return [`$${value.toLocaleString()}`, "Annual Cost"]
                }}
              />
            }
          />
          <Legend />
          <Bar yAxisId="left" dataKey="energy" fill="var(--color-energy)" />
          <Bar yAxisId="right" dataKey="cost" fill="var(--color-cost)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
