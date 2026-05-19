import { useState } from 'react'

export default function TaskInput({ tasks, setTasks, scheduleBlocks, setScheduleBlocks, darkMode }) {
  const [input, setInput] = useState('')
  const [blockName, setBlockName] = useState('')
  const [blockTime, setBlockTime] = useState('')

  const handleAddTasks = () => {
    if (input.trim()) {
      // Split by comma, newline, or bullet points
      const newTasks = input
        .split(/[,\n•]/)
        .map(task => task.trim())
        .filter(task => task.length > 0)
      
      setTasks([...tasks, ...newTasks])
      setInput('')
    }
  }

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

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
    <div className={`rounded-xl p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        📝 What needs to get done?
      </h2>
      
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Type your tasks however they come to mind. Separate with commas or line breaks. Be messy—we'll organize it!
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Example: finish portfolio, grocery shopping, reply to Sarah, deep work on project..."
        className={`w-full h-48 p-4 border-2 rounded-lg focus:outline-none focus:border-blue-500 resize-none ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'border-gray-300 text-gray-900'
        }`}
      />

      <button
        onClick={handleAddTasks}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
      >
        Add Tasks
      </button>

      {/* Display added tasks */}
      {tasks.length > 0 && (
        <div className="mt-8">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your tasks ({tasks.length}):
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-blue-50 text-gray-800'
                }`}
              >
                <span>{task}</span>
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="text-red-500 hover:text-red-700 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Schedule Blocks as a subsection with tip */}
      <div className={`mt-8 p-6 rounded-lg border-2 ${
        darkMode 
          ? 'bg-gray-700 border-gray-600' 
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              💡 Tip: Add fixed schedule blocks
            </h3>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Add meetings, gym time, or other commitments we need to work around. (Optional—leave empty for a flexible day)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
            placeholder="e.g., Gym, Meeting with Sarah"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-green-500 ${
              darkMode 
                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                : 'border-gray-300'
            }`}
          />
          
          <input
            type="text"
            value={blockTime}
            onChange={(e) => setBlockTime(e.target.value)}
            placeholder="e.g., 6:00 PM or 10 AM"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-green-500 ${
              darkMode 
                ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                : 'border-gray-300'
            }`}
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
          <div className="mt-4 space-y-2">
            {scheduleBlocks.map((block) => (
              <div
                key={block.id}
                className={`flex justify-between items-center p-3 rounded-lg border-l-4 ${
                  darkMode 
                    ? 'bg-gray-600 border-green-400 text-white' 
                    : 'bg-green-100 border-green-400'
                }`}
              >
                <div>
                  <p className="font-semibold">{block.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {block.time}
                  </p>
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
        )}
      </div>
    </div>
  )
}
