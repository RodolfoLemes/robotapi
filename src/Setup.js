const Motor = require('./class/Motor')
const Ultrassonic = require('./class/Ultrassonic')
const Encoder = require('./class/Encoder')
const Arduino = require('./class/Arduino')

const motorA = new Motor(4, 27, 12)
const motorB = new Motor(23, 24, 13)

const ultrassonicA = new Ultrassonic(5, 6)
const ultrassonicB = new Ultrassonic(19, 26)
const ultrassonicC = new Ultrassonic(16, 20)

const encoderA = new Encoder(motorB, 18)
const encoderB = new Encoder(motorA, 17)

const arduino = new Arduino()

console.log('Objetos criados')

// Função para desligar o servidor quando pressionado ctrl+c
process.on('SIGINT', function () {
	console.log('Servidor desligando')
    motorA.shutdown()
    motorA.setPwmValue(0)
    motorB.shutdown()
    motorB.setPwmValue(0)
    ultrassonicA.stop()
    ultrassonicB.stop()
    arduino.closeSerial()
    console.log('Servidor desligado')
    process.exit(); //exit completely
});

module.exports = { motorA, motorB, ultrassonicA, ultrassonicB, ultrassonicC, encoderA, encoderB, arduino }
