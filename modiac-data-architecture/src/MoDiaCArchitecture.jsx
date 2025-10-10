import React, { useState } from 'react';
import { Database, MapPin, Cloud, Users, AlertTriangle, Map, FileText, Folder, GitBranch, Layers, Calendar, Globe, Download } from 'lucide-react';

const MoDiaCArchitecture = () => {
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleDownloadPDF = () => {
    window.print();
  };

  const datasets = {
    displacement: {
      icon: MapPin,
      gradient: 'from-red-500 to-red-600',
      light: 'from-red-50 to-red-100',
      text: 'text-red-600',
      border: 'border-red-500',
      title: 'Displacement Events',
      count: '1',
      subtitle: 'Movement tracking',
      description: 'Records each displacement event with temporal and spatial details',
      format: 'CSV / PostGIS (POINT)',
      update: 'Weekly–Monthly',
      keyFields: ['event_date', 'cause', 'people_displaced', 'admin2', 'geom'],
      schema: [
        { name: 'event_id', type: 'string/int', desc: 'Unique event identifier' },
        { name: 'event_date', type: 'date', desc: 'When displacement occurred' },
        { name: 'cause', type: 'string', desc: 'Primary driver (drought, flood, conflict)' },
        { name: 'people_displaced', type: 'integer', desc: 'Number of individuals affected' },
        { name: 'admin2', type: 'string', desc: 'District code (links to boundaries)' },
        { name: 'latitude / longitude', type: 'float', desc: 'Geographic coordinates' },
        { name: 'geom', type: 'Point', desc: 'Spatial geometry (EPSG:4326)' }
      ]
    },
    hazard: {
      icon: Cloud,
      gradient: 'from-teal-600 to-teal-700',
      light: 'from-teal-50 to-teal-100',
      text: 'text-teal-700',
      border: 'border-teal-600',
      title: 'Hazard Indicators',
      count: '2',
      subtitle: 'Environmental drivers',
      description: 'Climate and environmental conditions causing displacement',
      format: 'GeoTIFF / CSV / PostGIS',
      update: 'Weekly–Monthly',
      keyFields: ['date', 'hazard_type', 'indicator_name', 'value', 'admin2'],
      schema: [
        { name: 'date', type: 'date', desc: 'Observation time period' },
        { name: 'hazard_type', type: 'string', desc: 'Category (rainfall, drought, flood, temp)' },
        { name: 'indicator_name', type: 'string', desc: 'Specific metric (SPI, NDVI, anomaly)' },
        { name: 'value', type: 'float', desc: 'Measured intensity or magnitude' },
        { name: 'admin2', type: 'string', desc: 'District code (links to boundaries)' },
        { name: 'geom', type: 'Polygon', desc: 'Area geometry (EPSG:4326)' }
      ]
    },
    population: {
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      light: 'from-green-50 to-green-100',
      text: 'text-green-600',
      border: 'border-green-500',
      title: 'Population & Exposure',
      count: '3',
      subtitle: 'At-risk populations',
      description: 'Demographic data showing who is exposed to hazards',
      format: 'CSV / GeoPackage',
      update: 'Annual',
      keyFields: ['admin2', 'population_total', 'population_density', 'year'],
      schema: [
        { name: 'admin2', type: 'string', desc: 'District code (links to boundaries)' },
        { name: 'population_total', type: 'integer', desc: 'Total population count' },
        { name: 'population_density', type: 'float', desc: 'People per km²' },
        { name: 'urban_rural', type: 'string', desc: 'Settlement classification' },
        { name: 'idp_camps', type: 'integer', desc: 'Number of displacement camps' },
        { name: 'year', type: 'integer', desc: 'Reference year for data' }
      ]
    },
    vulnerability: {
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-orange-600',
      light: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-500',
      title: 'Vulnerability Index',
      count: '4',
      subtitle: 'Socioeconomic factors',
      description: 'Social and economic conditions affecting displacement risk',
      format: 'CSV / PostGIS',
      update: 'Monthly–Quarterly',
      keyFields: ['admin2', 'date', 'indicator', 'value'],
      schema: [
        { name: 'admin2', type: 'string', desc: 'District code (links to boundaries)' },
        { name: 'date', type: 'date', desc: 'Observation period' },
        { name: 'indicator', type: 'string', desc: 'Type (food_security, conflict, vegetation)' },
        { name: 'value', type: 'float', desc: 'Indicator measurement' },
        { name: 'source', type: 'string', desc: 'Data provider or origin' }
      ]
    },
    boundaries: {
      icon: Map,
      gradient: 'from-purple-500 to-purple-600',
      light: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-500',
      title: 'Admin Boundaries',
      count: '5',
      subtitle: 'Spatial framework',
      description: 'Reference layer linking all datasets through admin codes',
      format: 'GeoPackage / PostGIS',
      update: 'On Demand',
      keyFields: ['gid_2', 'name_2', 'geom'],
      schema: [
        { name: 'gid_0 / gid_1 / gid_2', type: 'string', desc: 'Hierarchical administrative codes' },
        { name: 'name_0 / name_1 / name_2', type: 'string', desc: 'Country / Region / District names' },
        { name: 'geom', type: 'MultiPolygon', desc: 'Spatial boundaries (EPSG:4326)' }
      ]
    },
    metadata: {
      icon: FileText,
      gradient: 'from-gray-500 to-gray-600',
      light: 'from-gray-50 to-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-500',
      title: 'Metadata Registry',
      count: '6',
      subtitle: 'Data provenance',
      description: 'Quality tracking and documentation for all datasets',
      format: 'CSV / PostGIS',
      update: 'Continuous',
      keyFields: ['dataset_name', 'temporal_coverage', 'refresh_rate'],
      schema: [
        { name: 'dataset_name', type: 'string', desc: 'Name of dataset' },
        { name: 'description', type: 'text', desc: 'Summary and purpose' },
        { name: 'temporal_coverage', type: 'string', desc: 'Time range (e.g., 2015–2025)' },
        { name: 'refresh_rate', type: 'string', desc: 'Update frequency' },
        { name: 'license', type: 'string', desc: 'Usage rights and restrictions' }
      ]
    }
  };

  const DatasetCard = ({ datasetKey, dataset, index }) => {
    const Icon = dataset.icon;
    const isSelected = selectedDataset === datasetKey;

    return (
      <div
        onClick={() => setSelectedDataset(isSelected ? null : datasetKey)}
        className={`no-break relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
          isSelected ? 'scale-105 shadow-2xl ring-4 ring-offset-2 ring-orange-400' : 'hover:scale-102 hover:shadow-xl'
        }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${dataset.light} opacity-90`}></div>
        <div className={`relative p-6 border-2 ${dataset.border}`}>
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${dataset.gradient} text-white shadow-lg`}>
              <Icon size={28} />
            </div>
            <div className={`text-3xl font-bold ${dataset.text} opacity-20`}>
              {dataset.count}
            </div>
          </div>
          <h3 className="font-bold text-xl mb-1">{dataset.title}</h3>
          <p className={`text-sm ${dataset.text} font-semibold mb-2`}>{dataset.subtitle}</p>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{dataset.description}</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 bg-white bg-opacity-50 rounded px-2 py-1">
              <Database size={12} className={dataset.text} />
              <span className="font-semibold">Format:</span>
              <span className="text-gray-700">{dataset.format}</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-50 rounded px-2 py-1">
              <Calendar size={12} className={dataset.text} />
              <span className="font-semibold">Updates:</span>
              <span className="text-gray-700">{dataset.update}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <style>{`
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .no-break { page-break-inside: avoid; }
          @page { margin: 1cm; size: A4; }
        }
      `}</style>
      {/* Hero Section with MoDiaC Brand Colors */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 text-white py-12 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Database size={56} className="text-orange-300" />
              <div>
                <h1 className="text-5xl font-bold mb-2">MoDiaC Data Architecture</h1>
                <p className="text-xl text-teal-100">Monitoring Displacement in a Changing Climate</p>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:scale-105 print:hidden"
            >
              <Download size={20} />
              <span className="font-semibold">Download PDF</span>
            </button>
          </div>

          {/* Key Summary */}
          <div className="mt-8 bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-orange-300 border-opacity-30">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-orange-300" />
              System Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-orange-300 font-semibold mb-2">🎯 Purpose</div>
                <p className="leading-relaxed">Unified database linking climate hazards, population exposure, and displacement events through standardized spatial-temporal dimensions</p>
              </div>
              <div>
                <div className="text-orange-300 font-semibold mb-2">🔗 Integration</div>
                <p className="leading-relaxed">All datasets share common admin2 codes and temporal fields, enabling cross-dataset analysis and predictive modeling</p>
              </div>
              <div>
                <div className="text-orange-300 font-semibold mb-2">📊 Standards</div>
                <p className="leading-relaxed">EPSG:4326 coordinate system, interoperable formats (CSV, GeoPackage, PostGIS), and documented metadata for every layer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Print Header - only visible when printing */}
        <div className="hidden print:block mb-4 pb-4 border-b-2 border-teal-600">
          <h2 className="text-2xl font-bold text-teal-800">
            {activeTab === 'overview' && 'Dataset Overview'}
            {activeTab === 'flow' && 'Data Flow & Integration'}
            {activeTab === 'structure' && 'File Structure'}
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-md border border-orange-200">
          {[
            { id: 'overview', label: 'Dataset Overview', icon: Layers },
            { id: 'flow', label: 'Data Flow', icon: GitBranch },
            { id: 'structure', label: 'File Structure', icon: Folder }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-orange-50'
                }`}
              >
                <TabIcon size={18} />
                <span className="font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-teal-600">
                <div className="text-3xl font-bold text-teal-700">6</div>
                <div className="text-sm text-gray-600">Core Datasets</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">EPSG:4326</div>
                <div className="text-sm text-gray-600">Standard CRS</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-teal-600">
                <div className="text-3xl font-bold text-teal-700">admin2</div>
                <div className="text-sm text-gray-600">Link Key</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">Temporal</div>
                <div className="text-sm text-gray-600">Date/Month Fields</div>
              </div>
            </div>

            {/* Dataset Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(datasets).map(([key, dataset], idx) => (
                <DatasetCard key={key} datasetKey={key} dataset={dataset} index={idx} />
              ))}
            </div>

            {/* Schema Detail */}
            {selectedDataset && (
              <div className="bg-white rounded-xl shadow-2xl p-8 animate-fadeIn border-t-4 border-teal-600">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {React.createElement(datasets[selectedDataset].icon, {
                      size: 40,
                      className: datasets[selectedDataset].text
                    })}
                    <div>
                      <h2 className="text-3xl font-bold">{datasets[selectedDataset].title}</h2>
                      <p className="text-gray-600">{datasets[selectedDataset].description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDataset(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >×</button>
                </div>

                <div className="mb-4 bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="font-semibold text-orange-900 mb-2">Key Fields</div>
                  <div className="flex flex-wrap gap-2">
                    {datasets[selectedDataset].keyFields.map((field, idx) => (
                      <span key={idx} className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-mono">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-teal-50 to-teal-100">
                      <tr>
                        <th className="text-left p-3 font-bold text-teal-800">Field Name</th>
                        <th className="text-left p-3 font-bold text-teal-800">Data Type</th>
                        <th className="text-left p-3 font-bold text-teal-800">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datasets[selectedDataset].schema.map((col, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                          <td className="p-3 font-mono text-sm font-semibold text-teal-700">{col.name}</td>
                          <td className="p-3 font-mono text-xs bg-gray-50 text-purple-600">{col.type}</td>
                          <td className="p-3 text-sm text-gray-700">{col.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'flow' && (
          <div className="space-y-8">
            {/* Summary Statement */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl p-6 shadow-xl border-2 border-orange-400">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <GitBranch size={28} />
                Data Integration Framework
              </h2>
              <p className="text-lg leading-relaxed">
                The MoDiaC architecture creates a unified analytical system where administrative boundaries serve as the spatial backbone, linking hazard indicators, population exposure, vulnerability metrics, and displacement events. This design enables researchers to correlate environmental triggers with human movement patterns across time and space.
              </p>
            </div>

            {/* Data Flow Diagram */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-8 text-center text-teal-800">Relational Data Flow</h3>

              <div className="flex flex-col items-center space-y-6">
                {/* Top: Boundaries */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-xl text-center min-w-[280px] border-2 border-orange-300">
                    <Map size={40} className="mx-auto mb-2" />
                    <div className="font-bold text-xl">Administrative Boundaries</div>
                    <div className="text-sm mt-2 opacity-90">admin2 codes • Spatial reference</div>
                    <div className="text-xs mt-2 bg-white bg-opacity-20 rounded px-3 py-1 inline-block">
                      EPSG:4326 MultiPolygon
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl text-orange-400">↓</div>
                </div>

                {/* Middle: Connected Datasets */}
                <div className="grid md:grid-cols-4 gap-4 mt-8">
                  {[
                    { key: 'hazard', label: 'Hazards', icon: Cloud, gradient: 'from-teal-600 to-teal-700' },
                    { key: 'population', label: 'Population', icon: Users, gradient: 'from-green-500 to-green-600' },
                    { key: 'vulnerability', label: 'Vulnerability', icon: AlertTriangle, gradient: 'from-orange-500 to-orange-600' },
                    { key: 'displacement', label: 'Displacement', icon: MapPin, gradient: 'from-red-500 to-red-600' }
                  ].map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.key} className="relative">
                        <div className={`bg-gradient-to-br ${item.gradient} text-white rounded-lg p-4 shadow-lg text-center border-2 border-orange-200`}>
                          <ItemIcon size={32} className="mx-auto mb-2" />
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-xs mt-2 opacity-80">+ admin2 link</div>
                          <div className="text-xs opacity-80">+ date/time</div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-2xl text-orange-400">↓</div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom: Analysis Output */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-xl p-6 shadow-xl text-center min-w-[600px] mt-8 border-2 border-orange-400">
                  <Globe size={40} className="mx-auto mb-2" />
                  <div className="font-bold text-xl">Integrated Analysis</div>
                  <div className="text-sm mt-3 opacity-90 max-w-xl mx-auto">
                    Multi-dimensional queries linking climate drivers → population exposure → vulnerability factors → displacement outcomes
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-orange-50 rounded-lg p-4 border-l-4 border-teal-600">
                <div className="font-semibold text-teal-800 mb-2">Example Query Path:</div>
                <div className="text-sm text-gray-700 font-mono leading-relaxed">
                  SELECT displacement.people_displaced FROM displacement<br/>
                  JOIN hazard ON displacement.admin2 = hazard.admin2 AND displacement.event_date = hazard.date<br/>
                  JOIN population ON displacement.admin2 = population.admin2<br/>
                  WHERE hazard.hazard_type = 'drought' AND hazard.value {'>'} threshold
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-orange-200">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-teal-700">
                <Folder className="text-orange-500" />
                Directory Structure
              </h2>
              <p className="text-gray-600">Recommended file organization for the MoDiaC data repository</p>
            </div>

            <div className="bg-teal-900 text-orange-200 rounded-lg p-6 font-mono text-sm overflow-x-auto border-2 border-orange-300">
              <div className="mb-4 text-orange-400 font-bold">📁 /modiac_data/</div>
              {[
                { folder: 'displacement', color: 'text-red-400', files: ['displacement_events.csv', 'monthly_displacement_admin2.parquet'] },
                { folder: 'hazards', color: 'text-teal-300', files: ['drought_spi_admin2.csv', 'flood_index_admin2.csv', 'rainfall_anomaly_2025_03.tif'] },
                { folder: 'exposure', color: 'text-green-400', files: ['population_admin2_2024.csv'] },
                { folder: 'vulnerability', color: 'text-orange-300', files: ['ipc_conflict_admin2.csv'] },
                { folder: 'boundaries', color: 'text-purple-400', files: ['admin2_boundaries.gpkg'] },
                { folder: 'metadata', color: 'text-gray-400', files: ['datasets_registry.csv'] }
              ].map((item, idx) => (
                <div key={idx} className="ml-4 mb-4">
                  <div className={`${item.color} font-bold mb-1`}>├── 📂 {item.folder}/</div>
                  {item.files.map((file, fileIdx) => (
                    <div key={fileIdx} className="ml-8 text-orange-100">
                      {fileIdx === item.files.length - 1 ? '└──' : '├──'} 📄 {file}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-600">
                <div className="font-bold text-teal-800 mb-2">✅ Best Practices</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Consistent naming conventions</li>
                  <li>• Include date stamps in filenames</li>
                  <li>• Use ISO date format (YYYY-MM-DD)</li>
                  <li>• Separate raw and processed data</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="font-bold text-orange-800 mb-2">📦 Format Priorities</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• CSV for tabular data (easy access)</li>
                  <li>• GeoPackage for spatial data</li>
                  <li>• PostGIS for large-scale operations</li>
                  <li>• GeoTIFF for raster hazards</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white py-8 px-6 mt-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Key Takeaways</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 border-2 border-orange-300">
              <div className="text-3xl mb-2">🔗</div>
              <div className="font-semibold mb-2 text-orange-200">Unified Framework</div>
              <p className="text-teal-100">All datasets connected through standardized admin2 codes and temporal fields</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 border-2 border-orange-300">
              <div className="text-3xl mb-2">🌍</div>
              <div className="font-semibold mb-2 text-orange-200">Spatial Consistency</div>
              <p className="text-teal-100">EPSG:4326 coordinate system ensures geographic compatibility across all layers</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 border-2 border-orange-300">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold mb-2 text-orange-200">Analysis-Ready</div>
              <p className="text-teal-100">Structure enables predictive modeling and causal analysis of climate-displacement relationships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoDiaCArchitecture;
