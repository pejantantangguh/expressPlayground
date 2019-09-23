const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.storeList = async (req, res) => {
  //1.  Query database for list all of the stores
  const stores = await Store.find();
  console.log(stores);

  // Take stores database and put it to template
  res.render('./storelist', { stores });
}

exports.storeDetails = (req, res) => {
  res.send('Details of the clicked store');
}

// Add store and edit store will be exactly same way.
exports.addStore = (req, res) => {
  res.render('./addstore', { title: 'Add / Edit Store ' });
}

exports.createStore = async (req, res) => {
  // Save req.body to database. Using asycn await
  const store = new Store(req.body);
  await store.save();
  res.redirect(`/store/${store.slug}`);
}


exports.homePage = (req, res) => {
  res.render('index', { title: 'Express' })
}



