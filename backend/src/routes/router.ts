import { Router } from "express";
import { atualizarUsuario, cadastrarUsuario, deletarUsuario, listarUsuarioID, listarUsuarios } from "../controllers/usuario.controller";
import { atualizarLivro, cadastrarLivro, deletarLivro, listarLivroID, listarLivros } from "../controllers/livro.controller";
import { atualizarEstoque, inserirLivroEstoque, listarEstoque } from "../controllers/estoque.controller";
import { cadastrarReserva, devolverLivro, listarReservas, listarReservasID } from "../controllers/reserva.controller";

export const router = Router();


//            USUARIOS



//lista todos os usuários

router.get('/usuarios', listarUsuarios);

// lista usuario por id

router.get('/usuarios/:id', listarUsuarioID)

// criar usuario

router.post('/usuarios', cadastrarUsuario);

// atualizar usuario

router.patch('/usuarios/:id', atualizarUsuario);

// deletar usuario

router.delete('/usuarios/:id', deletarUsuario);



//                 LIVROS


// lista todos os livros

router.get('/livros', listarLivros);

// lista livro por id

router.get('/livros/:id', listarLivroID);

// rota para cadastrar livro

router.post('/livros', cadastrarLivro);

// rota para atualizar livros

router.patch('/livros/:id', atualizarLivro);

// rota para deletar livro por id

router.delete('/livros/:id', deletarLivro);



//               ESTOQUE



//lista o estoque

router.get('/estoque', listarEstoque);

// atualiza estoque 

router.patch('/estoque/:id', atualizarEstoque);

// inserir livro no estoque

router.post('/estoque', inserirLivroEstoque);

//devolver livro

router.post('/estoque', devolverLivro);



//              RESERVA



// listar reservas

router.get('/reservas', listarReservas);

// listar reserva por id

router.get('/reservas/:id', listarReservasID);

// cadastrar reserva

router.post('/reservas', cadastrarReserva);
