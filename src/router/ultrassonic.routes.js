const express = require('express')

const UltrassonicController = require('../controllers/UltrassonicController')

const routes = express.Router()

// Arquivo relacionado ao gerenciamento de routas para o controle dos ultrassonics
routes.get('/init', UltrassonicController.init)
routes.get('/getMeasure', UltrassonicController.getMeasure)
routes.get('/stop', UltrassonicController.stop)