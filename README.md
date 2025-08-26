# a2drew.com - Personal Health Dashboard

A React-based health dashboard displaying comprehensive Apple Health data analytics.

## Features

- **Health Dashboard**: Interactive overview of 9+ years of Apple Health data
- **3.66M Health Records**: Steps, heart rate, workouts, and activity tracking
- **464+ Workouts**: Detailed workout analytics and activity breakdown
- **Strava Integration**: Connect and display running activities
- **Responsive Design**: Modern UI built with styled-components
- **Static Deployment**: Optimized for GitHub Pages with custom domain

## Data Processing

- Converts 1.1GB Apple Health XML export to optimized 0.8MB JSON
- Python processing scripts for efficient data extraction
- Daily aggregation and statistical analysis
- Privacy-focused: processes data locally

## Tech Stack

- React 18 with React Router
- Styled Components for UI
- Python for data processing
- GitHub Pages for hosting

## Live Site

Visit [a2drew.com](https://a2drew.com) to see the live dashboard.

## Development

```bash
npm install
npm start
```

## Health Data Processing

```bash
./scripts/process_health.sh
```

---

*Health data frozen as of deployment date for static website display.*
