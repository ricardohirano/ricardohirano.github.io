import express from "express";
const router = express.Router();
// Importando o middleware de autenticação
import Auth from "../middleware/Auth.js";

// ROTA DE PRODUTOS
router.get("/produtos", Auth, (req, res) => {
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
router.get("/produtos/:nome", Auth, (req, res) => {
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

export default router;
