function scale_roll(min = 1, max = 10, skew = 2) {
    const random = Math.random();

    if (random < 1 / max) {
        return scale_roll(min, max * 100, skew);
    }

    const adjusted = Math.pow(Math.random(), skew);
    const roll = Math.floor(min + adjusted * (max - min + 1));
    myh1.innerHTML = roll;
}

const myh1 = document.getElementById("myh1");
roll_button = document.getElementById("roll")
roll_button.addEventListener("click", scale_roll());
