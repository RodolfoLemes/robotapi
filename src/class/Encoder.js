const Gpio = require('pigpio').Gpio

// Considerando um Encoder de 10 cm com 12 furos
// Roda com 15 cm de diametro
const DISTANCE = 3.927

class Encoder {
    constructor(motor, pin) {
        this.motor = motor
        this.pin = pin
        this.cont = 0
        this.distance = 0
        this.gpio = new Gpio(this.pin, {
            mode: Gpio.INPUT,
            edge: Gpio.FALLING_EDGE
        })

        this.initMode = false
        this.gpio.on('interrupt', (level, tick) => {
            if(level == 0) {
                if(this.initMode) {
                    this.motor.shutdown()
                    this.initMode = false
                } else {
                    console.log(level + '--' + tick)
                    this.cont++
                    this.setDistance()
                }
            }
        })
    }

    setDistance() {
        this.distance = DISTANCE * (this.cont / 2)
    }

    getDistance() {
        return this.distance
    }

    getCont() {
        return (this.cont / 2)
    }

    getRealCont() {
        return this.cont
    }

    reset() {
        this.cont = 0
        this.distance = 0
    }

    initialPosition() {
        this.motor.shutdown()
        this.motor.setPwmValue(122)
        this.reset()
        this.initMode = true
        this.motor.forward()
    }

}

module.exports = Encoder
