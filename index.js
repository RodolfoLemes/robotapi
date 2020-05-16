const express = require('express')
const cors = require('cors')

const routes = require('./src/routes')
const motorRoutes = require('.src/router/motor.routes')
const encoderRoutes = require('.src/router/encoder.routes')
const ultrassonicRoutes = require('.src/router/ultrassonic.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use('/motor', motorRoutes)
app.use('/encoder', encoderRoutes)
app.use('/ultrassonic', ultrassonicRoutes)

app.listen(3333)