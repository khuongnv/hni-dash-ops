@echo off
echo Starting HNI Dashboard Operations...

echo.
echo Starting Backend API...
start "Backend API" cmd /k "dotnet HniDashOps.API.dll"

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "node server/index.mjs"

echo.
echo Both services are starting...
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:3000
echo Swagger UI: http://localhost:5000/swagger

pause

