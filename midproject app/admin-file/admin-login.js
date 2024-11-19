// Function to handle login
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation for empty fields
    if (username === '' || password === '') {
        document.getElementById('loginMessage').textContent = 'Please fill in both fields.';
        return;
    }

    // Simulate login request
    setTimeout(() => {
        // Example success response
        if (username === 'admin' && password === 'password') {
            document.getElementById('loginMessage').textContent = 'Login successful! Redirecting...';
            document.getElementById('loginMessage').style.color = 'green';
            // Redirect after successful login
            window.location.href = 'admin-file/admin-form.html'; // Change to the correct post-login page
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid username or password.';
        }
    }, 1000);
}
