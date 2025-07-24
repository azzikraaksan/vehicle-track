import { api } from './api'
import type { Vehicle, VehicleDetail } from '@/types/vehicle'

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await api.get('/vehicles.json')
  return res.data
}

export const getVehicleDetail = async (id: number): Promise<VehicleDetail> => {
  const res = await api.get(`/vehicles-details/${id}.json`)
  return res.data
}