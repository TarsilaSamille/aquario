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
    const [autoFeed, setAutoFeed] = useState<boolean>(false); // Alimentação automática
    const [lastFeedDate, setLastFeedDate] = useState<Date | null>(null); // Registro da última alimentação
    const [showFeedError, setShowFeedError] = useState(false); // Controle do erro de alimentação
    const [formVisible, setFormVisible] = useState(false);
    const [showAutoFeedPopup, setShowAutoFeedPopup] = useState(false); // Controle do pop-up de alimentação automática

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
        const today = new Date();
        if (lastFeedDate && lastFeedDate.toLocaleDateString() === today.toLocaleDateString()) {
            // Se já alimentou hoje, mostra o erro
            setShowFeedError(true);
        } else {
            // Caso contrário, registra a alimentação
            setFeedCount(feedCount + 1);
            setLastFeedDate(today);
            setShowFeedError(false); // Reseta o erro
        }
    };

    const handleWaterChangeClick = () => {
        setLastWaterChange(new Date());
    };

    const handleFilterChangeClick = () => {
        setLastFilterChange(new Date());
    };

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    const toggleAutoFeed = (checked: boolean) => {
        setAutoFeed(checked); // Ativa ou desativa a alimentação automática
        setShowAutoFeedPopup(true); // Mostra o pop-up quando a alimentação automática for alterada
    };

    const closeAutoFeedPopup = () => {
        setShowAutoFeedPopup(false); // Fecha o pop-up
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                Dashboard do Aquário
            </h1>

            {/* Cards de Dados Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Thermometer className="mr-2" />
                            Temperatura
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{temperature !== null ? `${temperature} C` : '25'}</p>
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

            {/* Ações e Configurações */}
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
                                    {lastWaterChange ? lastWaterChange.toLocaleDateString() : "N/A"}
                                </span>
                            </li>
                            <li className="flex items-center">
                                <AlertTriangle className="mr-2" />
                                <span>
                                    Verificar filtro - Última verificação:{" "}
                                    {lastFilterChange ? lastFilterChange.toLocaleDateString() : "N/A"}
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
                        <Button className="w-full justify-start bg-white text-black" onClick={handleFeedClick}>
                            <Fish className="mr-2" />
                            Registrar Alimentação
                        </Button>

                        {/* Mostrar erro se tentativa de alimentar mais de uma vez por dia */}
                        {showFeedError && (
                            <p className="text-red-500 text-sm mt-2">Você só pode alimentar os peixes uma vez por dia!</p>
                        )}

                        {/* Alimentação Automática */}
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={autoFeed}
                                onChange={(e) => toggleAutoFeed(e.target.checked)}
                                className="form-checkbox"
                            />
                            <span>Alimentação Automática</span>
                        </label>

                        {/* Troca de Água */}
                        <Button className="w-full justify-start bg-blue-500 text-white" onClick={handleWaterChangeClick}>
                            <Droplet className="mr-2" />
                            Registrar Troca de Água
                        </Button>

                        {/* Verificação do Filtro */}
                        <Button className="w-full justify-start bg-red-500 text-white" onClick={handleFilterChangeClick}>
                            <AlertTriangle className="mr-2" />
                            Registrar Verificação do Filtro
                        </Button>

                        {/* Alternar Formulário */}
                        <Button className="w-full justify-start mt-4" onClick={toggleFormVisibility}>
                            {formVisible ? 'Fechar Formulário' : 'Abrir Formulário'}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Formulário Condicional */}
            {formVisible && (
                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registrar Novo Evento</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <label>
                                    Data:
                                    <input
                                        type="date"
                                        name="data"
                                        className="w-full p-2 border rounded text-black"
                                    />
                                </label>

                                <label>
                                    Descrição:
                                    <textarea
                                        name="descricao"
                                        className="w-full p-2 border rounded mt-2 text-black"
                                    ></textarea>
                                </label>

                                <Button type="submit" className="w-full mt-4">Salvar</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Pop-up de Alimentação Automática */}
            {showAutoFeedPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                        <p>{autoFeed ? 'Alimentação Automática Ativada' : 'Alimentação Automática Desativada'}</p>
                        <Button onClick={closeAutoFeedPopup} className="mt-4">
                            Fechar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
