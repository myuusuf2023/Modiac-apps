/**
 * Download Utilities for EA Mobility Watch Dashboard
 * Provides functions to export data in various formats (CSV, JSON, PNG)
 */

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Optional custom headers
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, headers = null) => {
  if (!data || data.length === 0) {
    return '';
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);

  // Create CSV header row
  const headerRow = csvHeaders.join(',');

  // Create data rows
  const dataRows = data.map(row => {
    return csvHeaders.map(header => {
      const value = row[header];
      // Handle values that contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value ?? '';
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download data as CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file (without extension)
 * @param {Array} headers - Optional custom headers
 */
export const downloadCSV = (data, filename = 'export', headers = null) => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download data as JSON file
 * @param {any} data - Data to export (object or array)
 * @param {string} filename - Name of the file (without extension)
 * @param {boolean} pretty - Whether to format JSON with indentation
 */
export const downloadJSON = (data, filename = 'export', pretty = true) => {
  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download chart as PNG image using html2canvas
 * @param {HTMLElement} element - DOM element to capture
 * @param {string} filename - Name of the file (without extension)
 * @param {Object} options - html2canvas options
 * @returns {Promise<string|null>} Data URL of the canvas or null if error
 */
export const downloadChartAsPNG = async (element, filename = 'chart', options = {}) => {
  try {
    // Dynamically import html2canvas
    const html2canvas = (await import('html2canvas')).default;

    const defaultOptions = {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      logging: false,
      ...options
    };

    const canvas = await html2canvas(element, defaultOptions);
    const url = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.png`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return url; // Return for potential use in PDF
  } catch (error) {
    console.error('Error downloading chart as PNG:', error);
    alert('Failed to download chart. Please try again.');
    return null;
  }
};

/**
 * Download chart as SVG (for Recharts components)
 * @param {HTMLElement} element - SVG element to download
 * @param {string} filename - Name of the file (without extension)
 */
export const downloadChartAsSVG = (element, filename = 'chart') => {
  try {
    // Find SVG element within the provided element
    const svgElement = element.querySelector('svg') || element;

    if (svgElement.tagName !== 'SVG') {
      console.error('No SVG element found');
      return;
    }

    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true);

    // Add XML namespace if not present
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Convert to string
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.svg`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading chart as SVG:', error);
    alert('Failed to download chart. Please try again.');
  }
};

/**
 * Generate filename with timestamp and country filter
 * @param {string} baseName - Base name for the file
 * @param {string} country - Selected country (optional)
 * @param {string} extension - File extension (optional)
 * @returns {string} Generated filename
 */
export const generateFilename = (baseName, country = null, extension = null) => {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const countryPart = country && country !== 'all' ? `_${country}` : '';
  const parts = [`ea-mobility-watch_${baseName}${countryPart}_${timestamp}`];

  if (extension) {
    return `${parts[0]}.${extension}`;
  }
  return parts[0];
};

/**
 * Format number for export (removes formatting)
 * @param {any} value - Value to format
 * @returns {number|string} Formatted value
 */
export const formatNumberForExport = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    // Remove commas and convert to number
    const cleaned = value.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? value : num;
  }
  return value;
};

/**
 * Prepare summary statistics for export
 * @param {Object} data - Data object with statistics
 * @returns {Array} Array of statistics objects
 */
export const prepareSummaryStats = (data) => {
  return [
    {
      metric: 'Total Displaced',
      value: data.totalDisplaced || 0,
      category: 'Overall'
    },
    {
      metric: 'Total IDPs',
      value: data.totalIDPs || 0,
      category: 'Overall'
    },
    {
      metric: 'Climate-Induced Displacement',
      value: data.climateDisplaced || 0,
      category: 'Climate'
    },
    {
      metric: 'Returns',
      value: data.returnees || 0,
      category: 'Returns'
    }
  ];
};

/**
 * Export complete dashboard data
 * @param {Object} data - Complete dashboard data
 * @param {string} selectedCountry - Currently selected country
 * @param {string} format - Export format ('json', 'csv', or 'pdf')
 */
export const exportCompleteData = async (data, selectedCountry, format = 'json') => {
  const exportData = {
    metadata: {
      exportDate: new Date().toISOString(),
      country: selectedCountry || 'all',
      source: 'EA Mobility Watch Dashboard'
    },
    summary: prepareSummaryStats(data),
    displacementByCause: data.displacementByCause || [],
    monthlyTrend: data.monthlyTrend || [],
    quarterlyData: data.quarterlyData || []
  };

  const filename = generateFilename('complete-data', selectedCountry);

  if (format === 'csv') {
    // For CSV, we'll create multiple sections
    let csvContent = '# EA Mobility Watch - Complete Data Export\n';
    csvContent += `# Export Date: ${exportData.metadata.exportDate}\n`;
    csvContent += `# Country: ${exportData.metadata.country}\n\n`;

    csvContent += '# Summary Statistics\n';
    csvContent += convertToCSV(exportData.summary) + '\n\n';

    csvContent += '# Displacement by Cause\n';
    csvContent += convertToCSV(exportData.displacementByCause) + '\n\n';

    csvContent += '# Monthly Trends\n';
    csvContent += convertToCSV(exportData.monthlyTrend) + '\n\n';

    csvContent += '# Quarterly Data\n';
    csvContent += convertToCSV(exportData.quarterlyData) + '\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else if (format === 'pdf') {
    // Create comprehensive PDF report
    try {
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');

      const doc = new jsPDF();
      let yPosition = 20;

      // Title
      doc.setFontSize(20);
      doc.setTextColor(37, 99, 235);
      doc.text('EA Mobility Watch Dashboard', 14, yPosition);
      yPosition += 10;

      // Metadata
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Export Date: ${new Date().toLocaleString()}`, 14, yPosition);
      yPosition += 5;
      doc.text(`Country/Region: ${selectedCountry || 'All IGAD'}`, 14, yPosition);
      yPosition += 10;

      // Summary Statistics
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Summary Statistics', 14, yPosition);
      yPosition += 5;

      doc.autoTable({
        startY: yPosition,
        head: [['Metric', 'Value', 'Category']],
        body: exportData.summary.map(item => [item.metric, item.value.toLocaleString(), item.category]),
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] }
      });
      yPosition = doc.lastAutoTable.finalY + 10;

      // Displacement by Cause
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.text('Displacement by Cause', 14, yPosition);
      yPosition += 5;

      doc.autoTable({
        startY: yPosition,
        head: [['Cause', 'Value', 'Percentage']],
        body: exportData.displacementByCause.map(item => [
          item.cause || item.name,
          (item.value || 0).toLocaleString(),
          `${item.percentage || 0}%`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] }
      });
      yPosition = doc.lastAutoTable.finalY + 10;

      // Monthly Trends
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.text('Monthly Trends', 14, yPosition);
      yPosition += 5;

      if (exportData.monthlyTrend.length > 0) {
        doc.autoTable({
          startY: yPosition,
          head: [['Month', 'Climate', 'Conflict']],
          body: exportData.monthlyTrend.map(item => [
            item.month,
            (item.climate || 0).toLocaleString(),
            (item.conflict || 0).toLocaleString()
          ]),
          theme: 'grid',
          headStyles: { fillColor: [37, 99, 235] }
        });
        yPosition = doc.lastAutoTable.finalY + 10;
      }

      // Quarterly Data
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.text('Quarterly Breakdown', 14, yPosition);
      yPosition += 5;

      if (exportData.quarterlyData.length > 0) {
        doc.autoTable({
          startY: yPosition,
          head: [['Quarter', 'Drought', 'Flood', 'Conflict']],
          body: exportData.quarterlyData.map(item => [
            item.quarter,
            (item.drought || 0).toLocaleString(),
            (item.flood || 0).toLocaleString(),
            (item.conflict || 0).toLocaleString()
          ]),
          theme: 'grid',
          headStyles: { fillColor: [37, 99, 235] }
        });
      }

      // Save PDF
      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  } else {
    downloadJSON(exportData, filename);
  }
};

/**
 * Download data as PDF with table
 * @param {Array} data - Array of objects to export as table
 * @param {string} filename - Name of the file (without extension)
 * @param {string} title - Title for the PDF document
 * @param {Array} headers - Custom headers for the table (optional)
 */
export const downloadTableAsPDF = async (data, filename = 'export', title = 'Data Export', headers = null) => {
  try {
    // Dynamically import jsPDF and autoTable
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Add metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('EA Mobility Watch Dashboard', 14, 34);

    if (!data || data.length === 0) {
      doc.setFontSize(12);
      doc.text('No data available', 14, 45);
    } else {
      // Get headers
      const tableHeaders = headers || Object.keys(data[0]);

      // Prepare table data
      const tableData = data.map(row =>
        tableHeaders.map(header => {
          const value = row[header];
          return value !== null && value !== undefined ? String(value) : '';
        })
      );

      // Add table
      doc.autoTable({
        startY: 40,
        head: [tableHeaders],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { top: 40 }
      });
    }

    // Save the PDF
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

/**
 * Download chart as PDF with image
 * @param {HTMLElement} element - DOM element to capture
 * @param {string} filename - Name of the file (without extension)
 * @param {string} title - Title for the PDF document
 */
export const downloadChartAsPDF = async (element, filename = 'chart', title = 'Chart Export') => {
  try {
    // Dynamically import libraries
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    // Capture element as canvas
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');

    // Create PDF
    const doc = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm'
    });

    // Add title
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // Add metadata
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

    // Calculate image dimensions to fit page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 28; // 14mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = 28;

    // If image is too tall, scale it down
    if (imgHeight > pageHeight - 40) {
      const scaledHeight = pageHeight - 40;
      const scaledWidth = (canvas.width * scaledHeight) / canvas.height;
      doc.addImage(imgData, 'PNG', 14, yPosition, scaledWidth, scaledHeight);
    } else {
      doc.addImage(imgData, 'PNG', 14, yPosition, imgWidth, imgHeight);
    }

    // Save the PDF
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

/**
 * Download combined data and chart as PDF
 * @param {HTMLElement} element - DOM element to capture (chart)
 * @param {Array} data - Data to include as table
 * @param {string} filename - Name of the file (without extension)
 * @param {string} title - Title for the PDF document
 */
export const downloadCombinedPDF = async (element, data, filename = 'report', title = 'Dashboard Report') => {
  try {
    // Dynamically import libraries
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    // Add metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('EA Mobility Watch Dashboard', 14, 34);

    let yPosition = 45;

    // Add chart if element is provided
    if (element) {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 1.5,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // A4 width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if we need a new page
      if (imgHeight > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.addImage(imgData, 'PNG', 14, yPosition, imgWidth, Math.min(imgHeight, 200));
      yPosition += Math.min(imgHeight, 200) + 10;
    }

    // Add data table if provided
    if (data && data.length > 0) {
      // Check if we need a new page
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }

      const tableHeaders = Object.keys(data[0]);
      const tableData = data.map(row =>
        tableHeaders.map(header => {
          const value = row[header];
          return value !== null && value !== undefined ? String(value) : '';
        })
      );

      doc.autoTable({
        startY: yPosition,
        head: [tableHeaders],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 250] }
      });
    }

    // Save the PDF
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
