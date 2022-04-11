const connection = require("../app/database")


const sqlFragment = `
    SELECT
        m.id id, m.content content, m.createAt creatTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
`

class MomentService{
    //发表动态
    async create(userId, content){
        const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?)`;
        const [result] =await connection.execute(statement, [content, userId])
        return result;
    }

    //获取动态(单个)
    async getMomentById(id){
        const statement = `
            ${sqlFragment}
            WHERE m.id = ?
        `;
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }
    //获取动态(多个)
    async getMomentByList(offset, size){
        const statement = `
            ${sqlFragment}
            LIMIT ?, ?
        `;
        const [result] = await connection.execute(statement, [offset, size])
        return result[0]
    }
    //更新动态
    async update(content, momentId){
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const [result] = connection.execute(statement, [content, momentId])
        return result;
    }

    //删除动态
    async remove(momentId){
        const statement = `DELETE FROM moment WHERE id = ?`;
        const [result] = await connection.execute(statement, [momentId])
        return result;
    }
}

module.exports = new MomentService();