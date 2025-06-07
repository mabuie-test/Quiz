const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  parentGroup: { type: String, enum: ['Ciências','Letras'], required: true },
});
module.exports = mongoose.model('Category', CategorySchema);
