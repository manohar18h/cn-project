// Function to handle file upload
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

      const apiUrl = 'http://3.14.152.102:8080/documents/upload';

    fetch(apiUrl, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('response').innerText = data;
            sendAllEmails();
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            document.getElementById('response').innerText = 'File upload failed!';
        });


    // Simulate file upload with a delay
    setTimeout(() => {
        document.getElementById('uploadMessage').textContent = `File "${file.name}" uploaded successfully!`;
        showNotification(`File "${file.name}" uploaded.`);
    }, 1500);
}

function sendAllEmails() {
    // Ensure the element exists before trying to update it
    const responseMessage = document.getElementById('response');
    if (!responseMessage) {
        console.error('Response message element not found!');
        return;
    }

    // Display a loading message while the request is being processed
    responseMessage.textContent = 'Sending emails to all users...';

    // Send a GET request to the /sendAllEmails endpoint
    fetch('http://3.14.152.102:8080/documents/mail/sendAllEmails', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log('Emails sent:', data);
        // Display success message if the emails were sent successfully
        responseMessage.textContent = 'Emails sent successfully to all users.';
        responseMessage.style.color = 'green';
    })
    .catch(error => {
        console.error('Error occurred while sending emails:', error);
        // Display error message if there was an issue with the request
        responseMessage.textContent = 'Error occurred while sending emails: ' + error.message;
        responseMessage.style.color = 'red';
    });
}

// Function to simulate file sharing
function sendEmail(){
    const toMail = document.getElementById('toMail').value;
    const fileSelect = document.getElementById('fileSelect');

    if (toMail && fileSelect) {


     

  const fileId = fileSelect.value; // Get selected file ID
  const fileName = fileSelect.options[fileSelect.selectedIndex].text; // Get selected file name


      const requestBody = {
        fileName: fileName,
        toMail: toMail,
        fileId: parseInt(fileId)
      };

      console.log("requestbody"+ requestBody);

      fetch('http://3.14.152.102:8080/documents/mail/sendWithAttachment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.text())
      .then(data => {
        document.getElementById('response').textContent = data;
      })
      .catch(error => {
        document.getElementById('response').textContent = 'Error: ' + error.message;
      });



        showNotification(`File "${selectedFile}" shared with ${recipient}`);
    } else {
        alert('Please select a file and enter a recipient username.');
    }
}

// Function to simulate file download
function downloadFile(fileId, filename) {
    // Simulate file download
    window.location.href = `http://3.14.152.102:8080/documents/download/${fileId}`;


    showNotification(`Downloaded file: ${filename}`);
}



// Function to populate file list and file sharing dropdown
function populateFileList(files) {
    const fileList = document.getElementById('fileList');
    const fileSelect = document.getElementById('fileSelect');

    // Clear any existing items in the file list and dropdown
    fileList.innerHTML = '';
    fileSelect.innerHTML = '';

    files.forEach(file => {
        // Populate file list
        const fileItem = document.createElement('li');
        fileItem.textContent = file.filename;
        fileItem.onclick = () => downloadFile(file.id, file.filename );  // Assuming downloadFile is implemented
        fileList.appendChild(fileItem);

        const option = document.createElement('option');
    option.value = file.id; // Store the file ID in the value
    option.textContent = file.filename; // Display the filename
    fileSelect.appendChild(option);

       
    });
}

// Function to fetch files from the API and populate the UI
function fetchFiles() {
    fetch('http://3.14.152.102:8080/documents/list')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            populateFileList(data);  // Pass the response data to populate the list and dropdown
        })
        .catch(error => {
            console.error('Error fetching files:', error);
        });
}

// Call function to fetch files and populate file list on page load
window.onload = function() {
    fetchFiles();
};