export type Vehicle = {
  id: number
  name: string
  status: string
  speed: number
  updated_at: string
}

export type VehicleDetail = Vehicle & {
  vehicleId: number
  odometer: number
  fuel_level: number
  timestamp: string
  latitude: number
  longitude: number
}
