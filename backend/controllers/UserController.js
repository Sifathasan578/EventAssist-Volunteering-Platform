const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    findUserByEmail,
    createUser,
    createVolHistory,
    getVolHistoryByUserId,
    findUserById,
    updateUserQuery,
    userPoints,
    getUsersByPoints,
} = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET;


const UserController = {};

UserController.registerUser = async (req, res) => {
    try {
        const { fullName, email, password, age, gender, skills, causes } = req.body;

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const newUser = await createUser(
            fullName,
            email,
            hashedPassword,
            age,
            gender,
            skills,
            causes
        );

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


UserController.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.addHistory = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        //if found then checking for hte id's
        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const { event_name, total_hours } = req.body;
        
        const history = await createVolHistory(userId, event_name, total_hours);
        if (!history) {
            return res.status(400).json({ message: "Not found" });
        }
        res.status(201).json({
            message: "History added successfully",
            user: { id: history.userId, eventName: history.eventName },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.getHistory = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1]; 
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const history = await getVolHistoryByUserId(userId);

        if (!history || history.length === 0) {
            return res.status(404).json({ message: "No volunteering history found" });
        }

        res.status(200).json({ history });
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.editUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = parseInt(decoded.userId, 10);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const { fullName, email, age, gender, skills, causes } = req.body;

        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await updateUserQuery(
            fullName,
            email,
            age,
            gender,
            skills,
            causes,
            userId
        );


        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



UserController.getUserData = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = parseInt(decoded.userId, 10);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await findUserById(userId); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


UserController.UpdateUserPoint = async (req, res) => {
    const { totalPoints } = req.body;
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = parseInt(decoded.userId, 10);

        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const updatedUser = await userPoints(userId, totalPoints);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ updatedUser });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.getUsersSortedByPoints = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; 
        if (!userId) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const users = await getUsersByPoints(userId);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users }); 
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = UserController;
