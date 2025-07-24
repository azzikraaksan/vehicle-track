import { Card, CardContent } from "@/components/ui/card";
import StatusPieChart from "@/components/StatusPieChart";
import VehicleListCard from "@/components/VehicleListCard";
import LineChartComponent from "@/components/LineChartComponent";
import BarChartComponent from "@/components/BarChartComponent";
import { useVehicleStore } from "@/store/vehicleStore";
import { useState, useEffect } from "react";
import { getVehicleDetail } from "@/lib/vehicleApi";
import type { VehicleDetail } from "@/types/vehicle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { vehicles, fetchVehicles } = useVehicleStore();
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const barChartData = [
    {
      name: "Active",
      value: vehicles.filter((v) => v.status === "ACTIVE").length,
    },
    {
      name: "Inactive",
      value: vehicles.filter((v) => v.status === "INACTIVE").length,
    },
  ];

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (vehicles.length === 0) return;
        setIsLoading(true);
        const detailPromises = vehicles.map((v) => getVehicleDetail(v.id));
        const details = await Promise.all(detailPromises);
        setVehicleDetails(details);
      } catch (err) {
        console.error("Failed to fetch vehicle details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [vehicles]);

  return (
  <div className="w-full overflow-x-hidden p-6 space-y-6">
    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Dashboard</h1>

    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg animate-pulse">Loading vehicle dashboard...</div>
      </div>
    ) : (
      <>
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <Card className="bg-white shadow-sm rounded-xl p-4 w-full lg:w-[845px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 mb-2 mt-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Activities</h2>
              <div className="mb-4 mr-4">
                <Link to="/vehicles">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    View Full List
                  </Button>
                </Link>
              </div>
            </div>

            <p className="px-4 text-base sm:text-base text-gray-700">Preview List</p>

            <CardContent className="p-4 flex justify-center">
              <VehicleListCard
                vehicles={vehicleDetails
                  .filter((v) => vehicles.find((veh) => veh.id === v.vehicleId))
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 4)
                  .map((v) => ({
                    id: v.vehicleId,
                    name:
                      vehicles.find((veh) => veh.id === v.vehicleId)?.name ||
                      `Vehicle ${v.vehicleId}`,
                    status: vehicles.find((veh) => veh.id === v.vehicleId)?.status || "",
                    speed: v.speed,
                    updated_at: v.timestamp,
                    latitude: v.latitude,
                    longitude: v.longitude,
                  }))}
              />
            </CardContent>
          </Card>

          <div className="w-full">
            <StatusPieChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LineChartComponent vehicleDetails={vehicleDetails} />
          <BarChartComponent data={barChartData} />
        </div>
      </>
    )}
  </div>
);

}
