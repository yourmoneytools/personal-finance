// nav content
let navContent = `
<div class="nav-wrap">
      <div class="nav-image-wrap">
        <a href="index.html">
          <img src="assets/cash-tools-logo-green.png" alt="Nav Logo Image">
        </a>
      </div>
      <div class="nav-list-wrap">
        <ul class="main-nav desktop-nav">
          <li class="dropdown">
            <a href="tools.html">Tools</a>
            <ul class="dropdown-menu">
              <li><a href="cd-calculator.html">CD Calculator</a></li>
              <li><a href="buy-vs-rent-calculator.html">Buy VS Rent Calculator</a></li>
              <li><a href="savings-goal-tracker.html">Savings Goal Tracker</a></li>
              <li><a href="emergency-fund-calculator.html">Emergency Fund Calculator</a></li>
              <li><a href="burn-rate-runway-calculator.html">Burn Rate Calculator</a></li>
              <li><a href="monthly-expense-calculator.html">Monthly Expense Calculator</a></li>
            </ul>
          </li>
          <li><a href="blogs.html">Blog</a></li>
        </ul>
        <div class="mobile-nav">
          <div class="nav-controls">
            <div class="nav-icon" id="hamburger-icon">
              <img src="assets/hamburger-icon.png" alt="hamburger icon">
            </div>
          </div>
          <li class="" id="mobile-nav">
            <div class="close-icon-wrap">
              <div class="nav-icon" id="close-icon">
                <img src="assets/x-icon.png" alt="close icon">
              </div>
            </div>
            <div class="mobile-menu-wrap">
              <a class="header" href="tools.html">Tools</a>
              <ul class="">
                <li><a href="cd-calculator.html">CD Calculator</a></li>
                <li><a href="buy-vs-rent-calculator.html">Buy VS Rent Calculator</a></li>
                <li><a href="savings-goal-tracker.html">Savings Goal Tracker</a></li>
                <li><a href="emergency-fund-calculator.html">Emergency Fund Calculator</a></li>
                <li><a href="burn-rate-runway-calculator.html">Burn Rate Calculator</a></li>
                <li><a href="monthly-expense-calculator.html">Monthly Expense Calculator</a></li>
              </ul>
              <a href="blogs.html">Blog</a>
            </div>
          </li>
        </div>
      </div>
    </div>
`;

let navTag = document.querySelector("nav");
navTag.innerHTML += navContent; // ✅ Works!

let closeIcon = document.getElementById("close-icon");
let hambIcon = document.getElementById("hamburger-icon");
let navMenu = document.getElementById("mobile-nav");

navMenu.style.display = "none";
closeIcon.style.display = "none";
hambIcon.style.display = "flex";

hambIcon.addEventListener("click", function(){
    navMenu.style.display = "block";
    closeIcon.style.display = "flex";
    hambIcon.style.display = "none";
});

closeIcon.addEventListener("click", function(){
    navMenu.style.display = "none";
    closeIcon.style.display = "none";
    hambIcon.style.display = "flex";
});

