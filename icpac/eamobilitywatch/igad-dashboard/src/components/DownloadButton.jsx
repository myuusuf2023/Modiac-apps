import React, { useState, useRef, useEffect } from 'react';
import {
  downloadCSV,
  downloadJSON,
  downloadChartAsPNG,
  downloadChartAsSVG,
  downloadTableAsPDF,
  downloadChartAsPDF,
  downloadCombinedPDF,
  generateFilename
} from '../utils/downloadUtils';

/**
 * DownloadButton Component
 * A flexible download button with dropdown menu for multiple export formats
 *
 * @param {Object} props
 * @param {Array|Object} props.data - Data to export
 * @param {string} props.filename - Base filename for downloads
 * @param {Array} props.formats - Supported formats ['csv', 'json', 'png', 'svg']
 * @param {React.RefObject} props.chartRef - Reference to chart element (for PNG/SVG export)
 * @param {string} props.selectedCountry - Currently selected country
 * @param {string} props.variant - Button style variant ('icon' or 'text')
 * @param {string} props.position - Dropdown position ('right' or 'left')
 * @param {Function} props.onDownload - Custom download handler
 * @param {Array} props.customHeaders - Custom CSV headers
 */
const DownloadButton = ({
  data,
  filename = 'export',
  formats = ['csv', 'json'],
  chartRef = null,
  selectedCountry = null,
  variant = 'icon',
  position = 'right',
  onDownload = null,
  customHeaders = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDownload = async (format) => {
    setIsOpen(false);

    // Use custom handler if provided
    if (onDownload) {
      onDownload(format);
      return;
    }

    const fullFilename = generateFilename(filename, selectedCountry);

    try {
      switch (format) {
        case 'csv':
          if (Array.isArray(data)) {
            downloadCSV(data, fullFilename, customHeaders);
          } else {
            console.warn('CSV export requires array data');
          }
          break;

        case 'json':
          downloadJSON(data, fullFilename);
          break;

        case 'png':
          if (chartRef && chartRef.current) {
            await downloadChartAsPNG(chartRef.current, fullFilename);
          } else {
            console.warn('PNG export requires chartRef');
          }
          break;

        case 'svg':
          if (chartRef && chartRef.current) {
            downloadChartAsSVG(chartRef.current, fullFilename);
          } else {
            console.warn('SVG export requires chartRef');
          }
          break;

        case 'pdf':
          if (chartRef && chartRef.current && Array.isArray(data)) {
            // Combined PDF with chart and data table
            await downloadCombinedPDF(
              chartRef.current,
              data,
              fullFilename,
              `EA Mobility Watch - ${filename.replace(/-/g, ' ').toUpperCase()}`
            );
          } else if (chartRef && chartRef.current) {
            // Chart only PDF
            await downloadChartAsPDF(
              chartRef.current,
              fullFilename,
              `EA Mobility Watch - ${filename.replace(/-/g, ' ').toUpperCase()}`
            );
          } else if (Array.isArray(data)) {
            // Data table only PDF
            await downloadTableAsPDF(
              data,
              fullFilename,
              `EA Mobility Watch - ${filename.replace(/-/g, ' ').toUpperCase()}`
            );
          } else {
            console.warn('PDF export requires either chartRef or array data');
          }
          break;

        default:
          console.warn(`Unknown format: ${format}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download. Please try again.');
    }
  };

  const formatLabels = {
    csv: 'Download CSV',
    json: 'Download JSON',
    png: 'Download PNG',
    svg: 'Download SVG',
    pdf: 'Download PDF'
  };

  const formatIcons = {
    csv: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    json: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    png: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    svg: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    pdf: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  };

  const downloadIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {variant === 'icon' ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Download"
          aria-label="Download options"
        >
          {downloadIcon}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
        >
          {downloadIcon}
          <span>Download</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-1`}
        >
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            Export Options
          </div>
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => handleDownload(format)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-3"
            >
              <span className="text-gray-400 dark:text-gray-500">{formatIcons[format]}</span>
              <span>{formatLabels[format]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
