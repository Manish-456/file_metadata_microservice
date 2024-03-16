require('dotenv').config()
var express = require('express');
var cors = require('cors');
var multer = require("multer");
var app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

var storage = multer.memoryStorage();

var upload = multer({ storage });

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.post('/api/fileanalyse', upload.single('upfile') ,async(req, res) => {
 const file = req.file;

 if(!file) return res.status(400).send("No file uploaded");

 const fileData = {
  name: file.originalname,
  type: file.mimetype,
  size: file.size
 }

 return res.status(200).json({
  ...fileData
 })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
