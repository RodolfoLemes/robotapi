const express = require('express')

const ArduinoController = require('../controllers/ArduinoController')

const routes = express.Router()

// Arquivo relacionado ao gerenciamente de rotas do arduino
routes.get('/startSerial', ArduinoController.startSerialCommunication)
routes.get('/closeSerial', ArduinoController.closeSerialCommunication)
routes.get('/sendMessage', ArduinoController.sendMessage)

module.exports = routes