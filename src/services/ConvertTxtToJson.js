const fs = require('fs');
const readline = require('readline');

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

module.exports={convertTxtToJson}