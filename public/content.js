chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'upload_successful') {
        // Get parsed data from request
        const parsedData = request.parsedData;

        // Create autofill button
        const autofillButton = document.createElement('button');
        autofillButton.id = 'autofillButton';
        autofillButton.innerText = 'Autofill Application';
        document.body.appendChild(autofillButton); // append the button to the body, adjust this to place the button where you want it

        autofillButton.addEventListener('click', function() {
            // Autofill form with parsed data
            // Note: Adjust these selectors to match the actual IDs or names of your form fields
            document.querySelector('#fullName').value = parsedData.fullName;
            document.querySelector('#email').value = parsedData.email;
            document.querySelector('#linkedIn').value = parsedData.linkedIn;
            document.querySelector('#github').value = parsedData.github;
            document.querySelector('#phone').value = parsedData.phone;
        });
    }
});