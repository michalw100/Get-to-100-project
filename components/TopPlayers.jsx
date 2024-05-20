import React from 'react';

const TopPlayers = () => {
    const localStorageKeys = Object.keys(localStorage);// לפי המפתחות שלהםlocalStorageלוקח את כל האובייקטים מה
    const topPlayers = [];
    localStorageKeys.forEach((key) => {
        if (key !== "currentUser") {
            const player = JSON.parse(localStorage.getItem(key));
            if (player.scores.length > 0) {
                const averageScore = player.scores.reduce((sum, score) => sum + score, 0) / player.scores.length;
                topPlayers.push({ player, averageScore });
            }
        }
    });

    topPlayers.sort((a, b) => a.averageScore - b.averageScore);
    const topThreePlayers = topPlayers.slice(0, 3);
    return (
        <div>
            <h2>Top Players</h2>
            {topThreePlayers.map((entry, index) => (
                <div key={index}>
                    <p>Name: {entry.player.name}</p>
                    <p>Average Score: {entry.averageScore}</p>
                </div>
            ))}
        </div>
    );
}

export default TopPlayers;