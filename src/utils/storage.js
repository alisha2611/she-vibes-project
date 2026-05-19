// Save data to localStorage
export function saveToLocalStorage(data) {
  try {
    localStorage.setItem('smartTaskPlannerData', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Load data from localStorage
export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('smartTaskPlannerData')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}
