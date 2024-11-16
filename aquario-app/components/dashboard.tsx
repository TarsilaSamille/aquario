'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Settings, BarChart } from "lucide-react"

export function DashboardComponent() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/configure" className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configurar Parâmetros</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/view" className="flex items-center space-x-2">
                  <BarChart className="w-5 h-5" />
                  <span>Visualizar Dados</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}