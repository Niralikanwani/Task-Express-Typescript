import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
      cb(null,'./dist/images')
    },
    filename: (req,file,cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname))
    } 
  });

  const fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };  

export const upload= multer({storage:storage, fileFilter: fileFilter});