const { ultrassonicA, ultrassonicB, ultrassonicC } = require('../Setup')

module.exports = {
    init(req, res) {
        // Iniciar os ultrassonics
        ultrassonicA.init()
        ultrassonicB.init()
        ultrassonicC.init()

        return res.send(true)
    },

    async getMeasure(req, res) {
        const { ultrassonic = -1 } = req.query

        if(ultrassonic == -1) {
            Promise.all([ultrassonicA.getMeasure(), ultrassonicB.getMeasure(), ultrassonicC.getMeasure()])
                .then(distances => res.send({ distances }))
        } else if(ultrassonic == 'A') {
            let distance = await ultrassonicA.getMeasure()

            return res.send({ distance })
        } else if(ultrassonic == 'B') {
            let distance = await ultrassonicB.getMeasure()

            return res.send({ distance })
        } else if (ultrassonic == 'C') {
            let distance = await ultrassonicC.getMeasure()

            return res.send({ distance })
        } else {
            return res.send({ distance: false })
        }
    },

    stop(req, res) {
        // Desliga os pinos dos ultrassonics
        ultrassonicA.stop()
        ultrassonicB.stop()
        ultrassonicC.stop()

        return res.send(true)
    }
}
