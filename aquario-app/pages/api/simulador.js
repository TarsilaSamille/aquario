// app/api/simulator.js

let aquariumData = {
  temperatura: "25",
  alimentacao: "2x ao dia",
  iluminacao: "12 horas/dia",
  qualidadeAgua: "Boa",
  corSelecionada: "Red",
}

let actionData = {
  trocaFiltro: {
    data: "2025-01-20",
    ultimaData: "2024-12-15",
    detalhes: "Filtro substituído por novo modelo."
  },
  registrarAlimentacao: {
    data: "2025-01-22",
    ultimaData: "2025-01-20",
    detalhes: "Alimento de qualidade premium utilizado."
  },
  trocaAgua: {
    data: "2025-01-19",
    ultimaData: "2024-12-30",
    detalhes: "Troca de 50% da água do aquário."
  }
}

export const getAquariumData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(aquariumData)
    }, 1000) // Simula um delay de 1 segundo
  })
}

export const saveAquariumData = (newData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      aquariumData = newData
      resolve(aquariumData)
    }, 1000) // Simula o delay de salvamento
  })
}

// Funções para obter e salvar dados das ações
export const getActionData = (action) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(actionData[action] || null)
    }, 1000)
  })
}

export const saveActionData = (action, newData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      actionData[action] = newData
      resolve(actionData[action])
    }, 1000)
  })
}
