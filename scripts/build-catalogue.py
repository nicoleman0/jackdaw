#!/usr/bin/env python3
"""Build jackdaw.css and the design catalogue from the package styles."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
index = (root / 'index.css').read_text()
files = re.findall(r'@import "\./([^" ]+)";', index)
styles = '@layer jackdaw.tokens, jackdaw.base, jackdaw.components;\n' + '\n'.join((root / name).read_text() for name in files)
(root / 'jackdaw.css').write_text('/* Generated from index.css by scripts/build-catalogue.py. Do not edit. */\n' + styles)
template = (root / 'catalogue.template.html').read_text()
(root / 'catalogue.html').write_text(template.replace('/* JACKDAW_STYLES */', styles))
