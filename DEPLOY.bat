@echo off
REM ============================================================
REM   Arpit Furniture Works - Firebase par live karein
REM   Double-click karein. Bas itna hi.
REM
REM   NOTE: cmd me "N)" likhne se ")" block band kar deta hai,
REM   isliye yahan har sa step "1 -" aur "2 -" ki tarah likha hai.
REM ============================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo  ##########################################################
echo.
echo    ARPIT FURNITURE WORKS   -   WEBSITE LIVE KARNE KA TOOL
echo.
echo    Firebase Hosting - free
echo.
echo  ##########################################################
echo.

REM ================= 0. Node check =================
where node >nul 2>nul
if errorlevel 1 goto NO_NODE

for /f "delims=" %%v in ('node -v') do set "NODEV=%%v"
echo  [OK]  Node.js !NODEV!
goto HAVE_NODE

:NO_NODE
echo  [X] Node.js nahi mila.
echo.
echo      1 - https://nodejs.org kholein
echo      2 - "LTS" wala green button dabayein
echo      3 - Install karein
echo      4 - Ye file dobara chalayein
echo.
pause
exit /b 1

:HAVE_NODE

REM ================= 1. Project ID padho =================
set "PROJECTID="

if exist "%~dp0project-id.txt" (
  for /f "usebackq delims=" %%p in ("%~dp0project-id.txt") do (
    if not defined PROJECTID set "PROJECTID=%%p"
  )
)

if not defined PROJECTID (
  for /f "delims=" %%p in ('node -p "JSON.parse(require('fs').readFileSync('./.firebaserc','utf8')).projects.default" 2^>nul') do set "PROJECTID=%%p"
)

if defined PROJECTID (
  set "PROJECTID=!PROJECTID:"=!"
  for /f "tokens=1" %%p in ("!PROJECTID!") do set "PROJECTID=%%p"
)
if not defined PROJECTID set "PROJECTID=NADA"

REM ---- validation: Firebase id = chhake akshar, number, "-" ; 6 se 30 akshar
set "VALID=NO"
for /f "delims=" %%v in ('node -e "const p=process.argv[1];console.log(/^[a-z0-9][a-z0-9-]{4,28}[a-z0-9]$/.test(p)?'YES':'NO')" "!PROJECTID!" 2^>nul') do set "VALID=%%v"

if /i not "!VALID!"=="YES" goto SETUP

set "LIVEURL=https://!PROJECTID!.web.app"
echo  [OK]  Firebase project: !PROJECTID!
echo.

REM ================= 2. Install =================
echo  [1/3]  Packages install ho rahe hain...  (2-3 minute, sirf ek baar)
echo.
call npm install
if errorlevel 1 goto INSTALL_FAIL
echo.

REM ================= 3. Build =================
echo  [2/3]  Website banayi ja rahi hai...
echo.
call npm run build
if errorlevel 1 goto BUILD_FAIL
echo.

REM ================= 4. Deploy =================
echo  [3/3]  Firebase par live ho rahi hai...
echo.
echo  ------------------------------------------------------------
echo    Ab ek browser tab khulega. Usme Google login karein
echo    (jis Gmail se Firebase project banaya tha wahi).
echo.
echo    "Allow" ya "Continue" dabate jayein.
echo    Free hai - koi card nahi lagta.
echo  ------------------------------------------------------------
echo.

call npx firebase login
if errorlevel 1 goto LOGIN_FAIL

echo.
call npx firebase deploy --only hosting --project "!PROJECTID!"
if errorlevel 1 goto DEPLOY_FAIL

goto DONE

REM ================================================================
REM  ERROR PATHS
REM ================================================================

:INSTALL_FAIL
echo.
echo  [X] npm install fail hua. Internet connection check karein.
pause
exit /b 1

:BUILD_FAIL
echo.
echo  [X] Build fail hua. Upar ka error dekhein.
pause
exit /b 1

:LOGIN_FAIL
echo.
echo  [!]  Login cancel ya fail ho gaya. Dobara chalayein.
pause
exit /b 1

:DEPLOY_FAIL
echo.
echo  [X] Deploy fail hua. Upar ka error dekhein.
echo.
echo      Aam wajah: Hosting enable nahi hai.
echo      Firebase console me Hosting kholein aur "Get started" dabayein.
pause
exit /b 1

REM ================================================================
REM  SETUP WALKTHROUGH (project id nahi mili)
REM ================================================================

:SETUP
echo  ==========================================================
echo    STEP 1  -  Firebase project banao   (ek baar, 3 minute)
echo  ==========================================================
echo.
echo    A - Ye link browser me kholein:
echo.
echo        https://console.firebase.google.com/
echo.
echo    B - "Add project" par click karein
echo.
echo    C - Project ka naam likhein:
echo.
echo        arpit-furniture-works
echo.
echo        Sirf CHHOKE akshar (a-z), number aur "-".
echo        Space ya capital letter NAHI.
echo.
echo    D - Analytics OFF kar dein
echo.
echo    E - "Create project" dabayein
echo.
echo    F - Left menu me "Hosting" icon par click karein
echo        phir "Get started" dabayein
echo.
echo    G - Screen par "Your project ID" dikhega, kuch aisa:
echo.
echo        arpit-furniture-works-abc12
echo.
echo    H - Ise copy karein.
echo.
echo  ==========================================================
echo    STEP 2  -  ID yahan daalein
echo  ==========================================================
echo.
echo    project-id.txt kholein:
echo.
echo        C:\Users\kumar\Documents\Default Project
echo        \furniture-website\project-id.txt
echo.
echo    Uski saari lines mita kar sirf ye likhein:
echo.
echo        arpit-furniture-works-abc12
echo.
echo    (SIRF ek line. Na instructions, na kuch aur.)
echo.
echo  ==========================================================
echo    PHIR YE FILE DOBARA DOUBLE-CLICK KAREEIN.
echo  ==========================================================
echo.
pause
exit /b 0

REM ================================================================
REM  SUCCESS
REM ================================================================

:DONE
echo.
echo.
echo  ##########################################################
echo.
echo    AAPKI WEBSITE LIVE HAI
echo.
echo    Link:
echo.
echo      !LIVEURL!
echo.
echo    Ye bhi chalta hai:
echo.
echo      https://!PROJECTID!.firebaseapp.com
echo.
echo  ##########################################################
echo.
echo !LIVEURL!> "%~dp0LIVE-URL.txt"
echo  Link LIVE-URL.txt file me save ho gaya hai.
echo.
echo !LIVEURL! | clip
echo  Clipboard me copy ho gaya - WhatsApp par seedha Ctrl+V.
echo.
start "" "!LIVEURL!"
echo  Browser me bhi khol diya hai.
echo.
echo  ------------------------------------------------------------
echo    Apna domain (arpitfurnitureworks.com) lagana hai?
echo    DEPLOY.md padhein - poori step-by-step usi me hai.
echo
echo    Badlav ke baad:  npm run deploy
echo  ------------------------------------------------------------
echo.
pause
