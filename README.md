# Arcana: Echoes of the Stars · devblog

Publieke website: https://vdecommerce.github.io/arcana-devlog/

Deze aparte repository bevat de website en geselecteerde, geoptimaliseerde beelden. Het Unreal-project en de gamebuilds staan hier niet in.

## Lokaal bekijken

Node.js 22 of nieuwer is voldoende; installatie van extra packages is niet nodig.

```sh
node scripts/build.mjs
node scripts/check.mjs
node scripts/preview.mjs
```

Open de Local URL uit de terminal. De preview gebruikt dezelfde `/arcana-devlog/`-paden als GitHub Pages.

## Ontwikkelupdates toevoegen

Voeg een item toe aan `content/posts.json` met een unieke `slug`, datum, titel, samenvatting en secties. De build maakt een artikel, de devblog-index en de RSS-feed. Beelden moeten een key hebben in `content/media.json` en in `public/assets/media/` staan.

Wereldteksten staan in `content/worlds.json`. Algemene gegevens en de Meta-uitnodiging staan in `content/site.json`. Een uitnodiging is bedoeld om gedeeld te worden; de daadwerkelijke toelating wordt door het Meta-kanaal geregeld.

## Publiceren

Een push naar `main` bouwt en controleert de website en publiceert `dist/` via GitHub Actions naar Pages. `dist/` zelf wordt niet gecommit. GitHub Pages moet als bron **GitHub Actions** gebruiken. Er zijn geen providerkeys of custom secrets nodig in de workflow.

De huidige teksten verwijzen naar 15 oktober 2026. Ontwikkelbuild 24 werkt de zes latere proefwerelden af met verweerde ruïnes, drie rotsvormen, haagbeuk en waar passend klimop. Open plantenbakken hergebruiken het aanwezige Fab-grindmateriaal; zes bassins krijgen een op het terrein afgestemde onderbouw en water zonder eigen lichtgloed. Achttien native tests, zes looptests en de dertien aankomsten in de reistest slagen. De zes nieuwe wereldbeelden en twee detailbeelden zijn mobiele Unreal-previews op Windows. Saturnus behoudt versie 23, Aarde versie 22; historische artikelbeelden blijven bewaard. De Android-build en handtekening zijn gecontroleerd. USB-build 25 corrigeert het OpenXR-apparaatprofiel dat multiview opnieuw inschakelde en daardoor build 21 bij de start liet crashen met een ontbrekende HDR-arrayshader. De correctie is in het verpakte profiel gecontroleerd en versie 25 is via USB geïnstalleerd met een geverifieerde OBB. De gewone starttest is nog onbeslist: de app pauzeert vóór Unreal begint. Meta-ALPHA bevat build 20 met de gemelde storing in het hele rechterbeeld. Start, stereo, comfort en framerate moeten nog op de headset worden bevestigd.

Publiceer na een betekenisvolle, gecontroleerde mijlpaal en werk de wereldpagina’s en teststatus in dezelfde wijziging bij. Een wekelijkse controle op vrijdag om 17:00 kijkt of er nieuwe resultaten zijn; zonder nieuws is er geen nieuw artikel. Houd historische artikelen herkenbaar als de stand bij die mijlpaal.

De beeldimport ondersteunt `--renders-dir`, `--build-version` en optioneel `--worlds saturn` voor een gerichte update. Alleen geselecteerde werelden krijgen een nieuwe versie; andere beelden en wereldteksten blijven intact. Elke geselecteerde wereld vereist een render en een geslaagd controlerapport. Eerder gepubliceerde artikelbeelden worden vóór vervanging bewaard. Conceptart en Windows-spelbeelden houden afzonderlijke labels.

## Beelden en claims

- Conceptart is AI-gegenereerd en wordt als ontwerpdoel gelabeld.
- Spelbeelden zijn echte desktop- of mobiele Unreal-previews op Windows, met een expliciet herkomstlabel. Historische artikelbeelden blijven bewaard.
- Quest-opstart, wereldmenu en reizen zijn deels bevestigd. De oorspronkelijke UDS-planeten, headsetaudio en stabiele framerate zijn nog niet bevestigd.
- Werk status, beperkingen en testinstructies bij wanneer er nieuwe hardwaretests zijn.
- Deel geen Unreal-assets, API-sleutels, persoonlijke testgegevens of lokale bestandsnamen in openbare updates.

Er is geen open-source- of hergebruiklicentie voor het artwork toegekend door deze repository.
