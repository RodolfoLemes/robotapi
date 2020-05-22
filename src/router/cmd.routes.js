const express = require('express')

const CmdController = require('../controllers/CmdController')

const routes = express.Router()

// Arquivo relacionado ao gerenciamente de rotas do cmd
routes.get('/shutdown', CmdController.shutdown)
routes.get('/reboot', CmdController.reboot)
routes.get('/getCmd', CmdController.get)

module.exports = routes