// SERVERANWENDUNG (folgender code von express hompage kopiert)

import express from 'express';

const app = express()
const port = 8080

app.use(express.static('public')) // code line von express homepage kopiert

app.listen(port, () => {
  console.log(`Sokuban Server listening on port ${port}`);
});
