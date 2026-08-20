const { ambilListUser, tambahUser, editUser, hapusUser } = require('../service/user.service')


const ListUser = async (req, res) => {
    try {

        const DataUser = await ambilListUser()

        console.log(`[LOG] Ada yang akses GET List User pada ${new Date().toLocaleString()}`)

        return res.status(200).json({
            status: 'succes',
            message: "berhasil ambil List user",
            data: DataUser
        })

    } catch (error) {
        return res.status(501).json({ status: error, message: error.message })
    }
}

const CreateUser = async (req, res) => {
    try {
        const { Nama_warga, Nik_Warga } = req.body

        if (!Nama_warga || !Nik_Warga) {
            return res.status(400).json({ status: 'fail', message: 'Nama dan NIK warga wajib diisi' })
        }

        // Perbaikan validasi NIK agar memberikan respon balik dan tidak hang
        if (Nik_Warga.length !== 16) {
            return res.status(400).json({ status: 'fail', message: 'NIK Warga harus tepat 16 digit' })
        }


        const userBaru = await tambahUser(Nama_warga, Nik_Warga)

        return res.status(201).json({
            status: 'success',
            message: "Berhasil membuat data",
            data: {
                id: userBaru.insertId,
                Nama_warga: Nama_warga,
                Nik_Warga: Nik_Warga
            }
        })

    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = req.body
        const dataBaru = await editUser(userId, updateData)

        return res.status(200).json({
            status: 'update Succes',
            message: `data yang berubah adalah id ${userId}`,
            data: dataBaru
        })
    } catch (error) {
        return res.status(500).json({ status: 'error di update user', message: error.message })
    }

}


const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const deleteData = await hapusUser(userId)

        if (deleteData.affectedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `User dengan id ${userId} tidak ditemukan`
            });
        }

        return res.status(202).json({
            status: 'succes deleted',
            message: `data yang terhapus adalah id ${userId}`,
            data: deleteData
        })
    } catch (error) {
        return res.status(500).json({ status: 'error di delete user', message: error.message })
    }
}


module.exports = { ListUser, CreateUser, UpdateUser, DeleteUser }