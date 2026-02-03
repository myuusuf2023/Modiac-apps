import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { countries, getCountryData } from './data/mockData'
import DownloadButton from './components/DownloadButton'
import { exportCompleteData } from './utils/downloadUtils'

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'text-white shadow-md'}`} style={{ backgroundColor: isDarkMode ? '' : '#034930' }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="border-2 border-yellow-500 rounded px-3 py-2">
                <div className="text-center">
                  <div className="text-xs font-semibold text-yellow-500 tracking-wider">EAST AFRICA</div>
                  <div className="text-sm font-bold text-yellow-500 tracking-wide">MOBILITY</div>
                  <div className="text-xs font-semibold text-yellow-500 tracking-wider">WATCH</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              {/* Home Button */}
              <button className="text-white hover:text-yellow-500 transition-colors font-medium text-sm">
                HOME
              </button>

              {/* Map Viewer Button */}
              <button
                className="px-6 py-2 rounded-md font-semibold text-sm transition-all hover:bg-yellow-600"
                style={{ backgroundColor: '#f59e0b', color: '#000' }}
              >
                MAPVIEWER
              </button>

              {/* Last Updated */}
              <div className="text-right text-xs">
                <div className="text-gray-300">Last Updated</div>
                <div className="font-semibold">{lastUpdated.toLocaleString()}</div>
              </div>

              {/* Global Download Button */}
              <DownloadButton
                data={getCountryData(selectedCountry)}
                filename="complete-dashboard-data"
                formats={['json', 'csv', 'pdf']}
                selectedCountry={selectedCountry}
                variant="text"
                onDownload={(format) => {
                  const data = getCountryData(selectedCountry);
                  exportCompleteData(data, selectedCountry, format);
                }}
              />

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-green-600'}`}
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
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-green-600'}`}
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
                className={`block w-full px-4 py-2 border rounded-md focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-green-600'}`}
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
                className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-400 transition-colors text-white`}
                style={{
                  backgroundColor: isUpdating ? '' : (isDarkMode ? '#045c3a' : '#034930'),
                  focusRingColor: '#034930'
                }}
                onMouseEnter={(e) => !isUpdating && (e.target.style.backgroundColor = '#045c3a')}
                onMouseLeave={(e) => !isUpdating && (e.target.style.backgroundColor = isDarkMode ? '#045c3a' : '#034930')}
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
                    ? `${isDarkMode ? 'bg-gray-700 text-white' : 'text-white'} border-b-2`
                    : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`
                }`}
                style={activeTab === tab.id ? {
                  backgroundColor: isDarkMode ? '' : '#034930',
                  borderBottomColor: '#034930'
                } : {}}
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
