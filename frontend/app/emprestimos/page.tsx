'use client'

import { useState, useEffect } from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Book, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Reserva = {
  id: number
  titulo: string
  codigo_livro: string
  usuario_id: string
  nome: string
  data_retirada: string
  data_devolucao: string
  status: 'ativo' | 'devolvido'
}


export default function EmprestimosPage() {


  const [reservas, setReservas] = useState <Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

const buscarEmprestimos = async () => {

    try {
      const response = await fetch('http://localhost:3333/reservas');
      console.log('Response:', response);

      const data = await response.json();

      setReservas(data);
    } catch (error) {
      console.error('Erro ao buscar empréstimos', error);
    } finally {
      setLoading(false);
    }
  };

  buscarEmprestimos();
}, []);

  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-2 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Empréstimos</h1>
            <p className="text-muted-foreground">Controle todos os empréstimos ativos e histórico</p>
          </div>
          <Button className="gap-2">
            <Book className="h-4 w-4" />
            Novo Empréstimo
          </Button>
        </div>

        {loading && <p>Carregando empréstimos...</p>}

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Livro</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Data Empréstimo</TableHead>
                <TableHead>Data Devolução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.codigo_livro}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-muted-foreground" />
                      {reserva.titulo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {reserva.nome}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(reserva.data_retirada).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(reserva.data_devolucao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reserva.status === "ativo"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {reserva.status === "ativo"
                        ? "Ativo"
                        : "Devolvido"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {reserva.status !== "devolvido" && (
                      <Button size="sm" variant="outline">
                        Registrar Devolução
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
