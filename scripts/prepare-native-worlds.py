"""Publish checked mobile world previews without changing historical post images."""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--source-project', required=True)
parser.add_argument('--renders-dir', default='Saved/AgentRuns/planet-parity-20261015/native-mobile-final-worlds')
parser.add_argument('--build-version', type=int, default=20)
parser.add_argument('--worlds', nargs='+', choices=['saturn','venus','jupiter','mercury','mars','moon','sun','earth'],
                    help='Only refresh these worlds; keep other published versions intact')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
renders = Path(args.source_project) / args.renders_dir
rows = [('saturn','Level_1_QuestLink'),('venus','Level_2_Venus'),('jupiter','Level_3_Jupiter'),
        ('mercury','Level_4_Mercury'),('mars','Level_5_Mars'),('moon','Level_6_Moon'),('sun','Level_7_Sun'),('earth','Earth')]
if args.worlds:
    rows = [(key, name) for key, name in rows if key in args.worlds]
for key, name in rows:
    source = renders / (name + '-game.png')
    report = (renders / (name + '-review.txt')).read_text(encoding='utf-8-sig')
    if not source.is_file() or 'collision_errors=0' not in report:
        raise RuntimeError('A checked world render is missing: ' + key)
    if args.build_version >= 22 and 'inlay_errors=0' not in report:
        raise RuntimeError('Trial inlay review is missing: ' + key)
manifest_path = root / 'content/media.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
posts_path = root / 'content/posts.json'
posts = json.loads(posts_path.read_text(encoding='utf-8'))
for key, name in rows:
    image_key = key + '-game'
    historical_key = image_key + '-before-native' + str(args.build_version)
    if historical_key not in manifest:
        old = manifest[image_key]
        historical_path = 'assets/media/' + historical_key + '.webp'
        shutil.copyfile(root / 'public' / old['path'], root / 'public' / historical_path)
        manifest[historical_key] = {**old, 'path': historical_path, 'historical': True,
                                    'label': 'Eerder gepubliceerde Windows-spelrender · vóór ontwikkelversie ' + str(args.build_version)}
    for post in posts:
        if post['image'] == image_key:
            post['image'] = historical_key
        for section in post['sections']:
            for item in section.get('images', []):
                if item['image'] == image_key:
                    item['image'] = historical_key
    with Image.open(renders / (name + '-game.png')) as image:
        image = image.convert('RGB')
        image.thumbnail((1400, 1000), Image.Resampling.LANCZOS)
        target = root / 'public/assets/media' / (image_key + '.webp')
        image.save(target, 'WEBP', quality=86, method=6)
        manifest[image_key] = {'path': 'assets/media/' + target.name, 'width': image.width,
                               'height': image.height, 'revision': hashlib.sha256(target.read_bytes()).hexdigest()[:12],
                               'label': 'Mobiele Unreal-preview op Windows · ontwikkelversie ' + str(args.build_version) + ' · geen headsetbeeld'}
worlds_path = root / 'content/worlds.json'
worlds = json.loads(worlds_path.read_text(encoding='utf-8'))
for world in worlds:
    if world['screen'] not in {key + '-game' for key, _ in rows}:
        continue
    world['buildVersion'] = args.build_version
    world['updated'] = '2026-10-15'
    world['renderNote'] = 'Nieuw gecontroleerd beeld uit de mobiele Unreal-renderer op Windows. Dit beeld bevestigt geen headsetweergave of framerate; de actuele Quest-status staat op de testpagina.'
for path, value in [(manifest_path,manifest),(posts_path,posts),(worlds_path,worlds)]:
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps({'mobile_previews':len(rows),'historical_images_preserved':True,'headset_images':0}))
