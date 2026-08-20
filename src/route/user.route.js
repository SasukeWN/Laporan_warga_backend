const express = require('express')
const router = express.Router()
const { ListUser, CreateUser, UpdateUser , DeleteUser } = require('../controller/user.controller')
const { ListLaporan } = require('../controller/laporan.controller')


// WARGA 
router.get('/list/warga', ListUser)
router.post('/create/warga', CreateUser)
router.patch('/update/warga/:id', UpdateUser)
router.delete('/delete/warga/:id', DeleteUser)







module.exports = router