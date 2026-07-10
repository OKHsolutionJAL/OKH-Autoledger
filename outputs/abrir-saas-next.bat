@echo off
setlocal
cd /d "%~dp0.."
echo Iniciando OKH AutoLedger SaaS em http://127.0.0.1:3001
echo.
start "OKH AutoLedger SaaS" cmd /k "pnpm.cmd run dev:3001"
timeout /t 8 /nobreak >nul
start "" "http://127.0.0.1:3001/login?locale=pt"
endlocal
