const { arduino } = require('../Setup')

module.exports = {
    startSerialCommunication(req, res) {
        arduino.startSerial()

        return res.send(true)
    },

    closeSerialCommunication(req, res) {
        arduino.closeSerial()

        return res.send(true)
    },

    sendMessage(res, res) {
        const { message } = req.query

        arduino.sendMessage(message)

        return res.send(true)
    }
}