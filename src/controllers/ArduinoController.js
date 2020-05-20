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

    sendMessage(req, res) {
        const { message } = req.query

        arduino.sendMessage(message)

        return res.send(true)
    },

    getMeasures(req, res) {
        let voltage = arduino.voltage
        let current = arduino.current
        let capacity = arduino.capacity
        let battery = arduino.battery
        let BATTERY_CAPACITY = arduino.BATTERY_CAPACITY

        return res.send({ voltage, current, capacity, battery, BATTERY_CAPACITY })
    },
}
