const connection = require("../app/database")
class LabelController{
    //创建标签
    async create(name){
        const satement = `INSERT INTO label (name) VALUES (?);`
        const [result] = await connection.execute(satement, [name])
        return result
    }

    //判断是否存在标签
    async isExistLabel(name){
        const statement = `SELECT * FROM label WHERE name = ?;`
        const [result] = await connection.execute(statement, [name])
        return result[0]
    }

    //获取标签列表
    async getLabels(limit, offset){
        const statement = `SELECT * FROM label LIMIT ?, ?;`
        const [result] = await connection.execute(statement, [offset, limit])
        return result
    }
}

module.exports = new LabelController();