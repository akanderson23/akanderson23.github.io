//send the contact form to my email with web3forms without leaving the page
const contactForm = document.getElementById("contact-form");
const formResult = document.getElementById("form-result");
const submitButton = contactForm.querySelector("button");
let hideTimer;

const showResult = (message, type) => {
    clearTimeout(hideTimer);
    formResult.textContent = message;
    formResult.className = type;
};

//wait about a second, then fade the message out
const hideResult = () => {
    hideTimer = setTimeout(() => {
        formResult.classList.add("fade");
        hideTimer = setTimeout(() => {
            formResult.className = "hidden";
        }, 500);
    }, 1000);
};

const sendForm = async () => {
    const formData = new FormData(contactForm);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        return response.status === 200 && result.success;
    } catch (error) {
        console.log(error);
        return false;
    }
};

contactForm.onsubmit = async (e) => {
    e.preventDefault();
    showResult("Sending...", "sending");
    submitButton.disabled = true;

    const sent = await sendForm();

    if (sent) {
        showResult("Thanks! Your message was sent.", "success");
        contactForm.reset();
    } else {
        showResult("Sorry, your message could not be sent. Please try again.", "error");
    }

    submitButton.disabled = false;
    hideResult();
};

//html validation stops bad submissions, so show an error message next to the form too
contactForm.addEventListener("invalid", () => {
    showResult("Please fill out every field correctly.", "error");
    hideResult();
}, true);
