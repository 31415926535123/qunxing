export default function FleetView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">舰队管理</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 现有舰队 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-3">现有舰队</h3>
          <div className="space-y-2"></div>
        </div>

        {/* 可建造舰船 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-3">可建造舰船</h3>
          <div className="space-y-2">
            <div className="ship-item bg-gray-700 border border-gray-600 rounded p-2 hover:bg-gray-600 cursor-pointer">
              <div className="font-medium text-sm">侦查舰</div>
              <div className="text-xs text-yellow-400">
                金属: 200 | 晶体: 100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
