// SERVERANWENDUNG (folgender code von express hompage kopiert)

import express from 'express';
import fs from 'node:fs/promises';

const levels = [];

const levelData = await fs.readFile('./assets/levels.txt', 'utf8');

function readLevelData() {
  const splitLevelData = levelData.split('\n\n');

  // 
  for (let singleLevelData of splitLevelData) {
    const level = {
      level: [],
      player: {},
      boxes: [],
    };

    // Levels in einzele Zeilen zerlegen (Array Anlegen)
    const lines = singleLevelData.split('\n');

    // über die Zeilen iterrieren (forschleife // for/in schleife)
    for (let y = 0; y < lines.length; y += 1) {
      const line = [];
      // Zeichen für Zeichen durch iterrieren
      for (let x = 0; x < lines[y].length; x += 1){
        // speichern der Zeichen um später besser damit arbeiten zu können
        const char = lines[y][x];

        // 
        switch(char) {
          case '@':
              line.push('-');
              level.player.x = x;
              level.player.y = y;
              break;
          case '+':
              line.push('.');
              level.player.x = x;
              level.player.y = y;
              break;
          case '$':
              line.push('-')
              level.boxes.push({x, y});
                break;
          case '*':
              line.push('.')
              level.boxes.push({x, y});
              break;
              // +, ., -, _ werden von default case gehandelt
              default:
              line.push(char);
              break;
        }
      }
      level.level.push(line);
    }
    levels.push(level);
  }
}

readLevelData();
console.log(levels[2]);

const app = express()
const port = 8080

app.use(express.static('public')) // code line von express homepage kopiert

app.listen(port, () => {
  console.log(`Sokuban Server listening on port ${port}`);
});


