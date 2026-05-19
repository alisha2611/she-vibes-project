export default function EnergySelector({ energy, setEnergy, darkMode }) {
  const energyLabels = {
    1: '😴 Exhausted',
    2: '😟 Low Energy',
    3: '😊 Normal',
    4: '⚡ High Energy',
    5: '🔥 Peak Focus'
  }

  return (
    <div className={`rounded-xl p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        ⚡ How's your energy today?
      </h2>
      
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        This helps us plan realistic work blocks and protect your time.
      </p>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((level) => (
          <label
            key={level}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              energy === level
                ? darkMode
                  ? 'bg-blue-900 border-blue-500'
                  : 'bg-blue-100 border-blue-500'
                : darkMode
                ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                : 'bg-gray-50 border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              name="energy"
              value={level}
              checked={energy === level}
              onChange={() => setEnergy(level)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className={`ml-4 text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {level} - {energyLabels[level]}
            </span>
          </label>
        ))}
      </div>

      <div className={`mt-6 p-4 rounded-lg border-l-4 ${
        darkMode
          ? 'bg-purple-900 border-purple-400 text-purple-100'
          : 'bg-purple-50 border-purple-400 text-gray-700'
      }`}>
        <p className="text-sm">
          <strong>Tip:</strong> Low energy days activate "Minimum Viable Day" mode—we'll focus on essentials only.
        </p>
      </div>
    </div>
  )
}
