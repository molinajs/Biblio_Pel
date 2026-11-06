import { db } from "../database/connection";


export const listarUsuarios = async (req, res) =>{

    const usuarios = await db('usuario').select('*')

    return res.json(usuarios)
}


export const listarUsuarioID = async (req, res) =>{

    const {id} = req.params;

    const usuario = await db('usuario').where({id}).select('*');

    return res.json(usuario);
}

export const cadastrarUsuario = async (req, res) => {

    const { nome, email, cpf, endereco, telefone} = req.body;

    const novoUsuario = await db('usuario').insert({nome, email, cpf, endereco, telefone});

    return res.json(novoUsuario);
}


export const atualizarUsuario = async (req, res) =>{
    const {id} = req.params;

    const { nome, email, cpf, endereco, telefone} = req.body; 

    const usuarioAtualizado = await db('usuario').update({nome, email, cpf, endereco, telefone}).where({id});

    return res.json(usuarioAtualizado);
}


export const deletarUsuario = async (req, res) => {
    const {id} =  req.params;

    const usuarioExiste = await db('usuario').where({id}).first();

    if(!usuarioExiste) {
        return res.status(404).json({
            message: "Usuário não encontrado."
        })
    };

    const reservaAtiva = await db('reserva').where({usuario_id: id, status: 'ativo'}).first();

    if(reservaAtiva) {
        return res.status(403).json({
            message: "Usuário possui reserva ativa, não pode ser excluido."
        })
    };

    const deletarUsuario = await db('usuario').where({id}).delete();

    return res.json(deletarUsuario)
}
 