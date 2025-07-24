import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useVehicleStore } from "@/store/vehicleStore"
import { Button } from "@/components/ui/button"
import VehicleMap from "@/components/VehicleMap"

export default function VehicleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { selectedVehicle, fetchVehicleDetail, isLoading, error } = useVehicleStore()

  useEffect(() => {
    if (id) fetchVehicleDetail(Number(id))
  }, [id])

  if (isLoading) return <p className="p-6">Loading detail kendaraan...</p>
  if (error) return <p className="p-6 text-destructive">{error}</p>
  if (!selectedVehicle) return <p className="p-6">Tidak ada data kendaraan.</p>

  return (
  <div className="relative w-full h-[610px]">
    <div className="absolute inset-0 z-0 h-[600px] w-full">
      <VehicleMap
        lat={selectedVehicle.latitude}
        lng={selectedVehicle.longitude}
        name={`${selectedVehicle.vehicleId}`}
      />
    </div>
    <div className="absolute top-0 left-0 z-10 p-2 w-full md:w-[350px]">
      <div className="bg-white/50 backdrop-blur-md shadow-xl p-4 rounded-xl">
        <h1 className="text-xl font-bold mb-4">Vehicle Detail</h1>
        <div className="space-y-2 text-sm text-gray-800">
          <p className="text-sm"><span className="font-medium text-sm">Name:</span> {selectedVehicle.name}</p>
          <p className="text-sm"><span className="font-medium text-sm">Speed:</span> {selectedVehicle.speed} km/jam</p>
          <p className="text-sm"><span className="font-medium text-sm">Odometer:</span> {selectedVehicle.odometer.toLocaleString()} km</p>
          <p className="text-sm"><span className="font-medium text-sm">Fuel Level:</span> {selectedVehicle.fuel_level}%</p>
          <p className="text-sm"><span className="font-medium text-sm">Timestamp:</span> {new Date(selectedVehicle.timestamp).toLocaleString()}</p>
          <p className="text-sm"><span className="font-medium text-sm">Location:</span> {selectedVehicle.latitude}, {selectedVehicle.longitude}</p>
        </div>

        <div className="mt-6">
          <Button className="text-blue-600 border-blue-600 bg-white hover:bg-blue-50" onClick={() => navigate(-1)}>← Back</Button>
        </div>
      </div>
    </div>
  </div>
)


}
