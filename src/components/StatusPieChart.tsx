'use client'

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useVehicleStore } from '@/store/vehicleStore'

const COLORS = ['#4AB58E', '#F64E60']

export default function StatusPieChart() {
  const { vehicles } = useVehicleStore()

  const activeCount = vehicles.filter((v) => v.status === 'ACTIVE').length
  const inactiveCount = vehicles.filter((v) => v.status === 'INACTIVE').length

  const data = [
    { name: 'Active', value: activeCount },
    { name: 'Inactive', value: inactiveCount },
  ]

  return (
    <Card className="w-full h-[360px]">
      <CardHeader>
        <CardTitle className='text-lg mt-4'>Vehicle Status</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
