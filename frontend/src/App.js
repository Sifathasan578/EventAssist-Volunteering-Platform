import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/login";
import Profile from "./pages/user/profile";
import SignupPage from "./pages/user/signup";
import AddHistoryPage from "./pages/user/add_history";
import DashboardPage from "./pages/Dashboard/dashboard";
import HelpPostPage from "./pages/Help_post/help_post";
import AddPost from "./pages/Help_post/add_post";
import HelpPostDetailsPage from "./pages/Help_post/help_post_details";
import LandingPage from "./pages/landing";
import "./App.css";
import EventPage from "./pages/Event/events_page";
import AddEvent from "./pages/Event/add_event";
import TeamsPage from "./pages/Team/teams_page";
import TeamForm from "./pages/Team/create_team";
import LeaderBoard from "./pages/Team/leader_board";
import EditProfile from "./pages/user/edit_profile";
import TeamDashboard from "./pages/Team/team_dashboard";
import PrivateTeams from "./pages/Team/team_private_user";
import LeaderBoardUser from "./pages/user/leaderBoardUser";
import Reward from "./pages/Reward/reward";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add_history" element={<AddHistoryPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/community_help_post" element={<HelpPostPage />} />
                <Route path="/add_post" element={<AddPost />} />
                <Route path="/help_post_details/:id" element={<HelpPostDetailsPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/add_event" element={<AddEvent />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/add_teams" element={<TeamForm />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/edit_userProfile" element={<EditProfile />} />
                <Route path="/team_dashboard" element={<TeamDashboard />} />
                <Route path="/team_private" element={<PrivateTeams />} />
                <Route path="/leaderboard_user" element={<LeaderBoardUser />} />
                <Route path="/reward" element={<Reward />} />
            </Routes>
        </Router>
    );
}

export default App;
