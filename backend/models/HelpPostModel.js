// backend/models/UserModel.js
const pool = require("../config/db");

async function createHelpPost(title, description, urgency, userId) {
    const result = await pool.query(
        `INSERT INTO help_req (title, description, urgency, user_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, urgency, userId]
    );
    return result.rows[0];
}

async function getHelpPost(userId) {
    const result = await pool.query(`select * from help_req `);
    return result.rows;
}

async function createComment(req_id, user_id, comment) {
    const result = await pool.query(
        `insert into comments(req_id, user_id, comment)
        values ($1, $2, $3) returning *`,
        [req_id, user_id, comment]
    );
    return result.rows[0];
}

async function getComments(post_id) {
    const result = await pool.query(
        `SELECT c.comment, u.full_name 
         FROM comments c
         JOIN users u ON c.user_id = u.user_id
         WHERE c.req_id = $1;`,
        [post_id]
    );
    return result.rows;
}

module.exports = {
    createHelpPost,
    getHelpPost,
    createComment,
    getComments,
};
