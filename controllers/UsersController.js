import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// ROTA DE LOGIN
router.get("/login", (req, res) => {
  res.render("login", {
    loggedOut: true,
    messages: req.flash()
  });
});

// ROTA DE LOGOUT
router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

// ROTA DE CADASTRO DE USUÁRIO
router.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    loggedOut: true,
    messages: req.flash()
  });
});

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Verifica se o usuário já está cadastrado no banco
  User.findOne({ where: { email: email } }).then(user => {
    if (user == undefined) {
      // Cadastro do usuário
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        email: email,
        password: hash,
      }).then(() => {
        res.redirect("/login");
      });
    } else {
      req.flash('danger', 'O usuário já está cadastrado! Faça o login.');
      res.redirect("/cadastro");
    }
  });
});

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req, res) => {
    const { email, password } = req.body;
  
    console.log("Authenticate route - Email:", email);
  
    // Busca o usuário no banco
    User.findOne({ where: { email: email } }).then(user => {
      if (user != undefined) {
        // Valida a senha
        const correct = bcrypt.compareSync(password, user.password);
        if (correct) {
          // Autoriza o login
          req.session.user = {
            id: user.id,
            email: user.email
          };
          console.log("Authenticate route - Login successful:", req.session.user);
  
          // Salvaguarda a sessão antes de redirecionar
          req.session.save(err => {
            if (err) {
              console.error("Erro ao salvar sessão:", err);
              req.flash('danger', 'Erro ao salvar sessão! Tente novamente.');
              res.redirect("/login");
            } else {
              req.flash('success', 'Login efetuado com sucesso!');
              res.redirect("/");
            }
          });
        } else {
          req.flash('danger', 'A senha informada está incorreta! Tente novamente.');
          res.redirect("/login");
        }
      } else {
        req.flash('danger', 'O usuário informado não existe! Verifique os dados digitados.');
        res.redirect("/login");
      }
    }).catch(error => {
      console.error("Erro ao autenticar usuário:", error);
      res.status(500).send("Erro ao autenticar usuário");
    });
  });
  export default router;
