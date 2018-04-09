const BitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('../lib/read-from');

class BitmapTransformer {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            encoding: 'hex',
            highWaterMark: 3,
            start: header.pixelOffset
        });
    }

    transform(fn, filename) {
        const { readStream } = this;
        const writeStream = fs.createWriteStream(filename);
        let writeData = '';

        return new Promise((resolve, reject) => {
    
            readFrom(this.filename, 53)
                .then(buffer => {
                    writeStream.write(buffer);
                })
                .catch(err => reject(err));
                
            readStream.on('data', chunk => {
                let colorData = fn({ r: parseInt(chunk[0] + chunk[1], 16), g: parseInt(chunk[2] + chunk[3], 16), b: parseInt(chunk[4] + chunk[5], 16) });
                writeData += colorData.r.toString(16) + colorData.g.toString(16) + colorData.b.toString(16);
            });

            readStream.on('close', () => {
                writeStream.write(writeData);
                writeStream.end(resolve);
            });

            readStream.on('error', reject);
        });
    }
}

BitmapTransformer.create = function(filename){
    return BitmapHeader(filename)
        .then(header =>{
            return new BitmapTransformer(filename, header); 
        });
};
module.exports = BitmapTransformer;