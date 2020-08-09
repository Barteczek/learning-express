const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const multer = require('multer');
const upload = multer();

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use('/user', (req, res) => {
  res.render('forbidden');
});

app.use(express.static('public'));

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const file = req.file;
 
  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, fileName: file.originalname});
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.render('404');
})

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});