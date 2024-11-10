import express from "express";
import Cliente from "../models/Cliente.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

// ROTA CLIENTES
router.get("/clientes", Auth, (req, res) => {
  console.log("Clientes route accessed - Session user:", req.session.user);
  Cliente.findAll().then(clientes => {
    res.render("clientes", { clientes: clientes });
  }).catch(error => {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).send("Erro ao buscar clientes");
  });
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", Auth, (req, res) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco
  }).then(() => {
    res.redirect("/clientes");
  }).catch((error) => {
    console.error("Erro ao criar cliente:", error);
    res.status(500).send("Erro ao criar cliente");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/clientes/delete/:id", Auth, (req, res) => {
  const id = req.params.id;
  Cliente.destroy({
    where: { id: id }
  }).then(() => {
    res.redirect("/clientes");
  }).catch((error) => {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).send("Erro ao excluir cliente");
  });
});

// ROTA DE EDIÇÃO DE CLIENTES
router.get("/clientes/edit/:id", Auth, (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id).then(cliente => {
    res.render("clienteEdit", { cliente: cliente });
  }).catch((error) => {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).send("Erro ao buscar cliente");
  });
});

// ROTA DE ALTERAÇÃO DE CLIENTES
router.post("/clientes/update/:id", Auth, (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  Cliente.update(
    {
      nome: nome,
      cpf: cpf,
      endereco: endereco
    },
    { where: { id: id } }
  ).then(() => {
    res.redirect("/clientes");
  }).catch((error) => {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).send("Erro ao atualizar cliente");
  });
});

export default router; // Exportando o módulo "router"
