const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handle POST request to /api/upload
app.post('/api/upload', upload.single('cv'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const { name, email, about } = req.body; 
    const cv = req.file;

    // Construct the response object with dynamic port
    const responseData = {
      name,
      email,
      about,
      cvUrl: `http://localhost:${process.env.PORT || 4000}/uploads/${cv.filename}`,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Route all other requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
