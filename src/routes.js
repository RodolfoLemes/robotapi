const express = require('express')

const motorRoutes = require('./router/motor.routes')
const encoderRoutes = require('./router/encoder.routes')
const ultrassonicRoutes = require('./router/ultrassonic.routes')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.send('tudo em ordi')
})

routes.use('/motor', motorRoutes)
routes.use('/encoder', encoderRoutes)
routes.use('/ultrassonic', ultrassonicRoutes)

module.exports = routes