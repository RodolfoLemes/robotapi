# robotapi
API para controle da base robótica :octocat:

## Afazeres:
- [x] Desenvolver a estrutura da API com NodeJS, utilizando Express.

- [x] Criar classes do motor, encoder e ultrassônico.

- [x] Criar os controllers das classes e o roteamento.

- [ ] Testar **TODAS** as requisições. :fearful:

- [x] Instalar *pigpio* no *Raspberry Pi*.

- [x] Instalar biblioteca *serialport* para comunicação Arduino -> Raspberry.

Precisa de divisor de tensão 5V -> 3.3V no TX do Arduino para o RX do raspberry

```js
const SerialPort = require('serialport');
const port = new SerialPort('/dev/serial0');
```

- [x] Programar *Arduino* para receber informações sobre a tensão da bateria

Da pra fazer isso utilizando o algoritmo de descarregamento de bateria, armazenar na EEPROM
os ultimos dados recebidos para utilizar na medição.

- [x] Programar a API para se comunicar com o *Arduino*, pedindo informações da bateria

- [ ] Colocar LEDs indicadores, controlados pelo *Arduino*, para o nível de tensão da bateria