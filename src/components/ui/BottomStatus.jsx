export default function BottomStatus() {
  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-4">
          <span>宇宙历 元年</span>
          <span className="text-blue-400">正在研究: 无</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-400">警报: 无</span>
          <span>在线</span>
        </div>
      </div>
    </div>
  );
}
