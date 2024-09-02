const multer = require("multer");
const path = require("path");

// Destino de armazenamento de imagem
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("func")) {
      folder = "funcionario";
    } else if (req.baseUrl.includes("tea")) {
      folder = "pessoatea";
    } else if (req.baseUrl.includes("respon")) {
      folder = "responsavel";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cd(new Error("Por favor, envie apenas jpg ou png!"));
    }
    cd(undefined, true);
  },
});

module.exports = { imageUpload };
