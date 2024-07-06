// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation and Submission
document.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    if (!name) {
        alert('Please enter your name.');
        isValid = false;
    }

    if (!email) {
        alert('Please enter your email.');
        isValid = false;
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    if (!message) {
        alert('Please enter your message.');
        isValid = false;
    }

    if (isValid) {
        const formData = new FormData(this);
        fetch('/submit-form/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.errors) {
                alert('Please correct the errors and try again.');
            }
        })
        .catch(error => {
            alert('An error occurred. Please try again.');
        });
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}
