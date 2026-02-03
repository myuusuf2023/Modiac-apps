import { useRef } from 'react';
import { getCountryData } from '../data/mockData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import DownloadButton from './DownloadButton';
import {
  downloadCSV,
  downloadJSON,
  prepareSummaryStats,
  generateFilename
} from '../utils/downloadUtils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard({ countryCode, activeTab, isDarkMode }) {
  const data = getCountryData(countryCode);

  // Refs for chart downloads
  const pieChartRef = useRef(null);
  const climateVsConflictRef = useRef(null);
  const quarterlyChartRef = useRef(null);
  const trendsAreaChartRef = useRef(null);
  const climateLineChartRef = useRef(null);
  const conflictLineChartRef = useRef(null);
  const countryComparisonRef = useRef(null);
  const mobilityTableRef = useRef(null);
  const mobilityBarChartRef = useRef(null);
  const projectionsChartRef = useRef(null);
  const detailedQuarterlyChartRef = useRef(null);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Summary Statistics</h3>
        <DownloadButton
          data={prepareSummaryStats(data)}
          filename="summary-statistics"
          formats={['csv', 'json', 'pdf']}
          selectedCountry={countryCode}
          variant="icon"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <div className="text-sm text-gray-600">Total Displaced</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {formatNumber(data.totalDisplaced)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Cumulative figure</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
          <div className="text-sm text-gray-600">Total IDPs</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {formatNumber(data.totalIDPs)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Currently displaced</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
          <div className="text-sm text-gray-600">Climate-Induced</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {formatNumber(data.climateDisplaced)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Climate-related</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
          <div className="text-sm text-gray-600">Returns</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {formatNumber(data.returnees)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Returned home</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Displacement by Cause - Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6" ref={pieChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Displacement by Cause (2024)</h3>
            <DownloadButton
              data={data.displacementByCause}
              filename="displacement-by-cause"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={pieChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.displacementByCause}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.displacementByCause.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatNumber(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend - Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6" ref={climateVsConflictRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Climate vs Conflict Displacement</h3>
            <DownloadButton
              data={data.monthlyTrend}
              filename="climate-vs-conflict"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={climateVsConflictRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="climate" stroke="#8b5cf6" strokeWidth={2} name="Climate-Induced" />
              <Line type="monotone" dataKey="conflict" stroke="#ef4444" strokeWidth={2} name="Conflict" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quarterly Data - Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6" ref={quarterlyChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Quarterly Breakdown</h3>
            <DownloadButton
              data={data.quarterlyData}
              filename="quarterly-breakdown"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={quarterlyChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="drought" fill="#eab308" name="Drought" />
              <Bar dataKey="flood" fill="#06b6d4" name="Floods" />
              <Bar dataKey="conflict" fill="#dc2626" name="Conflict" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Detailed Breakdown</h3>
            <DownloadButton
              data={data.displacementByCause}
              filename="detailed-breakdown"
              formats={['csv', 'json', 'pdf']}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <div className="space-y-5">
            {data.displacementByCause.map((item, index) => {
              // Define specific colors for each cause
              const causeColors = {
                'Drought': '#f97316',      // Orange
                'Floods': '#3b82f6',       // Blue
                'Cyclone': '#6b7280',      // Gray
                'Conflict': '#ef4444',     // Red
                'Other': '#8b5cf6'         // Purple
              };

              const color = causeColors[item.cause] || COLORS[index % COLORS.length];

              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.cause}</span>
                    <span className="text-lg font-bold text-gray-900">{formatNumber(item.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{item.percentage}% of total</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6" ref={trendsAreaChartRef}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Displacement Trends Over Time</h3>
          <DownloadButton
            data={data.monthlyTrend}
            filename="displacement-trends"
            formats={['csv', 'json', 'png', 'svg', 'pdf']}
            chartRef={trendsAreaChartRef}
            selectedCountry={countryCode}
            variant="icon"
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatNumber(value)} />
            <Legend />
            <Area type="monotone" dataKey="climate" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Climate" />
            <Area type="monotone" dataKey="conflict" stackId="1" stroke="#ef4444" fill="#ef4444" name="Conflict" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6" ref={climateLineChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Monthly Climate Displacement</h3>
            <DownloadButton
              data={data.monthlyTrend.map(item => ({ month: item.month, climate: item.climate }))}
              filename="monthly-climate-displacement"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={climateLineChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Line type="monotone" dataKey="climate" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6" ref={conflictLineChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Monthly Conflict Displacement</h3>
            <DownloadButton
              data={data.monthlyTrend.map(item => ({ month: item.month, conflict: item.conflict }))}
              filename="monthly-conflict-displacement"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={conflictLineChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Line type="monotone" dataKey="conflict" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Trend Analysis */}
      {data.detailedQuarterlyData && data.detailedQuarterlyData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Trend Analysis</h2>

          {/* Quarterly Stacked Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6" ref={detailedQuarterlyChartRef}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Displacement Causes by Quarter</h3>
              <DownloadButton
                data={data.detailedQuarterlyData}
                filename="detailed-quarterly-analysis"
                formats={['csv', 'json', 'png', 'svg', 'pdf']}
                chartRef={detailedQuarterlyChartRef}
                selectedCountry={countryCode}
                variant="icon"
              />
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.detailedQuarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => formatNumber(value)} />
                <Legend />
                <Bar dataKey="drought" stackId="a" fill="#f97316" name="Drought" />
                <Bar dataKey="flood" stackId="a" fill="#38bdf8" name="Flood" />
                <Bar dataKey="cyclone" stackId="a" fill="#8b5cf6" name="Cyclone" />
                <Bar dataKey="conflict" stackId="a" fill="#ef4444" name="Conflict" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        {/* Seasonal Information Cards */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Dry Season Card */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Dry Season (Dec-Mar)
                </div>
                <h4 className="text-xl font-bold text-blue-900">Peak Drought</h4>
              </div>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-sm text-blue-800">Highest displacement from water scarcity</p>
          </div>

          {/* Long Rains Card */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                  Long Rains (Apr-Jun)
                </div>
                <h4 className="text-xl font-bold text-green-900">Flood Risk</h4>
              </div>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <p className="text-sm text-green-800">River flooding and displacement</p>
          </div>

          {/* Short Rains Card */}
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                  Short Rains (Oct-Nov)
                </div>
                <h4 className="text-xl font-bold text-orange-900">Recovery</h4>
              </div>
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-sm text-orange-800">Return movements increase</p>
          </div>
        </div>
        </div>
      )}
    </div>
  );

  const renderCountries = () => {
    const countryComparison = [
      { name: 'Somalia', value: 1200000 },
      { name: 'South Sudan', value: 520000 },
      { name: 'Sudan', value: 380000 },
      { name: 'Ethiopia', value: 750000 },
      { name: 'Kenya', value: 285000 },
      { name: 'Uganda', value: 195000 },
      { name: 'Djibouti', value: 85000 },
      { name: 'Eritrea', value: 108000 }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6" ref={countryComparisonRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Country Comparison - Total Displacement</h3>
            <DownloadButton
              data={countryComparison}
              filename="country-comparison"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={countryComparisonRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={countryComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Country Statistics</h3>
          <DownloadButton
            data={countryComparison}
            filename="country-statistics"
            formats={['csv', 'json', 'pdf']}
            selectedCountry={countryCode}
            variant="icon"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {countryComparison.map((country, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <div className="text-sm font-medium text-gray-600">{country.name}</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{formatNumber(country.value)}</div>
              <div className="text-xs text-gray-500 mt-1">Total displaced</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMobility = () => {
    const mobilityData = [
      { from: 'Somalia', to: 'Kenya', volume: 125000, type: 'Climate' },
      { from: 'South Sudan', to: 'Uganda', volume: 185000, type: 'Conflict' },
      { from: 'Sudan', to: 'South Sudan', volume: 95000, type: 'Conflict' },
      { from: 'Eritrea', to: 'Ethiopia', volume: 68000, type: 'Mixed' },
      { from: 'Ethiopia', to: 'Kenya', volume: 42000, type: 'Climate' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6" ref={mobilityTableRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Cross-Border Mobility Patterns</h3>
            <DownloadButton
              data={mobilityData}
              filename="cross-border-mobility"
              formats={['csv', 'json', 'png', 'pdf']}
              chartRef={mobilityTableRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Cause</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mobilityData.map((flow, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{flow.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{flow.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{formatNumber(flow.volume)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        flow.type === 'Climate' ? 'bg-green-100 text-green-800' :
                        flow.type === 'Conflict' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {flow.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6" ref={mobilityBarChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Migration Volume by Route</h3>
            <DownloadButton
              data={mobilityData}
              filename="migration-volume-by-route"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={mobilityBarChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mobilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="from" />
              <YAxis />
              <Tooltip formatter={(value) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="volume" fill="#6366f1" name="People Displaced" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderProjections = () => {
    const projectionData = [
      { year: '2024', actual: data.totalDisplaced, projected: null },
      { year: '2025', actual: null, projected: data.totalDisplaced * 1.08 },
      { year: '2026', actual: null, projected: data.totalDisplaced * 1.15 },
      { year: '2027', actual: null, projected: data.totalDisplaced * 1.22 },
      { year: '2028', actual: null, projected: data.totalDisplaced * 1.28 },
      { year: '2029', actual: null, projected: data.totalDisplaced * 1.35 },
      { year: '2030', actual: null, projected: data.totalDisplaced * 1.42 }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-semibold">Projection Notice:</span> These are statistical projections based on current trends. Actual figures may vary based on climate patterns, conflict dynamics, and policy interventions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6" ref={projectionsChartRef}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Displacement Projections (2024-2030)</h3>
            <DownloadButton
              data={projectionData}
              filename="displacement-projections"
              formats={['csv', 'json', 'png', 'svg', 'pdf']}
              chartRef={projectionsChartRef}
              selectedCountry={countryCode}
              variant="icon"
            />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => value ? formatNumber(value) : 'N/A'} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual" dot={{ r: 6 }} />
              <Line type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" name="Projected" dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Key Projections</h3>
          <DownloadButton
            data={[
              { year: 2025, projection: Math.round(data.totalDisplaced * 1.08), change: '+8%' },
              { year: 2027, projection: Math.round(data.totalDisplaced * 1.22), change: '+22%' },
              { year: 2030, projection: Math.round(data.totalDisplaced * 1.42), change: '+42%' }
            ]}
            filename="key-projections"
            formats={['csv', 'json', 'pdf']}
            selectedCountry={countryCode}
            variant="icon"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="text-sm text-gray-600">2025 Projection</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {formatNumber(Math.round(data.totalDisplaced * 1.08))}
            </div>
            <div className="text-xs text-gray-500 mt-1">+8% from 2024</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
            <div className="text-sm text-gray-600">2027 Projection</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              {formatNumber(Math.round(data.totalDisplaced * 1.22))}
            </div>
            <div className="text-xs text-gray-500 mt-1">+22% from 2024</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
            <div className="text-sm text-gray-600">2030 Projection</div>
            <div className="text-3xl font-bold text-red-600 mt-2">
              {formatNumber(Math.round(data.totalDisplaced * 1.42))}
            </div>
            <div className="text-xs text-gray-500 mt-1">+42% from 2024</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-8">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-b-lg shadow-md p-6`}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'countries' && renderCountries()}
        {activeTab === 'mobility' && renderMobility()}
        {activeTab === 'projections' && renderProjections()}
      </div>

      {/* Info Banner */}
      <div className={`mt-6 ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-500'} border-l-4 p-4 rounded`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              <span className="font-semibold">Note:</span> This dashboard uses representative data for demonstration. Data changes dynamically when you select different countries from the dropdown above.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">East Africa Mobility Watch</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                A comprehensive monitoring platform tracking human mobility and displacement patterns across the IGAD region in the context of climate change and conflict dynamics.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">About IGAD</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Data Sources</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Methodology</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Reports & Publications</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">API Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Download Data</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Policy Briefs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Partner Organizations</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} ICPAC - IGAD Climate Prediction and Applications Centre. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
