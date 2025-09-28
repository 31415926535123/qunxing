export default function BuildingView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">行星视图</h2>

      {/* 行星网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {/* 建筑槽位 */}
        <div className="building-slot bg-gray-700 border border-gray-600 rounded-lg p-3 text-center">
          <div className="text-sm font-medium">金属矿场</div>
          <div className="text-xs text-gray-400">Lv.1</div>
        </div>
      </div>

      {/* 建造列表 */}
      <h3 className="text-lg font-semibold mb-3 text-gray-300">可建造建筑</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>

      <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-600 transition-colors cursor-pointer">
        <div className="flex-1">
          <div className="font-medium">合金冶炼厂</div>
          <div className="text-xs text-gray-400">生产合金</div>
          <div className="text-xs text-yellow-400 mt-1">
            金属: 800 | 能量: 300
          </div>
        </div>
      </div>
    </div>
  );
}
