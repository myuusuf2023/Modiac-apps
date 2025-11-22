// Mock data for IGAD countries - Blueprint version

export const countries = [
  { code: 'ALL', name: 'All IGAD Region', flag: '🌍' },
  { code: 'DJI', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'ERI', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'ETH', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'KEN', name: 'Kenya', flag: '🇰🇪' },
  { code: 'SDN', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SOM', name: 'Somalia', flag: '🇸🇴' },
  { code: 'SSD', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'UGA', name: 'Uganda', flag: '🇺🇬' }
];

export const countryData = {
  ALL: {
    totalDisplaced: 19365000,
    totalIDPs: 16085000,
    returnees: 2617000,
    climateDisplaced: 13510000,
    conflictDisplaced: 5855000,
    displacementByCause: [
      { cause: 'Drought', value: 8755000, percentage: 45 },
      { cause: 'Floods', value: 4125000, percentage: 21 },
      { cause: 'Cyclone', value: 955000, percentage: 5 },
      { cause: 'Conflict', value: 5530000, percentage: 29 },
      { cause: 'Other', value: 0, percentage: 0 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 280000, conflict: 350000, total: 630000 },
      { month: 'Feb', climate: 310000, conflict: 340000, total: 650000 },
      { month: 'Mar', climate: 380000, conflict: 360000, total: 740000 },
      { month: 'Apr', climate: 450000, conflict: 380000, total: 830000 },
      { month: 'May', climate: 520000, conflict: 400000, total: 920000 },
      { month: 'Jun', climate: 480000, conflict: 420000, total: 900000 },
      { month: 'Jul', climate: 410000, conflict: 390000, total: 800000 },
      { month: 'Aug', climate: 360000, conflict: 370000, total: 730000 },
      { month: 'Sep', climate: 330000, conflict: 350000, total: 680000 },
      { month: 'Oct', climate: 390000, conflict: 360000, total: 750000 },
      { month: 'Nov', climate: 420000, conflict: 380000, total: 800000 },
      { month: 'Dec', climate: 350000, conflict: 390000, total: 740000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 520000, flood: 280000, conflict: 980000 },
      { quarter: 'Q2 2024', drought: 680000, flood: 420000, conflict: 1100000 },
      { quarter: 'Q3 2024', drought: 450000, flood: 310000, conflict: 950000 },
      { quarter: 'Q4 2024', drought: 580000, flood: 390000, conflict: 1050000 }
    ]
  },
  DJI: {
    totalDisplaced: 85000,
    totalIDPs: 12000,
    returnees: 15000,
    climateDisplaced: 60000,
    conflictDisplaced: 25000,
    displacementByCause: [
      { cause: 'Drought', value: 45000, percentage: 53 },
      { cause: 'Floods', value: 10000, percentage: 12 },
      { cause: 'Cyclone', value: 5000, percentage: 6 },
      { cause: 'Conflict', value: 20000, percentage: 24 },
      { cause: 'Other', value: 5000, percentage: 5 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 4500, conflict: 1800, total: 6300 },
      { month: 'Feb', climate: 5200, conflict: 1900, total: 7100 },
      { month: 'Mar', climate: 6800, conflict: 2100, total: 8900 },
      { month: 'Apr', climate: 7500, conflict: 2300, total: 9800 },
      { month: 'May', climate: 8200, conflict: 2500, total: 10700 },
      { month: 'Jun', climate: 7800, conflict: 2400, total: 10200 },
      { month: 'Jul', climate: 6500, conflict: 2200, total: 8700 },
      { month: 'Aug', climate: 5800, conflict: 2000, total: 7800 },
      { month: 'Sep', climate: 5200, conflict: 1900, total: 7100 },
      { month: 'Oct', climate: 6100, conflict: 2000, total: 8100 },
      { month: 'Nov', climate: 6800, conflict: 2100, total: 8900 },
      { month: 'Dec', climate: 5500, conflict: 2000, total: 7500 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 12000, flood: 2500, conflict: 5200 },
      { quarter: 'Q2 2024', drought: 15000, flood: 3800, conflict: 6500 },
      { quarter: 'Q3 2024', drought: 9500, flood: 2100, conflict: 5000 },
      { quarter: 'Q4 2024', drought: 13000, flood: 3200, conflict: 5800 }
    ]
  },
  SOM: {
    totalDisplaced: 1200000,
    totalIDPs: 950000,
    returnees: 125000,
    climateDisplaced: 950000,
    conflictDisplaced: 250000,
    displacementByCause: [
      { cause: 'Drought', value: 650000, percentage: 54 },
      { cause: 'Floods', value: 250000, percentage: 21 },
      { cause: 'Cyclone', value: 50000, percentage: 4 },
      { cause: 'Conflict', value: 250000, percentage: 21 },
      { cause: 'Other', value: 0, percentage: 0 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 140000, conflict: 110000, total: 250000 },
      { month: 'Feb', climate: 155000, conflict: 115000, total: 270000 },
      { month: 'Mar', climate: 185000, conflict: 125000, total: 310000 },
      { month: 'Apr', climate: 210000, conflict: 135000, total: 345000 },
      { month: 'May', climate: 235000, conflict: 145000, total: 380000 },
      { month: 'Jun', climate: 220000, conflict: 140000, total: 360000 },
      { month: 'Jul', climate: 195000, conflict: 130000, total: 325000 },
      { month: 'Aug', climate: 170000, conflict: 120000, total: 290000 },
      { month: 'Sep', climate: 160000, conflict: 115000, total: 275000 },
      { month: 'Oct', climate: 180000, conflict: 125000, total: 305000 },
      { month: 'Nov', climate: 200000, conflict: 135000, total: 335000 },
      { month: 'Dec', climate: 175000, conflict: 130000, total: 305000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 280000, flood: 95000, conflict: 315000 },
      { quarter: 'Q2 2024', drought: 360000, flood: 135000, conflict: 395000 },
      { quarter: 'Q3 2024', drought: 245000, flood: 85000, conflict: 325000 },
      { quarter: 'Q4 2024', drought: 315000, flood: 120000, conflict: 365000 }
    ]
  },
  SSD: {
    totalDisplaced: 5200000,
    totalIDPs: 4300000,
    returnees: 480000,
    climateDisplaced: 3200000,
    conflictDisplaced: 2000000,
    displacementByCause: [
      { cause: 'Drought', value: 1800000, percentage: 35 },
      { cause: 'Floods', value: 1200000, percentage: 23 },
      { cause: 'Cyclone', value: 200000, percentage: 4 },
      { cause: 'Conflict', value: 2000000, percentage: 38 },
      { cause: 'Other', value: 0, percentage: 0 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 65000, conflict: 125000, total: 190000 },
      { month: 'Feb', climate: 72000, conflict: 130000, total: 202000 },
      { month: 'Mar', climate: 88000, conflict: 140000, total: 228000 },
      { month: 'Apr', climate: 98000, conflict: 150000, total: 248000 },
      { month: 'May', climate: 110000, conflict: 160000, total: 270000 },
      { month: 'Jun', climate: 105000, conflict: 155000, total: 260000 },
      { month: 'Jul', climate: 92000, conflict: 145000, total: 237000 },
      { month: 'Aug', climate: 80000, conflict: 135000, total: 215000 },
      { month: 'Sep', climate: 75000, conflict: 130000, total: 205000 },
      { month: 'Oct', climate: 85000, conflict: 140000, total: 225000 },
      { month: 'Nov', climate: 95000, conflict: 150000, total: 245000 },
      { month: 'Dec', climate: 82000, conflict: 145000, total: 227000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 85000, flood: 95000, conflict: 365000 },
      { quarter: 'Q2 2024', drought: 105000, flood: 125000, conflict: 435000 },
      { quarter: 'Q3 2024', drought: 72000, flood: 88000, conflict: 380000 },
      { quarter: 'Q4 2024', drought: 95000, flood: 110000, conflict: 410000 }
    ]
  },
  SDN: {
    totalDisplaced: 3800000,
    totalIDPs: 3100000,
    returnees: 520000,
    climateDisplaced: 3000000,
    conflictDisplaced: 800000,
    displacementByCause: [
      { cause: 'Drought', value: 2000000, percentage: 53 },
      { cause: 'Floods', value: 900000, percentage: 24 },
      { cause: 'Cyclone', value: 100000, percentage: 3 },
      { cause: 'Conflict', value: 800000, percentage: 21 },
      { cause: 'Other', value: 0, percentage: 0 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 58000, conflict: 105000, total: 163000 },
      { month: 'Feb', climate: 65000, conflict: 110000, total: 175000 },
      { month: 'Mar', climate: 78000, conflict: 120000, total: 198000 },
      { month: 'Apr', climate: 88000, conflict: 130000, total: 218000 },
      { month: 'May', climate: 98000, conflict: 140000, total: 238000 },
      { month: 'Jun', climate: 92000, conflict: 135000, total: 227000 },
      { month: 'Jul', climate: 82000, conflict: 125000, total: 207000 },
      { month: 'Aug', climate: 72000, conflict: 115000, total: 187000 },
      { month: 'Sep', climate: 68000, conflict: 110000, total: 178000 },
      { month: 'Oct', climate: 75000, conflict: 120000, total: 195000 },
      { month: 'Nov', climate: 85000, conflict: 130000, total: 215000 },
      { month: 'Dec', climate: 72000, conflict: 125000, total: 197000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 95000, flood: 68000, conflict: 295000 },
      { quarter: 'Q2 2024', drought: 120000, flood: 88000, conflict: 365000 },
      { quarter: 'Q3 2024', drought: 82000, flood: 62000, conflict: 310000 },
      { quarter: 'Q4 2024', drought: 108000, flood: 78000, conflict: 340000 }
    ]
  },
  UGA: {
    totalDisplaced: 715000,
    totalIDPs: 820000,
    returnees: 205000,
    climateDisplaced: 310000,
    conflictDisplaced: 405000,
    displacementByCause: [
      { cause: 'Drought', value: 75000, percentage: 10 },
      { cause: 'Floods', value: 180000, percentage: 25 },
      { cause: 'Cyclone', value: 55000, percentage: 8 },
      { cause: 'Conflict', value: 330000, percentage: 46 },
      { cause: 'Other', value: 75000, percentage: 11 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 22000, conflict: 32000, total: 54000 },
      { month: 'Feb', climate: 25000, conflict: 34000, total: 59000 },
      { month: 'Mar', climate: 30000, conflict: 38000, total: 68000 },
      { month: 'Apr', climate: 35000, conflict: 42000, total: 77000 },
      { month: 'May', climate: 40000, conflict: 45000, total: 85000 },
      { month: 'Jun', climate: 38000, conflict: 44000, total: 82000 },
      { month: 'Jul', climate: 33000, conflict: 40000, total: 73000 },
      { month: 'Aug', climate: 28000, conflict: 36000, total: 64000 },
      { month: 'Sep', climate: 26000, conflict: 34000, total: 60000 },
      { month: 'Oct', climate: 29000, conflict: 37000, total: 66000 },
      { month: 'Nov', climate: 32000, conflict: 40000, total: 72000 },
      { month: 'Dec', climate: 27000, conflict: 38000, total: 65000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 18000, flood: 42000, conflict: 94000 },
      { quarter: 'Q2 2024', drought: 23000, flood: 55000, conflict: 115000 },
      { quarter: 'Q3 2024', drought: 16000, flood: 38000, conflict: 95000 },
      { quarter: 'Q4 2024', drought: 20000, flood: 48000, conflict: 105000 }
    ]
  },
  ETH: {
    totalDisplaced: 7500000,
    totalIDPs: 6200000,
    returnees: 850000,
    climateDisplaced: 5800000,
    conflictDisplaced: 1700000,
    displacementByCause: [
      { cause: 'Drought', value: 3800000, percentage: 51 },
      { cause: 'Floods', value: 1500000, percentage: 20 },
      { cause: 'Cyclone', value: 500000, percentage: 7 },
      { cause: 'Conflict', value: 1700000, percentage: 23 },
      { cause: 'Other', value: 0, percentage: 0 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 450000, conflict: 135000, total: 585000 },
      { month: 'Feb', climate: 480000, conflict: 140000, total: 620000 },
      { month: 'Mar', climate: 520000, conflict: 150000, total: 670000 },
      { month: 'Apr', climate: 580000, conflict: 165000, total: 745000 },
      { month: 'May', climate: 640000, conflict: 175000, total: 815000 },
      { month: 'Jun', climate: 610000, conflict: 170000, total: 780000 },
      { month: 'Jul', climate: 530000, conflict: 160000, total: 690000 },
      { month: 'Aug', climate: 470000, conflict: 145000, total: 615000 },
      { month: 'Sep', climate: 440000, conflict: 140000, total: 580000 },
      { month: 'Oct', climate: 490000, conflict: 150000, total: 640000 },
      { month: 'Nov', climate: 550000, conflict: 165000, total: 715000 },
      { month: 'Dec', climate: 480000, conflict: 155000, total: 635000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 850000, flood: 350000, conflict: 395000 },
      { quarter: 'Q2 2024', drought: 1100000, flood: 480000, conflict: 475000 },
      { quarter: 'Q3 2024', drought: 720000, flood: 310000, conflict: 415000 },
      { quarter: 'Q4 2024', drought: 930000, flood: 410000, conflict: 455000 }
    ]
  },
  KEN: {
    totalDisplaced: 580000,
    totalIDPs: 425000,
    returnees: 95000,
    climateDisplaced: 380000,
    conflictDisplaced: 200000,
    displacementByCause: [
      { cause: 'Drought', value: 220000, percentage: 38 },
      { cause: 'Floods', value: 120000, percentage: 21 },
      { cause: 'Cyclone', value: 40000, percentage: 7 },
      { cause: 'Conflict', value: 180000, percentage: 31 },
      { cause: 'Other', value: 20000, percentage: 3 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 28000, conflict: 15000, total: 43000 },
      { month: 'Feb', climate: 32000, conflict: 16000, total: 48000 },
      { month: 'Mar', climate: 38000, conflict: 18000, total: 56000 },
      { month: 'Apr', climate: 45000, conflict: 20000, total: 65000 },
      { month: 'May', climate: 52000, conflict: 22000, total: 74000 },
      { month: 'Jun', climate: 48000, conflict: 21000, total: 69000 },
      { month: 'Jul', climate: 40000, conflict: 19000, total: 59000 },
      { month: 'Aug', climate: 35000, conflict: 17000, total: 52000 },
      { month: 'Sep', climate: 32000, conflict: 16000, total: 48000 },
      { month: 'Oct', climate: 36000, conflict: 17000, total: 53000 },
      { month: 'Nov', climate: 42000, conflict: 19000, total: 61000 },
      { month: 'Dec', climate: 36000, conflict: 18000, total: 54000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 55000, flood: 28000, conflict: 44000 },
      { quarter: 'Q2 2024', drought: 72000, flood: 38000, conflict: 58000 },
      { quarter: 'Q3 2024', drought: 48000, flood: 25000, conflict: 47000 },
      { quarter: 'Q4 2024', drought: 62000, flood: 32000, conflict: 51000 }
    ]
  },
  ERI: {
    totalDisplaced: 285000,
    totalIDPs: 195000,
    returnees: 42000,
    climateDisplaced: 180000,
    conflictDisplaced: 105000,
    displacementByCause: [
      { cause: 'Drought', value: 110000, percentage: 39 },
      { cause: 'Floods', value: 55000, percentage: 19 },
      { cause: 'Cyclone', value: 15000, percentage: 5 },
      { cause: 'Conflict', value: 95000, percentage: 33 },
      { cause: 'Other', value: 10000, percentage: 4 }
    ],
    monthlyTrend: [
      { month: 'Jan', climate: 13000, conflict: 8000, total: 21000 },
      { month: 'Feb', climate: 15000, conflict: 8500, total: 23500 },
      { month: 'Mar', climate: 18000, conflict: 9500, total: 27500 },
      { month: 'Apr', climate: 21000, conflict: 10500, total: 31500 },
      { month: 'May', climate: 24000, conflict: 11000, total: 35000 },
      { month: 'Jun', climate: 22000, conflict: 10500, total: 32500 },
      { month: 'Jul', climate: 19000, conflict: 9500, total: 28500 },
      { month: 'Aug', climate: 16000, conflict: 8500, total: 24500 },
      { month: 'Sep', climate: 15000, conflict: 8000, total: 23000 },
      { month: 'Oct', climate: 17000, conflict: 9000, total: 26000 },
      { month: 'Nov', climate: 19000, conflict: 9500, total: 28500 },
      { month: 'Dec', climate: 16000, conflict: 9000, total: 25000 }
    ],
    quarterlyData: [
      { quarter: 'Q1 2024', drought: 25000, flood: 12000, conflict: 23000 },
      { quarter: 'Q2 2024', drought: 33000, flood: 17000, conflict: 29000 },
      { quarter: 'Q3 2024', drought: 22000, flood: 11000, conflict: 24000 },
      { quarter: 'Q4 2024', drought: 28000, flood: 14000, conflict: 26000 }
    ]
  }
};

export const getCountryData = (countryCode) => {
  return countryData[countryCode] || countryData.ALL;
};
