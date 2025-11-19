const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const pool = require("./db");
const userRouter = require("./routes/UserRouter");
const dashboardRouter = require("./routes/DashboardRouter");
const helpPostRouter = require("./routes/HelpPostRouter");
const eventRouter = require("./routes/EventRouter");
const teamRouter = require("./routes/TeamRouter");

const app = express();


app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

app.use("/api/users", userRouter)
app.use("/api/dashboard", dashboardRouter);
app.use("/api/helpPost", helpPostRouter);
app.use("/api/event", eventRouter);
app.use("/api/teams", teamRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
