const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

// Classe responsavel por estabelecer toda a comunicação com o arduino
class Arduino {
    constructor() {
        this.port = new SerialPort("/dev/serial0", { 
            baudRate: 9600
        }, function (err) {
            if(err) {
                return console.log('Error: ' + err.message)
            }
        })

        // Configurar corretamente essa variavel
        this.BATTERY_CAPACITY = 20000

        this.battery = 0 
        this.voltage = 0
        this.current = 0
        this.capacity = 0
        this.message = ''
    }

    startSerial() {
        const parser = this.port.pipe(new Readline({ delimiter: '\r\n'}))
        parser.on('data', data => {
            if(data.includes('/')) {
                let measures = data.split('/')
                this.voltage = measures[0]
                this.current = measures[1]
                this.capacity = measures[2]
    
                this.battery = this.capacity / this.BATTERY_CAPACITY
            } else {
                this.message = data
            }
        })
    }

    closeSerial() {
        this.port.close(function (err) {
            console.log('Port closed', err)
        })
    }

    sendMessage(message) {
        this.port.write(message)
    }
}

module.exports = Arduino
