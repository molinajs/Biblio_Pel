import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Book, Users, BookOpen, TrendingUp, ArrowUpRight, Calendar } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total de Livros",
      value: "12,543",
      description: "+285 este mês",
      icon: Book,
    },
    {
      title: "Usuários Ativos",
      value: "3,421",
      description: "+12% vs mês anterior",
      icon: Users,
    },
    {
      title: "Empréstimos Ativos",
      value: "847",
      description: "Este mês",
      icon: BookOpen,
    },
    {
      title: "Taxa de Devolução",
      value: "94%",
      description: "+5% vs média",
      icon: TrendingUp,
    },
  ]

  const recentLoans = [
    { user: "Maria Silva", book: "1984", date: "2025-01-15", status: "ativo" },
    { user: "João Santos", book: "Dom Casmurro", date: "2025-01-14", status: "ativo" },
    { user: "Ana Costa", book: "O Pequeno Príncipe", date: "2025-01-14", status: "devolvido" },
    { user: "Pedro Oliveira", book: "Harry Potter", date: "2025-01-13", status: "atrasado" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao painel de controle da Bibliopel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Empréstimos Recentes</h3>
            <Button variant="ghost" size="sm" className="gap-1">
              Ver todos
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentLoans.map((loan, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-foreground">{loan.user}</p>
                  <p className="text-sm text-muted-foreground">{loan.book}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{loan.date}</p>
                  <span
                    className={cn(
                      "inline-block rounded-full px-2 py-1 text-xs font-medium",
                      loan.status === "ativo" && "bg-primary/10 text-primary",
                      loan.status === "devolvido" && "bg-green-500/10 text-green-600",
                      loan.status === "atrasado" && "bg-destructive/10 text-destructive",
                    )}
                  >
                    {loan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Ações Rápidas</h3>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="lg">
              <BookOpen className="h-5 w-5" />
              Registrar Novo Empréstimo
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="lg">
              <Book className="h-5 w-5" />
              Adicionar Livro ao Acervo
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="lg">
              <Users className="h-5 w-5" />
              Cadastrar Novo Usuário
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="lg">
              <Calendar className="h-5 w-5" />
              Ver Devoluções Pendentes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
