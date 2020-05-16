const Motor = require('./class/Motor')
const Ultrassonic = require('./class/Ultrassonic')
const Encoder = require('./class/Encoder')

const motorA = new Motor(4, 27, 12)
const motorB = new Motor(23, 24, 13)

const ultrassonicA = new Ultrassonic(5, 6)
const ultrassonicB = new Ultrassonic(19, 26)
const ultrassonicC = new Ultrassonic(16, 20)

const encoderA = new Encoder(motorA, 18)
const encoderB = new Encoder(motorB, 17)

console.log('Objetos criados')

process.on('SIGINT', function () { //on ctrl+c
	console.log('Servidor desligando')
    motorA.shutdown()
    motorA.setPwmValue(0)
    motorB.shutdown()
    motorB.setPwmValue(0)
    ultrassonicA.stop()
    ultrassonicB.stop()
    console.log('Servidor desligado')
    process.exit(); //exit completely
});

module.exports = { motorA, motorB, ultrassonicA, ultrassonicB, ultrassonicC, encoderA, encoderB }
