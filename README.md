# robotapi
API para controle da base robótica

## A fazer:
- [ ] Instalar biblioteca *serialport* para comunicação Arduino -> Raspberry.
Precisa de divisor de tensão 5V -> 3.3V no TX do Arduino para o RX do raspberry

```js
var SerialPort = require('serialport');
var port = new SerialPort('/dev/tty-usbserial1');
 
port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});
 
// open errors will be emitted as an error event 
port.on('error', function(err) {
  console.log('Error: ', err.message);
});
```

- [ ] Programar *Arduino* para receber informações sobre a tensão da bateria

- [x] Programar a API para se comunicar com o Arduino, pedindo informações da bateria

- [ ] Colocar LEDs indicadores, controlados pelo Arduino, para o nível de tensão da bateria