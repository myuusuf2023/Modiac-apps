# IGAD Mobility Watch Dashboard

A comprehensive dashboard system for monitoring and analyzing mobility patterns, displacement trends, and migration data across the IGAD (Intergovernmental Authority on Development) region in East Africa.

## Overview

This dashboard provides interactive visualizations and analytics for tracking population movements, conflict-related displacements, and climate-induced migrations across countries including Djibouti, Eritrea, Ethiopia, Kenya, Somalia, South Sudan, Sudan, and Uganda.

## Features

- **Interactive Data Visualizations**: Dynamic charts and graphs using Recharts library
- **Multi-Country Analysis**: Track trends across 8 IGAD member countries
- **Quarterly Breakdowns**: Analyze data by quarters and time periods
- **Climate vs Conflict Analysis**: Compare displacement drivers
- **Age and Gender Demographics**: Detailed demographic breakdowns
- **Export Capabilities**: Download reports as PDF or CSV
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`

- **Git**
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

## Installation Guide

Follow these steps to set up the project on your local machine:

### Step 1: Clone the Repository

```bash
git clone https://github.com/myuusuf2023/Modiac-apps.git
cd Modiac-apps/igad-dashboard
```

### Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React 19.0.0
- Recharts for data visualization
- Tailwind CSS for styling
- Vite for fast development builds
- html2canvas and jsPDF for PDF export functionality

### Step 3: Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
```

### Step 4: Start Development Server

Run the development server:

```bash
npm run dev
```

The application will start and be accessible at:
- Local: `http://localhost:5173` (or another port if 5173 is in use)
- Network: Check the terminal output for the network URL

### Step 5: View in Browser

Open your web browser and navigate to `http://localhost:5173`

You should see the IGAD Mobility Watch Dashboard with:
- Country selector dropdown
- Interactive charts and visualizations
- Data tables
- Export buttons

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot-reload at `http://localhost:5173`

### Build for Production

```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview Production Build

```bash
npm run preview
```
Preview the production build locally before deployment

## Project Structure

```
igad-dashboard/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.jsx          # Main dashboard component
│   │   └── DownloadButton.jsx     # PDF/CSV export component
│   ├── data/
│   │   └── mockData.js            # Sample data for visualization
│   ├── utils/                     # Utility functions
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # This file
```

## Technologies Used

- **React 19**: Modern UI library for building user interfaces
- **Vite**: Next-generation frontend tooling for fast builds
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library built on React components
- **jsPDF**: PDF generation library
- **html2canvas**: Screenshot library for HTML elements

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Vite

Build and development settings are in `vite.config.js`

## Data Source

The dashboard currently uses mock data from `src/data/mockData.js`. To connect to a real API:

1. Create an API service file in `src/utils/`
2. Replace mock data imports with API calls
3. Update the data fetching logic in components

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the correct URL.

### Dependencies Installation Issues

If you encounter issues during `npm install`:

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Reinstall:
   ```bash
   npm install
   ```

### Build Errors

If you encounter build errors:

1. Ensure Node.js version is 16.x or higher
2. Check that all dependencies are properly installed
3. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized static files ready for deployment.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is part of the ICPAC (IGAD Climate Prediction and Applications Centre) initiative.

## Contact

For questions or support, please contact:
- Repository: https://github.com/myuusuf2023/Modiac-apps

## Acknowledgments

- IGAD (Intergovernmental Authority on Development)
- ICPAC (IGAD Climate Prediction and Applications Centre)
- All contributors and data providers

---

Last Updated: February 2026
