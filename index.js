const mongoose = require('mongoose');

// Substitua pela URL do seu MongoDB
const dbURI = 'mongodb://localhost:27017/seubanco';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro de conexão:', error);
  });
