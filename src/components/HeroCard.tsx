import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

type HeroCardProps = {
  title: string
  value: string | number
  icon: LucideIcon
  valueColor?: string
}

export function HeroCard({ title, value, icon: Icon, valueColor }: HeroCardProps) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold text-gray-800 ${valueColor || ""}`}>{value}</div>
      </CardContent>
    </Card>
  )
}
