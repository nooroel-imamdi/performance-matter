# Performance matters - Herkansing

Nooroel Imamdi | 500706701

## Algemeen
Deze repository bevat de eindopdracht voor het vak *Performance matters*, onderdeel van de minor *Webdevelopment* aan de *Hogeschool van Amsterdam*

## Installatie

### Clone deze repo
```
git clone https://github.com/nooroel-imamdi/performance-matters-herkansing
cd performance-matters-herkansing
```

### node_modules
#### dependencies
```
"express": "*",
"body-parser": "*",
"dotenv": "^4.0.0",
"ejs": "^2.5.6",
"express-https-redirect": "^1.0.0",
"ngrok": "^2.2.6",
"request": "*"
```

#### devDependencies
```
"browserify": "^14.1.0",
"nodemon": "*"
```

### Installeer de 'dependencies'
```
npm install
```

### .env-file
In deze repo is gebruik gemaakt van een `.env`-bestand. Hiermee kunnen gevoelige gegevens, zoals een geheime API-key, bij synchronisatie naar de repo veilig afgescheiden worden. Om deze app werkend te krijgen is noodzakelijk om dit bestand in bezit te hebben.

## Start de server
Bij het uitvoeren van de onderstaande command, wordt de app opgestart.
```
nodemon
```

## Overige command

Browserify
```
npm run build
```

## FUNDA API
Funda is sinds 2001 hét vastgoedplatform van makelaars voor consumenten en ondernemers. In ruim 15 jaar tijd groeide funda uit van een kleine website tot gemeengoed. Funda loopt voorop met de nieuwste toepassingen van internet bij het zoeken naar en vinden van vastgoed.

Als studenten van de Minor Webdevelopment aan de Hogeschool van Amsterdam hebben wij de mogelijkheid gekregen om toegang te krijgen tot deze data d.m.v. een API. We hebben hierbij diverse mogelijkheden om data binnen te halen en te verwerken in een interface voor de gebruikers.

### API-key
Zoals eerder aangekondigd zit de API-key verborgen in het `env`-bestand. Om de app te kunnen draaien is het noodzakelijk om in het bezit te zijn van dit bestand. Bekijk [hier](https://github.com/nooroel-imamdi/performance-matters-her#env-file) hoe je die kunt bemachtigen.

## Optimalisatie
Voor optimalisatie van de Funda App is er gebruik gemaakt van `compression`. Deze tracht response bodies te comprimeren voor alle requests.

## Lighthouse
Lighthouse is een open-source, geautomatiseerde tool voor het verbeteren van de prestaties, kwaliteit en juistheid van een web-apps. Deze tool loopt de gehele app door en komt vervolgens met een rapport vol concrete bevindingen die nagelopen kunnen worden om de app te verbeteren.

## Funda App vóór het gebruik van Service Worker
Voorafgaand het toepassen van Service Worker is de eerste test uitgevoerd met behulp van Lighthouse. De onderstaande afbeelding was het resultaat.

![alt tag](https://github.com/nooroel-imamdi/funda-server-side/blob/serviceworker/lighthouse-voor.png?raw=true)
Rapport Lighthouse vóór toepassen Service Worker.

Verbeterpunten die werden aanbevolen door Lighthouse:
- [ ] Er is geen offline-versie van de app beschikbaar
- [ ] Netwerk maakt geen gebruik van HTTPS
- [ ] `<meta name="theme-color">`-tag ontbreekt
- [ ] Niet alle afbeeldingen bevatten ene `alt=""`-tag

## Aanbrengen verbeteringen

### Offline-versie
Met behulp Server Worker is het mogelijk om cache op te slaan en te serveren. Indien de gebruiker geen verbinding met het internet heeft, wordt de data uit de cache gehaald die bij de eerdere bezoeken zijn opgeslagen en ingeladen.

### Het gebruik van HTTPS (redirect vanaf HTTP)
De NPM-tool `express-https-redirect` zorgt ervoor dat de HTTP-requests worden geredirect naar HTTPS.

#### Installatie
`npm install express-https-redirect --save`

#### Gebruik
`var express = require('express');`
`var httpsRedirect = require('express-https-redirect');`
`var app = express();`
`app.use('/', httpsRedirect());`

### `<meta name="theme-color">`-tag ontbreekt
De meta-tag is toegevoegd aan de `<head>` van de HTML. Hiermee kan de topbar van een Web App een gewenste kleur krijgen, waardoor het meer op een App gaat lijken.

### `alt=""`-tag toevoegen
Alle afbeeldingen die worden ingeladen middels een `<img>`-tag zijn nu voorzien van een `alt=""`-tag.

## Funda App ná het gebruik van Service Worker
Het rapport van Lighthouse geeft na aanpassen van dit lijstje een 100/100 score. Daarmee is de Funda App volgens de richtlijnen van Lighthouse met succes geoptimaliseerd.

![alt tag](https://github.com/nooroel-imamdi/funda-server-side/blob/serviceworker/lighthouse-na.png?raw=true)
Rapport Lighthouse ná toepassen Service Worker.
