"""Import only selected public images; the Unreal project stays outside this repo."""
import argparse,json
from pathlib import Path
from PIL import Image
parser=argparse.ArgumentParser();parser.add_argument('--source-project',required=True);parser.add_argument('--renders-dir')
args=parser.parse_args()
source=Path(args.source_project).resolve();root=Path(__file__).resolve().parents[1]
target=root/'public/assets/media';target.mkdir(parents=True,exist_ok=True)
concepts=source/'Branding/ArcanaEchoes/Concepts/LevelDressing-20261014'
previous_renders=source/'Saved/AgentRuns/level-dressing-20261014/renders'
renders=Path(args.renders_dir).resolve() if args.renders_dir else previous_renders
rows=[('saturn','01-Saturn-DesertOfLead.png','Level_1_QuestLink'),('venus','02-Venus-CopperGarden.png','Level_2_Venus'),('jupiter','03-Jupiter-WheelOfTin.png','Level_3_Jupiter'),('mercury','04-Mercury-GreenAtelier.png','Level_4_Mercury'),('mars','05-Mars-HallOfIron.png','Level_5_Mars'),('moon','06-Moon-MirrorLakes.png','Level_6_Moon'),('sun','07-Sun-GoldenCenter.png','Level_7_Sun'),('earth','08-Earth-OrbitalSanctuary.png','Earth')]
manifest={};original=0;optimized=0
for key,concept,game in rows:
    game_path=renders/(game+'-game.png')
    if key=='earth' and not game_path.exists():game_path=previous_renders/(game+'-game.png')
    for role,path in [('concept',concepts/concept),('game',game_path)]:
        original+=path.stat().st_size
        with Image.open(path) as image:
            image=image.convert('RGB');image.thumbnail((1400,1000),Image.Resampling.LANCZOS)
            name=f'{key}-{role}';destination=target/(name+'.webp')
            image.save(destination,'WEBP',quality=86,method=6)
            manifest[name]={'path':'assets/media/'+name+'.webp','width':image.width,'height':image.height}
            optimized+=destination.stat().st_size
with Image.open(concepts/rows[0][1]) as image:
    image=image.convert('RGB');image.thumbnail((1200,675),Image.Resampling.LANCZOS)
    image.save(target/'share.jpg','JPEG',quality=87,optimize=True)
(root/'content/media.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'web_images':16,'original_bytes':original,'optimized_bytes':optimized,'metadata_removed':True}))
