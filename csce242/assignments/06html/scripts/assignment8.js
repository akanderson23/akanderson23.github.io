// ============================
// Nav toggle (small screens)
// ============================

var navToggle = document.getElementById("nav-toggle");
var navList = document.getElementById("nav-list");

navToggle.addEventListener("click", function (event) {
  event.preventDefault();

  navList.classList.toggle("show");

  if (navList.classList.contains("show")) {
    navToggle.innerHTML = "&#9650;"; // up arrow
  } else {
    navToggle.innerHTML = "&#9660;"; // down arrow
  }
});

// ============================
// Section switching
// ============================

var exercise1 = document.getElementById("exercise1");
var exercise2 = document.getElementById("exercise2");
var link1 = document.getElementById("link-exercise1");
var link2 = document.getElementById("link-exercise2");

link1.addEventListener("click", function (event) {
  event.preventDefault();
  exercise1.classList.remove("hide");
  exercise2.classList.add("hide");
});

link2.addEventListener("click", function (event) {
  event.preventDefault();
  exercise2.classList.remove("hide");
  exercise1.classList.add("hide");
});

// ============================
// Exercise 1: Missing Class Points Deduction
// ============================

var daysMissedInput = document.getElementById("daysMissed");
var attendanceOutput = document.getElementById("attendanceOutput");

daysMissedInput.addEventListener("input", function () {
  var daysMissed = Number(daysMissedInput.value);
  var totalClasses = 25;
  var attendanceWorth = 7; // percent of final grade

  if (daysMissedInput.value === "" || isNaN(daysMissed) || daysMissed < 0) {
    attendanceOutput.innerHTML = "";
    return;
  }

  var percentPerClass = attendanceWorth / totalClasses;
  var percentLost = (percentPerClass * daysMissed).toFixed(1);

  var message = "";

  if (daysMissed === 0) {
    message = "Perfect attendance! You are keeping your full 7% attendance grade.";
  } else if (daysMissed >= 1 && daysMissed <= 2) {
    message = "Not bad, a couple absences won't sink you. Just try to keep it there.";
  } else if (daysMissed >= 3 && daysMissed <= 5) {
    message = "That's starting to add up. Consider making it to a few more classes.";
  } else if (daysMissed >= 6 && daysMissed <= 10) {
    message = "This is not an online class, you are missing valuable learning opportunities.";
  } else {
    message = "You are missing almost half the semester. Talk to your professor before this gets worse.";
  }

  attendanceOutput.innerHTML =
    "You will lose " + percentLost + "% for skipping " + daysMissed + " day" + (daysMissed === 1 ? "" : "s") +
    ".<br>" + message;
});

// ============================
// Exercise 2: End of Semester Counter
// ============================

var daysLeftOutput = document.getElementById("daysLeftOutput");

function updateDaysLeft() {
  var today = new Date();
  var currentYear = today.getFullYear();
  var lastDayOfClass = new Date(currentYear, 11, 4); // December 4th (month is 0-indexed)

  // If Dec 4th has already passed this year, assume next year's semester
  if (today > lastDayOfClass) {
    lastDayOfClass = new Date(currentYear + 1, 11, 4);
  }

  var msPerDay = 1000 * 60 * 60 * 24;
  var daysLeft = Math.ceil((lastDayOfClass - today) / msPerDay);

  var message = "";

  if (daysLeft <= 7) {
    message = "The finish line is basically in sight. Hang in there, almost done!";
  } else if (daysLeft > 7 && daysLeft <= 30) {
    message = "Less than a month left. Start planning for finals now.";
  } else if (daysLeft > 30 && daysLeft <= 60) {
    message = "You're in the home stretch of the semester. Keep the momentum going.";
  } else if (daysLeft > 60 && daysLeft <= 90) {
    message = "Still a good chunk of the semester left. Stay consistent.";
  } else {
    message = "Not time to start counting down yet.";
  }

  daysLeftOutput.innerHTML =
    "You have <strong>" + daysLeft + "</strong> days left in the semester.<br>" + message;
}

updateDaysLeft();