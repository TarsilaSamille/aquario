"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Thermometer, Fish, Sun, Droplet } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

export function ConfigureParametersComponent() {
  const [parameters, setParameters] = useState({
    temperatura: "",
    alimentacao: "",
    iluminacao: "",
    qualidadeAgua: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParameters({ ...parameters, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica para salvar configurações
    console.log("Configurações salvas:", parameters)
    toast({
      title: "Configurações Salvas",
      description: "Os parâmetros do aquário foram atualizados com sucesso.",
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Configurar Parâmetros do Aquário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperatura" className="flex items-center">
              <Thermometer className="w-4 h-4 mr-2" />
              Temperatura
            </Label>
            <Input
              id="temperatura"
              name="temperatura"
              value={parameters.temperatura}
              onChange={handleChange}
              placeholder="Ex: 25°C"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alimentacao" className="flex items-center">
              <Fish className="w-4 h-4 mr-2" />
              Alimentação
            </Label>
            <Input
              id="alimentacao"
              name="alimentacao"
              value={parameters.alimentacao}
              onChange={handleChange}
              placeholder="Ex: 2x ao dia"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iluminacao" className="flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              Iluminação
            </Label>
            <Input
              id="iluminacao"
              name="iluminacao"
              value={parameters.iluminacao}
              onChange={handleChange}
              placeholder="Ex: 12 horas/dia"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualidadeAgua" className="flex items-center">
              <Droplet className="w-4 h-4 mr-2" />
              Qualidade da Água
            </Label>
            <Input
              id="qualidadeAgua"
              name="qualidadeAgua"
              value={parameters.qualidadeAgua}
              onChange={handleChange}
              placeholder="Ex: Boa"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Salvar Configurações</Button>
      </CardFooter>
    </Card>
  )
}