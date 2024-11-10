import express from "express";
import session from "express-session";
import flash from "connect-flash";
import bodyParser from "body-parser";
import connection from "./config/sequelize-config.js";
import Cliente from "./models/Cliente.js";
import User from "./models/User.js";
import UsersController from "./controllers/UsersController.js"; // Importa o UsersController
import ClientesController from "./controllers/ClientesControllers.js"; // Importa o ClientesController
import ProdutoController from "./controllers/ProdutoControllers.js"; // Importa o ProdutoController
import PedidoController from "./controllers/PedidoControllers.js"; // Importa o PedidoController


const app = express();

// Configurando o express-session
app.use(session({
  secret: "lojasecret",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 3600000}, // Sessão expira em 1 hora
}));

// Configuração do flash
app.use(flash());

// Permite receber dados vindo de formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Realizando a conexão com o banco de dados
connection.authenticate().then(() => {
  console.log("Conexão com o banco de dados feita com sucesso!");
  Cliente.sync({ force: false });
  User.sync({ force: false }); // Sincroniza o modelo User
}).then(() => {
  console.log("Tabelas sincronizadas com sucesso!");
}).catch((error) => {
  console.error("Erro ao sincronizar tabelas:", error);
});

// Definindo o EJS como renderizador de páginas
app.set("view engine", "ejs");

// Definir a pasta dos arquivos estáticos (public)
app.use(express.static('public'));

// Usar as rotas dos controladores de usuários, clientes, produtos e pedidos
app.use(UsersController);
app.use(ClientesController);
app.use(ProdutoController);
app.use(PedidoController);

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.render("index");
});

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS loja;`).then(() => {
  console.log("O banco de dados está criado.");
}).catch((error) => {
  console.log(error);
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
