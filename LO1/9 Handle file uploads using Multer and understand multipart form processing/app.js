const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 5000;

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to save
  },
  filename: function (req, file, cb) {
    // Save file with original name + timestamp to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Route to show form
app.get('/', (req, res) => {
  res.render('form');  // loads form.handlebars
});

// Route to handle upload
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send(`File uploaded successfully: ${req.file.originalname}`);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
