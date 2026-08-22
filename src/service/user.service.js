const db = require('../../db')

const ambilListUser = async () => {
    try {
        const query = 'SELECT * FROM users'
        const [users] = await db.execute(query)
        return users
    } catch (error) {
        throw new Error('gagal query Get ')
    }
}


const tambahUser = async (Nama_warga, Nik_Warga) => {
    try {
        const query = 'INSERT INTO users (Nama_warga, Nik_Warga) VALUES (? , ?)'
        const [result] = await db.execute(query, [Nama_warga, Nik_Warga])
        return result
    } catch (error) {
        console.log("Error dari Database");
        throw error;
    }
}

const editUser = async (userId, updateData) => {
    try {
        const Nama = updateData.Nama_warga ?? null
        const Nik = updateData.Nik_Warga ?? null

        const query = `
        UPDATE users
            SET Nama_warga = COALESCE(? , Nama_warga),
                Nik_Warga = COALESCE(?, Nik_Warga)
                WHERE id = ?
        `

        const [result] = await db.execute(query, [Nama, Nik, userId])

        return result

    } catch (error) {
        console.log("Error dari Database");
        throw error;
    }
}

const hapusUser = async (userId) => {
    try {
        const query = 'DELETE FROM users WHERE id = ?'
        const [result] = await db.execute(query, [userId])
        return result
    } catch (error) {
        console.log("Error dari Database");
        throw error
    }
}


module.exports = { ambilListUser, tambahUser, editUser, hapusUser }