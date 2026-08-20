const express = require('express')
const router = express.Router()
const { ListLaporan, CreateLaporan, UpdateLaporan, DeleteLaporan, DataLaporan } = require('../controller/laporan.controller')


// Laporan Warga
router.get('/list/laporan', ListLaporan)
router.post('/create/laporan', CreateLaporan)
router.patch('/update/laporan/:id', UpdateLaporan)
router.delete('/delete/laporan/:id', DeleteLaporan)

router.get('/data/laporan' , DataLaporan)



module.exports = router