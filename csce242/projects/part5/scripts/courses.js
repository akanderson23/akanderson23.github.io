//filter the courses by category and search text
const filterButtons = document.querySelectorAll("#filter-list button");
const searchBox = document.getElementById("search-courses");
const courseCards = document.querySelectorAll(".course-card");
const noResults = document.getElementById("no-results");
let selectedCategory = "All";

const showCourses = () => {
    const searchText = searchBox.value.toLowerCase();
    let numShowing = 0;

    courseCards.forEach((card) => {
        const category = card.querySelector(".course-category").textContent;
        const title = card.querySelector("h3").textContent.toLowerCase();
        const matchesCategory = selectedCategory === "All" || category === selectedCategory;
        const matchesSearch = title.includes(searchText);

        if (matchesCategory && matchesSearch) {
            card.classList.remove("hidden");
            numShowing++;
        } else {
            card.classList.add("hidden");
        }
    });

    //let the user know if nothing matched
    if (numShowing === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }
};

//when a category button is clicked, highlight it and filter the courses
filterButtons.forEach((button) => {
    button.onclick = () => {
        filterButtons.forEach((otherButton) => {
            otherButton.classList.remove("selected");
        });
        button.classList.add("selected");
        selectedCategory = button.textContent;
        showCourses();
    };
});

//filter the courses as the user types in the search box
searchBox.oninput = showCourses;
