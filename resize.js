var fs = require('fs');
const sharp = require('sharp'); // sharp supports GIF input, but not output

const allowedMimes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif'
};

function resize(path, format, width, height, imgFit) {
    // TODO: throw an error if the MIMEtype does not fit in the subset above

    // TODO: we probably want to determine a maximum image size here.
    //       really easy to submit an extremely large request and blow up the server memory
    //       excellent for heating up the server room, though! ;)

    // TODO: ideally, use a generic image service that provides a ReadStream
    //       here rather than using the file system directly

    // no need to do too much error checking here - sharp already returns easily readable errors
    // it may make sense to handle the response better in the express part of the app
    const readStream = fs.createReadStream(path);
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
    // TODO: ideally, use a generic image service that provides a ReadStream
    //       here rather than using the file system directly
    return fs.createReadStream(path);
}

module.exports = {
    resize: resize,
    original: original
};