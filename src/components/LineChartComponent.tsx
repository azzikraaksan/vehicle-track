import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  vehicleDetails: {
    vehicleId: number;
    speed: number;
    timestamp: string;
  }[];
};

export default function LineChartComponent({ vehicleDetails }: Props) {
  const chartData = vehicleDetails.map((v) => ({
    name: new Date(v.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: v.speed,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
          Vehicle Speed Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData} margin={{ left: 20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis unit=" km/h" tick={{ fontSize: 12 }} />

            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#A700FF"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
