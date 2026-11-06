"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function AddBookDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Livro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>Preencha as informações do livro para adicionar ao acervo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Digite o título do livro" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Autor</Label>
            <Input id="author" placeholder="Digite o nome do autor" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" placeholder="Ex: Ficção" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Ano</Label>
              <Input id="year" type="number" placeholder="2024" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" placeholder="978-3-16-148410-0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" placeholder="Breve descrição do livro..." className="resize-none" rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Adicionar ao Acervo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
