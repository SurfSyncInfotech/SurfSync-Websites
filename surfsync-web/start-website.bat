@echo off
rem Double-click to run the website: installs packages the first time, starts the server and opens the browser.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing packages, first run only...
  call npm install
)
start "" http://127.0.0.1:5500/
call npm run dev
pause
