#!/usr/bin/env bash
# Fixes blank page + "Cannot find module './NNN.js'" by removing stale .next
# and killing leftover Next listeners so you always hit one dev server.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "reloadux: freeing ports 3000–3002 (stale Next.js listeners)..."
for port in 3000 3001 3002; do
  pids=$(lsof -ti:"$port" -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "  port $port → kill $pids"
    kill -9 $pids 2>/dev/null || true
  fi
done

echo "reloadux: removing .next (corrupt webpack chunks cause white screen / 500)..."
rm -rf .next

NEXT_BIN="$ROOT/node_modules/.bin/next"
if [ ! -x "$NEXT_BIN" ]; then
  echo "reloadux: run npm install first (missing node_modules/.bin/next)" >&2
  exit 1
fi

echo "reloadux: starting Next.js with Turbopack on http://localhost:3000"
exec "$NEXT_BIN" dev --turbopack -p 3000
