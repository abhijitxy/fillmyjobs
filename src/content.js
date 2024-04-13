// content.js

// Assuming you have a function to parse the resume and it returns an object with the necessary fields
const parseResume = require('./uploads');

// Function to autofill job application
function autofillApplication(resumePath, applicationForm) {
    // Parse the resume
    let resumeData = parseResume(resumePath);

    // Autofill the application form
    for (let field in applicationForm) {
        if (resumeData.hasOwnProperty(field)) {
            applicationForm[field] = resumeData[field];
        }
    }

    return applicationForm;
}

module.exports = autofillApplication;
