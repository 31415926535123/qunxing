export default function ExplorationView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">星系探索</h2>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 太阳系 */}
          <div className="star-system bg-blue-600 border border-blue-500 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-700">
            <div className="text-lg">☀️</div>
            <div className="text-sm font-medium">太阳系</div>
            <div className="text-xs text-gray-200">已探索</div>
          </div>

          {/* 比邻星 */}
          <div className="star-system bg-orange-600 border border-orange-500 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-700">
            <div className="text-lg">⭐</div>
            <div className="text-sm font-medium">比邻星</div>
            <div className="text-xs text-gray-200">探索中...</div>
          </div>

          {/* 未知星系 */}
          <div className="star-system bg-gray-700 border border-gray-600 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-600">
            <div className="text-lg">❓</div>
            <div className="text-sm font-medium">未知星系</div>
            <div className="text-xs text-gray-400">未探索</div>
          </div>
        </div>
      </div>

      {/* 探索详情 */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-300 mb-3">探索任务</h3>
        <div className="space-y-2">
          <div className="mission-item bg-gray-700 border border-gray-600 rounded p-2">
            <div className="font-medium text-sm">比邻星探索</div>
            <div className="text-xs text-gray-400">预计完成: 2小时</div>
            <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
