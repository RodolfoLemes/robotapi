const express = require('express')

const EncoderController = require('../controllers/EncoderController')

const routes = express.Router()

// Arquivo relacionado ao gerenciamente de rotas do encoder
routes.get('/get', EncoderController.get)
routes.get('/reset', EncoderController.reset)
routes.get('/initialPosition', EncoderController.setToInitialPosition)

module.exports = routes