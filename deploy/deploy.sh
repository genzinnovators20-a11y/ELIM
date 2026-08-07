#!/usr/bin/env bash
#
# ELIM FORGE — build and publish to the Contabo VPS.
#
# Usage:  ./deploy/deploy.sh user@your-server-ip
#
# Releases are timestamped and swapped in atomically via a symlink, so a deploy
# is never half-visible and a rollback is one `ln -sfn` away. Keeps the five
# most recent releases.

set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "usage: $0 user@host" >&2
  exit 1
fi

REMOTE_ROOT="${REMOTE_ROOT:-/var/www/elimforge}"
RELEASE="$(date +%Y%m%d%H%M%S)"

echo "▸ Building production bundle"
npm ci
npm run build

echo "▸ Uploading release $RELEASE"
ssh "$TARGET" "mkdir -p '$REMOTE_ROOT/releases/$RELEASE'"
rsync -az --delete dist/ "$TARGET:$REMOTE_ROOT/releases/$RELEASE/"

echo "▸ Activating"
ssh "$TARGET" "ln -sfn '$REMOTE_ROOT/releases/$RELEASE' '$REMOTE_ROOT/current' \
  && ls -1dt '$REMOTE_ROOT/releases'/*/ | tail -n +6 | xargs -r rm -rf \
  && sudo systemctl reload nginx"

echo "✓ Deployed $RELEASE"
