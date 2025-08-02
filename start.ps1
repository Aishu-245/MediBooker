Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Starting healthcare appointment system..." -ForegroundColor Green
$env:NODE_ENV = "development"
npx tsx server/index.ts