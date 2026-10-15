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

De laatste mijlpaal van 15 oktober 2026 bundelt de draadloze Pipecat-proef voor de Kluizenaar met de actuele opdrachtkaart uit build 30 en de eerdere wereld-, opstart- en belichtingsverbeteringen. De tester bevestigt twee vragen met hoorbare antwoorden en mondbeweging op de Quest zonder USB. De spraakserver draait afzonderlijk van de ontwikkel-pc; de begeleide proef vereist een voorbereide Quest met wifi en Tailscale. Build 31 is geïnstalleerd en de technische audio- en mondanimatiecontrole slaagt. De twintig procent ruimere mondbeweging en de leesbaarheid van de opdrachtkaart zijn op de headset goedgekeurd. Eén verbindingshapering is gemeld; de vervolgtest na een herstart gaat goed, maar de oorzaak is nog niet vastgesteld. De drie menutests en twee mobiele Windows-menucontroles uit build 30 blijven de bestaande onderbouwing. De wereldbeelden zijn mobiele Windows-previews uit build 24, met Saturnus uit 23 en Aarde uit 22; de menuvoorbeelden komen uit 30. Historische artikelen en beelden blijven herkenbaar als hun eigen mijlpaal. De daadwerkelijk gepubliceerde Meta-versie en automatische teststatus staan in `content/site.json`.

Publiceer na een betekenisvolle, gecontroleerde mijlpaal en werk de wereldpagina’s en teststatus in dezelfde wijziging bij. Een wekelijkse controle op vrijdag om 17:00 kijkt of er nieuwe resultaten zijn; zonder nieuws is er geen nieuw artikel. Houd historische artikelen herkenbaar als de stand bij die mijlpaal.

De beeldimport ondersteunt `--renders-dir`, `--build-version` en optioneel `--worlds saturn` voor een gerichte update. Alleen geselecteerde werelden krijgen een nieuwe versie; andere beelden en wereldteksten blijven intact. Elke geselecteerde wereld vereist een render en een geslaagd controlerapport. Eerder gepubliceerde artikelbeelden worden vóór vervanging bewaard. Conceptart en Windows-spelbeelden houden afzonderlijke labels.

## Beelden en claims

- Conceptart is AI-gegenereerd en wordt als ontwerpdoel gelabeld.
- Spelbeelden zijn echte desktop- of mobiele Unreal-previews op Windows, met een expliciet herkomstlabel. Historische artikelbeelden blijven bewaard.
- Quest-opstart, wereldmenu en reizen zijn deels bevestigd. Nederlandse headsetaudio en mondbeweging van de Kluizenaar zonder USB zijn op een voorbereide Quest bevestigd. De nieuwe opdrachtkaart is fysiek leesbaar bevonden. Opnieuw verbinden, volledige wereldcontrole, langdurig comfort en gemeten framerate houden een eigen teststatus.
- Werk status, beperkingen en testinstructies bij wanneer er nieuwe hardwaretests zijn.
- Deel geen Unreal-assets, API-sleutels, persoonlijke testgegevens of lokale bestandsnamen in openbare updates.

Er is geen open-source- of hergebruiklicentie voor het artwork toegekend door deze repository.
