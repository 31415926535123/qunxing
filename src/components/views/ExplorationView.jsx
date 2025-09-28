export default function ExplorationView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">星系探索</h2>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 太阳系 */}
          <div className="star-system bg-blue-600 border border-blue-500 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-700">
            <div className="text-sm font-medium">太阳系</div>
          </div>
        </div>
      </div>

      {/* 探索详情 */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-300 mb-3">探索任务</h3>
      </div>
    </div>
  );
}
