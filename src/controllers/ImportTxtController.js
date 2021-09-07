const fs = require('fs');
const { convertTxtToJson } = require('../services/ConvertTxtToJson');

class ImportTxtController {
    async store(req, res) {
        const { file } = req;

        const blacklist = await convertTxtToJson(file);

        fs.writeFile('blacklist.json', JSON.stringify(blacklist), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error in generated blacklist.json" });
            }

            return res.status(201).json({ message: "Json generated successfully" })
        })
    }
}

module.exports = new ImportTxtController();