# Arcana: Echoes of the Stars · devblog

Publieke website: https://vdecommerce.github.io/arcana-devlog/

Deze aparte repository bevat de website en geselecteerde, geoptimaliseerde beelden. Het Unreal-project en de gamebuilds staan hier niet in.

## Lokaal bekijken

Node.js 22 of nieuwer is voldoende; installatie van extra packages is niet nodig.

```sh
npm run build
npm run check
npm run dev
```

Open de Local URL uit de terminal. De preview gebruikt dezelfde `/arcana-devlog/`-paden als GitHub Pages.

## Ontwikkelupdates toevoegen

Voeg een item toe aan `content/posts.json` met een unieke `slug`, datum, titel, samenvatting en secties. De build maakt een artikel, de devblog-index en de RSS-feed. Beelden moeten een key hebben in `content/media.json` en in `public/assets/media/` staan.

Wereldteksten staan in `content/worlds.json`. Algemene gegevens en de Meta-uitnodiging staan in `content/site.json`. Een uitnodiging is bedoeld om gedeeld te worden; de daadwerkelijke toelating wordt door het Meta-kanaal geregeld.

## Publiceren

Een push naar `main` bouwt en controleert de website en publiceert `dist/` via GitHub Actions naar Pages. `dist/` zelf wordt niet gecommit. GitHub Pages moet als bron **GitHub Actions** gebruiken. Er zijn geen providerkeys of custom secrets nodig in de workflow.

De huidige teksten verwijzen naar de stand van 14 oktober 2026. Lokale testversie 12 is via USB geïnstalleerd; daarmee is niet vastgesteld welke versie op het Meta-releasekanaal beschikbaar is.

## Beelden en claims

- Conceptart is AI-gegenereerd en wordt als ontwerpdoel gelabeld.
- Spelbeelden zijn echte Windows-renders van de ontwikkelversie.
- Quest-weergave, headsetaudio en framerate zijn nog niet bevestigd.
- Werk status, beperkingen en testinstructies bij wanneer er nieuwe hardwaretests zijn.
- Deel geen Unreal-assets, API-sleutels, persoonlijke testgegevens of lokale bestandsnamen in openbare updates.

Er is geen open-source- of hergebruiklicentie voor het artwork toegekend door deze repository.
