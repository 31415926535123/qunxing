export default function TechView() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">科技树</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 物理学分支 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-3">物理学</h3>
          <div className="space-y-2">
            <div className="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
              <div className="font-medium">基础行星学</div>
              <div className="text-xs text-gray-200">已研究</div>
            </div>
            <div className="tech-node bg-blue-600 border border-blue-500 rounded p-2 text-sm">
              <div className="font-medium">磁约束聚变</div>
              <div className="text-xs text-gray-200">研究中...</div>
            </div>
            <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
              <div className="font-medium">量子计算</div>
              <div className="text-xs text-gray-400">未解锁</div>
            </div>
          </div>
        </div>

        {/* 工程学分支 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-300 mb-3">工程学</h3>
          <div className="space-y-2">
            <div className="tech-node bg-green-600 border border-green-500 rounded p-2 text-sm">
              <div className="font-medium">储能技术</div>
              <div className="text-xs text-gray-200">已研究</div>
            </div>
            <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
              <div className="font-medium">高级冶金学</div>
              <div className="text-xs text-gray-400">未解锁</div>
            </div>
            <div className="tech-node bg-gray-700 border border-gray-600 rounded p-2 text-sm">
              <div className="font-medium">轨道结构</div>
              <div className="text-xs text-gray-400">未解锁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
