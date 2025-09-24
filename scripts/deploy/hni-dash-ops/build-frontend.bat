@echo off
echo Building Nuxt 3 Frontend for Static Generation...

cd /d "D:\VNPT\hni-dash-ops\frontend"

echo Installing dependencies...
npm install

echo Building for static generation...
npm run generate

echo Copying static files to IIS root...
robocopy "dist" "D:\Publish\IIS\hni-dash-ops" /E /XF "*.dll" "*.exe" "*.pdb" "*.xml" "*.deps" "*.runtimeconfig" "*.endpoints" "*.bat" "*.md" "*.txt" "*.config"

echo.
echo ✅ Frontend build complete!
echo Frontend: http://localhost (IIS)
echo Backend: http://localhost/swagger
echo.
pause
