// Function to handle user registration
// Function to handle user registration
async function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('regUsername').value;
    const emailId = document.getElementById("email-id").value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation for empty fields
    if (username === '' || password === '' || confirmPassword === '' || emailId === '') {
        document.getElementById('registerMessage').textContent = 'Please fill in all fields.';
        document.getElementById('registerMessage').style.color = 'red';
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('registerMessage').textContent = 'Passwords do not match.';
        document.getElementById('registerMessage').style.color = 'red';
        return;
    }

    // Construct request body
    const requestBody = {
        name: username, // Assuming name is same as username
        userName: username,
        password: password,
        confirmPassword: confirmPassword,
        emailId: emailId
    };

    try {

        console.log(requestBody);
        // Send POST request to registration API
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        // Handle the response
        const registerMessage = document.getElementById('registerMessage');
        if (response.ok) {
            registerMessage.textContent = 'Registration successful! You can now log in.';
            registerMessage.style.color = 'green';
            document.getElementById('registerForm').reset(); // Reset the form
            // Optionally redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            const errorText = await response.text();
            registerMessage.textContent = 'Error: ' + errorText;
            registerMessage.style.color = 'red';
        }
    } catch (error) {
        document.getElementById('registerMessage').textContent = 'Error: ' + error.message;
        document.getElementById('registerMessage').style.color = 'red';
    }
}
