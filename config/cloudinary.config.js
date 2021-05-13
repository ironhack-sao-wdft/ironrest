const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Não esquecer de criar as variáveis de ambiente no .env com as chaves da API do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pictures", // Aqui você pode escolher o nome da pasta que irá armazenar seus arquivos no Cloudinary
    // Na opção format podemos escolher o formato resultante da imagem que será armazenada no Cloudinary
    format: async (req, file) => "png",
    use_filename: true,
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
