import { useEffect } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import asset2 from "../assets/asset2.png";
import LoadingCard from "@/components/LoadingCard";

export default function VehiclesList() {
  const navigate = useNavigate();
  const { vehicles, fetchVehicles, isLoading, error } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1>Vehicle List</h1>

      {error && <p className="text-destructive">{error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(3)].map((_, index) => <LoadingCard key={index} />)
          : vehicles.map((v) => (
              <Card
                key={v.id}
                className="relative p-4 space-y-2 overflow-hidden bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.09] hover:bg-blue-200"
              >
                <img
                  src={asset2}
                  alt=""
                  className="absolute top-0 -right-10 w-32 md:w-40 max-w-full z-0 opacity-100 pointer-events-none select-none translate-x-1/4 -translate-y-1/4 md:translate-x-0 md:-translate-y-20"
                />

                <div className="relative z-10 space-y-1">
                  <h2>{v.name}</h2>
                  <h4>
                    Status:{" "}
                    <span>{v.status}</span>
                  </h4>
                  <h4>Speed: {v.speed} km/jam</h4>
                  <p>
                    Last update: {new Date(v.updated_at).toLocaleString()}
                  </p>
                  <Button variant="primary" onClick={() => navigate(`/vehicles/${v.id}`)}>
                    Detail
                  </Button>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}
