const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const foodRouters = require('./routes/foodRouter')
const userRouters = require('./routes/userRouter')
const recordRouters = require("./routes/recordRouter")
const orderRouters = require("./routes/orderRouter")
const feedbackRouters = require("./routes/feedbackRouter")
const app = express()

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN2]
const devOrigin = ['http://localhost:5173']
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin

app.use('/', (req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())

app.use(cors())

// app.use(
//     cors({
//       origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin)) {
//             callback(null, true)
//         //   if (!origin || allowedOrigins.includes(origin)) {
//         //     callback(null, true);
//         //   } else {
//         //     callback(new Error(`${origin} not allowed by cors`));
//         //   }
//         } else {
//           callback(new Error`${origin} not allowed by cors`);
//         }
//       },
//       optionsSuccessStatus: 200,
//       credentials: true,
//       methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     }),
//   );

app.use('/api/records', recordRouters)

app.use('/api/food', foodRouters)

app.use('/api/user', userRouters)

app.use('/api/order', orderRouters)

app.use('/api/feedback', feedbackRouters)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.clear();
        app.listen(process.env.PORT, () => {
            console.log('listening to port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

