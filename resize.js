import { createReadStream } from 'fs';
const sharp = require('sharp'); // sharp supports GIF input, but not output

const allowedMimes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif'
};

function resize(path, format, width, height, imgFit) {
    // TODO:ideally, use a generic image service here
    // rather than using the file system
    const readStream = createReadStream(path);
    let transform = sharp();
    if (format) {
        transform = transform.toFormat(format);
    }
    if (width || height) {
        transform = transform.resize(width, height, {
            fit: imgFit || 'cover'
        });
    }
    return readStream.pipe(transform);
}

function original(path) {
    // TODO:ideally, use a generic image service here
    // rather than using the file system
    return createReadStream(path);
}

export { resize, original };