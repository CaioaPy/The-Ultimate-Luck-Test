const myh1 = document.getElementById("myh1");
const roll_button = document.getElementById("roll");

function scale_roll(min = 1, max = 10, skew = 2) {
    const random = Math.random();

    if (random < 10 / max) {
        return scale_roll(min, max * 10, skew);
    }

    const adjusted = Math.pow(Math.random(), skew);
    const roll = Math.floor(min + adjusted * (max - min + 1));
    myh1.innerHTML = roll;
}

roll_button.addEventListener("click", function() {
    scale_roll();
});
