const connection = require("../app/database")

class CommentService{
    //发布评论
    async create(momentId, content, userId){
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId])
        return result;
    }

    //回复评论
    async reply(momentId, content, userId, commentId){
        const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
        return result;
    }

    //更新评论
    async update(commentId, content){
        const statement = `UPDATE comment SET content = ? WHERE id = ?;`
        const [result] = await connection.execute(statement, [content, commentId])
        return result;
    }

    //删除评论
    async remove(commentId){
        const statement = `DELETE FROM comment WHERE id = ?;`
        const [result] = await connection.execute(statement, [commentId])
        return result;
    }

    //获取评论
    async getCommentByMomentId(momentId){
        const statement = `
            SELECT
            m.id, m.content, m.comment_id commentId, m.createAt createTime,
            JSON_OBJECT('id', u.id, 'name', u.name) user
            FROM comment m
            LEFT JOIN user u ON u.id = m.user_id
            WHERE moment_id = ?;`
        const [result] = await connection.execute(statement, [momentId])
        return result;
    }
}

module.exports = new CommentService();