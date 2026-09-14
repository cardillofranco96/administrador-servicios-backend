#!/usr/bin/env bash
set -euo pipefail

echo "Este script crea commits separados según la guía del README y hace push al remoto." 
echo "EDITA la variable ORIGIN_URL abajo antes de ejecutar."

ORIGIN_URL="git@github.com:TU_USUARIO/TU_REPO.git"

if [ "$ORIGIN_URL" = "git@github.com:TU_USUARIO/TU_REPO.git" ]; then
  echo "Por favor edita git-commands.sh y reemplaza ORIGIN_URL con la URL de tu repo remoto."
  exit 1
fi

git init
git branch -M main
git remote add origin "$ORIGIN_URL" || git remote set-url origin "$ORIGIN_URL"

echo "Commit 1: scaffold and config"
git add package.json src/app.js src/server.js src/config/env.config.js .env.example .gitignore || true
git commit -m "chore: scaffold express app, server and env config" || echo "No hay cambios para el commit 1"

echo "Commit 2: services router + ServiceManager"
git add src/routes/services.router.js src/managers/ServiceManager.js src/data/services.json || true
git commit -m "feat(services): add services router and ServiceManager (FS)" || echo "No hay cambios para el commit 2"

echo "Commit 3: controllers y bookings"
git add src/controllers src/managers/BookingManager.js src/routes/bookings.router.js src/data/bookings.json || true
git commit -m "feat(bookings): add BookingManager, bookings router and controllers" || echo "No hay cambios para el commit 3"

echo "Commit 4: migrate persistence to MongoDB"
git add src/models src/managers src/controllers/services.controller.js src/controllers/bookings.controller.js || true
git commit -m "feat(db): migrate persistence to MongoDB with Mongoose models and update managers" || echo "No hay cambios para el commit 4"

echo "Commit 5: views, socket.io and validation"
git add src/views src/public src/routes/views.router.js src/controllers/views.controller.js src/middlewares/validate.js || true
git commit -m "feat(ui): add Handlebars views, Socket.io client and server + validation middleware" || echo "No hay cambios para el commit 5"

echo "Commit 6: README"
git add README.md || true
git commit -m "chore(docs): add README" || echo "No hay cambios para el commit 6"

echo "Pushing to origin/main"
git push -u origin main

echo "Hecho. Revisa el remoto para confirmar los commits."
