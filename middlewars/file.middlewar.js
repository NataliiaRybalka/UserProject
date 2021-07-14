const {
  fileConstants: { IMAGE_MAX_SIZE, IMAGE_MIMETYPES },
  responseCodes
} = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      const files = Object.values(req.files);

      const images = [];

      for (const file of files) {
        const { name, size, mimetype } = file;

        if (IMAGE_MIMETYPES.includes(mimetype)) {
          if (size > IMAGE_MAX_SIZE) {
            throw new ErrorHandler(
              responseCodes.ERROR_WITH_MEDIA,
              errorMessages.MAX_SIZE_FOR_MEDIA.message(name),
              errorMessages.MAX_SIZE_FOR_MEDIA.code
            );
          }

          images.push(file);
        } else {
          throw new ErrorHandler(
            responseCodes.ERROR_WITH_MEDIA,
            errorMessages.WRONG_MIMETYPE.message,
            errorMessages.WRONG_MIMETYPE.code
          );
        }
      }

      req.images = images;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAvatar: (req, res, next) => {
    try {
      if (req.images.length > 1) {
        throw new ErrorHandler(
          responseCodes.ERROR_WITH_MEDIA,
          errorMessages.ONLY_ONE_FILE.message,
          errorMessages.ONLY_ONE_FILE.code
        );
      }

      [req.avatar] = req.images;

      next();
    } catch (e) {
      next(e);
    }
  }
};
