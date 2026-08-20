const { ambilListLaporan, tambahListLaporan, editLaporan, hapusLaporan, ambilDataLaporan } = require('../service/laporan.service')

const ListLaporan = async (req, res) => {
    try {

        const DataLaporan = await ambilListLaporan()
        return res.status(200).json({
            status: 'succes ',
            message: 'berhasil mendapatkan data',
            data: DataLaporan
        })


    }
    catch (error) {
        return res.status(501).json({ status: error, message: error.message })
    }
}

const DataLaporan = async (req, res) => {
    try {

        const isiData = await ambilDataLaporan()
        return res.status(200).json({
            status: 'succes ',
            message: 'berhasil mendapatkan data',
            data: isiData
        })
    } catch (error) {
        return res.status(501).json({ status: error, message: error.message })
    }
}


const CreateLaporan = async (req, res) => {
    try {

        const { Nik_Warga, Judul_laporan, deskripsi, Lokasi, status_laporan } = req.body
        console.log("Data yang masuk ke Controller:", req.body);
        const dataBaru = await tambahListLaporan(Nik_Warga, Judul_laporan, deskripsi, Lokasi)

        return res.status(201).json({

            status: 'succes',
            message: 'berhasil buat laporan',
            data: {
                id: dataBaru.insertId,
                Nik_Warga: Nik_Warga,
                Judul_laporan: Judul_laporan,
                deskripsi: deskripsi,
                Lokasi: Lokasi,
            }
        })

    } catch (error) {
        return res.status(501).json({ status: error, message: error.message })
    }
}

const UpdateLaporan = async (req, res) => {
    try {
        const userId = req.params.id
        const isiData = req.body
        const updateData = await editLaporan(userId, isiData)

        return res.status(200).json({
            status: 'succes',
            message: `data yang berubah adalah id ${userId}`,
            data: updateData
        })
    } catch (error) {
        return res.status(501).json({ status: error, message: error.message })
    }
}

const DeleteLaporan = async (req, res) => {
    try {
        const userId = req.params.id
        const deleteData = await hapusLaporan(userId)

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
        });
    } catch (error) {
        return res.status(500).json({ status: 'error di delete user', message: error.message })

    }
}



module.exports = { ListLaporan, CreateLaporan, UpdateLaporan, DeleteLaporan, DataLaporan }