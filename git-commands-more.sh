#!/usr/bin/env bash
set -euo pipefail

ORIGIN_URL="git@github.com:TU_USUARIO/TU_REPO.git"

if [ "$ORIGIN_URL" = "git@github.com:TU_USUARIO/TU_REPO.git" ]; then
  echo "Por favor edita git-commands-more.sh y reemplaza ORIGIN_URL con la URL de tu repo remoto."
  exit 1
fi

git add test .github .
git commit -m "test(ci): add basic node:test and GitHub Actions workflow" || echo "No hay cambios a commitear"
git push origin main || echo "Push fallido; revisa tu remoto y permisos"

echo "Hecho: commits adicionales aplicados localmente (ejecuta en tu máquina)."
