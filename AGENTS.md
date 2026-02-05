# Repository Guidelines

## Project Structure & Module Organization.

- `main.py` contains the environment health check CLI and is the primary entry point.
- `test.py` is currently empty and can be repurposed or replaced by a `tests/` directory as the test suite grows.
- Keep any new modules small and focused (for example, `checks/` for individual health checks) and import them from `main.py`.

## Build, Test, and Development Commands.

- `python main.py` runs the core health checks (Python version, pip, venv, filesystem, subprocess).
- `python main.py --network` adds a lightweight network check to `pypi.org`.
- `python -m venv .venv` creates a local virtual environment if you add dependencies later.

## Coding Style & Naming Conventions

- Use PEP 8 formatting with 4-space indentation.
- Prefer explicit, readable code and type hints for public functions.
- Use `snake_case` for functions and variables and `UPPER_SNAKE_CASE` for constants (e.g., `MIN_PY`).
- No formatter or linter is configured yet; if you add one, document it here (e.g., `ruff`, `black`).

## Testing Guidelines

- No testing framework is configured yet.
- If you add tests, use `pytest` with files named `test_*.py` inside a `tests/` directory.
- Example: `python -m pytest` to run the suite once added.

## Commit & Pull Request Guidelines

- This repository does not currently have Git history, so no commit conventions are established.
- Recommended format: `type: short description` (e.g., `feat: add optional DNS check`).
- PRs should include a short summary, how to run or verify changes, and any expected output changes.

## Security & Configuration Tips

- The `--network` check makes outbound requests; use it only when network access is permitted.
- Avoid hardcoding sensitive values; prefer environment variables if configuration is added.
