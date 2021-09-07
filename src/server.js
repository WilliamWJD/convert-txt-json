const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const fs = require('fs');

const { convertTxtToJson } = require('./services/ConvertTxtToJson');

const app = express();

app.use(express.json());

const upload = multer(uploadConfig.upload());

app.post('/upload-txt', upload.single('file'), async (req, res)  => {
    const { file } = req;

    const blacklist = await convertTxtToJson(file);

    fs.writeFile('blacklist.json', JSON.stringify(blacklist), (err)=>{
        if(err){
            return res.status(500).json({ error: "Error in generated blacklist.json"});
        }

        return res.status(201).json({ message:"Json generated successfully" })
    })
})

app.listen(3333, () => {
    console.log('Servidor online')
})