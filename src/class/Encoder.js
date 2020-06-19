const Gpio = require('pigpio').Gpio

// Considerando um Encoder de 10 cm com 12 furos
// Roda com 15 cm de diametro
const DISTANCE = 3.927
const HOLES = 12

class Encoder {
    constructor(motor, pin) {
        this.motor = motor
        this.pin = pin
        this.cont = 0
        this.distance = 0
        this.gpio = new Gpio(this.pin, {
            mode: Gpio.INPUT,
            edge: Gpio.EITHER_EDGE,
        })

        this.initMode = false
        this.RPM = 0

        this.threadRPM = setInterval(() => {
            this.RPM = ((this.cont / HOLES) / 1000) * 60
        }, 1000)
        
        this.time = 0
        this.uau = false
        this.gpio.on('interrupt', (level, tick) => {
            console.log((tick >> 0) - (this.time >> 0))
            if(level == 0) {
                if(this.initMode) {
                    this.motor.shutdown()
                    this.initMode = false
                } else {
                    //console.log(this.motor.motor + ' ' + tick)
                    if(!this.uau) {
                        this.cont++
                        this.time = tick
                        this.setDistance()
                        this.uau = true
                    } else {
                        if((tick >> 0) - (this.time >> 0) > 200000) {
                            this.cont++
                            this.time = tick
                            this.setDistance()
                        }
                    }
                }
            }
        })
    }

    setDistance() {
        this.distance = DISTANCE * this.cont
    }

    getDistance() {
        return this.distance
    }

    getCont() {
        return this.cont
    }

    getRealCont() {
        return this.cont
    }

    reset() {
        this.cont = 0
        this.distance = 0
        this.uau = false
    }

    initialPosition() {
        this.motor.shutdown()
        this.motor.setPwmValue(122)
        this.reset()
        this.initMode = true
        this.motor.forward()
    }

    stop() {
        clearInterval(this.threadRPM)
    }

}

module.exports = Encoder
