# Healthcare Appointment System

A vanilla React healthcare appointment booking system with class components, pure CSS, and static data.

## Features
- Browse available doctors with search functionality
- View detailed doctor profiles
- Book appointments with form validation
- Responsive design with flexbox and media queries
- Purple medical theme design

## Local Development

### Windows
1. Double-click `start.bat` to install dependencies and start the server
2. Or run: `npx cross-env NODE_ENV=development npx tsx server/index.ts`

### Mac/Linux
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5000`

## Deployment on Vercel

### Option 1: Deploy Client Only (Recommended)
1. Go to vercel.com and import your GitHub repository
2. Set the **Root Directory** to `client`
3. Vercel will automatically detect it's a Vite project
4. Deploy!

### Option 2: Full Project Deploy
1. Use the included `vercel.json` configuration
2. Push to GitHub and connect to Vercel
3. Vercel will build the client folder automatically

## Project Structure
```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── data/           # Static mock data
│   │   └── index.css       # Pure CSS styles
│   ├── package.json        # Client dependencies
│   └── vite.config.js      # Vite configuration
├── vercel.json             # Vercel deployment config
└── start.bat               # Windows startup script
```

## Technologies Used
- React 18 (Class Components)
- Wouter (Routing)
- Pure CSS with Flexbox
- Static JSON Data
- Vite (Build Tool)