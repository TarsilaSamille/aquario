"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplet, Thermometer, Fish, Sun, Activity, Zap } from "lucide-react";

export function LandingPageComponent() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="flex flex-col items-center text-center pt-24 pb-24">
          <div 
          // className=" inset-0 bg-black opacity-50"
            // style={{
            //   backgroundImage: "url('/images/fish-tank-tech.jpg')",
            //   backgroundSize: "contain",
            //   backgroundPosition: "top",
            //   backgroundRepeat: "no-repeat",
            // }}
          >
            <h2 className="text-5xl font-extrabold text-blue-900 mb-6">
              Projeto Aquário Inteligente
            </h2>
          </div>
          <p className="text-2xl text-blue-700 mb-10">
            Revolucionando a gestão de aquários com tecnologia inteligente
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Saiba Mais
          </Button>
        </section>

        <section id="features" className="mb-16">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">
            Principais Funcionalidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Controle de Temperatura",
                icon: Thermometer,
                description: "Gestão automatizada da temperatura da água",
              },
              {
                title: "Automação de Alimentação",
                icon: Fish,
                description: "Alimentação de peixes programada e controlada",
              },
              {
                title: "Iluminação Inteligente",
                icon: Sun,
                description:
                  "Ciclos de iluminação otimizados para a vida aquática",
              },
              {
                title: "Monitoramento da Qualidade da Água",
                icon: Droplet,
                description:
                  "Monitoramento em tempo real do pH e equilíbrio químico",
              },
              {
                title: "Gestão Remota",
                icon: Activity,
                description:
                  "Controle e monitoramento do seu aquário de qualquer lugar",
              },
              {
                title: "Eficiência Energética",
                icon: Zap,
                description:
                  "Consumo de energia otimizado para sustentabilidade",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="w-6 h-6 mr-2 text-blue-600" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="components" className="mb-16">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">
            Componentes do Sistema
          </h3>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>Microcontrolador ESP32</li>
            <li>Sensores de Temperatura (DS18B20)</li>
            <li>Sensores de pH</li>
            <li>Sensores de Oxigênio Dissolvido</li>
            <li>Sensores de Turbidez</li>
            <li>Alimentador Automático</li>
            <li>Sistema de Iluminação LED</li>
            <li>Bomba de Água</li>
          </ul>
        </section>

        <section id="about" className="text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            Sobre o Projeto
          </h3>
          <p className="text-blue-700 mb-6">
            O Projeto Aquário Inteligente visa revolucionar a gestão de aquários
            integrando tecnologia inteligente para controle e monitoramento
            automatizados. Nosso sistema garante condições ideais para a vida
            aquática enquanto simplifica a manutenção para entusiastas de
            aquários.
          </p>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-100"
          >
            Contate-Nos
          </Button>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            &copy; 2024 Projeto Aquário Inteligente. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
