"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2 } from "lucide-react"


type Book = {
  id: number
  titulo: string
  codigo_livro: string
  autor: string
  categoria: string
  ano: string
  descricao: string
  edicao: number
  quantidade_estoque: number
}

export default function LivrosPage() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState <Book[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    codigo_livro: "",
    ano: "",
    edicao: "",
    descricao: ""
  });
  
  useEffect(() => {
    async function carregarLivros() {
      try {
        const response = await fetch('http://localhost:3333/livros')
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Erro ao buscar livros:', error)
      }
    }
  
    carregarLivros()
  }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setForm(prev => ({ ...prev, [id]: value }));
};

const adicionarLivro = async () => {
  try {
    const response = await fetch("http://localhost:3333/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: form.titulo,
        autor: form.autor,
        categoria: form.categoria,
        codigo_livro: form.codigo_livro,
        ano: Number(form.ano),
        edicao: Number(form.edicao),
        descricao: form.descricao
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar livro");
    }

    setOpen(false);
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar livro");
  }
};




  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Livros</h1>
          <p className="text-muted-foreground">Controle todo o acervo da biblioteca</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Livro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Livro</DialogTitle>
              <DialogDescription>Preencha as informações do livro para adicionar ao acervo</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input 
                    id="titulo" 
                    onChange={handleChange}
                    value={form.titulo}
                    type="text" 
                    placeholder="Digite o título do livro" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input 
                    id="autor" 
                    onChange={handleChange}
                    value={form.autor}
                    type='text' 
                    placeholder="Digite o nome do autor" 
                    />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input 
                    id="categoria" 
                    onChange={handleChange}
                    value={form.categoria}
                    type="text" 
                    placeholder="Ex: Programação" 
                    />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="codigo_livro">Código do livro</Label>
                  <Input 
                    id="codigo_livro" 
                    onChange={handleChange}
                    value={form.codigo_livro}
                    type="text" 
                    placeholder="PROG-001" 
                    />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ano">Ano</Label>
                  <Input 
                    id="ano" 
                    onChange={handleChange}
                    value={form.ano}
                    type="number" 
                    placeholder="Ex: 2024" 
                    />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edicao">Edição</Label>
                  <Input 
                    id="edicao"
                    onChange={handleChange}
                    value={form.edicao} 
                    type="number" 
                    placeholder="Ex: 1" 
                    />
                </div>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    onChange={handleChange}
                    value={form.descricao}
                    placeholder="Descreva o livro..."
                    className="min-h-[120px] resize-none"
                  />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarLivro}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por título, autor ou categoria..." className="pl-9" />
          </div>
        </div>

        <div className="rounded-md border border-border">

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Edição</TableHead>
                <TableHead>Disponíveis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                console.log(books),
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.titulo}</TableCell>
                  <TableCell>{book.autor}</TableCell>
                  <TableCell>{book.categoria}</TableCell>
                  <TableCell>{book.ano}</TableCell>
                  <TableCell>{book.edicao}</TableCell>
                  <TableCell>{book.quantidade_estoque}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
