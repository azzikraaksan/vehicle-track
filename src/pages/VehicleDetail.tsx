import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVehicleStore } from "@/store/vehicleStore";
import { Button } from "@/components/ui/button";
import VehicleMap from "@/components/VehicleMap";
import LoadingCard from "@/components/LoadingCard";

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedVehicle, fetchVehicleDetail, isLoading, error } =
    useVehicleStore();
  const vehicleInfo = [
    { label: "Name", value: selectedVehicle?.name },
    { label: "Speed", value: `${selectedVehicle?.speed} km/jam` },
    {
      label: "Odometer",
      value: `${selectedVehicle?.odometer.toLocaleString()} km`,
    },
    { label: "Fuel Level", value: `${selectedVehicle?.fuel_level}%` },
    {
      label: "Timestamp",
      value: selectedVehicle?.timestamp
        ? new Date(selectedVehicle.timestamp).toLocaleString()
        : "-",
    },
    {
      label: "Location",
      value: `${selectedVehicle?.latitude}, ${selectedVehicle?.longitude}`,
    },
  ];

  useEffect(() => {
    if (id) fetchVehicleDetail(Number(id));
  }, [id]);

  if (error) return <p className="p-6 text-destructive">{error}</p>;
  if (!selectedVehicle && !isLoading)
    return <p className="p-6">Tidak ada data kendaraan.</p>;

  return (
    <div className="relative w-full h-[610px]">
      <div className="absolute inset-0 z-0 h-[600px] w-full">
        {selectedVehicle && (
          <VehicleMap
            lat={selectedVehicle.latitude}
            lng={selectedVehicle.longitude}
            name={`${selectedVehicle.vehicleId}`}
          />
        )}
      </div>

      <div className="absolute top-0 left-0 z-10 p-2 w-full md:w-[350px]">
        <div className="bg-white/50 backdrop-blur-md shadow-xl p-4 rounded-xl">
          <h3 className="mb-3">Vehicle Detail</h3>

          {isLoading ? (
            <LoadingCard />
          ) : (
            <div className="space-y-2">
              {vehicleInfo.map((item) => (
                <p key={item.label}>
                  <span className="font-medium">{item.label}:</span>{" "}
                  {item.value}
                </p>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Button variant={"primary"} onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
