## Apresentação do Projeto - Parte 2 (10/12/2024 - 10/12/2024)

## Introdução

Este relatório descreve a modelagem do banco de dados para o "Projeto de Aquário Inteligente". O objetivo deste projeto é criar um sistema que monitore e controle parâmetros do ambiente de um aquário, como temperatura, pH, usando sensores e atuadores. A modelagem de banco de dados visa garantir a estruturação eficiente e segura dos dados coletados pelo sistema, permitindo análise em tempo real e controle automatizado do aquário.

## Diagrama Entidade-Relacionamento (ER)

A modelagem foi realizada utilizando o Diagrama Entidade-Relacionamento (ER), que descreve as entidades principais do sistema e os relacionamentos entre elas.

### Entidades:

1. **Sensor**
   - Atributos:
     - `sensor_id`: Identificador único do sensor.
     - `tipo`: Tipo de sensor (temperatura, pH, oxigênio).
     - `valor`: Valor medido pelo sensor.
     - `data_hora`: Data e hora da medição.
   - Relacionamento:
     - Cada sensor registra múltiplos valores de medição, formando um relacionamento de um-para-muitos com a entidade "Leitura".

2. **Leitura**
   - Atributos:
     - `leitura_id`: Identificador único da leitura.
     - `sensor_id`: Chave estrangeira para a entidade "Sensor".
     - `valor`: Valor da medição no momento da leitura.
     - `data_hora`: Data e hora da leitura.

3. **Dispositivo**
   - Atributos:
     - `dispositivo_id`: Identificador único do dispositivo.
     - `tipo`: Tipo de dispositivo (exemplo: bomba, luz, etc.).
     - `status`: Status do dispositivo (ligado/desligado).
   - Relacionamento:
     - Os dispositivos estão associados ao "Controle", que registra as ações realizadas sobre eles.

4. **Controle**
   - Atributos:
     - `controle_id`: Identificador único do controle.
     - `dispositivo_id`: Chave estrangeira para a entidade "Dispositivo".
     - `acao`: Ação realizada (ligar, desligar, ajustar).
     - `data_hora`: Data e hora da ação.

5. **Aquário**
   - Atributos:
     - `aquario_id`: Identificador único do aquário.
     - `nome`: Nome do aquário.
     - `localizacao`: Localização física do aquário.
   - Relacionamento:
     - O aquário pode ter múltiplos dispositivos e sensores associados.

### Relacionamentos:

- **Sensor** (1:N) **Leitura**: Um sensor pode registrar várias leituras, mas cada leitura está associada a um único sensor.
- **Dispositivo** (1:N) **Controle**: Um dispositivo pode ter múltiplas ações de controle, mas cada ação é vinculada a um único dispositivo.
- **Aquário** (1:N) **Sensor** e **Aquário** (1:N) **Dispositivo**: Um aquário pode ter múltiplos sensores e dispositivos, mas cada sensor ou dispositivo pertence a um único aquário.

## Modelo Relacional

Com base no Diagrama ER, o modelo relacional do banco de dados foi estruturado da seguinte forma:

### Tabelas:

1. **Sensor**
   ```sql
   CREATE TABLE Sensor (
       sensor_id INT PRIMARY KEY,
       tipo VARCHAR(50),
       valor DECIMAL(5, 2),
       data_hora TIMESTAMP
   );
   ```

2. **Leitura**
   ```sql
   CREATE TABLE Leitura (
       leitura_id INT PRIMARY KEY,
       sensor_id INT,
       valor DECIMAL(5, 2),
       data_hora TIMESTAMP,
       FOREIGN KEY (sensor_id) REFERENCES Sensor(sensor_id)
   );
   ```

3. **Dispositivo**
   ```sql
   CREATE TABLE Dispositivo (
       dispositivo_id INT PRIMARY KEY,
       tipo VARCHAR(50),
       status VARCHAR(20)
   );
   ```

4. **Controle**
   ```sql
   CREATE TABLE Controle (
       controle_id INT PRIMARY KEY,
       dispositivo_id INT,
       acao VARCHAR(50),
       data_hora TIMESTAMP,
       FOREIGN KEY (dispositivo_id) REFERENCES Dispositivo(dispositivo_id)
   );
   ```

5. **Aquário**
   ```sql
   CREATE TABLE Aquario (
       aquario_id INT PRIMARY KEY,
       nome VARCHAR(100),
       localizacao VARCHAR(100)
   );
   ```

### Relacionamentos entre Tabelas:

- **Sensor** e **Leitura**: O campo `sensor_id` em "Leitura" é uma chave estrangeira que referencia `sensor_id` em "Sensor".
- **Dispositivo** e **Controle**: O campo `dispositivo_id` em "Controle" é uma chave estrangeira que referencia `dispositivo_id` em "Dispositivo".
- **Aquário** com **Sensor** e **Dispositivo**: Ambas as entidades têm relação de um-para-muitos com "Aquário".


### 
Diagramas:
- Sequência
- Atividades
- Máquina de Estados
- Casos de uso
- Classes
- Blocos
- Entidade & Relacionamento (E&R)
- Protótipo do aplicativo/aplicação (design das telas)
- Outros 
Diagramas

Diagrama de Sequência
```mermaid
sequenceDiagram
    participant Usuário
    participant InterfaceWeb
    participant ESP32
    participant Sensor
    participant Atuador

    Usuário->>InterfaceWeb: Configura parâmetros
    InterfaceWeb->>ESP32: Envia configurações
    ESP32->>Sensor: Solicita dados do sensor
    Sensor-->>ESP32: Retorna dados do sensor
    ESP32->>Atuador: Ajusta atuador conforme necessário
    ESP32->>InterfaceWeb: Atualiza dados em tempo real
    InterfaceWeb-->>Usuário: Exibe dados atualizados
```
![alt text](image-7.png)

Diagrama de Atividades
```mermaid

flowchart TD
    A[Início] --> B[Configurar parâmetros via Interface Web]
    B --> C[Enviar configurações para ESP32]
    C --> D[Monitorar dados dos sensores]
    D --> E[Analisar dados]
    E --> F{Dados dentro dos parâmetros?}
    F -->|Sim| G[Manter estado atual]
    F -->|Não| H[Ajustar atuadores]
    H --> I[Atualizar Interface Web]
    I --> J[Fim]

```
![alt text](image-6.png)

Diagrama de Máquina de Estados
```mermaid

stateDiagram-v2
    [*] --> Inicializando
    Inicializando --> Monitorando
    Monitorando --> Analisando
    Analisando --> Ajustando
    Ajustando --> Atualizando
    Atualizando --> Monitorando
    Monitorando --> [*]


```
![alt text](image-5.png)

Diagrama de Casos de Uso
```mermaid

classDiagram
    class Usuario {
        +configurarParametros()
        +visualizarDados()
    }
    class InterfaceWeb {
        +enviarConfiguracoes()
        +exibirDados()
    }
    class ESP32 {
        +receberConfiguracoes()
        +monitorarSensores()
        +ajustarAtuadores()
    }
    class Sensor {
        +enviarDados()
    }
    class Atuador {
        +ajustarEstado()
    }
    Usuario --> InterfaceWeb
    InterfaceWeb --> ESP32
    ESP32 --> Sensor
    ESP32 --> Atuador

```
![alt text](image-4.png)

Diagrama de Classes
```mermaid

classDiagram
    class Usuario {
        +String nome
        +String email
        +configurarParametros()
        +visualizarDados()
    }
    class InterfaceWeb {
        +enviarConfiguracoes()
        +exibirDados()
    }
    class ESP32 {
        +receberConfiguracoes()
        +monitorarSensores()
        +ajustarAtuadores()
    }
    class Sensor {
        +String tipo
        +String valor
        +enviarDados()
    }
    class Atuador {
        +String tipo
        +ajustarEstado()
    }
    Usuario --> InterfaceWeb
    InterfaceWeb --> ESP32
    ESP32 --> Sensor
    ESP32 --> Atuador

```
![alt text](image-3.png)

Diagrama de Blocos
```mermaid

graph TD
    A[ESP32] --> B[Sensor de Temperatura]
    A --> C[Sensor de pH]
    A --> D[Sensor de Oxigênio Dissolvido]
    A --> E[Sensor de Turbidez]
    A --> F[Aquecedor]
    A --> G[Alimentador Automático]
    A --> H[Lâmpadas LED]
    A --> I[Bomba de Água]

```
![alt text](image-2.png)

Diagrama Entidade & Relacionamento (E&R)
```mermaid

erDiagram
    USUARIO {
        String nome
        String email
    }
    INTERFACEWEB {
        String parametrosConfiguracao
        String dadosMonitoramento
    }
    ESP32 {
        String parametrosConfiguracao
        String temperatura
        String ph
        String oxigenioDissolvido
        String turbidez
    }
    SENSOR {
        String id
        String tipo
        String valor
    }
    ATUADOR {
        String id
        String tipo
        String estado
    }
    USUARIO ||--o{ INTERFACEWEB : usa
    INTERFACEWEB ||--o{ ESP32 : comunica
    ESP32 ||--o{ SENSOR : monitora
    ESP32 ||--o{ ATUADOR : controla
    SENSOR ||--o{ ESP32 : envia_dados
    ATUADOR ||--o{ ESP32 : recebe_comandos
```
![alt text](image-1.png)

Protótipo do Aplicativo/Aplicação (Design das Telas)
```mermaid

flowchart TD
    A[Login] --> B[Dashboard]
    B --> C[Configurar Parâmetros]
    B --> D[Visualizar Dados]
    C --> E[Salvar Configurações]
    D --> F[Atualizar Dados]
```

![alt text](image.png)


## Conclusão

A modelagem do banco de dados para o "Projeto de Aquário Inteligente" foi estruturada de forma a garantir a integração eficiente dos dados de sensores e dispositivos de controle. As tabelas e relacionamentos foram definidos para suportar as funcionalidades do sistema, como o monitoramento de condições ambientais e o controle automático do aquário. Este modelo de banco de dados permitirá análises precisas e a automação do sistema de aquário inteligente, garantindo a operação contínua e segura.

## Próximos Passos

- Implementação do banco de dados conforme o modelo relacional.
- Desenvolvimento das interfaces de integração entre os sensores e o banco de dados.
- Testes e ajustes para garantir a performance e a escalabilidade do sistema.
