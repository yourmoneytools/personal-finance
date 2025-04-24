let closeIcon = document.getElementById("close-icon");
let hambIcon = document.getElementById("hamburger-icon");
let navMenu = document.getElementById("mobile-nav");

navMenu.style.display = "none";
closeIcon.style.display = "none";
hambIcon.style.display = "block";

console.log("this scripts got loaded");

hambIcon.addEventListener("click", function(){
    navMenu.style.display = "block";
    closeIcon.style.display = "block";
    hambIcon.style.display = "none";
    console.log("this has been clicked");
});

closeIcon.addEventListener("click", function(){
    navMenu.style.display = "none";
    closeIcon.style.display = "none";
    hambIcon.style.display = "block";
    console.log("this has been clicked");
});