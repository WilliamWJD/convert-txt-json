const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const readline = require('readline');
const fs = require('fs');

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

function convertTxtToJson(file) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file.path);

        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        })

        const blacklist = [];

        reader.on('line', line => {
            //console.log(line)
            blacklist.push({
                domain:line
            });
        })

        reader.on('close', () => resolve(blacklist));
    })
}

app.listen(3333, () => {
    console.log('Servidor online')
})