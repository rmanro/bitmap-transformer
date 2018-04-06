const constants = require('../lib/bitmap-constants');
const readFrom = require('../lib/read-from');
const fs = require('fs');

function BitmapHeader(filename) {
    return readFrom(filename, 28).then(buffer => console.log(buffer));
}
module.exports = BitmapHeader;
            

// constructor(buffer) {
//                 this.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
//                 this.bitsPerPixel = buffer.readInt8(constants.BITS_PER_PIXEL_OFFSET);
//                 this.fileSize = buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
//             }