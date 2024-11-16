'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Droplet, Fish, Thermometer, Waves, AlertTriangle, Calendar, Settings } from 'lucide-react'

export function AquariumDashboardComponent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard do Aquário
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Thermometer className="mr-2" />
              Temperatura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">25.5°C</p>
            <p className="text-sm text-muted-foreground">Ideal: 24-26°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplet className="mr-2" />
              pH da Água
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">7.2</p>
            <p className="text-sm text-muted-foreground">Ideal: 6.8-7.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Waves className="mr-2" />
              Nível de Amônia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">0.25 ppm</p>
            <p className="text-sm text-muted-foreground">Ideal: &lt;0.25 ppm</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Fish className="mr-2" />
                <span>Alimentar os peixes (2x ao dia)</span>
              </li>
              <li className="flex items-center">
                <Calendar className="mr-2" />
                <span>Troca parcial de água (25%) em 2 dias</span>
              </li>
              <li className="flex items-center">
                <AlertTriangle className="mr-2" />
                <span>Verificar filtro em 1 semana</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/feed" className="flex items-center">
                <Fish className="mr-2" />
                Registrar Alimentação
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/configure-parameters" className="flex items-center">
                <Settings className="w-5 h-5" />
                Configurar Parâmetros
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}         