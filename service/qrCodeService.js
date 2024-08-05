const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generateQRCode(data, options) {
  try {
    const canvas = createCanvas(500, 500);
    await QRCode.toCanvas(canvas, data, {
      width: 300,
      margin: 2,
      color: {
        dark: options.primaryColor,
        light: options.secondaryColor,
      },
    });
    return canvas.toDataURL();  
  } catch (err) {
    console.error(err);
  }
}

function createVCard(user) {

 // console.log(user)
  
  return `BEGIN:VCARD
VERSION:3.0
N:${user.firstName} ${user.lastName}
FN:${user.firstName} ${user.lastName}
TEL:${user.primaryPhone}
EMAIL:${user.email}
URL:${user.website}
ORG:${user.companyName}
TITLE:${user.profession}
ADR:${user.city}, ${user.country} ${user.postalCode}
NOTE:${Object.values(user.socialLinks).join(', ')}
END:VCARD`;
}

async function downloadQRCode(format, data, options) {
  const canvas = createCanvas(500, 500);
  await QRCode.toCanvas(canvas, data, {
    width: 500,
    margin: 2,
    color: {
      dark: options.primaryColor,
      light: options.secondaryColor,
    },
  });

  const buffer = canvas.toBuffer();

  switch (format) {
    case 'png':
      fs.writeFileSync('qrcode.png', buffer);
      return 'qrcode.png';
    case 'jpeg':
    case 'jpg':
      fs.writeFileSync('qrcode.jpg', buffer);
      return 'qrcode.jpg';
    case 'pdf':
      const doc = new PDFDocument();
      doc.image(buffer, 0, 0, { width: 500 });
      doc.end();
      const pdfPath = 'qrcode.pdf';
      doc.pipe(fs.createWriteStream(pdfPath));
      return pdfPath;
    default:
      throw new Error('Invalid format');
  }
}

module.exports = { generateQRCode, createVCard, downloadQRCode };
