const User = require('../model/user');
const { generateQRCode, createVCard } = require('./qrCodeService');

async function createUser(data, options) {
  const user = new User(data);
  const vCardData = createVCard(user);
  const qrCode = await generateQRCode(vCardData, options);
  user.qrCodeUrl = qrCode;

  await user.save();

  // console.log(qrCode);
  return { user};
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
    const vCardData = createVCard(data);
    //console.log(vCardData)

    //console.log("--------",vCardData); 


    const qrCodePath = await generateQRCode(vCardData, { 
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
