const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  primaryPhone: { type: String, unique: true, required: true },
  secondaryPhone: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  website: { type: String, required: false },
  companyName: { type: String, required: false },
  profession: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  postalCode: { type: String, required: false },
  socialLinks: {
    linkedIn: { type: String, required: false },
    tiktok: { type: String, required: false },
    facebook: { type: String, required: false },
    snapchat: { type: String, required: false },
    telegram: { type: String, required: false },
    instagram: { type: String, required: false },
    twitter: { type: String, required: false },
  },
  imageUrl: { type: String, required: false },
  qrCodeUrl: { type: String, required: true },
  primaryColor: { type: String, required: false, default: '#000' },
  secondaryColor: { type: String, required: false, default: '#fff' },
  qrCodeShape: { type: String, required: false, enum: ['square', 'circle'], default: 'circle' }
});
 
module.exports = mongoose.model('User', userSchema);
