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

        this.battery = '0'
    }

    startSerial() {
        this.port.on('readable', () => {
            console.log(this.port.read())
            this.battery = this.port.read()
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