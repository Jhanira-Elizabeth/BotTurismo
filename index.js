const express = require('express'); // Importar express
const app = express(); // Asignar express a mi aplicación
const port = 3000; // Asignación puerto donde se ejecutará el proy
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola servidor de express');
});

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
