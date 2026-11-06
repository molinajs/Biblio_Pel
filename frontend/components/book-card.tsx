import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, User } from "lucide-react"

interface BookCardProps {
  title: string
  author: string
  category: string
  year: string
  available: boolean
  coverImage: string
}

export function BookCard({ title, author, category, year, available, coverImage }: BookCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={coverImage || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant={available ? "default" : "secondary"} className="shrink-0">
            {available ? "Disponível" : "Emprestado"}
          </Badge>
          <Badge variant="outline" className="shrink-0">
            {category}
          </Badge>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{title}</h3>
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{author}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{year}</span>
          </div>
        </div>
        <Button className="mt-4 w-full" disabled={!available}>
          <BookOpen className="mr-2 h-4 w-4" />
          {available ? "Reservar" : "Indisponível"}
        </Button>
      </div>
    </Card>
  )
}
