require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const port = process.env.PORT 

app.use(express.json());
app.use(cors())

const userRoute = require('./src/route/user.route')
const laporanRoute = require('./src/route/laporan.route')

const startServer = async () => {
    try {
        await db.getConnection()
        console.log("✅ Database MySQL Berhasil Terhubung (via Async/Await)!")

        app.use('/api/warga', userRoute)
        app.use('/api/laporan', laporanRoute)


        app.listen(port, () => {
            console.log(`server jalan di ${port}`)
        })
    } catch (error) {
        console.log("gagal konek message:" + error.message)
        return
    }
}

startServer()