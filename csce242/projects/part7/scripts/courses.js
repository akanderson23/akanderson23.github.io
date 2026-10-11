//url of the course list stored on github pages
const coursesUrl = "https://akanderson23.github.io/csce242/projects/part7/json/courses.json";

const filterButtons = document.querySelectorAll("#filter-list button");
const searchBox = document.getElementById("search-courses");
const courseGrid = document.getElementById("course-grid");
const loadingMessage = document.getElementById("loading-message");
const noResults = document.getElementById("no-results");
let selectedCategory = "All";

//read the json file and turn it into a list of courses
const getCourses = async () => {
    try {
        const response = await fetch(coursesUrl);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//build the html for one course card
const getCourseCard = (course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.dataset.category = course.category;

    const imageLink = document.createElement("a");
    imageLink.href = course.link;
    const image = document.createElement("img");
    image.src = course.img_name;
    image.alt = course.title;
    image.classList.add("course-image");
    imageLink.append(image);
    card.append(imageLink);

    const info = document.createElement("div");
    info.classList.add("course-info");
    card.append(info);

    const topLine = document.createElement("div");
    topLine.classList.add("course-top-line");
    const category = document.createElement("p");
    category.classList.add("course-category");
    category.textContent = course.category;
    const level = document.createElement("span");
    level.classList.add("course-level");
    level.textContent = course.level;
    topLine.append(category, level);
    info.append(topLine);

    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = course.link;
    titleLink.textContent = course.title;
    title.append(titleLink);
    info.append(title);

    const instructor = document.createElement("p");
    instructor.classList.add("instructor");
    instructor.textContent = `Instructor: ${course.instructor}`;
    info.append(instructor);

    const description = document.createElement("p");
    description.classList.add("course-description");
    description.textContent = course.description;
    info.append(description);

    const meta = document.createElement("div");
    meta.classList.add("course-meta");
    meta.innerHTML = `<span><img src="images/icon-clock.svg" alt="">${course.duration}</span>` +
        `<span><img src="images/icon-book-open.svg" alt="">${course.lessons} Lessons</span>`;
    info.append(meta);

    const enroll = document.createElement("a");
    enroll.href = course.link;
    enroll.classList.add("btn", "btn-navy", "btn-full");
    enroll.textContent = "Enroll Free";
    info.append(enroll);

    return card;
};

//show the cards that match the selected category and search text
const showCourses = () => {
    const searchText = searchBox.value.toLowerCase();
    let numShowing = 0;

    document.querySelectorAll(".course-card").forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const matchesCategory = selectedCategory === "All" || card.dataset.category === selectedCategory;
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

//load the courses from the json file and write them to the page
const showCourseList = async () => {
    const courses = await getCourses();
    loadingMessage.classList.add("hidden");

    if (!courses) {
        noResults.textContent = "Sorry, the courses could not be loaded. Please try again later.";
        noResults.classList.remove("hidden");
        return;
    }

    courses.forEach((course) => {
        courseGrid.append(getCourseCard(course));
    });
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

showCourseList();
