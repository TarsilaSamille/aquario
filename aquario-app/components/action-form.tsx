import { useState, useEffect } from "react";
import { getActionData, saveActionData } from "@/pages/api/simulador"; // Não se esqueça de importar a API simulada!

export function ActionForm({ action }: { action: string }) {
  const [formData, setFormData] = useState({
    data: "",
    ultimaData: "",
    detalhes: "",
  });

  const [lastFeedDate, setLastFeedDate] = useState<Date | null>(null); // Armazenar a data da última alimentação

  useEffect(() => {
    // Carregar os dados da ação
    getActionData(action).then((data) => {
      if (data) {
        setFormData(data);
        if (data.data) {
          setLastFeedDate(new Date(data.data)); // Supondo que "data" seja a data da última alimentação
        }
      }
    });
  }, [action]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.data || !formData.ultimaData) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    // Salva os dados da ação
    saveActionData(action, formData).then((savedData) => {
      alert(`Dados para a ação ${action} foram salvos com sucesso.`);
    });
  };

  // Lógica para verificar se a alimentação já foi feita hoje
  const isFeedAllowed = () => {
    if (!lastFeedDate) return true; // Se não houver registro de alimentação anterior, permite alimentar
    const today = new Date();
    // Verifica se a última alimentação foi no mesmo dia de hoje
    return lastFeedDate.toLocaleDateString() !== today.toLocaleDateString();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="data" className="flex items-center text-blue-800">
          Data
        </label>
        <input
          id="data"
          name="data"
          type="date"
          value={formData.data}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 text-blue-900"
          disabled={!isFeedAllowed()} // Desabilita o campo se já foi alimentado hoje
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="ultimaData" className="flex items-center text-blue-800">
          Última Data
        </label>
        <input
          id="ultimaData"
          name="ultimaData"
          type="date"
          value={formData.ultimaData}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded-md p-2 text-blue-900"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="detalhes" className="flex items-center text-blue-800">
          Detalhes (opcional)
        </label>
        <input
          id="detalhes"
          name="detalhes"
          value={formData.detalhes}
          onChange={handleInputChange}
          placeholder="Detalhes sobre a ação"
          className="border border-gray-300 rounded-md p-2 text-blue-900"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-blue-800 text-white p-2 rounded-md"
        disabled={!isFeedAllowed()} // Desabilita o botão de enviar se já foi alimentado hoje
      >
        Enviar Dados
      </button>
    </form>
  );
}
