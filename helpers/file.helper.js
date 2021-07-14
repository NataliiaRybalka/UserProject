const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  _photoDirBuilder: async (itemType, itemId, fileName, fileType) => {
    const pathWithoutStatic = path.join(itemType, itemId.toString(), fileType);
    const fileDirectory = path.join(process.cwd(), 'static', pathWithoutStatic);

    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuid()}.${fileExtension}`;

    const finalPath = path.join(fileDirectory, uniqueFileName);
    const filePath = path.join(pathWithoutStatic, uniqueFileName);

    await mkdirPromise(fileDirectory, { recursive: true });

    return {
      finalPath,
      filePath
    };
  }
};
