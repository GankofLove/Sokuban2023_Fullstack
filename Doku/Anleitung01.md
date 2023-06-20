# Anleitung: Projekt Erstellung Sokuban - mit Github und Sourcetree 

## **EH17**

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


## **EH18** - 20.06.2023

(Sollte Sourcetree nicht öffnen; in den Ordner navigieren: "C:\Users\jansc\AppData\Local\Atlassian" und den zweiten Ordner löschen (Ordner mit langen Namen // dieser wird beim erneuten Starten wieder erstellt. Ab Sourcetree lässt sich wieder öffnen... kA warum das Problem besteht. Das ist die Lösung))

* Server muss erneut gestartet werden: VSC Terminal/node: npm start
* Server stoppen Shortcurt: STRG + C
* Damit Anderungen übernommen werden, muss der Server Neu gestartet werden bzw. offline lassen bis gebraucht.

13. Sourcetree: unstaged Files committen. (Notizen hinzufügen und rechts unten auf "commit" drücken)
14. Sourcetree: Pushen
15. (Sollte das puschen nicht funktionieren, im Sourcetree/Tools/Options: SSH Client: auf "OpenSSH" stellen) // Alternativ über das Terminal: "git push???" // VS Code/node Terminal Befehel zum Thema Pushen/committen etc anschaun!
16. "sokuban-assets.zip" von Teams WEB Chat herunterladen
17. "assets" Ordner auf Hauptebene des Projekts erstellen und die entpackten Datein einfügen
18. Eingefügte Datei "level.txt" auf "levels.txt" umbenennen

<br>

---

## **Aufgabe 1**
Levels mit dem Server verbinden + interpretieren lassen - genaue Anleitung siehe Folie Anderl

* Jedes Level einzeln als objekt definieren (2d Arry), Spieler defnieren, Kisten definieren. Funktion für Interpreation der Strings/Zeichen (levels.txt Datei) erstellen: "Level, Player, Boxes" sollen für alle Levels sinnvoll interpretiert werden.


**Lösung:**
1.  Einlesen der Datein: (index.js Datei): "import fs from 'node:fs/promises';"
2.  Levels definieren: (index.js Datei): "const levels = [];"
3.  Datein einlesen: (index.js Datei): "const levelData = await fs.readFile('.assets/levels.txt', 'utf8');"
4.  Ausgabe auf der Console: (index.js Datei): "console.log(levelData);"
5. Funktion erstellen: <br>
   * Schritt1: levelData in einzelne Levels zerlegen <br>
   * Schritt2: für jedes Level die Daten Zeichen für Zeichen durchgehen und in gewünschte Struktur übertragen


```js
// code zum zerteilen der einzelnen level:

const splitLevelData = levelData.split('\n\n');