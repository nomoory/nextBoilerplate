import express from 'express';
import upload from './upload';
console.log(typeof upload, upload);

const router = express.Router();
router.use('/upload', upload);
console.log(typeof router, router);

export default router;
