export default function EventView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">事件日志</h2>
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-green-400">太阳耀斑爆发</div>
          <div className="text-xs text-gray-300">接下来1小时内能量产量+50%</div>
          <div className="text-xs text-gray-400 mt-1">刚刚发生</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-yellow-400">
            发现外星商队
          </div>
          <div className="text-xs text-gray-300">提供贸易机会</div>
          <div className="text-xs text-gray-400 mt-1">1小时前</div>
        </div>
      </div>
    </div>
  );
}
