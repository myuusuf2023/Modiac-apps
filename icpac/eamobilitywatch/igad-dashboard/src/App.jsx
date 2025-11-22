import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { countries } from './data/mockData'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('ALL')
  const [activeTab, setActiveTab] = useState('overview')
  const [timePeriod, setTimePeriod] = useState('2015-2024')
  const [displacementType, setDisplacementType] = useState('all')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'trends', name: 'Trends' },
    { id: 'countries', name: 'Countries' },
    { id: 'mobility', name: 'Mobility' },
    { id: 'projections', name: 'Projections' }
  ]

  const applyFilters = () => {
    setIsUpdating(true)
    setTimeout(() => setIsUpdating(false), 500)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-50 to-green-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">East Africa Mobility Watch</h1>
              <p className="text-sm mt-2">
                Real-time monitoring of human mobility and displacement patterns in the context of climate change across the IGAD region
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Last Updated */}
              <div className="text-right text-xs">
                <div className="text-gray-300">Last Updated</div>
                <div className="font-semibold">{lastUpdated.toLocaleString()}</div>
              </div>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Country Selector & Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md p-6`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Country Selector */}
            <div>
              <label htmlFor="country-select" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Select Country/Region
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Period Filter */}
            <div>
              <label htmlFor="time-period" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Time Period
              </label>
              <select
                id="time-period"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="2015-2024">2015-2024 (10 Years)</option>
                <option value="2020-2024">2020-2024 (5 Years)</option>
                <option value="2023-2024">2023-2024 (2 Years)</option>
                <option value="2024">2024 (Current Year)</option>
              </select>
            </div>

            {/* Displacement Type Filter */}
            <div>
              <label htmlFor="displacement-type" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Displacement Type
              </label>
              <select
                id="displacement-type"
                value={displacementType}
                onChange={(e) => setDisplacementType(e.target.value)}
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="all">All Types</option>
                <option value="climate">Climate-Induced Only</option>
                <option value="conflict">Conflict-Related Only</option>
                <option value="drought">Drought Only</option>
                <option value="flood">Flood Only</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="flex items-end">
              <button
                onClick={applyFilters}
                disabled={isUpdating}
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isUpdating ? 'Updating...' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-lg shadow-md`}>
          <div className={`flex ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'} border-b-2 border-blue-600`
                    : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <Dashboard
        countryCode={selectedCountry}
        activeTab={activeTab}
        timePeriod={timePeriod}
        displacementType={displacementType}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

export default App
