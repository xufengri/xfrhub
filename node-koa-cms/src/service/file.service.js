const connection = require('../app/database')

class FileService{
    //头像
    async createAvatar(filename, mimetype, size, id){
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [filename, mimetype, size, id])
        return result
    }
    //查找头像
    async getAvatarByUserId(userId){
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const [result] = await connection.execute(statement, [userId])
        return result[0]
    }

    //图片
    async createFile(filename, mimetype, size, userId, momentId){
        const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
        return result
    }

    //查找图片
    async getFileInfoByFilename(filename){
        const statement = `SELECT * FROM file WHERE filename = ?;`
        const [result] = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new FileService()