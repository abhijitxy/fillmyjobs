// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();
// const port = 5000;

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, uploadsDir);
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // Enable CORS for all origins
// app.use(cors());

// // Middleware for parsing JSON and urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route for file uploads
// app.post('/upload', upload.array('files[]'), async (req, res) => {
//     try {
//         // Process uploaded files
//         req.files.forEach(file => {
//             const filePath = path.join(uploadsDir, file.originalname);
//             console.log(`File uploaded: ${filePath}`);
//             // Here you can perform operations on the file if necessary
//         });

//         res.json({ message: "Successfully uploaded files" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error processing uploaded files" });
//     }
// });

// // Example route to access a specific file
// app.get('/file/:name', (req, res) => {
//     const fileName = req.params.name;
//     const filePath = path.join(uploadsDir, fileName);

//     fs.access(filePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.error(`File not found: ${filePath}`);
//             return res.status(404).json({ message: "File not found" });
//         }

//         // Serve the file, read its contents, or perform other operations
//         res.sendFile(filePath);
//     });
// });

// // Error handling for unsupported routes
// app.use((req, res, next) => {
//     res.status(404).send("Sorry can't find that!");
// });

// // Global error handler
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse-pages'); // Ensure this is correctly installed

const app = express();
const port = 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for file uploads and PDF parsing
app.post('/upload', upload.array('files[]'), async (req, res) => {
    try {
        const textDataPromises = req.files.map(file => {
            const filePath = path.join(uploadsDir, file.originalname);
            const dataBuffer = fs.readFileSync(filePath);
            // Use pdf-parse-pages to parse the PDF
            return pdfParse(dataBuffer).then(result => result.text); // Assuming pdf-parse-pages resolves with an object containing a text property
        });

        // Wait for all PDFs to be parsed
        const parsedTexts = await Promise.all(textDataPromises);

        // Example: Log the text content of each PDF
        parsedTexts.forEach((text, index) => {
            console.log(`Text content of file ${req.files[index].originalname}:`, text);
        });

        res.json({ message: "Successfully uploaded and parsed files", parsedTexts: parsedTexts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing uploaded files" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});