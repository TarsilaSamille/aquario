# Implementação do Projeto "Aquário Inteligente" no Tinkercad

Para implementar o projeto do **Aquário Inteligente** no Tinkercad, siga os passos abaixo:

## Componentes Necessários
1. **Placa Arduino UNO**: para controle do sistema.
2. **Sensor de Temperatura (LM35)**: para medir a temperatura da água.
3. **Sensor de Luz (LDR)**: para detectar a intensidade luminosa.
4. **LED RGB**: para simular a iluminação do aquário.
5. **Servo Motor**: para controlar a alimentação automática.
6. **Resistores**: para proteção dos componentes (1kΩ para o LDR, por exemplo).
7. **Potenciômetro (opcional)**: para ajuste fino de iluminação.
8. **Fios de Conexão e Protoboard**: para montar o circuito.

## Montagem no Tinkercad
1. **Configuração da Placa Arduino**:
   - Adicione uma placa Arduino UNO ao projeto no Tinkercad.
2. **Conexão do Sensor de Temperatura (LM35)**:
   - Conecte o pino de saída do LM35 à entrada analógica A0 do Arduino.
   - Ligue o pino de alimentação ao VCC (5V) e o pino GND ao terra.
3. **Conexão do Sensor de Luz (LDR)**:
   - Conecte o LDR em série com um resistor de 1kΩ, formando um divisor de tensão.
   - A saída do divisor deve ser conectada ao pino analógico A1.
4. **Conexão do LED RGB**:
   - Conecte os terminais vermelho, verde e azul do LED RGB a três resistores (220Ω).
   - Ligue cada resistor a uma saída digital (por exemplo, D9, D10, D11).
   - O terminal GND do LED RGB deve ser conectado ao terra.
5. **Conexão do Servo Motor**:
   - Conecte o fio de controle do servo à saída digital D6.
   - Ligue os fios de alimentação (VCC e GND) ao 5V e terra, respectivamente.
6. **Opcional**: Adicione um potenciômetro para ajustar a intensidade da luz conectando-o a uma entrada analógica (ex: A2).

## Configuração no Arduino
1. **Código no IDE do Arduino**:
   - Escreva o código que:
     - Leia os sensores (temperatura e luz).
     - Controle o LED RGB conforme a luminosidade.
     - Acione o servo motor para simular a alimentação automática.
   - Carregue o código na simulação do Tinkercad.

2. **Exemplo de Código**:
   ```cpp
   #include <Servo.h>

   Servo servoMotor;

   const int pinTemp = A0;
   const int pinLDR = A1;
   const int pinLED_R = 9;
   const int pinLED_G = 10;
   const int pinLED_B = 11;
   const int pinServo = 6;

   void setup() {
       Serial.begin(9600);
       servoMotor.attach(pinServo);
       pinMode(pinLED_R, OUTPUT);
       pinMode(pinLED_G, OUTPUT);
       pinMode(pinLED_B, OUTPUT);
   }

   void loop() {
       // Leitura dos sensores
       int temperatura = analogRead(pinTemp);
       int luz = analogRead(pinLDR);

       // Controle do LED RGB
       if (luz < 500) { // Ambiente escuro
           analogWrite(pinLED_R, 255);
           analogWrite(pinLED_G, 255);
           analogWrite(pinLED_B, 255);
       } else { // Ambiente claro
           analogWrite(pinLED_R, 0);
           analogWrite(pinLED_G, 0);
           analogWrite(pinLED_B, 255);
       }

       // Controle do Servo (simula alimentação)
       if (temperatura > 700) { // Temperatura alta
           servoMotor.write(90); // Gira o servo
           delay(1000);
           servoMotor.write(0); // Retorna à posição inicial
       }

       delay(500);
   }
