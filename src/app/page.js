"use client";

import { useState } from "react";
import ResourceBar from "@/components/ui/ResourceBar";
import { EnergyProvider, useEnergy } from "@/hooks/useEnergyManager";
import { EnergyPersistence } from "@/components/EnergyPersistence";
import BackView from "@/components/views/BackView";
import BuildingView from "@/components/views/BuildingView";
import TechView from "@/components/views/TechView";
import FleetView from "@/components/views/FleetView";
import ExplorationView from "@/components/views/ExplorationView";
import EventView from "@/components/views/EventView";
import SidebarNav from "@/components/ui/SidebarNav";
import BottomStatus from "@/components/ui/BottomStatus";

// 游戏主组件 - 使用 Context 而不是包装器
function GameMain() {
  const { energy, productionRate } = useEnergy();
  const [currentView, setCurrentView] = useState("back");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case "back":
        return <BackView />;
      case "building":
        return <BuildingView />;
      case "tech":
        return <TechView />;
      case "fleet":
        return <FleetView />;
      case "exploration":
        return <ExplorationView />;
      case "event":
        return <EventView />;
      default:
        return;
    }
  };

  return (
    <>
      {/* 持久化组件 - 不渲染任何内容，只处理副作用 */}
      <EnergyPersistence />

      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        {/* 顶部资源栏 */}
        <ResourceBar energy={energy} energyProductionRate={productionRate} />

        {/* 主要内容区域 */}
        <div className="flex flex-1 min-h-0">
          {/* 侧边栏导航 */}
          <SidebarNav
            currentView={currentView}
            handleViewChange={handleViewChange}
          />

          {/* 主工作区 */}
          <div className="flex-1 bg-gray-850 p-4 overflow-auto min-w-0">
            {renderMainContent()}
          </div>
        </div>

        {/* 底部状态栏 */}
        <BottomStatus />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <EnergyProvider>
      <GameMain />
    </EnergyProvider>
  );
}
