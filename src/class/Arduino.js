const SerialPort = require('serialport')

// Classe responsavel por estabelecer toda a comunicação com o arduino
class Arduino {
    constructor() {
        this.port = new SerialPort("/dev/ttyAMA0", { 
            baudRate: 115200
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
    }

    startSerial() {
        this.port.on('readable', () => {
            console.log(this.port.read())
            let message = this.port.read()
            let measures = message.split('/')
            this.voltage = measures[0]
            this.current = measures[1]
            this.capacity = measures[2]

            this.battery = this.capacity / this.BATTERY_CAPACITY
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