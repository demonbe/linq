const fs = require('fs');

function deleteFolder(path) {
  const files = [];

  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    files.forEach(fileName => {
      const currentFilePath = `${path}/${fileName}`;
      const states = fs.statSync(currentFilePath);
      if (states.isDirectory()) {
        deleteFolder(currentFilePath);
      } else {
        fs.unlinkSync(currentFilePath);
      }
    });

    fs.rmdirSync(path);
  }
}

module.exports = deleteFolder;