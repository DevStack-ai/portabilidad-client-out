const express = require('express');
const path = require('path');
const fs = require('fs')
// const https = require('https')
const app = express();
const logger = require('morgan');

app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'dist'), {
  dotfiles: 'allow',
  setHeaders: function (res, path) {
    res.set("X-Xss-Protection", "1; mode=block ");
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Strict-Transport-Security", "max-age=31536000");
    res.set("Referrer-Policy", "no-referrer");
    res.set("Permissions-Policy", "camera=*; fullscreen=()");
  }
}));
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

