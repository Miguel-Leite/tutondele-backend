export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(null , false);
  }
  callback(null, true);
};