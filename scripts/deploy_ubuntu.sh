#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEST_DIR="${DEST_DIR:-/var/www/zokodaily-frontend}"
NGINX_SERVICE="${NGINX_SERVICE:-nginx}"
BUILD_DIR="${BUILD_DIR:-${FRONTEND_ROOT}/dist}"
NODE_ENV="${NODE_ENV:-production}"
INSTALL_DEPS="${INSTALL_DEPS:-auto}"

if [[ "${EUID}" -eq 0 ]]; then
  SUDO=""
else
  SUDO="sudo"
fi

find_node() {
  if [[ -n "${NODE_BIN:-}" ]]; then
    printf '%s\n' "${NODE_BIN}"
    return
  fi
  local candidate
  for candidate in "$(command -v node 2>/dev/null || true)" "/usr/bin/node" "/usr/local/bin/node"; do
    if [[ -n "${candidate}" && -x "${candidate}" ]]; then
      printf '%s\n' "${candidate}"
      return
    fi
  done
  return 1
}

find_npm() {
  if [[ -n "${NPM_BIN:-}" ]]; then
    printf '%s\n' "${NPM_BIN}"
    return
  fi
  local candidate
  for candidate in "$(command -v npm 2>/dev/null || true)" "/usr/bin/npm" "/usr/local/bin/npm"; do
    if [[ -n "${candidate}" && -x "${candidate}" ]]; then
      printf '%s\n' "${candidate}"
      return
    fi
  done
  return 1
}

NODE_BIN="$(find_node)" || {
  echo "Node.js executable not found." >&2
  exit 1
}

NPM_BIN="$(find_npm)" || {
  echo "npm executable not found." >&2
  exit 1
}

cd "${FRONTEND_ROOT}"

export NODE_ENV

should_install_deps="false"
if [[ "${INSTALL_DEPS}" == "true" ]]; then
  should_install_deps="true"
elif [[ "${INSTALL_DEPS}" == "auto" && ! -d "${FRONTEND_ROOT}/node_modules" ]]; then
  should_install_deps="true"
fi

if [[ "${should_install_deps}" == "true" ]]; then
  echo "Installing frontend dependencies..."
  "${NPM_BIN}" ci
fi

echo "Building frontend..."
"${NPM_BIN}" run build

if [[ ! -d "${BUILD_DIR}" ]]; then
  echo "Build output directory not found: ${BUILD_DIR}" >&2
  exit 1
fi

echo "Deploying build artifacts to ${DEST_DIR}..."
${SUDO} mkdir -p "${DEST_DIR}"

if command -v rsync >/dev/null 2>&1; then
  ${SUDO} rsync -a --delete "${BUILD_DIR}/" "${DEST_DIR}/"
else
  ${SUDO} find "${DEST_DIR}" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  ${SUDO} cp -a "${BUILD_DIR}/." "${DEST_DIR}/"
fi

echo "Reloading nginx..."
${SUDO} systemctl reload "${NGINX_SERVICE}"

echo "Frontend deployed successfully."
echo "Node: ${NODE_BIN}"
echo "npm: ${NPM_BIN}"
echo "Destination: ${DEST_DIR}"
echo "Nginx service: ${NGINX_SERVICE}"
