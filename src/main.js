const myh1 = document.getElementById("myh1");
const roll_button = document.getElementById("roll");
const highesth1 = document.getElementById("highH1");
const usernameForm = document.getElementById("usernameForm");
const lbUsers = document.querySelector('.lbUsers');
var highest = 0;

function scale_roll(min = 1, max = 10, skew = 2, next = 5) {
    const random = Math.random();

    if (random < next / max) {
        return scale_roll(min, max * 10, skew, next * 5);
    }

    const adjusted = Math.pow(Math.random(), skew);
    const roll = Math.floor(min + adjusted * (max - min + 1));

    if (roll > highest) {
        highest = roll;
        highesth1.innerHTML = highest; 
    }
    myh1.innerHTML = roll;
}

async function send(event) {
    event.preventDefault();
    var username = document.getElementById("usernameid").value;

    try {
        const response = await fetch('http://localhost:3000/save-roll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, roll: highest })
        });

        if (response.ok) {
            alert("Saved: " + username + " with roll " + highest + "!");
            fetchLeaderboard();
        } else {
            alert("Failed to save roll.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while saving.");
    }
}

async function fetchLeaderboard() {
    try {
        const response = await fetch('http://localhost:3000/leaderboard');
        if (response.ok) {
            const leaderboardData = await response.json();
            lbUsers.innerHTML = '';

            leaderboardData.forEach(user => {
                const p = document.createElement('p');
                p.textContent = `${user.username}: ${user.roll}`;
                lbUsers.appendChild(p);
            });
        } else {
            console.error("Failed to fetch leaderboard");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
document.addEventListener('DOMContentLoaded', fetchLeaderboard);

roll_button.addEventListener("click", function() {
    scale_roll(); 
});
usernameForm.addEventListener("submit", send);
