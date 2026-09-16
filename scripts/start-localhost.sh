#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Installing dependencies..."
npm ci

echo "Building site..."
npm run build

echo ""
echo "Starting preview at http://localhost:5173"
echo "Press Ctrl+C to stop."
echo ""

exec npx astro preview --host 127.0.0.1 --port 5173
