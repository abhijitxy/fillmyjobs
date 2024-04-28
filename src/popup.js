document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('file-upload');

    function uploadFiles() {
        if (fileInput.files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileInput.files.length; i++) {
                formData.append('files[]', fileInput.files[i]);
            }

            fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Files successfully uploaded and parsed');
                // Log the parsed texts
                console.log('Parsed Texts:', data.parsedTexts);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Upload failed');
            });
        } else {
            alert('Please select files to upload.');
        }
    }

    if (uploadButton) {
        uploadButton.addEventListener('click', uploadFiles);
    } else {
        console.log('Upload button not found');
    }
});

