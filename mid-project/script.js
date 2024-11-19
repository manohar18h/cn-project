let currentUser = null;

// User Login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Login failed');
        })
        .then(user => {
            alert(`Welcome, ${user.username}!`);
            currentUser = user.username;
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('file-section').style.display = 'block';
        })
        .catch(error => alert(error.message));
}

// User Registration
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Registration failed');
        })
        .then(() => alert('Registration successful! Please log in.'))
        .catch(error => alert(error.message));
}

// Upload File
function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch(`/api/files/upload?uploader=${currentUser}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error(error));
}

// List Files
function listFiles() {
    fetch(`/api/files/list?uploader=${currentUser}`)
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '<h3>My Files</h3>';
            files.forEach(file => {
                fileList.innerHTML += `<p>${file}</p>`;
            });
        })
        .catch(error => console.error(error));
}

// Share File
function shareFile() {
    const fileName = document.getElementById('share-file-name').value;
    const recipient = document.getElementById('share-recipient').value;

    fetch('/api/files/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, uploader: currentUser, recipient })
    })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error(error));
}
