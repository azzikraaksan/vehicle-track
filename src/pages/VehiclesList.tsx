import { useEffect } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import asset2 from "../assets/asset2.png";

export default function VehiclesList() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, isLoading, error } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Vehicle List</h1>

      {isLoading && <p className="text-muted-foreground">Loading data...</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <Card
            key={v.id}
            className="relative p-4 space-y-2 overflow-hidden bg-white shadow-md"
          >
            <img
              src={asset2}
              alt=""
              className="absolute -top-20 -right-10 w-40 pointer-events-none select-none"
            />
            <h2 className="text-gray-800 text-lg font-semibold">{v.name}</h2>
            <p>
              Status:{" "}
              <span className="text-gray-800 font-medium">{v.status}</span>
            </p>
            <p className="text-gray-800">Speed: {v.speed} km/jam</p>
            <p className="text-gray-800 text-sm text-muted-foreground">
              Last update: {new Date(v.updated_at).toLocaleString()}
            </p>
            <Button
              className="text-blue-600 border-blue-600 bg-white hover:bg-blue-50"
              onClick={() => navigate(`/vehicles/${v.id}`)}
            >
              Detail
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
