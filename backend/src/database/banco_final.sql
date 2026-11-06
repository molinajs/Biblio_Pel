--Site para BibioPeL----
CREATE DATABASE sistema_bibliopel;
USE sistema_bibliopel;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(55) UNIQUE NOT NULL ,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    endereco VARCHAR(55) NOT NULL
);

CREATE TABLE livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    codigo_livro VARCHAR(45) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT  DEFAULT('Sem descrição.'),
    edicao INT (20),
    ano INT NOT NULL,
    status ENUM('ativo', 'devolvido') NOT NULL DEFAULT 'ativo'
);

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT NOT NULL,
    qtd INT NOT NULL,

    FOREIGN KEY (livro_id) REFERENCES livro(id)
);

CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_devolucao DATE,
    status ENUM('ativo', 'devolvido') NOT NULL DEFAULT 'ativo',

    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (livro_id) REFERENCES livro(id)
);


INSERT INTO usuario (nome, email, telefone, cpf, endereco) VALUES
('Gabriel','gabriel@hotmail','5544332211', '05784889887', 'Rua Marechal Floriano 153'),
('joao','joao@gmail.com','1122334455', '05784365887' , 'Rua Nereu Ramos 105'),
('Gilberto', 'gilberto@gmail.com', '2211335544','05784825887', 'Rua Pinheiro Machado 144');

INSERT INTO livro (titulo, autor, codigo_livro, categoria, descricao, edicao, ano) VALUES
('Clean Code',"Robert C. Martin", 'PROG-001', 'Programação', 'código limpo e boas práticas', 1, 2000),
('Nada de Novo no Front','Erich Maria Remarque','HIST-004', 'História', 'Romance histórico que retrata a Primeira Guerra Mundial sob a visão de um soldado alemão',1 , 1929),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry','INF-001', 'Infantil', 'História poética e sensível que aborda amizade, imaginação e valores humanos de forma acessível às crianças', 1 , 1943);

INSERT INTO estoque (livro_id, qtd) VALUES
( 1, 10),
( 2, 10),
( 3, 10),
( 4, 10),
( 5, 10),
( 6, 10),
( 7, 10),
( 8, 10),
( 9, 10),
( 10, 10),
( 11, 10),
( 12, 10),
( 13, 10),
( 14, 10),
( 15, 10),
( 16, 10);

INSERT INTO reserva (usuario_id , livro_id , data_retirada,data_devolucao) VALUES
 ( 1, 3, NOW(), '2026-01-02' ),
 ( 2, 1, NOW(), '2026-01-02' ),
 ( 3, 2, NOW(), '2026-01-02' );