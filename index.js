import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3000'],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', 'http://localhost:3000');
    next();
}); //lil offscript

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

//multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = file.fieldname + '-' + uuidv4() + path.extname(file.originalname);
        // const uniqueSuffix = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
})
// multer configuration
const upload = multer({storage: storage});

// upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const filePath = req.file.path;
    console.log('File uploaded:');
    res.json({filePath: filePath});
})

app.get('/', (req, res) => {
  res.json({message: "Hello World!"});
});
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

