#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${STATICRYPT_PASSWORD:-}" ]]; then
  echo "Error: STATICRYPT_PASSWORD must be set." >&2
  exit 1
fi

rm -rf dist
mkdir -p dist

cp ./*.html ./styles.css dist/
cp -R ./images dist/images

node scripts/inline-assets.mjs

npx staticrypt dist/*.html \
  --directory dist \
  --remember 7 \
  --template-title "FSABBL — Protected Site" \
  --template-instructions "Enter the shared laboratory password to continue." \
  --template-button "Unlock website" \
  --template-placeholder "Password" \
  --template-error "Incorrect password. Please try again." \
  --template-color-primary "#7a1024" \
  --template-color-secondary "#3f0712"

rm -rf dist/images dist/styles.css
touch dist/.nojekyll
