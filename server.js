import express from 'express';
import { resize, original } from './resize';

const server = express();

// refactor this to be configurable at runtime
// also consider abstracting this to an image service that 
// can return any image so different data stores can be used
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
    var path = buildPath(req);
    res.type('image/png');
    original(path).pipe(res);
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
    resize(path, format, width, height, fit).pipe(res);
});

const buildPath = (req) => `${imageRootLocation}/${req.params.user}/${req.params.rawImageName}`;