#!/usr/bin/env bash
#
# Vercel install step.
#
# This lives in a file rather than inline in vercel.json because Vercel caps
# installCommand at 256 characters, and the Chromium dependency list alone is
# longer than that.
#
# Prerendering needs a working Chromium. Vercel's build image ships neither the
# browser nor the shared libraries it links against, and `playwright
# install-deps` only knows apt while this image is Amazon Linux — so the
# packages are requested here under their Amazon Linux names.
#
# The package install is allowed to fail. If a future image already has them,
# or renames them again, that should not turn into a hard build error before
# Playwright has even had a chance to try. If the libraries really are missing,
# the prerender step fails loudly a moment later with a clear message, which is
# a better failure than an opaque one here.
set -u

PKGS="nss nspr atk at-spi2-atk cups-libs libdrm libXcomposite libXdamage \
libXext libXfixes libXrandr mesa-libgbm alsa-lib pango libxkbcommon"

echo "→ installing Chromium system libraries"
if command -v dnf >/dev/null 2>&1; then
  # shellcheck disable=SC2086
  dnf install -y $PKGS || echo "  dnf could not install them; continuing"
elif command -v yum >/dev/null 2>&1; then
  # shellcheck disable=SC2086
  yum install -y $PKGS || echo "  yum could not install them; continuing"
else
  echo "  no dnf or yum on this image; continuing"
fi

echo "→ installing dependencies"
yarn install --frozen-lockfile

echo "→ installing Chromium"
npx --yes playwright install chromium
