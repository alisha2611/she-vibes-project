export default function PlannedTasks({ plannedTasks, setPlannedTasks, darkMode }) {
  const handleStatusChange = (taskId, newStatus) => {
    setPlannedTasks(
      plannedTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⭕',
      complete: '✅',
      parked: '🅿️',
      skipped: '⏭️'
    }
    return icons[status] || '⭕'
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-300',
      complete: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-300',
      parked: darkMode ? 'bg-orange-900 border-orange-700' : 'bg-orange-50 border-orange-300',
      skipped: darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
    }
    return colors[status] || (darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300')
  }

  const getEnergyBadge = (energy) => {
    const badges = {
      low: darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      medium: darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      high: darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
    }
    return badges[energy] || (darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800')
  }

  const completedCount = plannedTasks.filter(t => t.status === 'complete').length
  const totalTasks = plannedTasks.length

  return (
    <div className={`rounded-xl p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mb-6">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          ✅ Your Planned Day
        </h2>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
          ></div>
        </div>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {completedCount} of {totalTasks} completed
        </p>
      </div>

      {plannedTasks.length === 0 ? (
        <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No tasks planned for today. Great job keeping it realistic! 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {plannedTasks.map((task) => (
            <div
              key={task.id}
              className={`border-2 rounded-lg p-4 transition-all ${getStatusColor(task.status)}`}
            >
              <div className="flex items-start gap-4">
                {/* Status selector */}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`text-2xl bg-transparent cursor-pointer focus:outline-none ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <option value="pending">⭕</option>
                  <option value="complete">✅</option>
                  <option value="parked">🅿️</option>
                  <option value="skipped">⏭️</option>
                </select>

                {/* Task content */}
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    task.status === 'complete' 
                      ? darkMode 
                        ? 'line-through text-gray-500' 
                        : 'line-through text-gray-500'
                      : darkMode
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {/* Duration badge */}
                    <span className={`text-xs px-2 py-1 rounded border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300'
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}>
                      ⏱️ {task.duration} min
                    </span>

                    {/* Energy badge */}
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getEnergyBadge(task.energy)}`}>
                      {task.energy === 'low' && '🔋 Low'}
                      {task.energy === 'medium' && '⚡ Medium'}
                      {task.energy === 'high' && '🔥 High'}
                    </span>

                    {/* Importance badge */}
                    <span className={`text-xs px-2 py-1 rounded border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-300'
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}>
                      {task.importance === 'high' && '🔴 Important'}
                      {task.importance === 'medium' && '🟡 Medium'}
                      {task.importance === 'low' && '🟢 Low'}
                    </span>

                    {/* Scheduled time */}
                    {task.scheduledTime && (
                      <span className={`text-xs px-2 py-1 rounded border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-300'
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}>
                        🕐 {task.scheduledTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status descriptions */}
              <div className={`text-xs mt-2 ml-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.status === 'pending' && 'Ready to do'}
                {task.status === 'complete' && 'Nice work! 🎉'}
                {task.status === 'parked' && 'Saved for later'}
                {task.status === 'skipped' && 'Not doing today'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Click any emoji to change status:
        </p>
        <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>⭕ Pending = Not started yet</p>
          <p>✅ Complete = Done! Mark it here</p>
          <p>🅿️ Parked = Saving for another day</p>
          <p>⏭️ Skipped = Not doing it</p>
        </div>
      </div>
    </div>
  )
}
