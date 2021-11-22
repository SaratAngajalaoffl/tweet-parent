import express from 'express';
import { imagesUpload } from '../helpers/multer-helper';
import { uploadImages } from './handler';

const router = express.Router();

const port = process.env.PORT || 8081;

router.use('/upload-images', imagesUpload, uploadImages);

export default router;
