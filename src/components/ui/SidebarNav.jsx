"use client";

const SidebarNav = ({ currentView, handleViewChange }) => {
  return (
    <div className="w-16 md:w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-4">
      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "back"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("back")}
      >
        <span className="text-xs mt-1">星空</span>
      </button>

      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "building"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("building")}
      >
        <span className="text-xs mt-1">建筑</span>
      </button>

      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "tech"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("tech")}
      >
        <span className="text-xs mt-1">科技</span>
      </button>

      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "fleet"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("fleet")}
      >
        <span className="text-xs mt-1">舰队</span>
      </button>

      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "exploration"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("exploration")}
      >
        <span className="text-xs mt-1">探索</span>
      </button>

      <button
        className={`nav-btn group w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors ${
          currentView === "event"
            ? "bg-blue-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onClick={() => handleViewChange("event")}
      >
        <span className="text-xs mt-1">事件</span>
      </button>
    </div>
  );
};

export default SidebarNav;
