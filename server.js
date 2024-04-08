// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// const express = require("express");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post("/upload", upload.array("files"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });
// }
// app.listen(5000, () => {
//     console.log(`Server started...`);
// });


// const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// const app = express();

// // Enable CORS
// app.use((req, res, next) => {
//     // Allow all origins or specify your Chrome extension's origin for better security
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     // If your client needs to send cookies or credentials, you'll also need to enable credentials
//     // res.header("Access-Control-Allow-Credentials", "true");
//     // Handle pre-flight requests for complex requests
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });

// // Middleware for parsing request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route for file uploads
// app.post("/upload", upload.array("files"), (req, res) => {
//     console.log(req.body); // Log the text fields
//     console.log(req.files); // Log the files
//     res.json({ message: "Successfully uploaded files" });
// });

// // Start the server
// app.listen(5000, () => {
//     console.log(`Server started on port 5000`);
// });


const express = require('express');
const multer = require('multer');
const cors = require('cors');

// Configure multer for file uploads
// Files will be stored in the 'uploads/' directory with their original filenames
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for file uploads
// The field name 'files[]' must match the name used in the client-side FormData
app.post('/upload', upload.array('files[]'), (req, res) => {
    console.log(req.files); // Log the uploaded files information
    res.json({ message: "Successfully uploaded files" });
});

// Error handling for unsupported routes
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});