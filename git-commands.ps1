<#
  PowerShell script para crear commits separados y hacer push.
  Edita la variable $OriginUrl antes de ejecutar.
#>

$ErrorActionPreference = 'Stop'

$OriginUrl = 'git@github.com:TU_USUARIO/TU_REPO.git'

if ($OriginUrl -eq 'git@github.com:TU_USUARIO/TU_REPO.git') {
  Write-Host 'Por favor edita git-commands.ps1 y reemplaza $OriginUrl con la URL de tu repo remoto.' -ForegroundColor Yellow
  exit 1
}

git init
git branch -M main
try { git remote add origin $OriginUrl } catch { git remote set-url origin $OriginUrl }

Write-Host 'Commit 1: scaffold and config'
git add package.json src/app.js src/server.js src/config/env.config.js .env.example .gitignore -ErrorAction SilentlyContinue
git commit -m 'chore: scaffold express app, server and env config' -ErrorAction SilentlyContinue

Write-Host 'Commit 2: services router + ServiceManager'
git add src/routes/services.router.js src/managers/ServiceManager.js src/data/services.json -ErrorAction SilentlyContinue
git commit -m 'feat(services): add services router and ServiceManager (FS)' -ErrorAction SilentlyContinue

Write-Host 'Commit 3: controllers y bookings'
git add src/controllers src/managers/BookingManager.js src/routes/bookings.router.js src/data/bookings.json -ErrorAction SilentlyContinue
git commit -m 'feat(bookings): add BookingManager, bookings router and controllers' -ErrorAction SilentlyContinue

Write-Host 'Commit 4: migrate persistence to MongoDB'
git add src/models src/managers src/controllers/services.controller.js src/controllers/bookings.controller.js -ErrorAction SilentlyContinue
git commit -m 'feat(db): migrate persistence to MongoDB with Mongoose models and update managers' -ErrorAction SilentlyContinue

Write-Host 'Commit 5: views, socket.io and validation'
git add src/views src/public src/routes/views.router.js src/controllers/views.controller.js src/middlewares/validate.js -ErrorAction SilentlyContinue
git commit -m 'feat(ui): add Handlebars views, Socket.io client and server + validation middleware' -ErrorAction SilentlyContinue

Write-Host 'Commit 6: README'
git add README.md -ErrorAction SilentlyContinue
git commit -m 'chore(docs): add README' -ErrorAction SilentlyContinue

Write-Host 'Pushing to origin/main'
git push -u origin main

Write-Host 'Hecho. Revisa el remoto para confirmar los commits.'
