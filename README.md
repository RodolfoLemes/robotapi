# robotapi
API para controle da base robótica :octocat:

![Schematic](Schematic_robotapi.png)

### Afazeres:

- [ ] Colocar LEDs indicadores, controlados pelo *Arduino*, para o nível de tensão da bateria.

- [ ] Realizar testes de multiplas calls na API.

- [ ] Testar código para medir peso sobre o robô.
    - [ ] Código de calibragem
    - [ ] Código de obtenção de peso.

- [ ] Escrever documentação.

- [ ] Só? 

### Resolvidos
- [x] Desenvolver a estrutura da API com NodeJS, utilizando Express.

- [x] Criar classes do motor, encoder e ultrassônico.

- [x] Criar os controllers das classes e o roteamento.

- [x] Instalar *pigpio* no *Raspberry Pi*.

- [x] Instalar biblioteca *serialport* para comunicação Arduino -> Raspberry.

Precisa de divisor de tensão 5V -> 3.3V no TX do Arduino para o RX do raspberry

```js
const SerialPort = require('serialport');
const port = new SerialPort('/dev/serial0');
```

- [x] Programar *Arduino* para receber informações sobre a tensão da bateria.

Da pra fazer isso utilizando o algoritmo de descarregamento de bateria, armazenar na EEPROM
os ultimos dados recebidos para utilizar na medição.

- [x] Programar a API para se comunicar com o *Arduino*, pedindo informações da bateria.

- [x] Desenvolver controllers e rotas para executar CMD no *Raspberry Pi*.
    - [x] Desligar e reiniciar.
    - [x] Comandos gerais.

- [x] Resolver problema com a função voltimetro do *Arduino*.

- [x] Testar **TODAS** as requisições. :fearful:
    - [x] Quase todas foram testadas.
    - [x] Falta resolver a requisição de calibragem.
