const pool = require("../config/db");

async function createEventQuery(
    title,
    description,
    eventDate,
    startTime,
    endTime,
    location,
    category
) {
    const result = await pool.query(
        `INSERT INTO events (title, description, event_date, start_time, end_time, location, category) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [title, description, eventDate, startTime, endTime, location, category]
    );
    return result.rows[0];
}

async function  getEventQuery() {
    const result = await pool.query(
        `select * from events`
    );
    return result.rows;
}

module.exports = {
    createEventQuery,
    getEventQuery,
};
