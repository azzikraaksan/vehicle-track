"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import VehicleMap from "./VehicleMap";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Vehicle = {
  id: number;
  name: string;
  status: string;
  speed: number;
  updated_at: string;
  latitude: number;
  longitude: number;
};

type Props = {
  vehicles: Vehicle[];
};

export default function VehicleListCard({ vehicles }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigate = useNavigate();
  const bgColors = [
    "bg-red-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-blue-100",
  ];
  const buttonColors = [
    "text-red-500 border-red-500",
    "text-yellow-500 border-yellow-500",
    "text-green-500 border-green-500",
    "text-blue-500 border-blue-500",
  ];

  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 transition-all duration-300">
      {vehicles.map((v, index) => {
        const isHovered = hoveredId === v.id;
        const isAnyHovered = hoveredId !== null;

        return (
          <Card
            key={v.id}
            onMouseEnter={() => setHoveredId(v.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative overflow-hidden transition-all duration-500 rounded-2 gshadow-md
              ${bgColors[index % bgColors.length]} 
              ${
                isHovered
                  ? "xl:w-[355px] h-[180px] sm:w-[250px]"
                  : isAnyHovered
                  ? "xl:w-[120px] h-[180px] sm:w-[70px]"
                  : "xl:w-[180px] xl:h-[180px]"
              }`}
          >
            <CardContent className="h-full w-full p-3 flex items-center justify-center">
              {isHovered ? (
                <div className="flex flex-col justify-center h-[150px] w-full">
                  <VehicleMap
                    lat={v.latitude}
                    lng={v.longitude}
                    name={v.name}
                  />
                  <div className="mt-4 self-start">
                    <Button
                      size="sm"
                      variant="outline"
                      className={buttonColors[index % buttonColors.length]}
                      onClick={() => navigate(`/vehicles/${v.id}`)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              ) : isAnyHovered ? (
                <div className="transform -rotate-90 whitespace-nowrap">
                  <p className="text-lg font-bold">{v.name}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h3 className=" text-sm sm:text-base md:text-base font-bold">
                    {v.name}
                  </h3>
                  <p className="text-[10px] sm:text-sm md:text-sm text-gray-600">Speed: {v.speed} km/h</p>
                  <p className="text-[10px] sm:text-sm md:text-sm text-gray-600">Status: {v.status}</p>
                  <div className="mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className={buttonColors[index % buttonColors.length]}
                      onClick={() => navigate(`/vehicles/${v.id}`)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
