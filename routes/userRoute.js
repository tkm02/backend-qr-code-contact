const express = require('express');
const router = express.Router();
const { createUser, getUser, downloadQRCode,getAllUsers,updateUser,deleteUser } = require('../controllers/userController');

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/:id/download', downloadQRCode);

router.get('/', getAllUsers);

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);


module.exports = router;