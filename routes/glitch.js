var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

const glitchImg = (base64Img, glitchFactor) => {
    let resultBase64Img = base64Img;

    console.log("length = "+base64Img.length)
    console.log("imgLength/glitchFactor = "+(base64Img.length/glitchFactor))

    for (let i = 0 ; i < glitchFactor ; i++) {
        const startPosition = Math.floor((i+1)*(base64Img.length/glitchFactor));
        const stringToDelete = resultBase64Img.substring(startPosition, startPosition+glitchFactor);
        resultBase64Img = resultBase64Img.replace(stringToDelete, '');
    }

    return resultBase64Img;
};

router.post('/', (req, res) => {
    const form = new formidable.IncomingForm();
    let glitchFactor = 20;
    let savedFile = null;

    // field received
    form.on('field', (name, value) => {
        if (name === 'glitch-factor') {
            glitchFactor = parseInt(value);
        }
    });

    // file received
    form.on('file', (name, file) => {
        savedFile = file;
    });

    // everything has been received, we start the processing and send the string
    form.on('end', () => {
        fs.readFile(savedFile.path, 'base64', (err, base64Image) => {
            res.send(`data:${savedFile.type};base64, ${glitchImg(base64Image, glitchFactor)}`);
        })
    });

    form.parse(req);
});

module.exports = router;
