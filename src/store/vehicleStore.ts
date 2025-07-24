import { create } from 'zustand'
import { getVehicles } from '@/lib/vehicleApi'
import type { Vehicle, VehicleDetail } from '@/types/vehicle'
import { getVehicleDetail } from '@/lib/vehicleApi'

type VehicleStore = {
  vehicles: Vehicle[]
  isLoading: boolean
  error: string | null
  fetchVehicles: () => Promise<void>
  selectedVehicle: VehicleDetail | null 
  fetchVehicleDetail: (id: number) => Promise<void>
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  isLoading: false,
  error: null,
  fetchVehicles: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await getVehicles()
      set({ vehicles: data, isLoading: false })
    } catch (err) {
      set({ error: 'Failed to fetch vehicle data', isLoading: false })
    }
  },
  selectedVehicle: null,
  fetchVehicleDetail: async (id: number) => {
  try {
    set({ isLoading: true, error: null })
    const detail = await getVehicleDetail(id)
    const vehicles = useVehicleStore.getState().vehicles
    const vehicleData = vehicles.find(v => v.id === id)
    const combined = {
      ...detail,
      name: vehicleData?.name || 'Nama tidak ditemukan',
      status: vehicleData?.status || 'UNKNOWN',
    }

    set({ selectedVehicle: combined, isLoading: false })
  } catch (err) {
    set({ error: 'Failed to fetch vehicle details', isLoading: false })
  }
}

}))
