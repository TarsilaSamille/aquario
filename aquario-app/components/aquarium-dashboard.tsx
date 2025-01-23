'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Fish, Thermometer, Waves, AlertTriangle, Calendar } from 'lucide-react';

export function AquariumDashboardComponent() {
    const [feedCount, setFeedCount] = useState(0);
    const [lastWaterChange, setLastWaterChange] = useState<Date | null>(null);
    const [lastFilterChange, setLastFilterChange] = useState<Date | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [ph, setPh] = useState<number | null>(null);
    const [amonia, setAmonia] = useState<number | null>(null);
    const [luminosity, setLuminosity] = useState<number | null>(null);
    const [autoFeed, setAutoFeed] = useState<boolean>(false);
    const [feedColor, setFeedColor] = useState<string>('white');
    const [] = useState({
        temperatura: "24°C",
        alimentacao: "2x ao dia",
        iluminacao: "12 horas/dia",
        qualidadeAgua: "Boa"
    });

    useEffect(() => {
        // Fetch data from API endpoints
        fetch('/api/ph')
            .then(res => res.json())
            .then(data => setPh(data.valor));

        fetch('/api/amonia')
            .then(res => res.json())
            .then(data => setAmonia(data.valor));

        fetch('/api/temperature')
            .then(res => res.json())
            .then(data => setTemperature(data.valor));

        fetch('/api/luminosity')
            .then(res => res.json())
            .then(data => setLuminosity(data.valor));
    }, []);

    const handleFeedClick = () => {
        setFeedCount(feedCount + 1);
    };

    const handleWaterChangeClick = () => {
        setLastWaterChange(new Date());
    };

    const handleFilterChangeClick = () => {
        setLastFilterChange(new Date());
    };

    const handleFeedColorChange = (color: string) => {
        setFeedColor(color);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                Dashboard do Aquário
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Informações principais */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Thermometer className="mr-2" />
                            Temperatura
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{temperature !== null ? `${temperature}°C` : 'Carregando...'}</p>
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
                        <p className="text-2xl font-semibold">{ph !== null ? ph.toFixed(2) : 'Carregando...'}</p>
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
                        <p className="text-2xl font-semibold">{amonia !== null ? `${amonia} ppm` : 'Carregando...'}</p>
                        <p className="text-sm text-muted-foreground">Ideal: &lt;0.25 ppm</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Waves className="mr-2" />
                            Nível de Luminosidade
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{luminosity !== null ? `${luminosity} lux` : 'Carregando...'}</p>
                        <p className="text-sm text-muted-foreground">Ideal: 200-400 lux</p>
                    </CardContent>
                </Card>
            </div>

            {/* Ações e configurações */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Próximas Tarefas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Fish className="mr-2" />
                                <span>
                                    Alimentar os peixes (2x ao dia) - Alimentado {feedCount} vezes
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Calendar className="mr-2" />
                                <span>
                                    Troca parcial de água (25%) - Última troca:{" "}
                                    {lastWaterChange
                                        ? lastWaterChange.toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </li>
                            <li className="flex items-center">
                                <AlertTriangle className="mr-2" />
                                <span>
                                    Verificar filtro - Última verificação:{" "}
                                    {lastFilterChange
                                        ? lastFilterChange.toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {/* Alimentação */}
                        <Button
                            className={`w-full justify-start bg-${feedColor}`}
                            onClick={handleFeedClick}
                        >
                            <Fish className="mr-2" />
                            Registrar Alimentação
                        </Button>

                        {/* Alimentação Automática */}
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={autoFeed}
                                onChange={(e) => setAutoFeed(e.target.checked)}
                                className="form-checkbox"
                            />
                            <span>Alimentação Automática</span>
                        </label>

                        {/* Troca de Água */}
                        <Button
                            className="w-full justify-start"
                            onClick={handleWaterChangeClick}
                        >
                            <Droplet className="mr-2" />
                            Registrar Troca de Água
                        </Button>

                        {/* Verificação do Filtro */}
                        <Button
                            className="w-full justify-start"
                            onClick={handleFilterChangeClick}
                        >
                            <AlertTriangle className="mr-2" />
                            Registrar Verificação do Filtro
                        </Button>

                        {/* Botões de cores */}
                        <div className="flex space-x-2">
                            <Button
                                className="bg-red-500 text-white"
                                onClick={() => handleFeedColorChange('red')}
                            >
                                Troca de Filtro
                            </Button>
                            <Button
                                className="bg-white border text-black"
                                onClick={() => handleFeedColorChange('white')}
                            >
                                registrar alimentação
                            </Button>
                            <Button
                                className="bg-blue-500 text-white"
                                onClick={() => handleFeedColorChange('blue')}
                            >
                                troca de agua 
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
