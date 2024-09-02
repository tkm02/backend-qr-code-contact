const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  personalPhone: { type: String, required: true },
  professionalPhone: { type: String, required: false },
  personalEmail: { type: String, unique: true, required: true },
  professionalEmail: { type: String, unique: true, required: false },
  website: { type: String, required: false },
  companyName: { type: String, required: false },
  profession: { type: String, required: false },
  bio: { type: String, required: false },
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
  profileImageUrl: { type: String, required: false },
  qrCodeUrl: { type: String, required: true },
  primaryColor: { type: String, required: false, default: '#000' },
  secondaryColor: { type: String, required: false, default: '#fff' },
  qrCodeShape: { type: String, required: false, enum: ['square', 'circle'], default: 'circle' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);