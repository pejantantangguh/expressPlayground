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
  await photo.write(`./public/uploads/${req.body.photo}`);

  // once we save, keep going
  next();
}

exports.createStore = async (req, res) => {
  // Save req.body to database. Using asycn await
  const store = new Store(req.body);
  await store.save();
  res.redirect(`/store`);
  // res.json(req.body);
}

exports.storeList = async (req, res) => {
  //1.  Query database for list all of the stores
  const stores = await Store.find();
  //2. Take stores database and put it to template
  res.render('./storelist', { stores });
}

exports.storeDetails = async (req, res) => {
  const store = await Store.findOne(req.params)
  res.render('storedetails', { store });
  // res.json(store);
}

// Add store and edit store will be exactly same way.
exports.addStore = (req, res) => {
  res.render('addstore', { title: 'Add / Edit Store ' });
}



exports.editStore = async (req, res) => {
  // Find the store given id
  const store = await Store.findOne({ _id: req.params.id });
  // Confirm if they are owner
  // TODO

  // Render out edit form so user can update stores
  res.render('addstore', { title: `Edit ${store.name}`, store })
}


exports.getStoresbyTags = async (req, res) => {
  // getTagsList -> lives in Store.js
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  res.render('tag', { tags, stores, title: 'Tag Pages' });
  // res.json([tags, stores]);
}

exports.homePage = (req, res) => {
  res.render('index', { title: 'Express' })
}



