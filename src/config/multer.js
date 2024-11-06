import multer from 'multer';

// configuración de almacenamiento para multer
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {       
        cb(null, 'publico'); // ruta donde se guardaran las imagenes
    },

    filename: function (req, file, cb)  {
        const fileTime = Date.now(); 
        const nuevoNombreArchivo = `${fileTime}-${file.originalname}`;
        cb(null, nuevoNombreArchivo ); 
    }
})

export {storage}