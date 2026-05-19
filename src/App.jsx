import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import EnergySelector from './components/EnergySelector'
import PlannedTasks from './components/PlannedTasks'
import Reflection from './components/Reflection'
import { generatePlan } from './utils/scheduler'
import { loadFromLocalStorage, saveToLocalStorage } from './utils/storage'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [energy, setEnergy] = useState(3)
  const [scheduleBlocks, setScheduleBlocks] = useState([])
  const [plannedTasks, setPlannedTasks] = useState([])
  const [hasPlanned, setHasPlanned] = useState(false)
  const [reflection, setReflection] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage()
    if (saved) {
      setTasks(saved.tasks || [])
      setEnergy(saved.energy || 3)
      setScheduleBlocks(saved.scheduleBlocks || [])
      setPlannedTasks(saved.plannedTasks || [])
      setReflection(saved.reflection || '')
    }
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('smartTaskPlannerDarkMode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage({
      tasks,
      energy,
      scheduleBlocks,
      plannedTasks,
      reflection
    })
  }, [tasks, energy, scheduleBlocks, plannedTasks, reflection])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('smartTaskPlannerDarkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handlePlanDay = () => {
    const plan = generatePlan(tasks, energy, scheduleBlocks)
    setPlannedTasks(plan)
    setHasPlanned(true)
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="w-full">
        {/* Header with dark mode toggle */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Smart Task Planner
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Plan your day based on your energy level
              </p>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-6 px-6 py-3 rounded-lg font-semibold transition-all ${
                darkMode
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {!hasPlanned ? (
          // Input Section - Full Width
          <div className="max-w-5xl mx-auto space-y-6">
            <TaskInput 
              tasks={tasks} 
              setTasks={setTasks} 
              scheduleBlocks={scheduleBlocks}
              setScheduleBlocks={setScheduleBlocks}
              darkMode={darkMode}
            />
            <EnergySelector energy={energy} setEnergy={setEnergy} darkMode={darkMode} />
            
            <button
              onClick={handlePlanDay}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              Plan My Day
            </button>
          </div>
        ) : (
          // Output Section
          <div className="max-w-5xl mx-auto space-y-6">
            <PlannedTasks plannedTasks={plannedTasks} setPlannedTasks={setPlannedTasks} darkMode={darkMode} />
            <Reflection reflection={reflection} setReflection={setReflection} darkMode={darkMode} />
            
            <button
              onClick={() => setHasPlanned(false)}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Edit Plan
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
