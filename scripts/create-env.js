// módulo de node para interactuar con el sistema de archivos. 
const fs = require('fs');

fs.writeFileSync('./.env',`API=${process.env.API}\n`);
// writeFileSync es un método que no permite crear/escribir un archivo. En el cual escribiremos la API.