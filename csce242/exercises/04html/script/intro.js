const showMessage = () => {
    console.log("I did it! The button was clicked!");
}

document.getElementById("btn-show-message").onclick = showMessage;

// styles the link when it's clicked
document.getElementById("link").onclick = () => {
    e.preventDefault(); //dont go to links destination
    e.target.classList.add("cool-link");
    
}