#!/usr/bin/env bash
# Renders cv/cv.yaml to public/cv.pdf using RenderCV (Typst-based, no LaTeX needed).
# Requires either uv, or Python >= 3.11 on PATH.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
venv="$repo_root/cv/.venv"

if [ ! -x "$venv/bin/rendercv" ]; then
  if command -v uv >/dev/null 2>&1; then
    uv venv --python 3.12 "$venv"
    uv pip install --python "$venv/bin/python" -r "$repo_root/cv/requirements.txt"
  else
    python_bin="$(command -v python3.13 || command -v python3.12 || command -v python3.11 || true)"
    if [ -z "$python_bin" ]; then
      echo "error: RenderCV needs Python >= 3.11 (or uv). Install one and re-run." >&2
      exit 1
    fi
    "$python_bin" -m venv "$venv"
    "$venv/bin/pip" install --quiet --upgrade pip
    "$venv/bin/pip" install --quiet -r "$repo_root/cv/requirements.txt"
  fi
fi

"$venv/bin/rendercv" render "$repo_root/cv/cv.yaml" \
  --output-folder "$repo_root/cv/build" \
  --pdf-path "$repo_root/public/cv.pdf" \
  --dont-generate-markdown \
  --dont-generate-html \
  --dont-generate-png

echo "Wrote $repo_root/public/cv.pdf"
