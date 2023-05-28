const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const multer = require('multer');
const cors = require('cors');
const path = require('path')

const eventRoutes = require('./routes/eventRoutes');
const nudgeRoutes = require('./routes/nudgeRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/eventImages', express.static(path.join(__dirname, '/eventImages')));
app.use('/event',eventRoutes)
app.use('/nudge',nudgeRoutes)

mongoose.connect(process.env.newDB)
.then(()=>console.log('db connected..'))
.catch((err)=>console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'eventImages')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post('/file/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded..')
})


app.listen(6000,()=>console.log('app running on port 6000'))