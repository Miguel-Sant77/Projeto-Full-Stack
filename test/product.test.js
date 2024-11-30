// tests/product.test.js
const request = require('supertest');
const app = require('../app');  // Certifique-se de exportar seu app em app.js
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe('Testes de CRUD para Produtos', () => {
  let productId;

  beforeAll(async () => {
    // Conectar ao banco de dados antes de executar os testes
    await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await mongoose.connection.close();
  });

  it('Deve criar um novo produto', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Produto Teste',
        description: 'Descrição do produto',
        price: 100,
        stock: 10
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Produto Teste');
    productId = response.body._id;
  });

  it('Deve buscar todos os produtos', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve atualizar o preço de um produto', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({ price: 120 });
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(120);
  });

  it('Deve excluir um produto', async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Produto excluído com sucesso');
  });
});
