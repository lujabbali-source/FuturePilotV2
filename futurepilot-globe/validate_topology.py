import json
from pathlib import Path
p = Path('public/geo/countries-110m.json')
with p.open('r', encoding='utf-8') as f:
    data = json.load(f)
print('type=', data.get('type'))
print('objects=', sorted(data.get('objects', {}).keys()))
print('arcs_len=', len(data.get('arcs', [])))
print('bbox=', data.get('bbox'))
print('transform_keys=', sorted(data.get('transform', {}).keys()))
