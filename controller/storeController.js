const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That file type is not allowed' }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('photo');
exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;

  // resize
  const photo = await jimp.read(req.file.buffer)
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./uploads/${req.body.photo}`);

  // once we save, keep going
  res.redirect('/');
}

exports.storeList = async (req, res) => {
  //1.  Query database for list all of the stores
  const stores = await Store.find();
  //2. Take stores database and put it to template
  res.render('./storelist', { stores });
}

exports.storeDetails = (req, res) => {
  res.send('Details of the clicked store');
}

// Add store and edit store will be exactly same way.
exports.addStore = (req, res) => {
  res.render('addstore', { title: 'Add / Edit Store ' });
}

exports.createStore = async (req, res) => {
  // Save req.body to database. Using asycn await
  const store = new Store(req.body);
  await store.save();
  res.redirect(`/store/${store.slug}`);
}

exports.editStore = async (req, res) => {
  // Find the store given id
  const store = await Store.findOne({ _id: req.params.id });
  // Confirm if they are owner
  // TODO

  // Render out edit form so user can update stores
  res.render('addstore', { title: `Edit ${store.name}`, store })
}


exports.homePage = (req, res) => {
  res.render('index', { title: 'Express' })
}



