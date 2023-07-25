import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export const deleteOldProfileImage = (oldImagePath: string) => {
  fs.unlink(path.resolve('uploads', oldImagePath), (error) => {
    if (error) {
      console.log(error);
    }
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
