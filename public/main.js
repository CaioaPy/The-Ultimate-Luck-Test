const myh1 = document.getElementById("myh1");
const roll_button = document.getElementById("roll");
const highesth1 = document.getElementById("highH1");
const usernameForm = document.getElementById("usernameForm");
let highest = 0;

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
    const username = document.getElementById("usernameid").value;

    try {
        const response = await fetch('/api/save-roll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, roll: highest })
        });

        if (response.ok) {
            alert("Saved: " + username + " with roll " + highest + "!");
            highest = 0;
            highesth1.innerHTML = 0; 
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
        const response = await fetch('/api/leaderboard');
        if (response.ok) {
            const leaderboard = await response.json();
            console.log('Leaderboard:', leaderboard);
            const lbUsers = document.querySelector('.lbUsers');
            lbUsers.innerHTML = '';
            leaderboard.forEach(entry => {
                const p = document.createElement('p');
                p.textContent = `${entry.username}: ${entry.roll}`;
                lbUsers.appendChild(p);
            });
        } else {
            console.error('Failed to fetch leaderboard');
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

roll_button.addEventListener("click", function() {
    scale_roll(); 
});
usernameForm.addEventListener("submit", send);

document.addEventListener("DOMContentLoaded", fetchLeaderboard);
