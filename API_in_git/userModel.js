const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true }, // Unique identifier
    image: { type: String },// Stores image file path
    pdfFile: { type: String, }, // Store PDF file path
    // url: { type: String }, // Store a URL link
  //   apkFile: { type: String }, // Store APK file path
  //   webPage: { type: String } // Store a webpage URL
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);










/*

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);   

*/