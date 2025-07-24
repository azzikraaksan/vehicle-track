import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import VehicleDetail from "./pages/VehicleDetail";
import VehiclesList from "./pages/VehiclesList";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/SideBar";
import { RxHamburgerMenu } from "react-icons/rx";

export default function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar isOpen={sideBarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-4">
          <button
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {sideBarOpen ? <RxHamburgerMenu /> : <RxHamburgerMenu />}
          </button>
        </div>
        <main className="flex-1 overflow-y-auto px-6 pb-10 bg-[#FAFBFC]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<VehiclesList />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
