const constants = require('../lib/bitmap-constants');
const readFrom = require('../lib/read-from');

function BitmapHeader(filename) {
   
    return new Promise((resolve, reject) => {

        const header = {};

        readFrom(filename, 112)
            .then(buffer => {

                header.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
                header.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
                header.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4);

                resolve(header);
            })
            .catch(err => reject(err));
    });
   
    // let header = {
    //     pixelOffset: 0
    // };
    // readFrom(filename, 1, 10)
    //     .then((buffer) => {
    //         header.pixelOffset = buffer.readInt8();
    //     });
}
module.exports = BitmapHeader;
            

// constructor(buffer) {
//                 this.pixelOffset = buffer.readInt8(constants.PIXEL_OFFSET);
//                 this.bitsPerPixel = buffer.readInt8(constants.BITS_PER_PIXEL_OFFSET);
//                 this.fileSize = buffer.readInt32LE(constants.FILE_SIZE_OFFSET);
//             }