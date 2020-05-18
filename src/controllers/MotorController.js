const { motorA, motorB } = require('../Setup')

module.exports = {
    forward(req, res) {
        const { motor = -1 } = req.query

        if(motor == -1) {
            motorA.forward()
            motorB.forward()
        } else if(motor == 'A') {
            motorA.forward()
        } else if(motor == 'B') {
            motorB.forward()
        }

        return res.send(true)
    },

    backward(req, res) {
        const { motor = -1 } = req.query

        if(motor == -1) {
            motorA.backward()
            motorB.backward()
        } else if(motor == 'A') {
            motorA.backward()
        } else if(motor == 'B') {
            motorB.backward()
        }
        
        return res.send(true)
    },

    turn(req, res) {
        const { side } = req.query

        if(side == 'direita') {
            motorA.backward()
            motorB.forward()
        } else {
            motorA.forward()
            motorB.backward()
        }

        return res.send(true)
    },

    shutdown(req, res) {
        motorA.shutdown()
        motorB.shutdown()

        return res.send(true)
    },

    lock(req, res) {
        motorA.lock()
        motorB.lock()

        return res.send(true)
    },

    setPwm(req, res) {
        const { pwmValueA = -1, pwmValueB = -1 } = req.query

        motorA.setPwmValue(pwmValueA)
        motorB.setPwmValue(pwmValueB)

        return res.send(true)
    },

    getPwm(req, res) {
        const pwmValueA = motorA.pwmValue
        const pwmValueB = motorB.pwmValue

        res.send({ pwmValueA, pwmValueB })
    },
}