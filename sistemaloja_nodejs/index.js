// Importando o Express na aplicação
const express = require("express"); //CommonJS Modules
// Criando uma instância do Express
const app = express();

// Definindo o EJS como renderizador de páginas
app.set("view engine", "ejs");

// Definir a pasta dos arquivos estáticos (public)
app.use(express.static('public'))

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  // Será renderizada a página index.ejs que está na pasta 'views'
  res.render("index");
});

// ROTA DE PRODUTOS
app.get("/produtos", (req, res) => {
  const produtos = [
    { nome: 'Melonpan', preco: 10.00, categoria: 'Pães Doces', imagem: 'melonpan' },
    { nome: 'Anpan', preco: 8.00, categoria: 'Pães Doces', imagem: 'anpan' },
    { nome: 'Karepan', preco: 15.00, categoria: 'Pães Salgados', imagem: 'karepan' },
    { nome: 'Shokupan', preco: 10.50, categoria: 'Pães', imagem: 'shokupan' },
    { nome: 'Matcha Swiss Roll', preco: 12.00, categoria: 'Bolos', imagem: 'matcha_swiss_roll' },
    { nome: 'Castella Cake', preco: 8.00, categoria: 'Bolos', imagem: 'castella_cake' }
  ];
  res.render("produtos", { produtos: produtos });
});

// ROTA DINÂMICA PARA CADA PRODUTO
app.get("/produtos/:nome", (req, res) => {
  const produtos = [
    { nome: 'Melonpan', preco: 10.00, categoria: 'Pães Doces', imagem: 'melonpan' },
    { nome: 'Anpan', preco: 8.00, categoria: 'Pães Doces', imagem: 'anpan' },
    { nome: 'Karepan', preco: 15.00, categoria: 'Pães Salgados', imagem: 'karepan' },
    { nome: 'Shokupan', preco: 10.50, categoria: 'Pães', imagem: 'shokupan' },
    { nome: 'Matcha Swiss Roll', preco: 12.00, categoria: 'Bolos', imagem: 'matcha_swiss_roll' },
    { nome: 'Castella Cake', preco: 8.00, categoria: 'Bolos', imagem: 'castella_cake' }
  ];
  const produto = produtos.find(p => p.nome === req.params.nome);
  if (produto) {
    res.render("produto", { produto: produto });
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

// ROTA CLIENTES
app.get("/clientes", (req, res) => {
  const clientes = [
    { nome: "João Silva", cpf: "123.456.789-00", endereco: "Rua A, 123" },
    { nome: "Maria Souza", cpf: "987.654.321-00", endereco: "Rua B, 456" },
    { nome: "Carlos Pereira", cpf: "456.789.123-00", endereco: "Rua C, 789" },
    { nome: "Ana Oliveira", cpf: "321.654.987-00", endereco: "Rua D, 101" }
  ];
  res.render("clientes", { clientes: clientes });
});

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
  const pedidos = [
    { numero: 1, descricao: 'Combo 1: Melonpan e Anpan', valor: 16.20 },
    { numero: 2, descricao: 'Combo 2: Karepan e Shokupan', valor: 22.95 },
    { numero: 3, descricao: 'Combo 3: Matcha Swiss Roll e Castella Cake', valor: 18.00 },
    { numero: 4, descricao: 'Combo 4: Melonpan, Anpan e Karepan', valor: 29.70 }
  ];
  res.render("pedidos", { pedidos: pedidos });
});

// Iniciando o servidor na porta 8080
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
