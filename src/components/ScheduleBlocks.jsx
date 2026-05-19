import { useState } from 'react'

export default function ScheduleBlocks({ scheduleBlocks, setScheduleBlocks }) {
  const [blockName, setBlockName] = useState('')
  const [blockTime, setBlockTime] = useState('')

  const handleAddBlock = () => {
    if (blockName.trim() && blockTime.trim()) {
      setScheduleBlocks([
        ...scheduleBlocks,
        {
          id: Date.now(),
          name: blockName,
          time: blockTime
        }
      ])
      setBlockName('')
      setBlockTime('')
    }
  }

  const handleRemoveBlock = (id) => {
    setScheduleBlocks(scheduleBlocks.filter(block => block.id !== id))
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">📅 Fixed Schedule Blocks</h2>
      
      <p className="text-gray-600 text-sm mb-6">
        Add meetings, gym time, or other fixed commitments so we can work around them.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          value={blockName}
          onChange={(e) => setBlockName(e.target.value)}
          placeholder="e.g., Gym, Meeting with Sarah"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        
        <input
          type="text"
          value={blockTime}
          onChange={(e) => setBlockTime(e.target.value)}
          placeholder="e.g., 6:00 PM or 10 AM"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAddBlock}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Add Schedule Block
        </button>
      </div>

      {/* Display schedule blocks */}
      {scheduleBlocks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your schedule:</h3>
          <div className="space-y-2">
            {scheduleBlocks.map((block) => (
              <div
                key={block.id}
                className="flex justify-between items-center bg-green-50 p-3 rounded-lg border-l-4 border-green-400"
              >
                <div>
                  <p className="font-semibold text-gray-800">{block.name}</p>
                  <p className="text-sm text-gray-600">{block.time}</p>
                </div>
                <button
                  onClick={() => handleRemoveBlock(block.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Schedule blocks are optional. Leave empty if you have a flexible day.
        </p>
      </div>
    </div>
  )
}
