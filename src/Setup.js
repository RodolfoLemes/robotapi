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

module.exports = { motorA, motorB, ultrassonicA, ultrassonicB, ultrassonicC, encoderA, encoderB }