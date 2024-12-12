#include <WiFi.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
// https://wokwi.com/projects/417072128099773441
// Definições de pinos
#define LED_AZUL 5
#define LED_BRANCO 2
#define LED_VERMELHO 4
#define LED_VERDE 16
#define LED_AMARELO 17
#define BUZZER 15
#define BOTAO_ALIMENTAR 18
#define BOTAO_VERIFICAR_FILTRO 19
#define BOTAO_TROCAR_AGUA 21
#define TRIMPOT_PH 34
#define TRIMPOT_AMONIA 35
#define LDR_PIN 32
#define TERMISTOR_PIN 33

// Definições do display OLED
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define WLAN_SSID  "tarsillasamile"
#define WLAN_PASS  "12345678"

const float BETA = 3950; // should match the Beta Coefficient of the thermistor
int  leitura = 0, leitura2 = 0, leitura3 = 0;

// Variáveis globais
float ph = 0.0;
float amonia = 0.0;
float temperatura = 0;
int luminosidade = 0;
unsigned long ultimoAlerta = 0;
const unsigned long intervaloAlerta = 60000; // 1 minuto

void setup() {
  Serial.begin(115200);
    analogReadResolution(10);

Wire.begin(25, 26);
  // Configuração dos pinos
  pinMode(LED_AZUL, OUTPUT);
  pinMode(LED_BRANCO, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);  
  pinMode(LED_VERDE, OUTPUT);  
  pinMode(LED_AMARELO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BOTAO_ALIMENTAR, INPUT);
  pinMode(BOTAO_VERIFICAR_FILTRO, INPUT);
  pinMode(BOTAO_TROCAR_AGUA, INPUT);

  // Inicialização do display OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Falha ao inicializar o display OLED"));
    for (;;);
  }
  display.clearDisplay();
  display.display();

  // Conectar ao WiFi
  // connectToWiFi();
}

void loop() {
  // Leitura dos sensores
  ph = map(analogRead(TRIMPOT_PH), 0, 1023, 0, 14); //4095 for trimpot
  amonia = map(analogRead(TRIMPOT_AMONIA), 0, 1023, 0, 5);
  temperatura = lerTemperatura();
  luminosidade = lerLuz();

  // Verificação dos botões
  leitura = digitalRead(BOTAO_ALIMENTAR);
  leitura2 = digitalRead(BOTAO_VERIFICAR_FILTRO);
  leitura3 = digitalRead(BOTAO_TROCAR_AGUA);

  if (leitura == HIGH) {
    registrarEvento("Alimentação");
  }
  if (leitura2 == HIGH) {
    registrarEvento("  do Filtro");
  }
  if (leitura3 == HIGH) {
    registrarEvento("Troca de Água");
  }

  // Atualização do display OLED
  atualizarDisplay();

  // Verificação de alertas
  verificarAlertas();

  delay(100);
}

void connectToWiFi() {
  Serial.print("Conectando a ");
  Serial.println(WLAN_SSID);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
}

float lerTemperatura() {
  delay(10);
  int leitura = analogRead(TERMISTOR_PIN);
  float celsius = 1 / (log(1 / (1023. / leitura - 1)) / BETA + 1.0 / 298.15) - 273.15;
  return celsius;
}


// Essas constantes devem corresponder aos atributos "gama" e "rl10" do fotoresistor
const float GAMMA = 0.7;
const float RL10 = 50;

float lerLuz() {
  int analogValue = analogRead(LDR_PIN);
  float voltage = analogValue / 1024. * 5;
  float resistance = 2000 * voltage / (1 - voltage / 5);
  float lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));
  return lux;
}
void registrarEvento(const char* evento) {
  Serial.print("Evento registrado: ");
  Serial.println(evento);
  // Aqui você pode adicionar código para registrar o evento em um servidor ou memória
}

void atualizarDisplay() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.print("pH: ");
  display.println(ph);
  display.print("Amonia: ");
  display.println(amonia);
  display.print("Temp: ");
  display.println(temperatura);
  display.print("Luz: ");
  display.println(luminosidade);
  display.display();
}

void verificarAlertas() {
  unsigned long agora = millis();
  if (agora - ultimoAlerta >= intervaloAlerta) {
    if (ph < 6.5 || ph > 8.5) {
      acionarAlerta("pH fora do intervalo!");
    }
    if (amonia > 1.0) {
      acionarAlerta("Nível de amônia  alto!");
    }
    ultimoAlerta = agora;
  }

   if (ph < 6.5 || ph > 8.5) {
        digitalWrite(LED_VERDE, HIGH);
    }else{
  digitalWrite(LED_VERDE, LOW);

    }
    if (amonia > 1.0) {
              digitalWrite(LED_AMARELO, HIGH);
    }else{
  digitalWrite(LED_AMARELO, LOW);

    }
}

void acionarAlerta(const char* mensagem) {
  Serial.println(mensagem);
  digitalWrite(LED_VERMELHO, HIGH);
  tone(BUZZER, 1000, 2000); // Buzzer toca por 2 segundos
  delay(2000);
  digitalWrite(LED_VERMELHO, LOW);
}
