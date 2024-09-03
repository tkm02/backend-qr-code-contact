const userService = require('../service/userService');
const qrCodeService = require('../service/qrCodeService');

async function createUser(req, res) {
  try {
    const data = req.body;
    // console.log(data);
    const options = {
      primaryColor: req.body.primaryColor || '#000000',
      secondaryColor: req.body.secondaryColor || '#FFFFFF',
      shape: req.body.shape || 'square'
    };
    const result = await userService.createUser(data, options);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    //console.log(data);
    

    if (!data) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const user = await userService.updateUser(id, data);
    //console.log(user);
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
 
async function downloadQRCode(req, res) {
  try {
    const id = req.params.id;
    const format = req.query.format || 'png';
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const vCardData = qrCodeService.createVCard(user);
    const qrCodePath = await qrCodeService.downloadQRCode(format, vCardData, {
      primaryColor: user.primaryColor || '#000000',
      secondaryColor: user.secondaryColor || '#FFFFFF',
      shape: user.qrCodeShape || 'circle'
    },id);

    res.download(qrCodePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.deleteUser(id);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser, downloadQRCode };