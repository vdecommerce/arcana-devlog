"""Import the verified Venus render comparison with explicit provenance."""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--source-project', required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
run = Path(args.source_project) / 'Saved/AgentRuns/planet-parity-20261015'
rows = [
    ('venus-mobile-before', run / 'native-planet-baseline/Level_2_Venus-game.png', 'Mobiele Unreal-preview vóór herstel · Windows, geen headsetbeeld'),
    ('venus-mobile-restored', run / 'native-mobile-final-planets/Level_2_Venus-game.png', 'Mobiele Unreal-preview na herstel · Windows, geen headsetbeeld'),
    ('venus-native-desktop-reference', run / 'native-planet-desktop-reference/Level_2_Venus-game.png', 'Oorspronkelijke desktoprender · dezelfde gerichte camera'),
]
manifest_path = root / 'content/media.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
for key, source, label in rows:
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((1400, 1000), Image.Resampling.LANCZOS)
        target = root / 'public/assets/media' / (key + '.webp')
        image.save(target, 'WEBP', quality=86, method=6)
        manifest[key] = {'path': 'assets/media/' + target.name, 'width': image.width,
                         'height': image.height, 'revision': hashlib.sha256(target.read_bytes()).hexdigest()[:12],
                         'historical': True, 'label': label}
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps({'imported': len(rows), 'metadata_removed': True, 'headset_images': 0}))
