// Function to handle user login
async function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation for empty fields
    if (username === '' || password === '') {
        document.getElementById('loginMessage').textContent = 'Please fill in all fields.';
        document.getElementById('loginMessage').style.color = 'red';
        return;
    }

    // Construct request body
    const requestBody = {
        userName: username,
        password: password
    };



    try {
        // Send POST request to login API
        const response = await fetch("http://3.14.152.102:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        // Handle the response
        const loginMessage = document.getElementById('loginMessage');
        if (response.ok) {
            const successMessage = await response.text(); // Assuming a plain text response
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.style.color = 'green';

            // Optionally, redirect to a dashboard or home page after success
            setTimeout(() => {
                window.location.href = 'home.html'; // Redirect to your dashboard or home page
            }, 2000);
        } else {
            const errorMessage = await response.text(); // Assuming error is in text
            loginMessage.textContent = 'Error: ' + errorMessage;
            loginMessage.style.color = 'red';
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Error: ' + error.message;
        document.getElementById('loginMessage').style.color = 'red';
    }
}
