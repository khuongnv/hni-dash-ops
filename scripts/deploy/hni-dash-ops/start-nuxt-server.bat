@echo off
echo Starting Nuxt 3 Server...

cd /d "D:\VNPT\hni-dash-ops\frontend"

echo Installing dependencies...
npm install

echo Starting Nuxt 3 development server...
echo Frontend will be available at: http://localhost:3000
echo Backend API: http://localhost (IIS)

npm run dev
