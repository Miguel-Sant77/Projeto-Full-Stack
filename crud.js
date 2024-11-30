// [Seus scripts existentes aqui...]

// Função para criar um novo usuário (POST)
async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Usuário criado:', data);
      alert('Usuário criado com sucesso!');
      // Limpar os campos de entrada após a criação
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    } else {
      console.error('Erro ao criar usuário:', data);
      alert('Erro ao criar usuário!');
    }
  }
  
  // Função para listar todos os usuários (GET)
  async function listUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
  
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Limpar a lista antes de preencher
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
  
      // Botão de Editar
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.onclick = () => {
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        document.getElementById('update-btn').onclick = () => updateUser(user._id);
      };
  
      // Botão de Deletar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Deletar';
      deleteButton.onclick = () => deleteUser(user._id);
  
      li.appendChild(editButton);
      li.appendChild(deleteButton);
  
      usersList.appendChild(li);
    });
  }
  
  // Função para atualizar um usuário (PUT)
  async function updateUser(id) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Usuário atualizado:', data);
      alert('Usuário atualizado com sucesso!');
      // Limpar os campos de entrada após a atualização
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      listUsers(); // Atualiza a lista de usuários
    } else {
      console.error('Erro ao atualizar usuário:', data);
      alert('Erro ao atualizar usuário!');
    }
  }
  
  // Função para deletar um usuário (DELETE)
  async function deleteUser(id) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      console.log('Usuário deletado');
      alert('Usuário deletado com sucesso!');
      listUsers(); // Atualiza a lista de usuários
    } else {
      const data = await response.json();
      console.error('Erro ao deletar usuário:', data);
      alert('Erro ao deletar usuário!');
    }
  }
  
  // Função para buscar um usuário específico (GET)
  async function getUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
  
    if (response.ok) {
      console.log('Usuário encontrado:', user);
      alert(`Usuário encontrado: ${user.name} - ${user.email}`);
    } else {
      console.error('Erro ao buscar usuário:', user);
      alert('Erro ao buscar usuário!');
    }
  }
  
  // Exemplo de como chamar as funções em eventos
  
  // Ao submeter o formulário de cadastro de usuário
  document.getElementById('create-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    createUser();
  });
  
  // Ao chamar a função de listar usuários (por exemplo, em um evento de carregar a página)
  document.addEventListener('DOMContentLoaded', () => {
    listUsers();
  });
  
  // Exemplo de como definir os eventos de atualização do formulário
  document.getElementById('update-btn').addEventListener('click', (e) => {
    const id = document.getElementById('user-id').value; // Presumindo que você tenha um campo oculto para o ID do usuário
    updateUser(id);
  });
  