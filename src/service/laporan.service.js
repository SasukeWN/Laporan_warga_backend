const db = require('../../db')

const ambilListLaporan = async (req, res) => {
    try {
        const [result] = await db.execute(`
                SELECT 
                users.Nama_warga,
                laporan.Judul_laporan, 
                laporan.deskripsi,
                laporan.lokasi,
                laporan.status_laporan
                FROM laporan
                INNER JOIN users ON laporan.User_id = users.id
            `)

        return result
    }
    catch (error) {
        console.log("Error dari Database");
        throw error;
    }
}

const ambilDataLaporan = async (req, res) => {
    try {

        const [result] = await db.execute(`SELECT * FROM users INNER JOIN laporan ON users.id = laporan.User_id`)
        return result
    } catch (error) {
        console.log("Error dari Database");
        throw error;
    }
}


const tambahListLaporan = async (Nik_Warga, Judul_laporan, deskripsi, Lokasi) => {
    try {
        const [Nik] = await db.execute('SELECT id FROM users WHERE Nik_Warga = ?', [Nik_Warga])

        if (Nik.length > 0) {
            const isiId = Nik[0].id
            console.log("Cek Data:", { isiId, Judul_laporan, deskripsi, Lokasi })
            const [result] = await db.execute('INSERT INTO laporan(User_id, Judul_laporan, deskripsi, Lokasi) VALUES (?, ? , ?, ?)', [isiId, Judul_laporan, deskripsi, Lokasi])
            return result

        } else {
            throw new Error('NIK tidak ditemukan')
        }

    } catch (error) {
        console.log("Error dari Database");
        throw error
    }
}

const editLaporan = async (userId, isiData) => {
    try {
        const Judul_laporan = isiData.Judul_laporan ?? null
        const deskripsi = isiData.deskripsi ?? null
        const Lokasi = isiData.Lokasi ?? null
        const status_laporan = isiData.status_laporan ?? null

        const query = `UPDATE laporan
            SET Judul_laporan = COALESCE(?, Judul_laporan),
                deskripsi = COALESCE(?, deskripsi),
                Lokasi = COALESCE(?, Lokasi),
                status_laporan = COALESCE(?, status_laporan)
                WHERE id = ?
    `

        const [result] = await db.execute(query, [Judul_laporan, deskripsi, Lokasi, status_laporan, userId])

        return result
    } catch (error) {
        console.log("Error dari Database");
        throw error
    }

}

const hapusLaporan = async (userId) => {
    try {

        const query = 'DELETE FROM laporan WHERE id = ? '
        const [result] = await db.execute(query, [userId])
        return result
    } catch (error) {
        console.log("Error dari Database");
        throw error
    }
}

module.exports = { ambilListLaporan, tambahListLaporan, editLaporan, hapusLaporan, ambilDataLaporan }