

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

      fetch('http://localhost:8080/documents/mail/sendWithAttachment', {
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
    window.location.href = `http://localhost:8080/documents/download/${fileId}`;


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
    fetch('http://localhost:8080/documents/list')
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