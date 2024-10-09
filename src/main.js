const myh1 = document.getElementById("myh1");
roll_button = document.getElementById("roll")
roll_button.addEventListener("click", function (){
    var roll = Math.floor(Math.random() * 11);
    myh1.innerHTML = roll;
});