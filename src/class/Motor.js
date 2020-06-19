const Gpio = require('pigpio').Gpio

class Motor {
    constructor(pin1, pin2, pwmPin, motor) {
        this.gpio1 = new Gpio(pin1, { mode: Gpio.OUTPUT })
        this.gpio2 = new Gpio(pin2, { mode: Gpio.OUTPUT })
        this.gpioPwm = new Gpio(pwmPin, { mode: Gpio.OUTPUT })

        this.motor = motor
        this.pwmValue = 122

        this.gpioPwm.pwmWrite(122)
    }

    setPwmValue(pwmValue) {
        if(pwmValue > 0 && pwmValue < 256) {
            this.pwmValue = pwmValue
            this.gpioPwm.pwmWrite(this.pwmValue)
        }
    }

    forward() { // Para frente
        this.gpio1.digitalWrite(1)
        this.gpio2.digitalWrite(0)
    }

    backward() { // Para tras
        this.gpio1.digitalWrite(0)
        this.gpio2.digitalWrite(1)
    }

    lock() { // Travar
        this.gpio1.digitalWrite(1)
        this.gpio2.digitalWrite(1)
    }

    shutdown() { // Desligar
        this.gpio1.digitalWrite(0)
        this.gpio2.digitalWrite(0)
    }
}

module.exports = Motor