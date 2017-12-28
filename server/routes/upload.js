import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({ // multer 설정
  destination: function (req, file, callback) { // 저장될 위치 지정
    callback(null, 'static/uploads/');
  },
  filename: function (req, file, callback) { // 저장될 이름 지정
    callback(null, file.originalname); //callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage : storage });

router.post('/', upload.array('file'), // client에서 올리는 file의 타입
(req, res) => { uploadDate(req, res); });

const uploadDate = (req, res) => {console.log(req.files);}

export default router;
