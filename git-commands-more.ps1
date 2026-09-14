#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

$OriginUrl = 'git@github.com:TU_USUARIO/TU_REPO.git'
if ($OriginUrl -eq 'git@github.com:TU_USUARIO/TU_REPO.git') {
  Write-Host 'Por favor edita git-commands-more.ps1 y reemplaza $OriginUrl con la URL de tu repo remoto.' -ForegroundColor Yellow
  exit 1
}

git add test .github . -ErrorAction SilentlyContinue
git commit -m 'test(ci): add basic node:test and GitHub Actions workflow' -ErrorAction SilentlyContinue
git push origin main -ErrorAction SilentlyContinue
Write-Host 'Hecho: commits adicionales preparados (ejecuta en tu máquina).'
