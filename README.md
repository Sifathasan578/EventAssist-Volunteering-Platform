# 🚀 **EventAssist – Volunteer Engagement Platform**

A full-stack platform designed to connect individuals with meaningful volunteer opportunities, community help requests, and long-term social initiatives.
Users can register, join events, create teams, respond to help posts, and track their impact over time.

---

# 🛠️ **Tech Stack**

### **Frontend**

* React.js
* TailwindCSS

### **Backend**

* Node.js
* Express.js

### **Database**

* **MongoDB** (based on the uploaded project files)

### **Authentication**

* JWT (JSON Web Token)

---

# 🌟 **Key Features**

### **1️⃣ User Accounts & Profiles**

* Secure JWT-based authentication
* User profiles with skills, interests, and volunteer history
* Editable profile settings
* Automatic tracking of volunteering activity

---

### **2️⃣ Discover & Join Volunteer Events**

* Create events with details like title, category, date, location
* Public event feed with filters
* One-click event registration
* Organizer and participant views

---

### **3️⃣ Community Help Requests**

* Users can post help requests (like social support platforms)
* Volunteers can comment and offer help
* Requests categorized by urgency (low, medium, urgent)
* Social feed-style interface for better engagement

---

### **4️⃣ Teams & Group Initiatives**

* Public or private volunteer teams
* Private teams protected by membership authorization
* Dashboard for team events, members, and achievements
* Manual or automatic leaderboard options

---

### **5️⃣ Impact Tracking & Recognition**

* Log volunteer hours
* Event hours auto-added to user profiles
* Point system based on activity
* Certificates generated from accumulated points/hours
* Leaderboard for most active volunteers

---

# 🗄️ **Database Schema**

Database diagrams & schema design:

🔗 **Google Drive Link**
[https://drive.google.com/file/d/12xleV5gVxguQCDjuqcvK09d--YEUtBb4/view?usp=sharing](https://drive.google.com/file/d/12xleV5gVxguQCDjuqcvK09d--YEUtBb4/view?usp=sharing)

📌 **ER Diagram**
![Database](https://res.cloudinary.com/drpasy4d2/image/upload/v1742204114/EventAssist.drawio_1_cyfew8.png)

---

# 📦 **Installation & Setup**

## **1. Clone the Repository**

```bash
git clone https://github.com/Asiful-Haque/EventAssist-Volunteering_Platform
cd EventAssist-Volunteering_Platform
```

---

## **2. Install Dependencies**

Install both frontend and backend dependencies:

### **Backend**

```bash
cd backend
npm install
```

### **Frontend**

```bash
cd ../frontend
npm install
```

---

## **3. Environment Variables**

Create `.env` files inside **backend** (and frontend if needed).

### **Backend `.env`**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

If using local MongoDB:

```
MONGO_URI=mongodb://127.0.0.1:27017/eventassist
```

---

# 🚀 **Running the Project**

## **Start Backend**

```bash
cd backend
npm start
```

Runs on:
👉 [http://localhost:5000](http://localhost:5000)

## **Start Frontend**

```bash
cd frontend
npm start
```

Runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🔗 **API Reference**

## 👤 **User**

```
POST /api/users/register
POST /api/users/login
POST /api/users/volunteering-history
GET  /api/users/volunteering-history
GET  /api/users/profile
PUT  /api/users/edit_profile
PUT  /api/users/update_points
GET  /api/users/sorted_by_points
```

---

## 📊 **Dashboard**

```
GET /api/dashboard
```

---

## 🌍 **Community Help Posts**

```
POST /api/helpPost/create_post
GET  /api/helpPost/getPosts
POST /api/helpPost/submitComment
GET  /api/helpPost/getComments/:post_id
```

---

## 🎟️ **Events**

```
POST /api/event/add_event
GET  /api/event/get_events
```

---

## 🏆 **Teams**

```
GET  /api/teams/get_teams
POST /api/teams/add_teams
POST /api/teams/see_members
POST /api/teams/see_events
GET  /api/teams/see_private_teams
```

---

# 📁 **Project Structure**

```
EventAssist/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

# 🤝 **Contributing**

Contributions are welcome!
Fork the repo → create a feature branch → open a pull request.

---

# 📄 **License**

MIT License (optional — add if needed)
