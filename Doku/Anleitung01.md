# Anleitung: Projekt Erstellung Sokuban - mit Github und Sourcetree 

## **EH17** - 15.06.23
### **Teil 1 - Setup, express server**

<br>

2. Neues Git Repository auf Github erstellen
3. SSH key von github clonen
4. SSH Key in Sourcetree einfügen + Ordner Anlegen (im Explorer angelegt)
5. VS Code **Terminal Befehl:** "npm install" - ausführen - package json datei wurde im Projektordner erstellt (alle abfragen im terminal beim erstellen mit "enter" bestäigen)
6. package json datei mauel anpassen (**umschreiben:** "private": true // **zeile einfügen:** "type": "module" // **umschreiben**: "author": "Jan Schneider" // **umschreiben:** "start": "node index.js")
7. .gitignor Datei auf der Hauptprojektordnerebene erstellen. in der Datei schreiben: "node_mudules"
8. index.js **Datei erstellen** (Serveranwendung - Einstiegspunkt)
9. Unterordner erstellen "public" + in dem Ornder HTML Datei erstellen name: "index.html" + HTML Gerüst einfügen
10. Ausliefern der Statischen Website (Express Port:8080) - google search: express - getting started - code kopieren und in der index.js datei einfügen - manuele Änderungen vornehmen
11. Statische Datein in Express einfügen - copy code from homepage - Express/Serving static files in Express 
12. zum überprüfen im terminal: "npm start" - im suchleiste des browsers eingeben: "localhost8080" - "hallo welt" sollte geladen werden

<br>

---
 
## **EH18** - 20.06.2023  
### **Teil 1 - Setup, express server**

<br>

(Sollte Sourcetree nicht öffnen; in den Ordner navigieren: "C:\Users\jansc\AppData\Local\Atlassian" und den zweiten Ordner löschen (Ordner mit langen Namen // dieser wird beim erneuten Starten wieder erstellt. Ab Sourcetree lässt sich wieder öffnen... kA warum das Problem besteht - Vermutung: Sourcetree Update verk***t.))

* Server muss erneut gestartet werden: VSC Terminal/node: npm start
* Server stoppen Shortcurt: STRG + C
* Damit Anderungen übernommen werden, muss der Server Neu gestartet werden bzw. offline lassen bis gebraucht.

1.  Sourcetree: unstaged Files committen. (Notizen hinzufügen und rechts unten auf "commit" drücken)
2.  Sourcetree: Pushen
3.  (Sollte das puschen nicht funktionieren, im Sourcetree/Tools/Options: SSH Client: auf "OpenSSH" stellen) // Alternativ über das Terminal: "git push???" // VS Code/node Terminal Befehel zum Thema Pushen/committen etc anschaun!
4.  "sokuban-assets.zip" von Teams WEB Chat herunterladen
5.  "assets" Ordner auf Hauptebene des Projekts erstellen und die entpackten Datein einfügen
6.  Eingefügte Datei "level.txt" auf "levels.txt" umbenennen

<br>


### **Folie: Teil 2 - Spielfeld einlesen, REST API**
Levels mit dem Server verbinden + interpretieren lassen

* Jedes Level einzeln als objekt definieren (2d Arry), Spieler defnieren, Kisten definieren. Funktion für Interpreation der Strings/Zeichen (levels.txt Datei) erstellen: "Level, Player, Boxes" sollen für alle Levels sinnvoll interpretiert werden.


**Lösung:**
1.  Einlesen der Datein: (index.js Datei): "import fs from 'node:fs/promises';"
2.  Levels definieren: (index.js Datei): "const levels = [];"
3.  Datein einlesen: (index.js Datei): "const levelData = await fs.readFile('.assets/levels.txt', 'utf8');"
4.  Ausgabe auf der Console: (index.js Datei): "console.log(levelData);"
5. Funktion erstellen: <br>
   * Schritt1: levelData in einzelne Levels zerlegen <br>
   * Schritt2: für jedes Level die Daten Zeichen für Zeichen durchgehen und in gewünschte Struktur übertragen
   * XXXXXXXX


```js
// code zum zerteilen der einzelnen level:

const splitLevelData = levelData.split('\n\n');
```

<br>

----

### **Wiederholung von EH18:** - Was haben wir in EH18 gemacht? - Mitschrift:

1. levels.txt Datei einlesen und interpretieren - index.js: `splitLevelData` Array - `const lines` 2d Array - mit `for`schleife iterieren - Anzahl der Levels in ein Objekt wandeln (zum zähen der Levels via Browser URL "localhost:8080" eingeben // oder mit Postmann) <br>
2. Variable `line` anlegen. Zeile für das level vorbeireiten - interieren über die einzelnen Charackters. Strings kann man wie Arrays behandeln (Strings mit forschleife iterieren) - char in eine Variable speichern `const char = line` <br>
3. Routs (Level REST APIs) let express read request bodies as json - 1. Rest API GET api/levels - returns count of levels - 2. Rest API: GET /api/levels/:levelID - returns selected level
4. XXXX

<br>


<br>

----


## **EH19** - 22.06.23 

### **Folie Teil 3 - Spielfeld zeichnen, Spieler bewegen**

<br>


1. Neuen Branch via. Github/Sourcetree/IDE einbinden (extra zum üben der Version controll) // kann man via Terminal oder mit Sourcetree machen // Komandozeiel: `git branch frontend` (branch erstellen) - `git checkout frontend` (wecheselt zum eben erstellten Branch) // Komandozeile: `git checkout -b frontend` (erstellt und wechselt auf den erstellten Branch)
2. Heruntergelandener Ordner "assets" muss in den public Ordner verschoben werden. public Ordner ist alles was in das Frontend gehört - darum "public". // der "assets" ordner enthält die benötigten Bilder für das Spiel.
3. Frontend soll die API ansprechen, um ein beliebiges Level zu laden // in dem Ordner "public" quasi Frontendornder, eine neuen Ordner erstellen: "scr" Source // in dem ordner eine neue "index.js" Datei erstellen
4. in der "index.html datei folgenden code einfügen: `<script type="text/javascript" src="scr/index.js"></script>` // überprüfen via `npm start` // diese Zeile lädt das frontend in die HTML datei
5. in die eben erstellte "index.js" Datei folgenden code einfügen:
```js
// Diser Code ermöglicht dem Browser, dass zuerst das HTML fertig geladen wird und erst danach die js Datei
window.onload = function() {
    async function loadLevel(LevelID) {
        const response = await fetch(`/api/levels/${LevelID}`);
        const level = await response.json();

        console.log(level);
    }

    loadLevel(2);
}
```

6. /puclic/assets/ neues CSS File erstellen "styles.css"
7. Das Level in HTML darstellen // In der index.html Datei das "styles.css" laden
```html
<link rel="stylesheet" href="assets/styles.css">
```
8. in der "index.html" Datei einen container für das Spielfeld erzeugen
```html
<div id="playfield"></div>
```
9. in der "styles.css" Datei folgenden Code einfügen:
```css
#playfield {
    position: relative;

}

.tile {
    image-rendering: pixelated;
    position: absolute;
    background-size: contain;
    background-repeat: no- repeat;
    background-position: center-center;
}
```
10. Das Level optisch gestalten // in der Frontend "index.js" Datei eine `for` Schleife zum...

```js 
for (let y = 0; y < level.level.length; y += 1) {
   for (let x = 0; x < level.level[y].length; x += 1) {
      const char = level.level[y][x];

      drawTile(char, x, y);
   }
}

```


11.  Frontend "index.js" Datei: Spielfiguren einzeichnen:
```js
 drawTile('player', level.player.x, level.player.y);
```

12.  Frontend "index.js" Datei: Kisten/Boxen einzeichen (mit `for of` Schleife):
```js
for (let box of level.boxes) {
drawTile ('box', box.x, box.y);
}
```

13. Die Pfeiltasten der Tastertur dem Spieler zuweisen // Frontende "index.js" Datei: Keylistener einbauen
```js 
    document.addEventListener('keydown', (event) => {
        console.log(event);

        switch (event.code) {
            case 'ArrwoUP':
            case 'KeyW':

            case 'ArrwoDown':
            case 'KeyS':

            case 'ArrwoLeft':
            case 'KeyA':

            case 'ArrwoRight':
            case 'KeyD':

                break;
            default:
                break;
        }

    });
```
14.  Frontend "index.js" Datei code umschreiben // loadlevel funktion kann nun auch außerhalb verwendet werden
```js
// ganz oben im Code umschrieben:
window.onload = async function () {

// weiter unten im Code umschreiben:
const level = await loadLevel(2);

```

<br>

---

## **EH20** - 27.06.23

### **Folie Teil 4 - Spiellogik**

Kisten bewegen, Kollisionen prüfen, Wände beachten, etc

1. Neue Function erstellen `checkAndMovePlayer`

```javascript


```

<br>

----

## **EH21** - Unterricht verpasst - Mitschrift in EH22 nachgeholt

### **Spiellogik weiter ausbauen und verbessern**
1. xxxx
2. xxxx

### **Namenseingabe und Highscore einbauen**
1. xxxx
2. xxxx

### **MongoDB als DB integrieren:**
1. MongoDB free Account einloggen (Github/Email Account)
2. Neuen "Clustor" erstellen
3. Connect -> Drivers -> copy "Connecion String"
4. Connection String kopieren
5. ".env" Datei auf Projektordnerebene erstellen -> zum verstecken der Passwörter
6. "Connection String" in die .env Datei einfügen
7. in der .gitignore Datei ".env" dazuschreiben

```JS
// Connection String in unserem Fall:
MONGO_CS="mongodb+srv://janschneider:CodersBay2023@cluster0.mroovdr.mongodb.net/?retryWrites=true&w=majority"
```

<br>

--- 

## **EH22** - 04.07.2023

### **Fehlerbehebung**
1. XXXX
2. XXXX
   

### **Events voneinander trennen:**
```js 
document.getElementById('username').addEventListener('keydown', (event) => {
event.stopPropagation();
```


### **Highscores speichern und pro Level im Browser anzeigen**
1. in der "index.html" Datei
```html
<h2>Highscores:</h2>
<div id="scores"></div>
```

2. Funktion in der Backend "index.js" Datei hinzufügen:
```js 
 async function loadAndDisplayHighscores(scores) {
        let scoresToDisplay = scores;
        if (!scoresToDisplay) {
            const response = await fetch(`/api/scores/${levelSelect.value}`);
            scoresToDisplay = await response.json();
        }
        console.log('scoresToDisplay', scoresToDisplay);
        const scoresEl = document.getElementById('scores');
        scoresEl.innerHTML = '';
        scoresToDisplay.forEach((entry, i) => {
            const scoreEl = document.createElement('div');
            scoreEl.innerHTML = `<div>${i + 1}. ${entry.name}</div><div>${entry.score}</div>`;
            scoresEl.appendChild(scoreEl);
        });
    }
```
nicht vergessen, die Funktion auch wieder aufzurufen!

<br>

---