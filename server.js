var express = require('express');
var resize = require('./resize');

const server = express();

// TODO: refactor this to be configurable at runtime
const imageRootLocation = 'images';

server.listen(1234, () => {
    console.log('Server running on port 1234');
    console.log(`image resizing service initialized with storage location ${imageRootLocation}`);
});

// valid rgitoutes:
// GET /images/:user/:rawImageName
// GET /images/:user/:rawImageName/:mimeType/:heightPx/:widthPx

server.get('/images/:user/:rawImageName', (req, res) => originalImage(req, res));

function originalImage(req, res) {
    const path = buildPath(req);
    res.type('image/png');
    resize.original(path).pipe(res);
}

server.get("/images/:user/:rawImageName/:height/:width/:format/:fit?", (req, res) => {
    var path = buildPath(req);
    const format = req.params.format || 'png';
    const heightString = req.params.width;
    const widthString = req.params.height;
    let width, height;
    if (widthString) {
        width = parseInt(widthString);
    }
    if (heightString) {
        height = parseInt(heightString);
    }
    const fit = req.params.fit;
    res.type(`image/${format}`);
    resize.resize(path, format, width, height, fit).pipe(res);
});

// TODO: consider if this belongs as an export in the resize service, or another service
const buildPath = (req) => `${imageRootLocation}/${req.params.user}/${req.params.rawImageName}`;