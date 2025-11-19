// backend/models/UserModel.js
const pool = require("../config/db");

// Create a new user
async function createUser(fullName, email, hashedPassword, age, gender, skills, causes) {
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password, age, gender, skills, causes) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, full_name, email`,
        [fullName, email, hashedPassword, age, gender, skills, causes]
    );
    return result.rows[0];
}

async function userPoints(userId, points) {
    const result = await pool.query(
        `UPDATE users 
     SET points = $1 
     WHERE user_id = $2 
     RETURNING user_id, points`,
        [points, userId] 
    );
    return result.rows[0]; 
}


// Find a user by email
async function findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0]; 
}

//adding the history
async function createVolHistory(userId, eventName, totalHours) {
    const result = await pool.query(
        `INSERT INTO volunteering_history (user_id, event_name, total_hours) 
             VALUES ($1::int, $2, $3) RETURNING *`,
        [userId, eventName, totalHours]
    );
    return result.rows[0];
}

async function updateUserQuery(fullName, email, age, gender, skills, causes, userId) {
    const result = await pool.query(
        `UPDATE users 
         SET full_name = $1, email = $2, age = $3, gender = $4, skills = $5, causes = $6 
         WHERE user_id = $7 
         RETURNING *`,
        [fullName, email, age, gender, skills, causes, userId]
    );

    return result.rows[0];
}


// const getVolHistoryByUserId = async (userId) => {
//     const result = await pool.query("SELECT * FROM volunteering_history WHERE user_id = $1", [
//         userId,
//     ]);
//     return result.rows; 
// };
const getVolHistoryByUserId = async (userId) => {
    const volHistoryQuery = pool.query("SELECT * FROM volunteering_history WHERE user_id = $1", [
        userId,
    ]);

    const eventsQuery = pool.query(
        "select e.title AS event_name, e.total_hours_rounded  FROM volunteering v JOIN events e ON v.event_id = e.event_id WHERE v.user_id = $1",
        [userId]
    );

    const [volHistory, events] = await Promise.all([volHistoryQuery, eventsQuery]);

    return {
        volunteeringHistory: volHistory.rows,
        eventDetails: events.rows,
    };
};


const findUserById = async (userId) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
        return result.rows[0]; 
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user data");
    }
};

const getUserEvents = async (userId) => {
    try {
        const result = await pool.query(
            "select events.event_id, events.description, events.category, events.location, events.event_date, events.start_time,events.end_time from events join volunteering",
            [userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user data");
    }
};

async function getUsersByPoints() {
    
    try {
        const result = await pool.query(
        "select full_name, points FROM users ORDER BY points DESC"
    );
    return result.rows;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user data");
    }
}



module.exports = {
    createUser,
    findUserByEmail,
    createVolHistory,
    getVolHistoryByUserId,
    findUserById,
    updateUserQuery,
    getUserEvents,
    userPoints,
    getUsersByPoints,
};
