# Arcana: Echoes of the Stars · devblog

Publieke website: https://vdecommerce.github.io/arcana-devlog/

Deze aparte repository bevat de website en geselecteerde, geoptimaliseerde beelden. Het Unreal-project en de gamebuilds staan hier niet in.

Actuele lokale teststand: build 37 is als update op de Quest geïnstalleerd, met behoud van de gespreksinstellingen. De versie corrigeert de voorbeeldregel in het gesprekspaneel en bevat de visuele uitwerking van 36. Alle 43 Unreal-controles slagen (42 schoon en één bestaande waarschuwing). De tester bevestigt in de headset normale instructies in het gesprekspaneel; deze zichtbare correctie is daarmee bevestigd. De verdere speelronde blijft open en Meta-ALPHA blijft op 31. De onderstaande oudere mijlpalen beschrijven de stand bij hun eigen publicatie.

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

Een eerdere mijlpaal van 16 oktober 2026 is build 35, geïnstalleerd als update over build 34 met behoud van voortgang, gidsroute en voorbereide gesprekstoegang. Twee portaalranden op Venus en korte controllertrillingen bij een geslaagde greep of bewuste loslaatactie zijn toegevoegd. De optionele Android-gespreksmodus voor onderzoek naar echobeperking staat uit; de bestaande microfoonroute blijft standaard. De 35 gerichte Unreal-controles slagen (34 zonder waarschuwing en één met een bestaande menuwaarschuwing), evenals 15 Java-controles. De Android-build en installatie zijn geslaagd. Vier mobiele Windows-previews zijn gecontroleerd: overzicht en detail, met en zonder portaalranden. De PNG-bestanden behouden de oorspronkelijke screenshotpixels en zijn als Windows-previews gelabeld. Een fysieke opstart- en spelbeoordeling van build 35, subjectief grijpgevoel, hoorbare echoreductie en gemeten Quest-framerate blijven open. Meta-ALPHA bevat nog build 31. De historische wereldbeelden blijven herkenbaar gelabeld; nieuwe previews zijn geen headsetbewijs. De actuele versie- en teststatus staan in `content/site.json`.

De visuele vervolgpass voor ontwikkelversie 36 is beoordeeld in zeven overzichtsparen en een extra instrumentpaar op de Maan. De zestien PNG-bestanden zijn exact geïmporteerd met hun oorspronkelijke bytes. Saturnus heeft een open prieel met dertien onderdelen dat vrij blijft van bestaande rotsen; de lagere Maankaders laten de bron-, spiegel- en plekregels vrij. De gerichte Maan-camera toont de dichtbijstaande algemene instructies groot op de voorgrond. Alle 42 Unreal-controles slagen: 41 zonder waarschuwing en één met een bestaande waarschuwing, zonder mislukte of overgeslagen tests. Kandidaat 36 staat lokaal gereed als gecontroleerd APK- en OBB-paar. Native build, cook en verpakking slagen; versie, handtekening, native-codeovereenkomst en meegeleverde inhoud zijn geverifieerd. De APK gebruikt hetzelfde certificaat als build 35. Deze gamebestanden blijven buiten de publieke website. Build 35 blijft geïnstalleerd op de test-Quest voor de latere praktijktest; Meta-ALPHA blijft op 31. Baseline en nieuwe uitvoering gebruiken dezelfde ontwikkelcode met Art36 uit/aan; dynamische wolken kunnen tussen opnamen verschillen. Het zijn Windows ES3.1-previews. De beoordeling van stereo, bediening, comfort en framerate volgt op de headset. Historische media en het Venus-artikel blijven behouden.

Publiceer na een betekenisvolle, gecontroleerde mijlpaal en werk de wereldpagina’s en teststatus in dezelfde wijziging bij. Een wekelijkse controle op vrijdag om 17:00 kijkt of er nieuwe resultaten zijn; zonder nieuws is er geen nieuw artikel. Houd historische artikelen herkenbaar als de stand bij die mijlpaal.

De beeldimport ondersteunt `--renders-dir`, `--build-version` en optioneel `--worlds saturn` voor een gerichte update. Alleen geselecteerde werelden krijgen een nieuwe versie; andere beelden en wereldteksten blijven intact. Elke geselecteerde wereld vereist een render en een geslaagd controlerapport. Eerder gepubliceerde artikelbeelden worden vóór vervanging bewaard. Conceptart en Windows-spelbeelden houden afzonderlijke labels.

## Beelden en claims

- Conceptart is AI-gegenereerd en wordt als ontwerpdoel gelabeld.
- Spelbeelden zijn echte desktop- of mobiele Unreal-previews op Windows, met een expliciet herkomstlabel. Historische artikelbeelden blijven bewaard.
- Quest-opstart, wereldmenu en reizen zijn deels bevestigd. Nederlandse headsetaudio en mondbeweging van de Kluizenaar zonder USB zijn op een voorbereide Quest bevestigd. De nieuwe opdrachtkaart is fysiek leesbaar bevonden. Opnieuw verbinden, volledige wereldcontrole, langdurig comfort en gemeten framerate houden een eigen teststatus.
- Werk status, beperkingen en testinstructies bij wanneer er nieuwe hardwaretests zijn.
- Deel geen Unreal-assets, API-sleutels, persoonlijke testgegevens of lokale bestandsnamen in openbare updates.

Er is geen open-source- of hergebruiklicentie voor het artwork toegekend door deze repository.
