// const form = document.getElementById("form");

// form.addEventListener("submit", submitForm);

// function submitForm(e) {
//     e.preventDefault();
//     const name = document.getElementById("name");
//     const files = document.getElementById("files");
//     const formData = new FormData();
//     formData.append("name", name.value);
//     for(let i =0; i < files.files.length; i++) {
//             formData.append("files", files.files[i]);
//     }
//     fetch("http://localhost:5000/upload", {
//     method: 'POST',
//     body: formData,
//     // Remove the Content-Type header
// })
// .then((res) => console.log(res))
// .catch((err) => console.error("Error occurred", err));
// }

document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('file-upload');

    // Function to upload files
    function uploadFiles() {
        // Ensure files are selected
        if (fileInput.files.length > 0) {
            const formData = new FormData();
            // Append files to formData. The field name 'files[]' matches the server expectation.
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append('files[]', fileInput.files[i]);
            }
            // Perform the fetch request to upload the files
            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
                // Note: Fetch API does not require Content-Type header for FormData. It's automatically set.
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Files successfully uploaded');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Upload failed');
            });
        } else {
            alert('Please select files to upload.');
        }
    }

    // Attach the event listener to the upload button
    if (uploadButton) {
        uploadButton.addEventListener('click', uploadFiles);
    } else {
        console.log('Upload button not found');
    }
});