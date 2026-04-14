"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsChartProps {
  type: "line" | "bar" | "area"
  data: any[]
  dataKey: string
  title?: string
  height?: number
  color?: string
}

export function AnalyticsChart({ type, data, dataKey, title, height = 300, color = "#3b82f6" }: AnalyticsChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {(() => {
            if (type === "line") return (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke={color} />
              </LineChart>
            )
            if (type === "bar") return (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill={color} />
              </BarChart>
            )
            if (type === "area") return (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey={dataKey} fill={color} stroke={color} />
              </AreaChart>
            )
            return <></>
          })()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
