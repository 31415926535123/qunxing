"use client";

import { useState } from "react";
import ResourceBar from "@/components/ui/ResourceBar";
import { ResourceManager } from "@/hooks/useResourceManager";
import BackView from "@/components/views/BackView";
import BuildingView from "@/components/views/BuildingView";
import TechView from "@/components/views/TechView";
import FleetView from "@/components/views/FleetView";
import ExplorationView from "@/components/views/ExplorationView";
import EventView from "@/components/views/EventView";
import SidebarNav from "@/components/ui/SidebarNav";
import BottomStatus from "@/components/ui/BottomStatus";
export default function Home() {
  const [currentView, setCurrentView] = useState("back"); // 默认视图
  // 界面切换函数
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  // 根据当前视图渲染内容
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
    <ResourceManager>
      {({ energy, energyProductionRate }) => (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          {/* 顶部资源栏 */}
          <ResourceBar
            energy={energy}
            energyProductionRate={energyProductionRate}
          />

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
      )}
    </ResourceManager>
  );
}
