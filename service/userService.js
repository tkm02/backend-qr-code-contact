
const User = require('../model/user');
const { generateQRCode } = require('./qrCodeService');

async function createUser(data, options) {
  const user = new User(data);
  const profileUrl = `http://192.168.252.115:3000/profile/${user._id}`;
  const qrCode = await generateQRCode(profileUrl, options);
  user.qrCodeUrl = qrCode;

  await user.save();
  return { user };
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function getAllUsers() {
  return User.find();
}

async function updateUser(id, data) {
  if (data.qrCodeUrl) {
    // En cas de mise à jour du QR code
    const profileUrl = `http://192.168.252.115:3000/profile/${id}`;
    const qrCodePath = await generateQRCode(profileUrl, {
      primaryColor: data.primaryColor || '#000000',
      secondaryColor: data.secondaryColor || '#FFFFFF',
      shape: data.shape || 'circle'
    });
    data.qrCodeUrl = qrCodePath;
  }

  return User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };