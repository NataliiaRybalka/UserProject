const {
  fileConstants: { IMAGE_MAX_SIZE, IMAGE_MIMETYPES },
  responseCodes
} = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      if (req.files) {
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
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkImage: (req, res, next) => {
    try {
      if (req.images) {
        if (req.images.length > 1) {
          throw new ErrorHandler(
            responseCodes.ERROR_WITH_MEDIA,
            errorMessages.ONLY_ONE_FILE.message,
            errorMessages.ONLY_ONE_FILE.code
          );
        }

        [req.image] = req.images;
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkImageIsPresent: (req, res, next) => {
    try {
      const { avatar } = req.body;
      const { user } = req;

      if (!user.images.includes(avatar)) {
        throw new ErrorHandler(
          responseCodes.NOT_FOUND,
          errorMessages.IMAGE_NOT_FOUND.message,
          errorMessages.IMAGE_NOT_FOUND.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
