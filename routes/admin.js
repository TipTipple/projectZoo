const multer = require('multer');
const router = require('express').Router();

require('../db/mongoose');
const Animal = require('../models/animals.model');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('123');
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get('/', upload.single('pictures'), (req, res) => {
  res.render('admin');
});

router.get('/show', async (req, res) => {
  const animal = await Animal.find();
  let name = animal.map((el) => el.name);
  res.json(name);
});

module.exports = router;
