@echo off
cd /d %~dp0
setlocal enabledelayedexpansion

echo ==========================================
echo      UPSIDEDOWN – INSTALACIJA PROJEKTA
echo ==========================================
echo.

REM Provjera Node.js
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [✘] Node.js nije pronađen. Instaliraj s: https://nodejs.org/
    pause
    exit /b 1
)

REM Prikaz verzija
echo [✔] Node.js verzija:
node -v
echo [✔] npm verzija:
npm -v
echo.

REM =============================
REM  BACKEND
REM =============================
IF NOT EXIST backend (
    echo [✘] Folder "backend" nije pronađen!
    pause
    exit /b 1
)

echo [→] Instaliram backend ovisnosti...
pushd backend
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [✘] Greška pri instalaciji backend paketa!
    popd
    pause
    exit /b 1
)
popd

REM =============================
REM  QUASAR (FRONTEND)
REM =============================
IF NOT EXIST quasar-project (
    echo [✘] Folder "quasar-project" nije pronađen!
    pause
    exit /b 1
)

echo.
echo [→] Instaliram frontend (Quasar) ovisnosti...
pushd quasar-project
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [✘] Greška pri instalaciji Quasar paketa!
    popd
    pause
    exit /b 1
)

REM Provjera Quasar CLI
where quasar >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [→] Instaliram Quasar CLI globalno...
    npm install -g @quasar/cli
    IF %ERRORLEVEL% NEQ 0 (
        echo [✘] Ne mogu instalirati Quasar CLI!
        popd
        pause
        exit /b 1
    )
) ELSE (
    echo [✔] Quasar CLI je već instaliran.
)
popd

echo.
echo [✔] Instalacija završena uspješno!

REM =============================
REM  POKRETANJE BACKENDA I FRONTENDA
REM =============================
echo [→] Pokrećem backend i frontend u novim terminalima...

start "Backend Server" cmd /k "cd /d %CD%\backend && node api.js"
start "Frontend (Quasar)" cmd /k "cd /d %CD%\quasar-project && quasar dev"

echo.
echo [✔] Sve pokrenuto! Provjeri otvorene terminale.
pause
