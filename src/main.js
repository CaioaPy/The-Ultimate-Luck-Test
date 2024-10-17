const myh1 = document.getElementById("myh1");
const roll_button = document.getElementById("roll");
const highesth1 = document.getElementById("highH1")
var highest = 0;

function scale_roll(min = 1, max = 10, skew = 2, next=5) {
    const random = Math.random();

    if (random < next / max) {
        return scale_roll(min, max * 10, skew, next += 10);
    }

    const adjusted = Math.pow(Math.random(), skew);
    const roll = Math.floor(min + adjusted * (max - min + 1));
    if (roll > highest){
        highest = roll;
        highesth1.innerHTML = highest;
    }
    myh1.innerHTML = roll;
}

function send(){
    var username = document.getElementById("usernameid");

    alert("saved!" + username.value + "!");
}

roll_button.addEventListener("click", function() {
    scale_roll();
});
