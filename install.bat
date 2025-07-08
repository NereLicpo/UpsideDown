@echo off
cd /d %~dp0
setlocal enabledelayedexpansion

echo ==========================================
echo       UPSIDEDOWN - INSTALACIJA PROJEKTA
echo ==========================================
echo.

REM Provjera Node.js
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [GRESKA] Node.js nije pronađen.
    pause
    exit /b 1
)

REM Verzije
echo [OK] Node.js verzija:
node -v
for /f %%i in ('npm -v') do echo [OK] npm verzija: %%i
echo.

REM =============================
REM  BACKEND
REM =============================
echo [INFO] Instaliram backend ovisnosti...
pushd backend
call npm install || exit /b 0
popd
echo [OK] Backend instaliran.
pause



REM =============================
REM  FRONTEND - QUASAR
REM =============================
echo [INFO] Instaliram frontend (Quasar) ovisnosti...
pushd quasar-project
call npm install || exit /b 0

REM Provjera Quasar CLI
where quasar >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [INFO] Instaliram Quasar CLI...
    call npm install -g @quasar/cli || exit /b 0
) ELSE (
    echo [OK] Quasar CLI je već instaliran.
)
popd
echo [OK] Frontend instaliran.
pause



REM =============================
REM  POKRETANJE
REM =============================
echo [INFO] Pokrećem backend i frontend...

start "Backend Server" cmd /k "cd /d %CD%\backend && node api.js"
start "Frontend (Quasar)" cmd /k "cd /d %CD%\quasar-project && quasar dev"

echo [OK] Sve pokrenuto! Provjeri otvorene terminale.
pause