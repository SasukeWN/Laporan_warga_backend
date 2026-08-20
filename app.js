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


app.use('/api/warga', userRoute)
app.use('/api/laporan', laporanRoute)

app.get('/', (req, res) => {
    res.send("API Berjalan dengan baik!");
});

// Route untuk mengecek status API dan Database
app.get('/health', async (req, res) => {
    try {
        // Coba jalankan query paling ringan
        await db.execute('SELECT 1');
        res.status(200).json({
            status: "OK",
            message: "API berjalan dan Database MySQL terhubung!"
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            message: "API berjalan, TAPI Database gagal terhubung.",
            error: error.message
        });
    }
});

module.exports = app


