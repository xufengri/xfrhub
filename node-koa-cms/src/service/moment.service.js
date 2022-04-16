const connection = require("../app/database")

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
            SELECT
            m.id id, m.content content, m.createAt creatTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
                    (SELECT IF (COUNT(c.id), JSON_ARRAYAGG(
                JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                                                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', u.avatar_url))
            ) ,NULL) FROM comment c LEFT JOIN user cu ON c.user_id WHERE m.id = c.moment_id) comments,
            IF(COUNT(l.id), JSON_ARRAYAGG(
                JSON_OBJECT('id', l.id, 'name', l.name)
            ), NULL) labels,
            (SELECT JSON_ARRAYAGG(CONCAT('http://127.0.0.1:8000/moment/images/', file.filename)) 
            FROM file WHERE m.id = file.moment_id) images
            FROM moment m
            LEFT JOIN user u ON m.user_id = u.id
            LEFT JOIN moment_label ml ON m.id = ml.moment_id
            LEFT JOIN label l ON ml.label_id = l.id
            WHERE m.id = ?
            GROUP BY m.id;
        `;
        const [result] = await connection.execute(statement, [id])
        return result[0]
    }
    //获取动态(多个)
    async getMomentByList(offset, limit){
        const statement = `
            SELECT
            m.id id, m.content content, m.createAt creatTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name) author,
            (SELECT COUNT(*) FROM  comment c WHERE c.moment_id = m.id) commentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://127.0.0.1:8000/moment/images/', file.filename)) 
            FROM file WHERE m.id = file.moment_id) images
            FROM moment m
            LEFT JOIN user u ON m.user_id = u.id
            LIMIT ?, ?
        `;
        const [result] = await connection.execute(statement, [offset, limit])
        return result
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

    //查看是否有标签
    async hasLabel (momentId, labelId){
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result[0] ? true:false;
    }
    
    //添加标签
    async addLabels(momentId, labelId){
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES(?,?);`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result;
    }
}

module.exports = new MomentService();