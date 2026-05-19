export default function Reflection({ reflection, setReflection, darkMode }) {
  return (
    <div className={`rounded-xl p-8 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        🤔 End of Day Reflection
      </h2>
      
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        What got pushed to another day? This helps us learn what's realistic for you.
      </p>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="E.g., 'Pushed the design work to tomorrow. Running low on energy by 4 PM. Need to schedule better breaks.'"
        className={`w-full h-24 p-4 border-2 rounded-lg focus:outline-none focus:border-purple-500 resize-none ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'border-gray-300'
        }`}
      />

      <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        💡 Your reflection helps us adapt future plans to your real rhythm.
      </p>

      <div className={`mt-6 p-4 rounded-lg border-l-4 ${
        darkMode
          ? 'bg-purple-900 border-purple-400'
          : 'bg-purple-50 border-purple-400'
      }`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-purple-100' : 'text-gray-800'}`}>
          Quick wins from today:
        </h3>
        <ul className={`text-sm space-y-1 ${darkMode ? 'text-purple-100' : 'text-gray-700'}`}>
          <li>✨ You're learning your real capacity</li>
          <li>✨ Honesty about pushed tasks is progress</li>
          <li>✨ Every day gets easier to plan</li>
        </ul>
      </div>
    </div>
  )
}
