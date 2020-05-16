const { encoderA, encoderB } = require('../Setup')

module.exports = {
    get(req, res) {
        const { encoder } = req.query

        if(encoder == 'A') {
            let distance = encoderA.getDistance()
            let cont = encoderA.getCont()
            let realCont = encoderA.getRealCont()

            return res.send({ distance, cont, realCont, encoder })
        } else if(encoder == 'B') {
            let distance = encoderB.getDistance()
            let cont = encoderB.getCont()
            let realCont = encoderB.getRealCont()

            return res.send({ distance, cont, realCont, encoder })
        }
    },

    reset(req, res) {
        const { encoder = -1 } = req.query

        if(encoder == -1) {
            encoderA.reset()
            encoderB.reset()
        } else if(encoder == 'A') {
            encoderA.reset()
        } else if(encoder == 'B') {
            encoderB.reset()
        }

        return res.send(true)
    }
}