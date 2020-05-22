const cmd = require('node-cmd')

const Setup = require('../Setup')

module.exports = {
    shutdown(req, res) {
        const { time = 'now' } = req.query
        console.log('Servidor desligando')
        Setup.motorA.shutdown()
        Setup.motorA.setPwmValue(0)
        Setup.motorB.shutdown()
        Setup.motorB.setPwmValue(0)
        Setup.ultrassonicA.stop()
        Setup.ultrassonicB.stop()
        Setup.arduino.closeSerial()
        console.log('Servidor desligado')

        cmd.get('sudo shutdown -h ' + (time != 'now' ? '+' : '') + time, (err, data, stderr) => {
            return res.send(data)
        })
    },

    reboot(req, res) {
        const { time = 'now' } = req.query
        console.log('Servidor desligando')
        Setup.motorA.shutdown()
        Setup.motorA.setPwmValue(0)
        Setup.motorB.shutdown()
        Setup.motorB.setPwmValue(0)
        Setup.ultrassonicA.stop()
        Setup.ultrassonicB.stop()
        Setup.arduino.closeSerial()
        console.log('Servidor desligado')

        cmd.run('sudo shutdown -r ' + (time != 'now' ? '+' : '') + time, (err, data, stderr) => {
            return res.send(data)
        })
    },

    async get(req, res) {
        const { string } = req.query

        cmd.get(string, (err, data, stderr) => {
            const string = console.log(err, data, stderr)
            return res.send(string)
        })
    }
}