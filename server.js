const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Criando a aplicação Express
const app = express();

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/meubanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definindo o modelo de Usuário
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
}));

// Rota para Criar Usuário
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// Rota para Listar Todos os Usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Rota para Obter um Usuário Específico
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

// Rota para Atualizar Usuário
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

// Rota para Deletar Usuário
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const errorHandler = require('./middlewares/errorHandler');

// Após todas as rotas
app.use(errorHandler);
