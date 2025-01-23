const mqtt = require("mqtt");
const WebSocket = require("ws");

// Configurações do broker MQTT
const options = {
  host: "maqiatto.com",
  port: 1883,
  username: "tarsillasamile@gmail.com",
  password: "12345",
  protocol: "mqtt",
};

// Criar servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Cliente WebSocket conectado');
});

// Criar cliente MQTT
const client = mqtt.connect(options);

client.on("connect", function () {
  console.log("Conectado ao broker MQTT");

  // Subscrever aos tópicos desejados
  const topics = [
    "tarsillasamile@gmail.com/alimentacao",
    "tarsillasamile@gmail.com/filtro",
    "tarsillasamile@gmail.com/agua",
    "tarsillasamile@gmail.com/luz",
    "tarsillasamile@gmail.com/ph",
    "tarsillasamile@gmail.com/amonia",
    "tarsillasamile@gmail.com/temp",
  ];

  topics.forEach((topic) => {
    client.subscribe(topic, function (err) {
      if (err) {
        console.error(`Erro ao se inscrever no tópico ${topic}:`, err);
      } else {
        console.log(`Inscrito no tópico ${topic}`);
      }
    });
  });
});

client.on("message", function (topic, message) {
  console.log("Nova mensagem recebida:");
  console.log("Tópico:", topic.toString());
  console.log("Mensagem:", message.toString());

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            topic: topic.toString(),
            message: parseFloat(message.toString()),
            time: new Date(),
          })
        );
      }
    });

});

client.on("error", function (error) {
  console.error("Erro no cliente MQTT:", error);
});

client.on("close", function () {
  console.log("Conexão com o broker MQTT fechada");
});

client.on("offline", function () {
  console.log("Cliente MQTT está offline");
});

client.on("reconnect", function () {
  console.log("Tentando reconectar ao broker MQTT");
});
