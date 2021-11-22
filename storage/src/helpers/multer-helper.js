const multer = require('multer');
const upload = multer({ dest: 'uploads/images' });

export const imagesUpload = upload.array('images');
