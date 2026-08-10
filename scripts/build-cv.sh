#!/usr/bin/env bash
# Renders every cv/*.yaml to public/<name>.pdf using RenderCV (Typst-based, no LaTeX needed).
# e.g. cv/research_cv.yaml -> public/research_cv.pdf
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

shopt -s nullglob
found=0
for yaml in "$repo_root"/cv/*.yaml; do
  found=1
  name="$(basename "$yaml" .yaml)"
  "$venv/bin/rendercv" render "$yaml" \
    --output-folder "$repo_root/cv/build" \
    --pdf-path "$repo_root/public/$name.pdf" \
    --dont-generate-markdown \
    --dont-generate-html \
    --dont-generate-png
  echo "Wrote public/$name.pdf"
done

if [ "$found" -eq 0 ]; then
  echo "error: no cv/*.yaml files found to render." >&2
  exit 1
fi
