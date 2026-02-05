from __future__ import annotations
import sys
import os
import tempfile
import subprocess
import argparse
import socket

#!/usr/bin/env python3
"""
main.py - quick environment health check for Python development.
Checks: Python version, pip, venv module, subprocess ability, write permission,
and optionally network access to PyPI.
Exits 0 when all critical checks pass, non-zero otherwise.
"""
import importlib.util
import urllib.request

MIN_PY = (3, 8)


def ok(msg: str) -> None:
    print(f"[OK]   {msg}")


def fail(msg: str) -> None:
    print(f"[FAIL] {msg}")


def check_python_version() -> bool:
    ok_min = sys.version_info >= MIN_PY
    if ok_min:
        ok(f"Python version {sys.version.splitlines()[0]}")
        return True
    else:
        fail(f"Python {MIN_PY[0]}.{MIN_PY[1]}+ required, found {sys.version.splitlines()[0]}")
        return False


def check_pip() -> bool:
    # Prefer invoking pip via the current python to ensure matching interpreter
    try:
        out = subprocess.check_output([sys.executable, "-m", "pip", "--version"], stderr=subprocess.STDOUT, text=True, timeout=5)
        ok(f"pip available: {out.strip()}")
        return True
    except Exception as e:
        fail(f"pip not available via `{sys.executable} -m pip --version`: {e}")
        # try import fallback
        if importlib.util.find_spec("pip") is not None:
            ok("pip package importable")
            return True
        return False


def check_venv() -> bool:
    if importlib.util.find_spec("venv") is not None:
        ok("venv module available")
        return True
    else:
        fail("venv module not available")
        return False


def check_write_dir() -> bool:
    try:
        with tempfile.TemporaryDirectory() as td:
            p = os.path.join(td, "test.txt")
            with open(p, "w", encoding="utf-8") as f:
                f.write("ok")
            with open(p, "r", encoding="utf-8") as f:
                if f.read().strip() == "ok":
                    ok(f"Filesystem write/read OK in {td}")
                    return True
        fail("Filesystem write/read check failed")
        return False
    except Exception as e:
        fail(f"Filesystem write/read check raised: {e}")
        return False


def check_subprocess() -> bool:
    try:
        # trivial subprocess run
        subprocess.check_call([sys.executable, "-c", "import sys; sys.exit(0)"], timeout=5)
        ok("Subprocess execution works")
        return True
    except Exception as e:
        fail(f"Subprocess execution failed: {e}")
        return False


def check_network(timeout: float = 5.0) -> bool:
    # Try a lightweight HEAD to pypi.org
    try:
        req = urllib.request.Request("https://pypi.org/", method="HEAD")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            code = resp.getcode()
            ok(f"Network to pypi.org reachable (HTTP {code})")
            return True
    except Exception as e:
        fail(f"Network check to pypi.org failed: {e}")
        # also try simple DNS/socket check
        try:
            socket.gethostbyname("pypi.org")
            ok("DNS resolution for pypi.org succeeded")
            return True
        except Exception as e2:
            fail(f"DNS check failed: {e2}")
            return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Quick Python dev environment check")
    parser.add_argument("--network", action="store_true", help="also test network access to pypi.org")
    args = parser.parse_args()

    checks = [
        ("python_version", check_python_version),
        ("pip", check_pip),
        ("venv", check_venv),
        ("write_dir", check_write_dir),
        ("subprocess", check_subprocess),
    ]
    results = {}
    for name, fn in checks:
        try:
            results[name] = fn()
        except Exception as e:
            results[name] = False
            fail(f"Check {name} raised an exception: {e}")

    if args.network:
        try:
            results["network"] = check_network()
        except Exception as e:
            results["network"] = False
            fail(f"Network check raised an exception: {e}")

    print()
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    print(f"Summary: {passed}/{total} checks passed")

    # Consider python_version and pip critical; fail if either missing
    critical_ok = results.get("python_version", False) and results.get("pip", False)
    if critical_ok and passed == total:
        print("Environment looks good for development.")
        return 0
    elif critical_ok:
        print("Environment usable, but some non-critical checks failed.")
        return 0
    else:
        print("Critical problems detected; development environment not ready.")
        return 2


## main work
if __name__ == "__main__":
    raise SystemExit(main())
