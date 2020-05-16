const express = require('express')

const MotorController = require('../controllers/MotorController')

const routes = express.Router()

// Arquivo responsavel pela manutenção das rotas de controle do motor
routes.get('/forward', MotorController.forward)
routes.get('/backward', MotorController.backward)
routes.get('/turn', MotorController.turn)
routes.get('/shutdown', MotorController.shutdown)
routes.get('/lock', MotorController.lock)
routes.get('/setPwm', MotorController.setPwm)
routes.get('/getPwm', MotorController.getPwm)

module.exports = routes