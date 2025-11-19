const pool = require("../config/db");

async function getTeamsQuery() {
    const result = await pool.query(`select * from Teams`);
    return result.rows;
}

async function createTeamQuery(teamType, teamName, teamDescription) {
    const result = await pool.query(
        `INSERT INTO teams (team_type, team_name, team_description) 
         VALUES ($1, $2, $3) RETURNING *`,
        [teamType, teamName, teamDescription]
    );
    return result.rows[0];
}

//from database its fetching members of teams with junction table
async function getTeamMembersQuery(teamId) {
    const result = await pool.query(
        `SELECT users.user_id, users.full_name 
         FROM participation 
         JOIN users ON participation.user_id = users.user_id 
         WHERE participation.team_id = $1`,
        [teamId]
    );
    return result.rows;
}

// it fetches all events organized by a team
async function getTeamEventsQuery(teamId) {
    const result = await pool.query(
        `SELECT events.*
         FROM team_events 
         JOIN events ON team_events.event_id = events.event_id 
         WHERE team_events.team_id = $1`,
        [teamId]
    );
    return result.rows;
}

async function getUserPrivateTeamsQuery(userId) {
    const result = await pool.query(
        `select teams.team_id, teams.team_name, teams.team_description, teams.team_type 
         from participation 
         join teams on participation.team_id = teams.team_id 
         where participation.user_id = $1 and teams.team_type = 'Private'`,
        [userId]
    );
    return result.rows;
}

module.exports = {
    getTeamsQuery,
    createTeamQuery,
    getTeamMembersQuery,
    getTeamEventsQuery,
    getUserPrivateTeamsQuery,
};