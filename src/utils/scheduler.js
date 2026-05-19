// Core scheduling algorithm
export function generatePlan(tasks, energy, scheduleBlocks) {
  if (tasks.length === 0) {
    return []
  }

  // Parse tasks from messy input
  const parsedTasks = tasks.map((task, index) => ({
    id: Date.now() + index,
    title: task,
    energy: getEnergyRequirement(task),
    importance: getImportance(task),
    urgency: getUrgency(task),
    duration: estimateDuration(task),
    status: 'pending',
    scheduledTime: null
  }))

  // Sort tasks based on energy level
  const sortedTasks = sortTasksByEnergy(parsedTasks, energy)

  // If low energy, activate minimum viable day mode
  if (energy <= 2) {
    return applyMinimumViableDay(sortedTasks)
  }

  // Schedule with buffers and deep work limits
  return scheduleWithBuffers(sortedTasks, scheduleBlocks, energy)
}

// Estimate task duration (in minutes)
function estimateDuration(task) {
  const task_lower = task.toLowerCase()
  if (task_lower.includes('meeting') || task_lower.includes('call')) return 30
  if (task_lower.includes('email') || task_lower.includes('reply')) return 15
  if (task_lower.includes('grocery') || task_lower.includes('shopping')) return 45
  if (task_lower.includes('exercise') || task_lower.includes('gym')) return 60
  return 25 // default pomodoro
}

// Determine energy requirement (low, medium, high)
function getEnergyRequirement(task) {
  const task_lower = task.toLowerCase()
  
  // High energy tasks
  if (task_lower.includes('code') || 
      task_lower.includes('write') || 
      task_lower.includes('design') ||
      task_lower.includes('deep work') ||
      task_lower.includes('focus')) {
    return 'high'
  }
  
  // Low energy tasks
  if (task_lower.includes('email') || 
      task_lower.includes('reply') ||
      task_lower.includes('check') ||
      task_lower.includes('respond')) {
    return 'low'
  }
  
  return 'medium'
}

// Determine importance
function getImportance(task) {
  const task_lower = task.toLowerCase()
  if (task_lower.includes('urgent') || 
      task_lower.includes('important') ||
      task_lower.includes('must') ||
      task_lower.includes('critical')) {
    return 'high'
  }
  if (task_lower.includes('maybe') || 
      task_lower.includes('optional') ||
      task_lower.includes('nice to')) {
    return 'low'
  }
  return 'medium'
}

// Determine urgency
function getUrgency(task) {
  const task_lower = task.toLowerCase()
  if (task_lower.includes('today') || 
      task_lower.includes('asap') ||
      task_lower.includes('deadline') ||
      task_lower.includes('urgent')) {
    return 'high'
  }
  if (task_lower.includes('later') || 
      task_lower.includes('tomorrow') ||
      task_lower.includes('whenever')) {
    return 'low'
  }
  return 'medium'
}

// Sort tasks by energy level
function sortTasksByEnergy(tasks, energy) {
  const energyScore = (task) => {
    const scores = { low: 3, medium: 2, high: 1 }
    const baseScore = scores[task.energy] || 2
    
    // Boost urgency
    if (task.urgency === 'high') return baseScore - 1
    return baseScore
  }

  return [...tasks].sort((a, b) => energyScore(a) - energyScore(b))
}

// Schedule tasks with 10-15 minute buffers
function scheduleWithBuffers(tasks, scheduleBlocks, energy) {
  const scheduledTasks = []
  let deepWorkCount = 0
  const maxDeepWork = energy >= 4 ? 3 : 2

  // Get occupied times from schedule blocks
  const occupiedTimes = scheduleBlocks.map(block => block.time)

  for (const task of tasks) {
    // Don't add more than max deep work blocks
    if (task.energy === 'high' && deepWorkCount >= maxDeepWork) {
      continue
    }

    if (task.energy === 'high') {
      deepWorkCount++
    }

    // Find next available time slot
    let scheduledTime = findNextTimeSlot(occupiedTimes, task.duration)

    scheduledTasks.push({
      ...task,
      scheduledTime
    })

    occupiedTimes.push(scheduledTime)
  }

  return scheduledTasks
}

// Minimum viable day mode (energy <= 2)
function applyMinimumViableDay(tasks) {
  // Keep only high urgency + high importance tasks
  const essentialTasks = tasks.filter(task => 
    task.urgency === 'high' && task.importance === 'high'
  )

  // If none, take top 2-3
  if (essentialTasks.length === 0) {
    return tasks.slice(0, 3).map(task => ({
      ...task,
      status: 'pending'
    }))
  }

  return essentialTasks.slice(0, 3).map(task => ({
    ...task,
    status: 'pending'
  }))
}

// Simple time slot finder
function findNextTimeSlot(occupiedTimes, duration) {
  // Default: morning focus time
  return '9:00 AM'
}
