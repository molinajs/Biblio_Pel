'use client'

import { useState, useEffect } from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, User, ArrowLeft, Mail, MapPin, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Usuario = {
  id: number
  nome: string
  email: string
  cpf: string
  telefone: string
  endereco: string
}


export default function EmprestimosPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
  });

  const [usuarios, setUsuarios] = useState <Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    
    buscarUsuarios();
  }, []);
  const buscarUsuarios= async () => {
  
      try {
        const response = await fetch('http://localhost:3333/usuarios');
        console.log('Response:', response);
  
        const data = await response.json();
  
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      } finally {
        setLoading(false);
      }
    };

const adicionarUsuario = async () => {
  try {
    const response = await fetch("http://localhost:3333/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        endereco: form.endereco
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    await buscarUsuarios()

    setForm({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      endereco: ""
    })

    setOpen(false);
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar usuário");
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setForm(prev => ({ ...prev, [id]: value }));
};

  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">Controle todos usuários da biblioteca</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo usuário</DialogTitle>
              <DialogDescription>Preencha as informações do usuário para adicionar ao banco da biblioteca</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input 
                    id="nome" 
                    onChange={handleChange}
                    value={form.nome}
                    type="text" 
                    placeholder="Digite o nome do usuário" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    onChange={handleChange}
                    value={form.email}
                    type='text' 
                    placeholder="Digite o email do usuário" 
                    />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input 
                    id="cpf" 
                    onChange={handleChange}
                    value={form.cpf}
                    type="text" 
                    placeholder="Ex: 12345678900" 
                    />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    onChange={handleChange}
                    value={form.telefone}
                    type="text" 
                    placeholder="Ex: (99) 99999-9999" 
                    />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input 
                    id="endereco" 
                    onChange={handleChange}
                    value={form.endereco}
                    type="text
                    " 
                    placeholder="Ex: Rua Exemplo, 123" 
                    />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={adicionarUsuario}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

        {loading && <p>Carregando usuários...</p>}

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Endereço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {usuario.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {usuario.cpf}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {usuario.telefone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {usuario.endereco}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </div>
      </main>
    </div>
  )
}
