import { db } from "../database/connection";


export const listarReservas = async (req , res) => {

    const reservas = await db('reserva').select(
        'reserva.id as id',
        'usuario.nome as nome',
        'livro.titulo as titulo',
        'reserva.status as status',
        'livro.codigo_livro as codigo_livro',
        'data_retirada',
        'data_devolucao'
    )
    .innerJoin('usuario', 'usuario.id', 'reserva.usuario_id')
    .innerJoin('livro', 'livro.id', 'reserva.livro_id');

    return res.json(reservas)
}


export const cadastrarReserva = async (req, res) => {
    
    const { usuario_id, livro_id } = req.body;

    const data_retirada = new Date();
    const data_devolucao = new Date(data_retirada);
    data_devolucao.setDate(data_devolucao.getDate() + 15);
    const dataDevolucaoFormatada = data_devolucao.toLocaleDateString('pt-BR');

    const usuarioExiste =  await db('usuario').where({id: usuario_id}).first();
    const estoqueLivro = await db('estoque').where({livro_id}).first();

    if(!usuarioExiste) {
        return res.status(404).json({
            message: "Usuário não encontrado"
        })
    };

    const reservasAtivas = await db('reserva')
    .where({ usuario_id, status: 'ativo' })
    .count('id as total')
    .first();

    if (Number(reservasAtivas.total) >= 3) {
        return res.status(403).json({
      message: "Usuário já possui o limite máximo de 3 livros reservados."
    });
    }

    if( !estoqueLivro || estoqueLivro.qtd < 1 ){
        return res.status(403).json({
            message: "Desculpe, não temos esse livro disponível!"
        })
    }

    await db('estoque').where({livro_id}).update({ qtd: estoqueLivro.qtd -1 });

    const cadastrarReserva = await db('reserva').insert({usuario_id, livro_id, data_retirada, data_devolucao})
    
    return res.status(201).json({
        cadastrarReserva,
        estoque_atualizado: estoqueLivro.qtd -1,
        message: `Cadastro realizado com sucesso! Sua data de devolucão é: ${dataDevolucaoFormatada} em horário comercial.`
    })
}

export const devolverLivro = async (req, res) => {

    const {id} = req.body;
    const data_devolvido = new Date();
    const reservas = await db('reserva').where({id}).select('*').first();
    const estoque = await db('estoque').select('*').first();

    const data_devolucao = reservas.data_devolucao;
    
    let diasAtraso = 0;
    let multa = 0;

    if (data_devolvido > data_devolucao) {
        const diffEmMs = data_devolvido.getTime() - data_devolucao.getTime();
        diasAtraso = Math.ceil(diffEmMs / (1000 * 60 * 60 * 24));
        multa = diasAtraso * 1;
    }


    if(!reservas){
        return res.status(404).json({
            message: "Reserva não encontrada!"
        });
    };

    if(reservas.status === 'devolvido' ){
        res.status(400).json({
            erro: "Não é possível devolver um livro que já foi devolvido"
        });
    };

    
    await db('reserva').where({id}).update({
        data_devolucao: data_devolucao,
        status: 'devolvido'
    })

    
    await db('estoque').where({livro_id: reservas.livro_id}).update({
        
        qtd: estoque.qtd++
    })

    return res.status(201).json({
        message: diasAtraso > 0
        ? `Livro devolvido com ${diasAtraso} dia(s) de atraso`
        : "Livro devolvido no prazo",
        dias_atraso: diasAtraso,
        multa: multa ? `R$ ${multa},00` : "Nenhuma multa aplicada." 
    })

};

export const listarReservasID = async (req, res) => {
    const {id} = req.params;
    

        const reserva = await db('reserva').where({ 'reserva.id': id }).select(
        'usuario.nome',
        'livro.titulo',
        'reserva.data_retirada',
        'reserva.data_devolucao',
        'reserva.status'
    )
    .innerJoin('usuario', 'usuario.id', 'reserva.usuario_id')
    .innerJoin('livro', 'livro.id', 'reserva.livro_id');
    
    return res.json(reserva);
}
