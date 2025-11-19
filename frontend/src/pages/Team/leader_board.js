import React from 'react'
import TeamLeaderboard from '../../components/TeamLeaderBoard';
const topTeams = [
  { id: 1, name: "Mildred O. Schultz", role: "Manager", workingTime: "16h 9m", accuracy: 874, aesthetic: 21, points: 8741, position: "1st", ribbonColor: "bg-blue-500" },
  { id: 2, name: "Joanna W. Owens", role: "UX Designer", workingTime: "13h 12m", accuracy: 562, aesthetic: 45, points: 8402, position: "2nd", ribbonColor: "bg-green-500" },
  { id: 3, name: "Robert J. Napier", role: "Marketer", workingTime: "10h 52m", accuracy: 965, aesthetic: 632, points: 5663, position: "3rd", ribbonColor: "bg-red-500" }
];

const otherTeams = [
  { id: 4, name: "Edward Diana", role: "Founder", workingTime: "12h 52m", accuracy: 452, aesthetic: 231, points: 5104 },
  { id: 5, name: "Melvin J. Oxford", role: "Product Manager", workingTime: "10h 23m", accuracy: 652, aesthetic: 345, points: 4163 },
  { id: 6, "name": "Sophia Carter", "role": "Designer", "workingTime": "8h 15m", "accuracy": 721, "aesthetic": 412, "points": 3892 },
  { id: 7, "name": "Liam Johnson", "role": "Developer", "workingTime": "9h 42m", "accuracy": 685, "aesthetic": 376, "points": 4576 },
  { id: 8, "name": "Olivia Thompson", "role": "Marketing Lead", "workingTime": "7h 55m", "accuracy": 592, "aesthetic": 329, "points": 3784 },
  { id: 9, "name": "Noah Wilson", "role": "QA Engineer", "workingTime": "11h 10m", "accuracy": 748, "aesthetic": 398, "points": 4821 },
  { Zid: 10, "name": "Emma Brown", "role": "Content Writer", "workingTime": "6h 38m", "accuracy": 532, "aesthetic": 298, "points": 3295 },
  { id: 11, "name": "James Miller", "role": "Scrum Master", "workingTime": "9h 20m", "accuracy": 699, "aesthetic": 382, "points": 4410 },
  { id: 12, "name": "Charlotte Davis", "role": "HR Manager", "workingTime": "7h 50m", "accuracy": 574, "aesthetic": 312, "points": 3672 },
  { id: 13, "name": "Benjamin Martinez", "role": "UX Researcher", "workingTime": "10h 05m", "accuracy": 621, "aesthetic": 355, "points": 4128 },
  { id: 14, "name": "Amelia Anderson", "role": "Software Engineer", "workingTime": "8h 30m", "accuracy": 678, "aesthetic": 399, "points": 4520 }
];

function LeaderBoard() {
    return (
        <div>
            <TeamLeaderboard topTeams={topTeams} otherTeams={otherTeams} />
        </div>
    );
}

export default LeaderBoard
