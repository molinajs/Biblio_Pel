import { db } from "../database/connection";

export const listarEstoque = async (req, res) => {

    const estoque = await db('estoque').select(
        'livro.titulo',
        'estoque.qtd as quantidade'
    )
    .innerJoin('livro', 'livro.id', 'estoque.livro_id');


    res.json(estoque)
}

export const inserirLivroEstoque = async (req, res) => {

    const { livro_id, qtd } = req.body;

    const novoLivro = await db('estoque').insert({ livro_id, qtd });

    return res.json(novoLivro);
}

export const atualizarEstoque = async (req, res) => {
    const {id} = req.params;
    const { qtd, livro_id } = req.body

    const estoqueAtualizado = await db('estoque').where({id}).update({qtd, livro_id});

    return res.json(estoqueAtualizado);
}