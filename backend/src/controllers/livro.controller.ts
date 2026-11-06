import { db } from "../database/connection";

export const listarLivros = async (req, res) => {

    const livros = await db('livro')
        .select(
        'livro.id',
        'livro.titulo',
        'livro.autor',
        'livro.codigo_livro',
        'livro.categoria',
        'livro.descricao',
        'livro.edicao',
        'livro.ano',
        'livro.status',
        'estoque.qtd as quantidade_estoque'
        )
        .innerJoin('estoque', 'estoque.livro_id', 'livro.id');
    
    return res.json(livros)

}

export const listarLivroID = async (req, res) => {

    const {id} = req.params;

    const livro = await db('livro').where({id}).select('*');

    return res.json(livro);
}

export const cadastrarLivro = async (req, res) => {
    const {titulo, autor, codigo_livro, categoria, descricao, ano, edicao} = req.body;

    const livros = await db('livro').select('*');

    for (let livro of livros) {
        if (livro.codigo_livro === codigo_livro) {
            return res.status(403).json({
                erro: "Livro ja cadastrado"
            });
        }
    }

    const novoLivro = await db('livro').insert({ titulo, autor, codigo_livro, categoria, descricao, ano, edicao});

    return res.json(novoLivro);
}


export const atualizarLivro = async (req, res) => {
    const {id} = req.params;
    const {titulo, codigo_livro, categoria, descricao, ano, edicao} = req.body;

    const livroAtualizado = await db('livro').update({ titulo, codigo_livro, categoria, descricao, ano, edicao}).where({id});

    return res.json(livroAtualizado);
}


export const deletarLivro = async (req, res) => {
  const { id } = req.params;

  const livroExiste = await db('livro').where({ id }).first();

  if (!livroExiste) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }

  await db('livro').where({ id }).delete();

  return res.status(204).send();
};