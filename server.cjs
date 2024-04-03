const express = require('express');
const path = require('path');
const fs = require('fs')
const logger = require('morgan');
const app = express();

app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));

app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
