const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse-pages");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for file uploads and PDF parsing
app.post("/upload", upload.array("files[]"), async (req, res) => {
  try {
    const resumeTextPromises = req.files.map((file) => {
      const filePath = path.join(uploadsDir, file.originalname);
      const dataBuffer = fs.readFileSync(filePath);
      return pdfParse(dataBuffer).then((result) => result.text); // Extract text
    });

    // Wait for all PDFs to be parsed
    const parsedTexts = await Promise.all(resumeTextPromises);

    // Save parsed texts to the database
    const savedResumes = await Promise.all(
      parsedTexts.map((text) => {
        return prisma.resume.create({
          data: {
            resumeText: text,
          },
        });
      })
    );

    res.json({
      message: "Successfully uploaded, parsed, and saved resumes",
      savedResumes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing uploaded files" });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
