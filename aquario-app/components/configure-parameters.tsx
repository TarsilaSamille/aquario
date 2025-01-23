'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function ConfigureAquariumActions() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

  // Dados que serão preenchidos nos formulários
  const [formData, setFormData] = useState({
    data: "",
    ultimaData: "",
    detalhes: ""
  })

  // Atualiza os dados do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Função de envio de dados (por enquanto apenas simula o envio)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.data || !formData.ultimaData) {
      toast({
        title: "Erro",
        description: "Todos os campos devem ser preenchidos.",
        variant: "destructive",
      })
      return
    }
    
    // Simula o envio dos dados
    toast({
      title: "Dados Enviados",
      description: `Os dados para a ação ${selectedForm} foram enviados com sucesso.`,
    })
    
    // Limpar o formulário após envio
    setFormData({
      data: "",
      ultimaData: "",
      detalhes: ""
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Ações do Aquário</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Botões para selecionar a ação */}
        <div className="flex space-x-2 mb-4">
          <Button onClick={() => setSelectedForm("trocaFiltro")} className="w-full">
            Troca de Filtro
          </Button>
          <Button onClick={() => setSelectedForm("registrarAlimentacao")} className="w-full">
            Registrar Alimentação
          </Button>
          <Button onClick={() => setSelectedForm("trocaAgua")} className="w-full">
            Troca de Água
          </Button>
        </div>

        {/* Formulário Dinâmico baseado na ação selecionada */}
        {selectedForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data" className="flex items-center">
                Data da {selectedForm === "trocaFiltro" ? "Troca de Filtro" : selectedForm === "registrarAlimentacao" ? "Alimentação" : "Troca de Água"}
              </Label>
              <Input
                id="data"
                name="data"
                type="date"
                value={formData.data}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ultimaData" className="flex items-center">
                Última {selectedForm === "trocaFiltro" ? "Troca de Filtro" : selectedForm === "registrarAlimentacao" ? "Alimentação" : "Troca de Água"}
              </Label>
              <Input
                id="ultimaData"
                name="ultimaData"
                type="date"
                value={formData.ultimaData}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detalhes" className="flex items-center">
                Detalhes (opcional)
              </Label>
              <Input
                id="detalhes"
                name="detalhes"
                value={formData.detalhes}
                onChange={handleInputChange}
                placeholder="Ex: Observações sobre o filtro, alimentação ou troca de água"
              />
            </div>

            <Button type="submit" className="w-full">
              Enviar Dados
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setSelectedForm(null)}
          className="w-full bg-red-500 text-white"
        >
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}
